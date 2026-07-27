import { auth, db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const slugify = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
};

export const normalizeProblemLink = (link) => {
  if (!link) return '';
  let normalized = link.toLowerCase().trim();
  normalized = normalized.split('?')[0].replace(/\/$/, '');
  
  if (normalized.includes('leetcode.com/problems/')) {
    const parts = normalized.split('leetcode.com/problems/');
    if (parts.length > 1) {
      const slug = parts[1].split('/')[0];
      return `leetcode-${slug}`;
    }
  }
  
  if (normalized.startsWith('leetcode-')) {
    return normalized;
  }
  
  return normalized;
};

export const getSyncKey = () => {
  const uid = auth.currentUser?.uid;
  return uid ? `keetcode_progress_${uid}` : 'keetcode_progress_guest';
};

export const getSyncedProblems = () => {
  try {
    const saved = localStorage.getItem(getSyncKey());
    const data = saved ? JSON.parse(saved) : {};
    
    let needsSave = false;
    Object.keys(data).forEach(key => {
      if (data[key] === true) {
        data[key] = { solvedAt: new Date().toISOString() };
        needsSave = true;
      }
    });
    
    if (needsSave) {
      localStorage.setItem(getSyncKey(), JSON.stringify(data));
    }
    
    return data;
  } catch (e) {
    return {};
  }
};

export const getUserMeta = () => {
  try {
    const uid = auth.currentUser?.uid || 'guest';
    const saved = localStorage.getItem(`keetcode_meta_${uid}`);
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    return {};
  }
};

export const saveUserMeta = (meta) => {
  try {
    const uid = auth.currentUser?.uid || 'guest';
    const existing = getUserMeta();
    const updated = { ...existing, ...meta };
    localStorage.setItem(`keetcode_meta_${uid}`, JSON.stringify(updated));
    
    if (auth.currentUser) {
      setDoc(doc(db, 'userProgress', auth.currentUser.uid), {
        userMeta: updated
      }, { merge: true }).catch(err => console.error("Cloud sync failed", err));
    }
    window.dispatchEvent(new Event('user-meta-updated'));
  } catch (e) {
    console.error("Error saving user meta", e);
  }
};

export const saveSyncedProblems = (data) => {
  try {
    localStorage.setItem(getSyncKey(), JSON.stringify(data));
    
    if (auth.currentUser) {
      setDoc(doc(db, 'userProgress', auth.currentUser.uid), {
        syncedProblems: data
      }, { merge: true }).catch(err => console.error("Cloud sync failed", err));
    }
  } catch (e) {
    console.error("Error saving global sync state", e);
  }
};

export const fetchCloudProgress = async (uid) => {
  if (!uid) return;
  try {
    const docRef = doc(db, 'userProgress', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const cloudData = docSnap.data().syncedProblems || {};
      const cloudMeta = docSnap.data().userMeta || {};
      
      const localData = getSyncedProblems();
      const merged = { ...localData, ...cloudData };
      localStorage.setItem(getSyncKey(), JSON.stringify(merged));
      
      const localMeta = getUserMeta();
      const mergedMeta = { ...localMeta, ...cloudMeta };
      localStorage.setItem(`keetcode_meta_${uid}`, JSON.stringify(mergedMeta));
      
      window.dispatchEvent(new Event('progress-sync-updated'));
      window.dispatchEvent(new Event('user-meta-updated'));
    }
  } catch (e) {
    console.error("Error fetching cloud progress", e);
  }
};

export const syncProblemProgress = (link, isSolved) => {
  if (!link) return;
  const normalized = normalizeProblemLink(link);
  if (!normalized) return;

  const data = getSyncedProblems();
  
  if (isSolved) {
    data[normalized] = { solvedAt: new Date().toISOString() };
  } else {
    delete data[normalized];
  }
  
  saveSyncedProblems(data);
  window.dispatchEvent(new Event('progress-sync-updated'));
};

export const isProblemGloballySolved = (linkOrTitle, name) => {
  const data = getSyncedProblems();

  if (linkOrTitle) {
    const normalized = normalizeProblemLink(linkOrTitle);
    if (normalized && data[normalized]) return true;

    if (normalized && !normalized.startsWith('leetcode-') && !normalized.includes('.')) {
      const slug = slugify(normalized);
      if (slug && data[`leetcode-${slug}`]) return true;
    }
  }

  if (name) {
    const nameSlug = `leetcode-${slugify(name)}`;
    if (data[nameSlug]) return true;
  }

  return false;
};

export const extractLeetCodeUsername = (input) => {
  if (!input) return '';
  let str = input.trim();
  str = str.split('?')[0].replace(/\/$/, '');
  
  if (str.includes('leetcode.com/u/')) {
    const parts = str.split('leetcode.com/u/');
    if (parts[1]) return parts[1].split('/')[0].trim();
  } else if (str.includes('leetcode.com/')) {
    const parts = str.split('leetcode.com/');
    if (parts[1]) return parts[1].split('/')[0].trim();
  }
  
  if (str.startsWith('@')) {
    return str.slice(1).trim();
  }
  
  return str;
};

