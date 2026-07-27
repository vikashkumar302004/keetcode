import React, { useState, useEffect } from 'react'
import { Trophy, LogIn, LogOut, Code } from 'lucide-react'
import { auth } from './utils/firebase'
import { onAuthStateChanged, signOut, getRedirectResult } from 'firebase/auth'
import { fetchCloudProgress, getUserMeta, fetchAndSyncLeetCode } from './utils/progressSync'
import Home from './components/Home'
import Courses from './components/Courses'
import Problems from './components/Problems'
import CompanySheet from './components/CompanySheet'
import Profile from './components/Profile'
import Auth from './components/Auth'
import Footer from './components/Footer'

const getSavedUserSession = () => {
  try {
    const saved = localStorage.getItem('keetcode_user_session')
    return saved ? JSON.parse(saved) : null
  } catch (e) {
    return null
  }
}

const saveUserSession = (userData) => {
  try {
    if (userData && userData.isLoggedIn) {
      localStorage.setItem('keetcode_user_session', JSON.stringify(userData))
    } else {
      localStorage.removeItem('keetcode_user_session')
    }
  } catch (e) {}
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [currentCompany, setCurrentCompany] = useState(null)
  
  const [user, setUser] = useState(() => {
    const saved = getSavedUserSession()
    if (saved && saved.isLoggedIn) return saved
    return {
      uid: null,
      name: 'Guest User',
      email: '',
      photoURL: '',
      streak: 1,
      solvedCount: 0,
      points: 10,
      isLoggedIn: false
    }
  })
  
  const [metaTrigger, setMetaTrigger] = useState(0)

  // Catch Google Redirect Result when returning from Google Auth Redirect
  useEffect(() => {
    getRedirectResult(auth).then((result) => {
      if (result && result.user) {
        const u = result.user
        const loggedInState = {
          uid: u.uid,
          name: u.displayName || 'Google User',
          email: u.email || '',
          photoURL: u.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.uid}`,
          streak: 1,
          solvedCount: 0,
          points: 10,
          isLoggedIn: true
        }
        setUser(loggedInState)
        saveUserSession(loggedInState)
      }
    }).catch(err => console.error("Google Redirect Result error:", err))
  }, [])

  // Background auto-sync LeetCode on app startup if leetcodeUsername exists
  useEffect(() => {
    const meta = getUserMeta()
    if (meta?.leetcodeUsername) {
      fetchAndSyncLeetCode(meta.leetcodeUsername).catch(err => console.error("Auto LeetCode sync error:", err))
    }
    
    const handleMetaUpdate = () => setMetaTrigger(prev => prev + 1)
    window.addEventListener('user-meta-updated', handleMetaUpdate)
    return () => window.removeEventListener('user-meta-updated', handleMetaUpdate)
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const loggedInState = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || 'Google Coder',
            email: firebaseUser.email || '',
            photoURL: firebaseUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.uid}`,
            streak: 1, 
            solvedCount: 0, 
            points: 10,
            isLoggedIn: true
          }
          setUser(loggedInState)
          saveUserSession(loggedInState)
          
          await Promise.race([
            fetchCloudProgress(firebaseUser.uid),
            new Promise(resolve => setTimeout(resolve, 3000))
          ])
        } else {
          const localSession = getSavedUserSession()
          if (localSession && localSession.isLoggedIn) {
            setUser(localSession)
          } else {
            setUser({
              uid: null,
              name: 'Guest User',
              email: '',
              photoURL: '',
              streak: 0,
              solvedCount: 0,
              points: 0,
              isLoggedIn: false
            })
          }
          window.dispatchEvent(new Event('progress-sync-updated'));
        }
      } catch (e) {
        console.error('Error during auth state change:', e)
      }
    })

    return () => unsubscribe()
  }, [])

  const getEffectiveStreak = () => {
    const meta = getUserMeta()
    if (meta.leetcodeCalendar?.streak) return meta.leetcodeCalendar.streak
    return user.streak || 1
  }

  const navigateTo = (page, company = null) => {
    let targetPage = (page === 'company-sheet' || page === 'company') ? 'companies' : page
    setCurrentPage(targetPage)
    if (company) setCurrentCompany(company)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLogin = (userData) => {
    const loggedUser = {
      uid: userData?.uid || 'user_' + Date.now(),
      name: userData?.name || 'Google Coder',
      email: userData?.email || 'user@google.com',
      photoURL: userData?.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=GoogleUser',
      streak: 1,
      solvedCount: 0,
      points: 10,
      isLoggedIn: true
    }
    setUser(loggedUser)
    saveUserSession(loggedUser)
    navigateTo('profile')
  }

  const handleLogout = async () => {
    try {
      await signOut(auth).catch(() => null)
    } catch (e) {}
    const guestState = {
      uid: null,
      name: 'Guest User',
      email: '',
      photoURL: '',
      streak: 0,
      solvedCount: 0,
      points: 0,
      isLoggedIn: false
    }
    setUser(guestState)
    saveUserSession(null)
    navigateTo('home')
  }

  return (
    <div className="app-layout">
      {/* Top Navbar */}
      <header>
        <div className="container navbar">
          <div className="logo" onClick={() => navigateTo('home')}>
            <img src="/favicon.svg" alt="KeetCode Logo" style={{ width: '28px', height: '28px', filter: 'drop-shadow(0 0 8px #06b6d4)' }} />
            <span>KeetCode</span>
          </div>

          <nav className="nav-links-wrapper">
            <ul className="nav-links">
              <li>
                <span 
                  className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                  onClick={() => navigateTo('home')}
                >
                  Home
                </span>
              </li>
              <li>
                <span 
                  className={`nav-link ${currentPage === 'courses' ? 'active' : ''}`}
                  onClick={() => navigateTo('courses')}
                >
                  Courses
                </span>
              </li>
              <li>
                <span 
                  className={`nav-link ${currentPage === 'problems' ? 'active' : ''}`}
                  onClick={() => navigateTo('problems')}
                >
                  DSA Sheets
                </span>
              </li>
              <li>
                <span 
                  className={`nav-link ${currentPage === 'companies' ? 'active' : ''}`}
                  onClick={() => navigateTo('companies')}
                >
                  Company Sheet
                </span>
              </li>
              <li>
                <span 
                  className={`nav-link ${currentPage === 'profile' ? 'active' : ''}`}
                  onClick={() => navigateTo('profile')}
                >
                  Profile
                </span>
              </li>
            </ul>
          </nav>

          <div className="nav-actions">
            {user.isLoggedIn ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div 
                  className="flex-center" 
                  style={{ 
                    gap: '6px', 
                    cursor: 'pointer',
                    background: 'rgba(245, 158, 11, 0.1)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: '1px solid rgba(245, 158, 11, 0.25)'
                  }}
                  onClick={() => navigateTo('profile')}
                >
                  <Trophy size={16} color="#f59e0b" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f59e0b' }}>
                    {getEffectiveStreak()} Day Streak
                  </span>
                </div>
                <button className="btn btn-secondary" onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={() => navigateTo('auth')}>
                <LogIn size={16} color="#000" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Pages Router */}
      <main className="main-content">
        {currentPage === 'home' && <Home navigateTo={navigateTo} onNavigate={navigateTo} />}
        {currentPage === 'courses' && <Courses navigateTo={navigateTo} onNavigate={navigateTo} />}
        {currentPage === 'problems' && <Problems user={user} navigateTo={navigateTo} />}
        {currentPage === 'companies' && <CompanySheet user={user} navigateTo={navigateTo} initialCompany={currentCompany} />}
        {currentPage === 'profile' && <Profile user={user} onUpdateUser={(updated) => {
          setUser(prev => {
            const newU = { ...prev, ...updated }
            saveUserSession(newU)
            return newU
          })
        }} />}
        {currentPage === 'auth' && <Auth onLogin={handleLogin} onSuccess={() => navigateTo('profile')} />}
      </main>

      <Footer navigateTo={navigateTo} onNavigate={navigateTo} />
    </div>
  )
}
