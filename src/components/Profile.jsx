import React, { useState, useEffect, useMemo } from 'react'
import { 
  Flame, Clock, Edit2, X, Check, Activity, Shield, MapPin, Briefcase, 
  ChevronRight, BookOpen, Target, Calendar, Code, Plus, Trash2, 
  GraduationCap, RefreshCw, Info, Award, Zap, Sparkles, ChevronDown
} from 'lucide-react'
import { 
  getSyncedProblems, normalizeProblemLink, getUserMeta, saveUserMeta, 
  resetCurrentUserData, saveSyncedProblems, fetchAndSyncLeetCode, fetchAndSyncGFG 
} from '../utils/progressSync'
import { dsaProblemsData } from '../data/dsaProblemsData.js'
import { companyProblemsData } from '../data/companyProblemsData.js'

export default function Profile({ user, onUpdateUser }) {
  const [isEditing, setIsEditing] = useState(false)
  const [syncedData, setSyncedData] = useState({})
  const [userMeta, setUserMeta] = useState({})
  const [selectedYear, setSelectedYear] = useState('Current')
  
  // Edit Form State
  const [editForm, setEditForm] = useState({
    name: '',
    avatarUrl: '',
    location: '',
    designation: '',
    school: '',
    bio: ''
  })
  
  const [showLeetCodeInput, setShowLeetCodeInput] = useState(false)
  const [lcInput, setLcInput] = useState('')
  const [isFetchingLC, setIsFetchingLC] = useState(false)

  // GeeksforGeeks Sync State
  const [showGfgInput, setShowGfgInput] = useState(false)
  const [gfgInput, setGfgInput] = useState('')
  const [isFetchingGFG, setIsFetchingGFG] = useState(false)

  const [syncMessage, setSyncMessage] = useState(null)

  // Initial Data Fetching
  const fetchAllData = () => {
    setSyncedData(getSyncedProblems())
    const meta = getUserMeta()
    setUserMeta(meta)
    setEditForm({
      name: meta.name || user?.name || '',
      avatarUrl: meta.avatarUrl || '',
      location: meta.location || '',
      designation: meta.designation || '',
      school: meta.school || '',
      bio: meta.bio || ''
    })
  }

  useEffect(() => {
    fetchAllData()
    window.addEventListener('progress-sync-updated', fetchAllData)
    window.addEventListener('user-meta-updated', fetchAllData)
    return () => {
      window.removeEventListener('progress-sync-updated', fetchAllData)
      window.removeEventListener('user-meta-updated', fetchAllData)
    }
  }, [user])

  // LeetCode auto-fetch on mount if username exists
  useEffect(() => {
    if (userMeta.leetcodeUsername && !isFetchingLC) {
      handleFetchLeetCode(userMeta.leetcodeUsername, true)
    }
  }, [userMeta.leetcodeUsername])

  const handleFetchLeetCode = async (username, silent = false) => {
    if (!username) return
    setIsFetchingLC(true)
    if (!silent) setSyncMessage(null)
    try {
      const result = await fetchAndSyncLeetCode(username)
      if (!silent) {
        if (result.success) {
          setSyncMessage({ type: 'success', text: result.message })
          setShowLeetCodeInput(false)
        } else {
          setSyncMessage({ type: 'error', text: result.error || 'Failed to fetch LeetCode submissions.' })
        }
      }
    } catch (e) {
      console.error(e)
      if (!silent) {
        setSyncMessage({ type: 'error', text: 'Network error connecting to LeetCode.' })
      }
    } finally {
      setIsFetchingLC(false)
    }
  }

  const handleFetchGFG = async (username, silent = false) => {
    if (!username) return
    setIsFetchingGFG(true)
    if (!silent) setSyncMessage(null)
    try {
      const result = await fetchAndSyncGFG(username)
      if (!silent) {
        if (result.success) {
          setSyncMessage({ type: 'success', text: result.message })
          setShowGfgInput(false)
        } else {
          setSyncMessage({ type: 'error', text: result.error || 'Failed to fetch GFG stats.' })
        }
      }
    } catch (e) {
      console.error(e)
      if (!silent) setSyncMessage({ type: 'error', text: 'Network error connecting to GeeksforGeeks.' })
    } finally {
      setIsFetchingGFG(false)
    }
  }

  // Total Problems Count per Topic Map (for Authentic Topic Percentage)
  const topicTotalProbsMap = useMemo(() => {
    const map = {}
    if (Array.isArray(dsaProblemsData)) {
      dsaProblemsData.forEach(p => {
        if (p.topic) {
          map[p.topic] = (map[p.topic] || 0) + 1
        }
      })
    }
    return map
  }, [])

  // Build a fast lookup map for Problem Metadata
  const problemMeta = useMemo(() => {
    const meta = {}
    if (Array.isArray(dsaProblemsData)) {
      dsaProblemsData.forEach(p => {
        const link = normalizeProblemLink(p.link)
        if (link) meta[link] = { difficulty: p.difficulty, topic: p.topic }
      })
    }
    if (Array.isArray(companyProblemsData)) {
      companyProblemsData.forEach(c => {
        c.problems.forEach(p => {
          const link = normalizeProblemLink(p.link)
          let topic = p.topics && p.topics.length > 0 ? p.topics[0] : null
          let diff = p.difficulty ? p.difficulty.toLowerCase() : 'easy'
          diff = diff.charAt(0).toUpperCase() + diff.slice(1)
          if (link && !meta[link]) meta[link] = { difficulty: diff, topic: topic }
        })
      })
    }
    return meta
  }, [])

  // Calculate Overall Stats
  const stats = useMemo(() => {
    let total = 0
    let easy = 0, medium = 0, hard = 0
    let topicCounts = {}
    let datesMap = {}

    Object.entries(syncedData).forEach(([link, val]) => {
      total++
      const dateObj = val.solvedAt ? new Date(val.solvedAt) : new Date()
      const dateStr = dateObj.toISOString().split('T')[0]
      datesMap[dateStr] = (datesMap[dateStr] || 0) + 1

      const meta = problemMeta[link]
      if (meta) {
        if (meta.difficulty === 'Easy') easy++
        else if (meta.difficulty === 'Medium') medium++
        else if (meta.difficulty === 'Hard') hard++
        else easy++

        if (meta.topic && meta.topic !== 'General') {
          topicCounts[meta.topic] = (topicCounts[meta.topic] || 0) + 1
        }
      }
    })

    // Merge official LeetCode profile stats if available
    const lcStats = userMeta.leetcodeStats || {}
    const finalTotal = Math.max(total, lcStats.totalSolved || 0)
    const finalEasy = Math.max(easy, lcStats.easySolved || 0)
    const finalMedium = Math.max(medium, lcStats.mediumSolved || 0)
    const finalHard = Math.max(hard, lcStats.hardSolved || 0)

    // Merge official LeetCode topic skill stats (Array: 113, Math: 47, Sorting: 37, Hash Table: 35, Two Pointers: 23, Binary Search: 19, etc.)
    const lcSkillStats = userMeta.leetcodeSkillStats || {}
    Object.entries(lcSkillStats).forEach(([tagName, count]) => {
      let normTag = tagName
      if (tagName === 'Hash Table') normTag = 'Hashmaps'
      else if (tagName === 'Arrays') normTag = 'Array'

      topicCounts[normTag] = Math.max(topicCounts[normTag] || 0, count)
    })

    const topTopics = Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)

    const activeDates = Object.keys(datesMap).sort((a, b) => new Date(b) - new Date(a))
    const totalActiveDays = userMeta.leetcodeCalendar?.totalActiveDays || activeDates.length
    const currentStreak = userMeta.leetcodeCalendar?.streak || 0
    const maxStreak = userMeta.leetcodeCalendar?.maxStreak || 0

    return { total: finalTotal, easy: finalEasy, medium: finalMedium, hard: finalHard, topTopics, totalActiveDays, currentStreak, maxStreak, datesMap }
  }, [syncedData, problemMeta, userMeta.leetcodeStats, userMeta.leetcodeCalendar, userMeta.leetcodeSkillStats])

  // Available Years for Year Selector Dropdown
  const yearOptions = useMemo(() => {
    const yearsSet = new Set(['Current', new Date().getFullYear().toString()])
    if (userMeta.leetcodeCalendar?.activeYears && Array.isArray(userMeta.leetcodeCalendar.activeYears)) {
      userMeta.leetcodeCalendar.activeYears.forEach(y => yearsSet.add(y.toString()))
    } else {
      yearsSet.add('2025')
      yearsSet.add('2024')
    }
    return Array.from(yearsSet)
  }, [userMeta.leetcodeCalendar])

  // Generate Monthly Clustered Heatmap Data (Exact LeetCode Layout)
  const heatmapData = useMemo(() => {
    const datesMap = {
      ...(stats.datesMap || {}),
      ...(userMeta.leetcodeCalendar?.dateCounts || {})
    }

    let totalSubmissionsInYear = 0
    const months = []

    if (selectedYear === 'Current') {
      const today = new Date()
      for (let i = 11; i >= 0; i--) {
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth() - i, 1)
        const monthName = firstDayOfMonth.toLocaleString('en-US', { month: 'short' })
        const year = firstDayOfMonth.getFullYear()
        const daysInMonth = new Date(year, firstDayOfMonth.getMonth() + 1, 0).getDate()

        const monthWeeks = []
        let currentWeek = []

        for (let day = 1; day <= daysInMonth; day++) {
          const dateObj = new Date(year, firstDayOfMonth.getMonth(), day)
          const dateStr = dateObj.toISOString().split('T')[0]
          const count = datesMap[dateStr] || 0
          totalSubmissionsInYear += count

          if (dateObj.getDay() === 0 && currentWeek.length > 0) {
            monthWeeks.push(currentWeek)
            currentWeek = []
          }
          currentWeek.push({
            date: dateStr,
            count,
            dayOfWeek: dateObj.getDay(),
            displayDate: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          })
        }
        if (currentWeek.length > 0) {
          monthWeeks.push(currentWeek)
        }

        months.push({ monthName, weeks: monthWeeks })
      }
    } else {
      const yr = Number(selectedYear)
      for (let m = 0; m < 12; m++) {
        const firstDayOfMonth = new Date(yr, m, 1)
        const monthName = firstDayOfMonth.toLocaleString('en-US', { month: 'short' })
        const daysInMonth = new Date(yr, m + 1, 0).getDate()

        const monthWeeks = []
        let currentWeek = []

        for (let day = 1; day <= daysInMonth; day++) {
          const dateObj = new Date(yr, m, day)
          const dateStr = dateObj.toISOString().split('T')[0]
          const count = datesMap[dateStr] || 0
          totalSubmissionsInYear += count

          if (dateObj.getDay() === 0 && currentWeek.length > 0) {
            monthWeeks.push(currentWeek)
            currentWeek = []
          }
          currentWeek.push({
            date: dateStr,
            count,
            dayOfWeek: dateObj.getDay(),
            displayDate: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          })
        }
        if (currentWeek.length > 0) {
          monthWeeks.push(currentWeek)
        }

        months.push({ monthName, weeks: monthWeeks })
      }
    }

    const activeDays = userMeta.leetcodeCalendar?.totalActiveDays || stats.totalActiveDays
    const maxStreak = userMeta.leetcodeCalendar?.maxStreak || stats.maxStreak
    const streak = userMeta.leetcodeCalendar?.streak || stats.currentStreak

    return { months, totalSubmissionsInYear, activeDays, maxStreak, streak }
  }, [stats.datesMap, userMeta.leetcodeCalendar, selectedYear, stats.totalActiveDays, stats.maxStreak, stats.currentStreak])

  const handleSaveProfile = () => {
    saveUserMeta(editForm)
    if (onUpdateUser) onUpdateUser({ name: editForm.name })
    setIsEditing(false)
  }

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset all your problem ticks and notes? This cannot be undone.")) {
      resetCurrentUserData()
      setIsEditing(false)
    }
  }

  // Determine avatar & name to display
  const displayAvatar = userMeta.avatarUrl || user?.photoURL
  const displayName = userMeta.name || user?.name || 'Guest User'
  const userInitial = displayName.trim().charAt(0).toUpperCase() || 'V'

  // Ring Percentages
  const easyPct = stats.total > 0 ? (stats.easy / stats.total) * 100 : 0
  const medPct = stats.total > 0 ? (stats.medium / stats.total) * 100 : 0
  const hardPct = stats.total > 0 ? (stats.hard / stats.total) * 100 : 0

  return (
    <div className="container animate-fade" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '28px', paddingBottom: '60px', marginTop: '24px' }}>
      
      {/* ==========================================
          LEFT SIDEBAR: USER PROFILE & LINKS
      ========================================== */}
      <div className="glass-panel" style={{ 
        padding: '30px 24px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        height: 'fit-content',
        background: 'linear-gradient(145deg, rgba(24, 20, 26, 0.95), rgba(14, 12, 14, 0.95))',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        position: 'relative'
      }}>
        
        {/* Top Action Buttons */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span> Active Coder
          </span>

          <button 
            onClick={() => setIsEditing(true)} 
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}
          >
            <Edit2 size={13} /> Edit Profile
          </button>
        </div>
        
        {/* Glowing Gradient Avatar Frame */}
        <div style={{ position: 'relative', margin: '10px 0 20px 0' }}>
          <div style={{
            width: '120px', 
            height: '120px', 
            borderRadius: '50%',
            padding: '4px',
            background: 'linear-gradient(135deg, #10b981, #06b6d4, #f59e0b)',
            boxShadow: '0 0 25px rgba(16, 185, 129, 0.3)'
          }}>
            <div className="flex-center" style={{ 
              width: '100%', 
              height: '100%', 
              borderRadius: '50%', 
              background: '#0d0b0d', 
              overflow: 'hidden', 
              fontSize: '3rem', 
              fontWeight: 800, 
              color: '#fff' 
            }}>
              {displayAvatar ? (
                <img src={displayAvatar} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                userInitial
              )}
            </div>
          </div>
          {user?.isLoggedIn && (
            <div style={{ position: 'absolute', bottom: '4px', right: '4px', background: '#10b981', border: '3px solid #0d0b0d', borderRadius: '50%', padding: '4px' }} title="Verified User">
              <Check size={12} color="#000" strokeWidth={3} />
            </div>
          )}
        </div>
        
        {/* User Info & Bio */}
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 4px 0', textAlign: 'center', letterSpacing: '-0.3px' }}>{displayName}</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          @{user?.email ? user.email.split('@')[0] : 'guest_dev'}
        </p>

        {userMeta.bio ? (
          <p style={{ fontSize: '0.84rem', color: '#cbd5e1', textAlign: 'center', marginBottom: '22px', fontStyle: 'italic', lineHeight: 1.5, background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '10px', width: '100%' }}>
            "{userMeta.bio}"
          </p>
        ) : (
          <p style={{ fontSize: '0.82rem', color: '#64748b', textAlign: 'center', marginBottom: '22px' }}>
            Building mastery in C++ DSA & Algorithms
          </p>
        )}

        {/* Profile Attributes List */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '18px', marginBottom: '22px' }}>
          {userMeta.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={15} color="#06b6d4" /> <span style={{ color: '#e2e8f0' }}>{userMeta.location}</span>
            </div>
          )}
          {userMeta.school && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GraduationCap size={15} color="#10b981" /> <span style={{ color: '#e2e8f0' }}>{userMeta.school}</span>
            </div>
          )}
          {userMeta.designation && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Briefcase size={15} color="#f59e0b" /> <span style={{ color: '#e2e8f0' }}>{userMeta.designation}</span>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={15} color="#a855f7" /> <span style={{ color: '#94a3b8' }}>Joined KeetCode 2026</span>
          </div>
        </div>

        {/* LeetCode & Platform Sync Section */}
        <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '14px', color: '#f8fafc', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            External Platform Sync
          </h4>
          
          {/* LeetCode Card */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '12px 14px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, overflow: 'hidden' }}>
                <Code size={16} color="#f59e0b" style={{ flexShrink: 0 }} />
                <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.88rem' }}>LeetCode</span>
                {userMeta.leetcodeUsername && (
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '85px' }} title={`@${userMeta.leetcodeUsername}`}>
                    (@{userMeta.leetcodeUsername})
                  </span>
                )}
              </div>

              {userMeta.leetcodeUsername ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  <Check size={15} color="#10b981" />
                  <button 
                    onClick={() => handleFetchLeetCode(userMeta.leetcodeUsername)} 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center', padding: '2px' }} 
                    title="Sync Recent Submissions"
                  >
                    <RefreshCw size={13} className={isFetchingLC ? "spin-anim" : ""} />
                  </button>
                  <button 
                    onClick={() => setShowLeetCodeInput(!showLeetCodeInput)} 
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '2px 6px', cursor: 'pointer', color: '#cbd5e1', fontSize: '0.72rem' }}
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowLeetCodeInput(!showLeetCodeInput)}
                  style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '3px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Plus size={13} /> Link Profile
                </button>
              )}
            </div>

            {showLeetCodeInput && (
              <div style={{ display: 'flex', gap: '6px', marginTop: '10px', animation: 'fadeIn 0.2s' }}>
                <input 
                  type="text" 
                  placeholder="Paste profile URL or username" 
                  value={lcInput}
                  onChange={e => setLcInput(e.target.value)}
                  style={{ flex: 1, padding: '6px 10px', background: '#0a080a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', fontSize: '0.78rem', outline: 'none' }}
                />
                <button 
                  onClick={() => handleFetchLeetCode(lcInput)}
                  disabled={isFetchingLC}
                  style={{ background: '#10b981', color: '#000', fontWeight: 800, border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem' }}
                >
                  {isFetchingLC ? '...' : 'Sync'}
                </button>
              </div>
            )}
          </div>

          {/* GeeksforGeeks (GFG) Card */}
          <div style={{ background: 'rgba(47, 158, 68, 0.05)', border: '1px solid rgba(47, 158, 68, 0.25)', borderRadius: '12px', padding: '12px 14px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, overflow: 'hidden' }}>
                <Award size={16} color="#2f9e44" style={{ flexShrink: 0 }} />
                <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.88rem' }}>GeeksforGeeks</span>
                {userMeta.gfgUsername && (
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '85px' }} title={`@${userMeta.gfgUsername}`}>
                    (@{userMeta.gfgUsername})
                  </span>
                )}
              </div>

              {userMeta.gfgUsername ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  <Check size={15} color="#10b981" />
                  <button 
                    onClick={() => handleFetchGFG(userMeta.gfgUsername)} 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center', padding: '2px' }} 
                    title="Sync GFG Stats"
                  >
                    <RefreshCw size={13} className={isFetchingGFG ? "spin-anim" : ""} />
                  </button>
                  <button 
                    onClick={() => setShowGfgInput(!showGfgInput)} 
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '2px 6px', cursor: 'pointer', color: '#cbd5e1', fontSize: '0.72rem' }}
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowGfgInput(!showGfgInput)}
                  style={{ background: 'rgba(47, 158, 68, 0.15)', color: '#2f9e44', border: '1px solid rgba(47, 158, 68, 0.3)', padding: '3px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Plus size={13} /> Link GFG Profile
                </button>
              )}
            </div>

            {showGfgInput && (
              <div style={{ display: 'flex', gap: '6px', marginTop: '10px', animation: 'fadeIn 0.2s' }}>
                <input 
                  type="text" 
                  placeholder="Paste GFG profile URL or username" 
                  value={gfgInput}
                  onChange={e => setGfgInput(e.target.value)}
                  style={{ flex: 1, padding: '6px 10px', background: '#0a080a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', fontSize: '0.78rem', outline: 'none' }}
                />
                <button 
                  onClick={() => handleFetchGFG(gfgInput)}
                  disabled={isFetchingGFG}
                  style={{ background: '#2f9e44', color: '#fff', fontWeight: 800, border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem' }}
                >
                  {isFetchingGFG ? '...' : 'Sync'}
                </button>
              </div>
            )}

            {userMeta.gfgStats && (
              <div style={{ display: 'flex', gap: '12px', marginTop: '10px', fontSize: '0.78rem', color: '#cbd5e1', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <span>Solved: <strong style={{ color: '#2f9e44' }}>{userMeta.gfgStats.totalSolved}</strong></span>
                <span>Score: <strong style={{ color: '#f59e0b' }}>{userMeta.gfgStats.codingScore}</strong></span>
                <span>Streak: <strong style={{ color: '#06b6d4' }}>{userMeta.gfgStats.streak}d</strong></span>
              </div>
            )}
          </div>

          {syncMessage && (
            <div style={{
              fontSize: '0.78rem',
              padding: '8px 10px',
              borderRadius: '6px',
              marginTop: '10px',
              background: syncMessage.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              color: syncMessage.type === 'success' ? '#10b981' : '#f87171',
              border: `1px solid ${syncMessage.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
            }}>
              {syncMessage.text}
            </div>
          )}

        </div>

      </div>

      {/* ==========================================
          RIGHT MAIN DASHBOARD
      ========================================== */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* TOP ROW: QUICK STATS & DONUT BREAKDOWN */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 220px 1fr', gap: '20px' }}>
          
          {/* Total Questions Card */}
          <div className="glass-panel" style={{ 
            padding: '24px', 
            borderRadius: '18px', 
            background: 'linear-gradient(145deg, rgba(20, 18, 22, 0.9), rgba(12, 10, 14, 0.9))',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex', 
            flexDirection: 'column', 
            justify: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '90px', height: '90px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', filter: 'blur(20px)' }}></div>
            <div style={{ color: '#94a3b8', fontSize: '0.88rem', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Solved</div>
            <div style={{ fontSize: '3.6rem', fontWeight: 900, color: '#f8fafc', lineHeight: 1, letterSpacing: '-1px' }}>{stats.total}</div>
            <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={12} /> Verified Solved
            </div>
          </div>

          {/* Total Active Days Card */}
          <div className="glass-panel" style={{ 
            padding: '24px', 
            borderRadius: '18px', 
            background: 'linear-gradient(145deg, rgba(20, 18, 22, 0.9), rgba(12, 10, 14, 0.9))',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex', 
            flexDirection: 'column', 
            justify: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '90px', height: '90px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '50%', filter: 'blur(20px)' }}></div>
            <div style={{ color: '#94a3b8', fontSize: '0.88rem', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Active Days</div>
            <div style={{ fontSize: '3.6rem', fontWeight: 900, color: '#f8fafc', lineHeight: 1, letterSpacing: '-1px' }}>{heatmapData.activeDays}</div>
            <div style={{ fontSize: '0.75rem', color: '#06b6d4', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={12} /> Active Practice
            </div>
          </div>

          {/* Problems Solved Donut & Difficulty Card */}
          <div className="glass-panel" style={{ 
            padding: '24px 28px', 
            borderRadius: '18px', 
            background: 'linear-gradient(145deg, rgba(20, 18, 22, 0.9), rgba(12, 10, 14, 0.9))',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '24px'
          }}>
            {/* SVG Ring Progress */}
            <div style={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0 }}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                <circle 
                  cx="50" cy="50" r="40" fill="none" 
                  stroke="#10b981" strokeWidth="8" 
                  strokeDasharray={`${easyPct * 2.51} 251`}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
                <circle 
                  cx="50" cy="50" r="40" fill="none" 
                  stroke="#f59e0b" strokeWidth="8" 
                  strokeDasharray={`${medPct * 2.51} 251`}
                  strokeDashoffset={`-${easyPct * 2.51}`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
                <circle 
                  cx="50" cy="50" r="40" fill="none" 
                  stroke="#f43f5e" strokeWidth="8" 
                  strokeDasharray={`${hardPct * 2.51} 251`}
                  strokeDashoffset={`-${(easyPct + medPct) * 2.51}`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{stats.total}</span>
                <span style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Solved</span>
              </div>
            </div>

            {/* Difficulty List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                <span style={{ color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span> Easy
                </span>
                <span style={{ fontWeight: 800, color: '#fff' }}>{stats.easy}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                <span style={{ color: '#f59e0b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></span> Medium
                </span>
                <span style={{ fontWeight: 800, color: '#fff' }}>{stats.medium}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                <span style={{ color: '#f43f5e', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f43f5e' }}></span> Hard
                </span>
                <span style={{ fontWeight: 800, color: '#fff' }}>{stats.hard}</span>
              </div>
            </div>

          </div>

        </div>

        {/* ==========================================
            OFFICIAL LEETCODE-STYLE HEATMAP CARD (EXACT SCREENSHOT REPLICA)
        ========================================== */}
        <div className="glass-panel" style={{ 
          padding: '24px 28px', 
          borderRadius: '16px', 
          background: '#282828', 
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 12px 36px rgba(0,0,0,0.5)'
        }}>
          {/* Heatmap Top Bar (Matching Screenshot Header) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
            
            {/* Left Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem', color: '#ccc', fontWeight: 500 }}>
              <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff' }}>
                {heatmapData.totalSubmissionsInYear > 0 ? heatmapData.totalSubmissionsInYear : stats.total}
              </span>
              <span>submissions in {selectedYear === 'Current' ? 'the past one year' : selectedYear}</span>
              <Info size={14} color="#888" style={{ cursor: 'pointer' }} title="Submission activity over the past 364 days" />
            </div>

            {/* Right Active Days, Streaks & Year Dropdown Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.88rem', color: '#aaa' }}>
              <div>
                Total active days: <strong style={{ color: '#fff', fontWeight: 700 }}>{heatmapData.activeDays}</strong>
              </div>
              <div>
                Max streak: <strong style={{ color: '#fff', fontWeight: 700 }}>{heatmapData.maxStreak}</strong>
              </div>

              {/* Current Streak Badge */}
              <div style={{ 
                background: 'rgba(16, 185, 129, 0.15)', 
                border: '1px solid rgba(16, 185, 129, 0.3)', 
                padding: '4px 12px', 
                borderRadius: '8px', 
                color: '#fff',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Flame size={14} color="#10b981" /> Streak: <strong style={{ color: '#10b981' }}>{heatmapData.streak} days</strong>
              </div>

              {/* Year Select Dropdown (Matching Screenshot [ Current ⌄ ]) */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{
                  background: '#3e3e3e',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  padding: '5px 12px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {yearOptions.map(yr => (
                  <option key={yr} value={yr} style={{ background: '#282828', color: '#fff' }}>
                    {yr === 'Current' ? 'Current' : yr}
                  </option>
                ))}
              </select>

            </div>

          </div>

          {/* Monthly Clustered Heatmap Grid & Month Labels */}
          <div style={{ overflowX: 'auto', paddingBottom: '8px' }}>
            <div style={{ minWidth: '760px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              
              {/* Monthly Clustered Cells Grid */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                {heatmapData.months.map((mBlock, mIdx) => (
                  <div key={mIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    
                    {/* Month Weeks Columns */}
                    <div style={{ display: 'flex', gap: '3px' }}>
                      {mBlock.weeks.map((week, wIdx) => (
                        <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                          {week.map((cell, cIdx) => {
                            let bgColor = '#343434' // Soft dark gray empty cell matching LeetCode screenshot
                            if (cell.count === 1) bgColor = '#005a36'
                            else if (cell.count >= 2 && cell.count < 4) bgColor = '#008d4c'
                            else if (cell.count >= 4 && cell.count < 7) bgColor = '#10b981'
                            else if (cell.count >= 7) bgColor = '#26e07f'

                            return (
                              <div 
                                key={cIdx} 
                                title={`${cell.count} submission(s) on ${cell.displayDate}`}
                                style={{
                                  width: '11px',
                                  height: '11px',
                                  borderRadius: '2.5px',
                                  backgroundColor: bgColor,
                                  transition: 'transform 0.15s ease, filter 0.15s ease',
                                  cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = 'scale(1.3)'
                                  e.currentTarget.style.filter = 'brightness(1.25)'
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'scale(1)'
                                  e.currentTarget.style.filter = 'none'
                                }}
                              />
                            )
                          })}
                        </div>
                      ))}
                    </div>

                    {/* Month Name Centered Under Month Cluster */}
                    <span style={{ fontSize: '0.78rem', color: '#888', fontWeight: 600 }}>
                      {mBlock.monthName}
                    </span>

                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM ROW: AUTHENTIC TOPIC ANALYSIS (ALL 151 SOLVED PROBLEMS) */}
        <div className="glass-panel" style={{ 
          padding: '28px', 
          borderRadius: '18px', 
          background: 'linear-gradient(145deg, rgba(20, 18, 22, 0.9), rgba(12, 10, 14, 0.9))',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '22px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} color="#06b6d4" /> Authentic DSA Skill Breakdown ({stats.total} Total Solved)
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {stats.topTopics.map(([topic, count]) => {
              const totalProbs = topicTotalProbsMap[topic] || count
              const percent = Math.min(Math.round((count / totalProbs) * 100), 100)
              return (
                <div key={topic} style={{ background: 'rgba(255,255,255,0.02)', padding: '14px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
                    <span style={{ color: '#e2e8f0', fontWeight: 700 }}>{topic}</span>
                    <span style={{ color: '#10b981', fontWeight: 800 }}>{count} Solved</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ 
                      height: '100%', 
                      width: `${percent}%`, 
                      background: 'linear-gradient(90deg, #10b981, #06b6d4)',
                      borderRadius: '4px',
                      transition: 'width 0.4s ease'
                    }} />
                  </div>
                </div>
              )
            })}

            {stats.topTopics.length === 0 && (
              <div style={{ color: '#94a3b8', textAlign: 'center', padding: '30px', gridColumn: 'span 2' }}>
                Solve DSA problems on KeetCode or sync your LeetCode profile to see authentic topic proficiency.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* EDIT MODAL */}
      {isEditing && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.82)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '460px', padding: '30px', borderRadius: '20px', maxHeight: '90vh', overflowY: 'auto', background: '#120f12', border: '1px solid rgba(255,255,255,0.12)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>Edit Profile</h3>
              <X size={20} style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => setIsEditing(false)} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '30px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '6px' }}>Display Name</label>
                <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="form-input" style={{ width: '100%', padding: '10px', background: '#0a080a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '6px' }}>Avatar Image URL</label>
                <input type="text" placeholder="https://..." value={editForm.avatarUrl} onChange={e => setEditForm({...editForm, avatarUrl: e.target.value})} className="form-input" style={{ width: '100%', padding: '10px', background: '#0a080a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '6px' }}>Location</label>
                <input type="text" placeholder="e.g., India" value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} className="form-input" style={{ width: '100%', padding: '10px', background: '#0a080a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '6px' }}>Designation / Experience</label>
                <input type="text" placeholder="e.g., Software Engineer" value={editForm.designation} onChange={e => setEditForm({...editForm, designation: e.target.value})} className="form-input" style={{ width: '100%', padding: '10px', background: '#0a080a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '6px' }}>School / College</label>
                <input type="text" placeholder="e.g., IIT Bombay" value={editForm.school} onChange={e => setEditForm({...editForm, school: e.target.value})} className="form-input" style={{ width: '100%', padding: '10px', background: '#0a080a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '6px' }}>Short Bio</label>
                <textarea rows={3} placeholder="Passionate C++ developer..." value={editForm.bio} onChange={e => setEditForm({...editForm, bio: e.target.value})} className="form-input" style={{ width: '100%', padding: '10px', background: '#0a080a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', resize: 'none' }} />
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={handleResetData} style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #ef4444', color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Reset Progress Data">
                <Trash2 size={18} />
              </button>
              <button onClick={handleSaveProfile} className="primary-btn submit-btn" style={{ flex: 1, padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', background: '#10b981', color: '#000', fontWeight: 800, border: 'none', cursor: 'pointer' }}>
                <Check size={18} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
