import React, { useState } from 'react'
import { ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react'
import { auth, googleProvider } from '../utils/firebase'
import { signInWithPopup, signInWithRedirect } from 'firebase/auth'

export default function Auth({ onLogin, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLoginSuccess = (userData) => {
    if (typeof onLogin === 'function') onLogin(userData)
    if (typeof onSuccess === 'function') onSuccess(userData)
  }

  // 100% REAL Google OAuth Login (Firebase Official Google Provider)
  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      handleLoginSuccess({
        uid: user.uid,
        name: user.displayName || 'Google Coder',
        email: user.email || '',
        photoURL: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`
      })
    } catch (err) {
      console.warn("Popup notice, switching to Google Redirect...", err)
      if (err.code !== 'auth/popup-closed-by-user') {
        try {
          await signInWithRedirect(auth, googleProvider)
        } catch (redirErr) {
          setError(`Google Login Error: Make sure you open https://keetcode-eight.vercel.app directly in your browser.`)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container animate-fade" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
      <div className="auth-card glass-panel glow-primary" style={{ maxWidth: '440px', width: '100%', padding: '40px', textAlign: 'center', borderRadius: '24px', background: '#0e111a', border: '1px solid rgba(6, 182, 212, 0.3)', boxShadow: '0 25px 60px rgba(0,0,0,0.85)' }}>
        
        <div className="auth-header" style={{ marginBottom: '32px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.15)', border: '2px solid #06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', boxShadow: '0 0 25px rgba(6, 182, 212, 0.4)' }}>
            <ShieldCheck size={28} color="#06b6d4" />
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', marginBottom: '8px', letterSpacing: '-0.5px' }}>Welcome to KeetCode</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.5 }}>Sign in with your real Google account to sync your streak & saved progress</p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: '10px',
            padding: '12px 14px',
            fontSize: '0.85rem',
            color: '#f43f5e',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px',
            textAlign: 'left'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <button 
            onClick={handleGoogleLogin} 
            disabled={loading}
            className="google-btn glow-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '14px',
              color: '#fff',
              fontSize: '1.05rem',
              fontWeight: 800,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: loading ? 0.7 : 1,
              boxShadow: '0 8px 25px rgba(0,0,0,0.5)'
            }}
          >
            {loading ? (
              <RefreshCw size={22} color="#06b6d4" className="animate-spin" />
            ) : (
              <img 
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                alt="Google logo" 
                style={{ width: '24px', height: '24px' }}
              />
            )}
            {loading ? 'Connecting to Google...' : 'Continue with Google'}
          </button>
        </div>

        <p style={{ marginTop: '28px', fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>
          By continuing, you agree to KeetCode's Terms of Service and Privacy Policy.
        </p>
        
      </div>
    </div>
  )
}