export const fetchAndSyncLeetCode = async (input) => {
  const cleanUsername = extractLeetCodeUsername(input);
  if (!cleanUsername) {
    return { success: false, error: 'Please provide a valid LeetCode profile URL or username' };
  }
  
  let fetchedSubmissions = [];
  let fetchError = null;
  let leetcodeStats = null;
  let leetcodeCalendar = null;
  let leetcodeSkillStats = null;

  // 1. Fetch Official LeetCode Profile Stats (totalSolved, easySolved, mediumSolved, hardSolved)
  try {
    const statsRes = await fetch(`https://alfa-leetcode-api.onrender.com/${cleanUsername}/solved`);
    if (statsRes.ok) {
      const statsData = await statsRes.json();
      if (statsData && typeof statsData.solvedProblem === 'number') {
        leetcodeStats = {
          totalSolved: statsData.solvedProblem,
          easySolved: statsData.easySolved || 0,
          mediumSolved: statsData.mediumSolved || 0,
          hardSolved: statsData.hardSolved || 0
        };
      }
    }
  } catch (e) {
    console.warn("Alfa API profile stats fetch failed", e);
  }

  // 2. Fetch User Calendar & Streak (streak: 18, totalActiveDays: 54, submissionCalendar)
  try {
    const calRes = await fetch(`https://alfa-leetcode-api.onrender.com/${cleanUsername}/calendar`);
    if (calRes.ok) {
      const calData = await calRes.json();
      if (calData) {
        let parsedSubmissionsMap = {};
        if (calData.submissionCalendar) {
          try {
            const rawMap = typeof calData.submissionCalendar === 'string' ? JSON.parse(calData.submissionCalendar) : calData.submissionCalendar;
            Object.entries(rawMap).forEach(([ts, count]) => {
              const dateStr = new Date(Number(ts) * 1000).toISOString().split('T')[0];
              parsedSubmissionsMap[dateStr] = (parsedSubmissionsMap[dateStr] || 0) + Number(count);
            });
          } catch(e) { console.error("Error parsing submissionCalendar JSON", e); }
        }
        leetcodeCalendar = {
          activeYears: calData.activeYears || [new Date().getFullYear()],
          streak: calData.streak || 0,
          maxStreak: calData.streak || 0,
          totalActiveDays: calData.totalActiveDays || 0,
          dateCounts: parsedSubmissionsMap
        };
      }
    }
  } catch (e) {
    console.warn("Alfa API calendar fetch failed", e);
  }

  // 3. Fetch Skill Stats (Topic Breakdown for all 151 solved problems: Array: 113, Math: 47, Sorting: 37, etc.)
  try {
    const skillRes = await fetch(`https://alfa-leetcode-api.onrender.com/skillStats/${cleanUsername}`);
    if (skillRes.ok) {
      const skillData = await skillRes.json();
      const tags = skillData?.matchedUser?.tagProblemCounts;
      if (tags) {
        const topicMap = {};
        ['fundamental', 'intermediate', 'advanced'].forEach(level => {
          if (Array.isArray(tags[level])) {
            tags[level].forEach(t => {
              if (t.tagName && typeof t.problemsSolved === 'number') {
                topicMap[t.tagName] = t.problemsSolved;
              }
            });
          }
        });
        leetcodeSkillStats = topicMap;
      }
    }
  } catch(e) {
    console.warn("LeetCode skillStats fetch failed", e);
  }

  // 4. Fetch Recent Accepted Submissions Slugs
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(`https://alfa-leetcode-api.onrender.com/${cleanUsername}/acSubmission?limit=1000`, {
      signal: controller.signal
    });
    clearTimeout(timer);
    if (res.ok) {
      const json = await res.json();
      if (json && Array.isArray(json.submission)) {
        fetchedSubmissions = json.submission;
      }
    }
  } catch (e) {
    console.error("Alfa LeetCode API acSubmissions error", e);
    fetchError = e;
  }

  let synced = getSyncedProblems();
  let newlyAddedCount = 0;
  
  fetchedSubmissions.forEach(sub => {
    const slug = sub.titleSlug || sub.slug;
    if (slug) {
      const normalized = `leetcode-${slug.toLowerCase().trim()}`;
      if (!synced[normalized]) {
        const timestamp = sub.timestamp ? new Date(Number(sub.timestamp) * 1000).toISOString() : new Date().toISOString();
        synced[normalized] = { solvedAt: timestamp, source: 'leetcode' };
        newlyAddedCount++;
      }
    }
  });
  
  saveSyncedProblems(synced);
  
  const metaUpdate = { leetcodeUsername: cleanUsername, lastLcSyncedAt: new Date().toISOString() };
  if (leetcodeStats) metaUpdate.leetcodeStats = leetcodeStats;
  if (leetcodeCalendar) metaUpdate.leetcodeCalendar = leetcodeCalendar;
  if (leetcodeSkillStats) metaUpdate.leetcodeSkillStats = leetcodeSkillStats;
  
  saveUserMeta(metaUpdate);
  
  window.dispatchEvent(new Event('progress-sync-updated'));
  window.dispatchEvent(new Event('user-meta-updated'));
  
  const totalCount = leetcodeStats?.totalSolved || fetchedSubmissions.length;
  
  return {
    success: true,
    totalFetched: totalCount,
    newlyAdded: newlyAddedCount,
    message: `Synced @${cleanUsername}! Streak: ${leetcodeCalendar?.streak || 0} days, Solved: ${totalCount} problems.`
  };
};

export const resetCurrentUserData = () => {
  const uid = auth.currentUser?.uid || 'guest';
  localStorage.removeItem(getSyncKey());
  localStorage.removeItem(`keetcode_notes_${uid}`);
  localStorage.removeItem(`keetcode_meta_${uid}`);
  
  if (auth.currentUser) {
    setDoc(doc(db, 'userProgress', auth.currentUser.uid), {
      syncedProblems: {},
      userMeta: {}
    }).catch(err => console.error("Cloud clear failed", err));
  }
  
  window.dispatchEvent(new Event('progress-sync-updated'));
  window.dispatchEvent(new Event('user-meta-updated'));
};
