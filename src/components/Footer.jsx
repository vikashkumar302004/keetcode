import React, { useState, useEffect } from 'react'
import { Code2, Linkedin, Mail, ArrowRight, Heart, Sparkles, Shield, FileText, Lock, X, Globe } from 'lucide-react'
import { fetchRealVisitorCount, getRealVisitorCount } from '../utils/visitorTracker.js'

export default function Footer({ navigateTo }) {
  const [activePolicyModal, setActivePolicyModal] = useState(null) // 'privacy' | 'terms' | 'cookies'
  const [realCount, setRealCount] = useState(getRealVisitorCount())

  useEffect(() => {
    fetchRealVisitorCount().then(cnt => {
      if (cnt) setRealCount(cnt)
    })

    const handleUpdate = (e) => {
      if (e.detail) setRealCount(e.detail)
    }
    window.addEventListener('visitor-count-updated', handleUpdate)
    return () => window.removeEventListener('visitor-count-updated', handleUpdate)
  }, [])

  return (
    <footer className="global-footer-wrapper glass-panel" style={{ marginTop: '100px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', background: '#050810', padding: '60px 0 30px 0' }}>
      <div className="container">
        
        {/* Top Footer Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '40px', paddingBottom: '40px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          
          {/* Column 1: Brand Info */}
          <div>
            <div className="flex-center" style={{ gap: '10px', justifyContent: 'flex-start', marginBottom: '16px' }}>
              <img src="/favicon.svg" alt="KeetCode Logo" style={{ width: '28px', height: '28px', filter: 'drop-shadow(0 0 8px #06b6d4)' }} />
              <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px', color: '#fff' }}>KeetCode</span>
            </div>
            
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '16px', maxWidth: '320px' }}>
              The premier interactive platform for Master DSA Preparation & System Design Notes (HLD & LLD).
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '5px 12px', borderRadius: '14px', color: '#06b6d4', fontSize: '0.78rem', fontWeight: 800, marginBottom: '20px' }}>
              <Globe size={13} color="#06b6d4" />
              <span>Real Live Visitors: <strong style={{ color: '#fff' }}>{realCount}</strong></span>
            </div>

            {/* Social Links: LinkedIn & Email */}
            <div className="social-links flex-center" style={{ gap: '12px', justifyContent: 'flex-start' }}>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn" 
                title="LinkedIn Profile"
                style={{ background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.3)', color: '#06b6d4', padding: '8px 14px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}
              >
                <Linkedin size={16} /> LinkedIn
              </a>

              <a 
                href="mailto:support@keetcode.com" 
                className="social-icon-btn" 
                title="Contact Support Email"
                style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', padding: '8px 14px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}
              >
                <Mail size={16} /> Contact Email
              </a>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '16px', letterSpacing: '0.5px' }}>Platform Navigation</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><button onClick={() => navigateTo && navigateTo('home')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}>Home Overview</button></li>
              <li><button onClick={() => navigateTo && navigateTo('courses')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}>System Design Notes (HLD & LLD)</button></li>
              <li><button onClick={() => navigateTo && navigateTo('problems')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}>DSA Practice Sheets</button></li>
              <li><button onClick={() => navigateTo && navigateTo('company-sheet')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}>Company Wise Sheets</button></li>
              <li><button onClick={() => navigateTo && navigateTo('profile')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}>User Progress Analytics</button></li>
            </ul>
          </div>

          {/* Column 3: Real DSA Sheets in KeetCode */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '16px', letterSpacing: '0.5px' }}>DSA Sheets</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><button onClick={() => navigateTo && navigateTo('problems')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', padding: 0, textAlign: 'left' }}>Arrays & 2D Arrays Sheet</button></li>
              <li><button onClick={() => navigateTo && navigateTo('problems')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', padding: 0, textAlign: 'left' }}>Two Pointers & Sliding Window</button></li>
              <li><button onClick={() => navigateTo && navigateTo('problems')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', padding: 0, textAlign: 'left' }}>Binary Search Sheet</button></li>
              <li><button onClick={() => navigateTo && navigateTo('problems')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', padding: 0, textAlign: 'left' }}>Stacks & Queues Sheet</button></li>
              <li><button onClick={() => navigateTo && navigateTo('problems')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', padding: 0, textAlign: 'left' }}>Binary Trees & BST Sheet</button></li>
              <li><button onClick={() => navigateTo && navigateTo('problems')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', padding: 0, textAlign: 'left' }}>Graphs & Traversals Sheet</button></li>
              <li><button onClick={() => navigateTo && navigateTo('problems')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', padding: 0, textAlign: 'left' }}>Dynamic Programming Sheet</button></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '16px', letterSpacing: '0.5px' }}>Stay Updated</h4>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '12px', lineHeight: 1.5 }}>
              Get weekly FAANG problem breakdowns and algorithm visualizations straight to your inbox.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                style={{ background: '#090d16', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 12px', borderRadius: '8px', color: '#fff', fontSize: '0.8rem', outline: 'none', flex: 1 }}
              />
              <button className="btn btn-primary" style={{ padding: '8px 12px', fontSize: '0.8rem' }}>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div style={{ paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.8rem', color: '#64748b' }}>
          <div>
            © {new Date().getFullYear()} KeetCode Platform. Built with <Heart size={12} color="#f43f5e" style={{ display: 'inline-block', verticalAlign: 'middle' }} /> for Tier-1 Tech Aspirants.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button onClick={() => setActivePolicyModal('privacy')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
              Privacy Policy
            </button>
            <button onClick={() => setActivePolicyModal('terms')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
              Terms of Service
            </button>
            <button onClick={() => setActivePolicyModal('cookies')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
              Cookie Policy
            </button>
          </div>
        </div>

      </div>

      {/* POLICY MODAL DIALOG */}
      {activePolicyModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '580px', padding: '30px', borderRadius: '20px', background: '#0e111a', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 25px 60px rgba(0,0,0,0.9)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '14px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={18} color="#06b6d4" />
                {activePolicyModal === 'privacy' && 'Privacy Policy'}
                {activePolicyModal === 'terms' && 'Terms of Service'}
                {activePolicyModal === 'cookies' && 'Cookie & Security Policy'}
              </h3>
              <button onClick={() => setActivePolicyModal(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6, maxHeight: '350px', overflowY: 'auto' }}>
              {activePolicyModal === 'privacy' && (
                <>
                  <p><strong>Privacy Policy & Data Security</strong></p>
                  <p>KeetCode values your privacy. We store your LeetCode problem submission progress, streak data, and code solution history securely in Firebase & local encrypted storage.</p>
                  <p>We never share your personal data, credentials, or interview preparation progress with third parties.</p>
                </>
              )}

              {activePolicyModal === 'terms' && (
                <>
                  <p><strong>Terms of Service</strong></p>
                  <p>By using KeetCode, you agree to access our DSA practice sheets, System Design Notes (HLD & LLD), and live C++ code compiler for educational and interview preparation purposes.</p>
                  <p>All content and visual pointer animators are property of KeetCode.</p>
                </>
              )}

              {activePolicyModal === 'cookies' && (
                <>
                  <p><strong>Cookie & Session Policy</strong></p>
                  <p>KeetCode uses essential browser localStorage and authentication cookies to maintain your login session, LeetCode sync tokens, and dark theme preferences across devices.</p>
                </>
              )}
            </div>

            <div style={{ marginTop: '24px', textAlign: 'right' }}>
              <button className="btn btn-primary" onClick={() => setActivePolicyModal(null)} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                Close & Accept
              </button>
            </div>

          </div>
        </div>
      )}
    </footer>
  )
}
