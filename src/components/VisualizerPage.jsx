import React from 'react'
import { ArrowLeft, Sparkles, Clock, Eye } from 'lucide-react'

export default function VisualizerPage({ problem, onBack }) {
  const probName = problem?.name || 'Algorithm Visualizer'

  return (
    <div className="container animate-fade" style={{ paddingTop: '40px', paddingBottom: '80px', minHeight: '85vh', textAlign: 'center' }}>
      
      {/* Top Header & Back Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
        <button
          onClick={onBack}
          className="btn btn-secondary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '12px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
        >
          <ArrowLeft size={18} />
          <span>Back to Problems</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '6px 14px', borderRadius: '20px' }}>
          <Eye size={16} color="#06b6d4" />
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Live Visualizer Mode
          </span>
        </div>
      </div>

      {/* Main Coming Soon Container */}
      <div 
        className="glass-panel glow-primary" 
        style={{ 
          maxWidth: '780px', 
          margin: '0 auto', 
          padding: '60px 40px', 
          borderRadius: '28px', 
          background: 'linear-gradient(135deg, #090d16 0%, #0d1222 100%)', 
          border: '1px solid rgba(6, 182, 212, 0.35)', 
          boxShadow: '0 25px 70px rgba(0,0,0,0.85)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.15)', border: '2px solid #06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', boxShadow: '0 0 35px rgba(6, 182, 212, 0.4)' }}>
          <Clock size={40} color="#06b6d4" className="animate-pulse" />
        </div>

        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f59e0b', background: 'rgba(245, 158, 11, 0.12)', padding: '6px 16px', borderRadius: '20px', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'inline-block', marginBottom: '20px', letterSpacing: '0.5px' }}>
          ✨ FEATURE IN ACTIVE DEVELOPMENT
        </span>

        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fff', marginBottom: '14px', letterSpacing: '-0.5px' }}>
          {probName}
        </h1>

        <div style={{ margin: '24px 0', padding: '18px 24px', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '16px', color: '#38bdf8', fontSize: '1.15rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 0 25px rgba(6, 182, 212, 0.2)' }}>
          <Sparkles size={22} color="#06b6d4" />
          <span>🚀 Live Step-by-Step Pointer Animation — Coming Soon in 2 Days! 🔥</span>
        </div>

        <p style={{ color: '#94a3b8', fontSize: '0.98rem', maxWidth: '560px', margin: '16px auto 32px auto', lineHeight: 1.6 }}>
          We are building interactive 2D array animations, pointer movements, and step-by-step memory stack visualization for <b>{probName}</b>. Stay tuned!
        </p>

        <button
          onClick={onBack}
          className="btn btn-primary glow-btn"
          style={{ padding: '14px 32px', fontSize: '1rem', fontWeight: 800, borderRadius: '14px', background: 'linear-gradient(135deg, #10b981, #06b6d4)', color: '#000', border: 'none', cursor: 'pointer' }}
        >
          Return to DSA Sheets
        </button>
      </div>

    </div>
  )
}
