import React, { useState, useEffect } from 'react'
import { Search, ChevronRight, Building2, ArrowLeft, ExternalLink, Flame, Star, StickyNote, X, FileText, CheckCircle2, Save, Plus, Shield, Maximize2, Minimize2 } from 'lucide-react'
import { companyProblemsData } from '../data/companyProblemsData.js'
import { syncProblemProgress, isProblemGloballySolved } from '../utils/progressSync.js'
import { auth } from '../utils/firebase'
import Footer from './Footer'

export default function CompanySheet({ user, navigateTo, initialCompany }) {
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [loginPromptCompany, setLoginPromptCompany] = useState(null)

  useEffect(() => {
    if (initialCompany) {
      const isLoggedIn = user?.isLoggedIn || !!auth.currentUser
      const match = companyProblemsData.find(c => 
        c.name.toLowerCase() === initialCompany.toLowerCase() || 
        c.id.toLowerCase() === initialCompany.toLowerCase()
      )
      if (match) {
        if (!isLoggedIn) {
          setLoginPromptCompany(match.name)
        } else {
          setSelectedCompany(match)
        }
      }
    }
  }, [initialCompany, user])

  const handleCompanyClick = (company) => {
    const isLoggedIn = user?.isLoggedIn || !!auth.currentUser
    if (!isLoggedIn) {
      setLoginPromptCompany(company.name)
    } else {
      setSelectedCompany(company)
      window.scrollTo(0, 0)
    }
  }

  const [revisionProblemIds, setRevisionProblemIds] = useState([])
  const [, setSyncRenderTrigger] = useState(0)

  useEffect(() => {
    const handleSync = () => setSyncRenderTrigger(prev => prev + 1)
    window.addEventListener('progress-sync-updated', handleSync)
    return () => window.removeEventListener('progress-sync-updated', handleSync)
  }, [])
  const [problemNotes, setProblemNotes] = useState(() => {
    try {
      const uid = auth.currentUser?.uid || 'guest';
      const saved = localStorage.getItem(`keetcode_notes_${uid}`);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    try {
      const uid = auth.currentUser?.uid || 'guest';
      localStorage.setItem(`keetcode_notes_${uid}`, JSON.stringify(problemNotes));
    } catch (e) {
      console.error(e);
    }
  }, [problemNotes]);
  const [expandedNoteProblemId, setExpandedNoteProblemId] = useState(null)
  const [maximizedNoteProblemId, setMaximizedNoteProblemId] = useState(null)
  const [inlineNoteInput, setInlineNoteInput] = useState('')

  const filteredCompanies = companyProblemsData.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleBack = () => {
    setSelectedCompany(null)
    window.scrollTo(0,0)
  }

  const handleProblemClick = (link) => {
    window.open(link, '_blank')
  }

  const toggleSolved = (title) => {
    const currentlySolved = isProblemGloballySolved(title)
    syncProblemProgress(title, !currentlySolved)
  }

  const toggleRevision = (pId) => {
    setRevisionProblemIds(prev => 
      prev.includes(pId) ? prev.filter(id => id !== pId) : [...prev, pId]
    )
  }

  const toggleInlineNote = (pId) => {
    if (expandedNoteProblemId === pId) {
      setExpandedNoteProblemId(null)
      setInlineNoteInput('')
    } else {
      setExpandedNoteProblemId(pId)
      setInlineNoteInput(problemNotes[pId] || '')
    }
  }

  const saveInlineNote = (pId) => {
    setProblemNotes(prev => ({
      ...prev,
      [pId]: inlineNoteInput
    }))
    setExpandedNoteProblemId(null)
  }

  return (
    <div className="page-animate">
      <main className="container">
        {!selectedCompany ? (
          <>
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2><Building2 className="inline-icon" /> Company Wise Sheet</h2>
                <p>Top frequently asked problems in interviews, organized by company.</p>
              </div>
              <div style={{ 
                display: 'flex', alignItems: 'center', background: '#141011', 
                border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', 
                padding: '12px 18px', width: '380px', maxWidth: '100%',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}>
                <Search size={20} color="#94a3b8" style={{ marginRight: '12px' }} />
                <input 
                  type="text" 
                  placeholder="Search company..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ 
                    background: 'transparent', border: 'none', color: '#f8fafc', 
                    fontSize: '1.05rem', width: '100%', outline: 'none', fontFamily: 'inherit'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', marginTop: '2rem' }}>
              {filteredCompanies.map(company => (
                <div 
                  key={company.name} 
                  style={{ 
                    cursor: 'pointer', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '1rem', 
                    padding: '24px', 
                    background: '#0f0c0d',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '16px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.transform = 'none';
                  }}
                  onClick={() => handleCompanyClick(company)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div className="company-avatar flex-center" style={{ 
                      width: '42px', height: '42px', borderRadius: '10px', 
                      background: '#fff', overflow: 'hidden', position: 'relative',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                    }}>
                      <img 
                        src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${company.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com&size=128`}
                        alt={company.name}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
                      />
                    </div>
                    <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#f8fafc' }}>{company.name}</h3>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: '#94a3b8', lineHeight: 1.6, flexGrow: 1 }}>
                    Crack {company.name}'s challenging interviews with this carefully curated collection of their most commonly asked DSA questions.
                  </p>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                    <FileText size={16} /> 
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{company.problems.length} Problems</span>
                  </div>
                </div>
              ))}
            </div>
            {filteredCompanies.length === 0 && (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                No companies found.
              </div>
            )}
          </>
        ) : (
          <>
            {(() => {
              const solvedCount = selectedCompany.problems.filter(p => isProblemGloballySolved(p.link, p.title || p.name)).length;
              const totalCount = selectedCompany.problems.length;
              const progressPercent = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;
              
              return (
                <div style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <button 
                    onClick={handleBack} 
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '8px', 
                      background: 'transparent', border: 'none', color: '#94a3b8', 
                      cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600,
                      padding: '8px 0', marginBottom: '20px', transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#06b6d4'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                  >
                    <ArrowLeft size={18} /> Back to Companies
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px', width: '100%', flexWrap: 'wrap' }}>
                    <div className="company-avatar flex-center" style={{ 
                        width: '64px', height: '64px', borderRadius: '16px', 
                        background: '#fff', overflow: 'hidden',
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
                      }}>
                      <img 
                        src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${selectedCompany.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com&size=128`}
                        alt={selectedCompany.name}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                      <h1 style={{ margin: '0 0 6px 0', fontSize: '2.4rem', fontWeight: 900, color: '#f8fafc', letterSpacing: '-1px' }}>
                        {selectedCompany.name}
                      </h1>
                      <p style={{ margin: 0, color: '#94a3b8', fontSize: '1rem', fontWeight: 500 }}>
                        Collection of {totalCount} frequently asked questions
                      </p>
                    </div>
                    
                    {/* Progress Bar */}
                    <div style={{ width: '100%', maxWidth: '350px', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>Progress</span>
                        <span style={{ color: '#06b6d4', fontSize: '0.9rem', fontWeight: 'bold' }}>{solvedCount} / {totalCount} ({progressPercent}%)</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #06b6d4, #3b82f6)', borderRadius: '4px', transition: 'width 0.4s ease' }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="table-container" style={{ overflowX: 'auto', background: '#0f0c0d', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#181315', borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <th style={{ padding: '10px 14px', width: '40px', textAlign: 'center' }}>Status</th>
                    <th style={{ padding: '10px 14px' }}>Problem</th>
                    <th style={{ padding: '10px 10px', textAlign: 'left' }}>Topics</th>
                    <th style={{ padding: '10px 10px', width: '70px', textAlign: 'center' }}>Editorial</th>
                    <th style={{ padding: '10px 10px', width: '70px', textAlign: 'center' }}>Practice</th>
                    <th style={{ padding: '10px 10px', width: '50px', textAlign: 'center' }}>Note</th>
                    <th style={{ padding: '10px 10px', width: '60px', textAlign: 'center' }}>Revision</th>
                    <th style={{ padding: '10px 14px', width: '80px', textAlign: 'right' }}>Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCompany.problems.map((prob) => {
                    const uniqueId = `${selectedCompany.name}-${prob.id}`
                    const isSolved = isProblemGloballySolved(prob.link, prob.title || prob.name)
                    const isRevise = revisionProblemIds.includes(uniqueId)
                    const hasNote = Boolean(problemNotes[uniqueId])
                    const isNoteExpanded = expandedNoteProblemId === uniqueId

                    let diffColor = '#10b981'
                    let diffBg = 'rgba(16, 185, 129, 0.15)'
                    const probDiff = prob.difficulty ? prob.difficulty.toUpperCase() : 'MEDIUM'

                    if (probDiff === 'MEDIUM') {
                      diffColor = '#f59e0b'
                      diffBg = 'rgba(245, 158, 11, 0.15)'
                    } else if (probDiff === 'HARD') {
                      diffColor = '#f43f5e'
                      diffBg = 'rgba(244, 63, 94, 0.15)'
                    }

                    return (
                      <React.Fragment key={uniqueId}>
                        <tr 
                          style={{ 
                            borderBottom: isNoteExpanded ? 'none' : '1px solid rgba(255,255,255,0.03)',
                            background: isSolved ? 'rgba(16, 185, 129, 0.03)' : isNoteExpanded ? 'rgba(6, 182, 212, 0.05)' : 'transparent',
                            transition: 'background 0.2s ease'
                          }}
                        >
                          <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                            <input 
                              type="checkbox"
                              checked={isSolved}
                              onChange={() => toggleSolved(prob.link)}
                              style={{ width: '17px', height: '17px', accentColor: '#10b981', cursor: 'pointer' }}
                            />
                          </td>

                          <td style={{ padding: '12px 14px', fontWeight: 700, color: isSolved ? '#94a3b8' : '#f8fafc' }}>
                            <span style={{ textDecoration: isSolved ? 'line-through' : 'none' }}>
                              {prob.title}
                            </span>
                          </td>

                          <td style={{ padding: '12px 10px', textAlign: 'left' }}>
                            {prob.topics && prob.topics.length > 0 && (
                              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                {prob.topics.slice(0, 3).map(t => (
                                  <span key={t} style={{ fontSize: '0.7rem', background: 'var(--card-hover)', padding: '2px 6px', borderRadius: '4px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                                    {t}
                                  </span>
                                ))}
                                {prob.topics.length > 3 && (
                                  <span style={{ fontSize: '0.7rem', background: 'transparent', padding: '2px 4px', color: '#64748b' }}>
                                    +{prob.topics.length - 3}
                                  </span>
                                )}
                              </div>
                            )}
                          </td>

                          <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                            <button
                              title="No editorial yet for company sheet problems"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                background: 'rgba(255,255,255,0.02)',
                                color: '#64748b',
                                border: '1px solid rgba(255,255,255,0.05)',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                cursor: 'not-allowed'
                              }}
                            >
                              <FileText size={13} color="#64748b" />
                              <span>N/A</span>
                            </button>
                          </td>

                          <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                            <a
                              href={prob.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: '#ea580c', fontWeight: 800, fontSize: '0.82rem', textDecoration: 'none' }}
                            >
                              Solve
                            </a>
                          </td>

                          <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                            <button
                              onClick={() => toggleInlineNote(uniqueId)}
                              title={hasNote ? "View / Edit Note" : "Add Note"}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: isNoteExpanded ? '#06b6d4' : hasNote ? '#06b6d4' : '#94a3b8'
                              }}
                            >
                              {hasNote ? <StickyNote size={17} color="#06b6d4" /> : <Plus size={18} color={isNoteExpanded ? '#06b6d4' : '#cbd5e1'} />}
                            </button>
                          </td>

                          <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                            <button
                              onClick={() => toggleRevision(uniqueId)}
                              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                            >
                              <Star size={16} color={isRevise ? '#f59e0b' : '#475569'} fill={isRevise ? '#f59e0b' : 'none'} />
                            </button>
                          </td>

                          <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: diffColor, background: diffBg, padding: '4px 10px', borderRadius: '6px', textTransform: 'capitalize' }}>
                              {prob.difficulty ? prob.difficulty.toLowerCase() : 'Medium'}
                            </span>
                          </td>

                        </tr>

                              {/* BIGGER INLINE EXPANDED NOTES BOX WITH SIZE CONTROLS */}
                              {isNoteExpanded && (
                                <tr style={{ background: '#161214', borderBottom: '1px solid rgba(6, 182, 212, 0.3)' }}>
                                  <td colSpan={8} style={{ padding: '18px 24px' }}>
                                    <div style={{ background: '#0c0a0b', padding: '20px', borderRadius: '14px', border: '1px solid rgba(6, 182, 212, 0.25)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                                      
                                      {/* Header Toolbar */}
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                                        <div className="flex-center" style={{ gap: '12px', flexWrap: 'wrap' }}>
                                          <StickyNote size={18} color="#06b6d4" />
                                          <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#06b6d4' }}>
                                            Personal Study Notes for: {prob.title || prob.name}
                                          </span>

                                          {/* Size Toggle Button */}
                                          <button 
                                            onClick={() => setMaximizedNoteProblemId(maximizedNoteProblemId === uniqueId ? null : uniqueId)}
                                            style={{ background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.3)', color: '#06b6d4', padding: '4px 10px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                          >
                                            {maximizedNoteProblemId === uniqueId ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                                            <span>{maximizedNoteProblemId === uniqueId ? 'Minimize Size' : 'Expand Size'}</span>
                                          </button>
                                        </div>

                                        <button 
                                          onClick={() => setExpandedNoteProblemId(null)}
                                          style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                                        >
                                          <X size={18} />
                                        </button>
                                      </div>

                                      {/* Dynamic Height Textarea */}
                                      <textarea
                                        rows={maximizedNoteProblemId === uniqueId ? 14 : 5}
                                        placeholder="Write detailed intuition, edge cases, space/time complexity tricks, or personal code notes for this problem..."
                                        value={inlineNoteInput}
                                        onChange={(e) => setInlineNoteInput(e.target.value)}
                                        style={{
                                          width: '100%',
                                          background: '#141011',
                                          border: '1px solid rgba(255,255,255,0.12)',
                                          borderRadius: '10px',
                                          padding: '14px',
                                          color: '#fff',
                                          fontSize: '0.88rem',
                                          outline: 'none',
                                          resize: 'vertical',
                                          fontFamily: 'inherit',
                                          lineHeight: 1.5,
                                          marginBottom: '14px',
                                          transition: 'height 0.2s ease'
                                        }}
                                      />

                                      {/* FIXED ALWAYS VISIBLE SAVE FOOTER */}
                                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                        <button
                                          onClick={() => setInlineNoteInput('')}
                                          style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: 'none', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
                                        >
                                          Clear Text
                                        </button>
                                        <button 
                                          onClick={() => saveInlineNote(uniqueId)}
                                          style={{
                                            display: 'flex', alignItems: 'center', gap: '6px',
                                            background: 'linear-gradient(90deg, #06b6d4, #10b981)', color: '#000', border: 'none',
                                            padding: '8px 22px', borderRadius: '8px',
                                            fontWeight: 900, cursor: 'pointer', fontSize: '0.86rem',
                                            boxShadow: '0 4px 15px rgba(6,182,212,0.35)'
                                          }}
                                        >
                                          <Save size={15} color="#000" />
                                          <span>Save Note</span>
                                        </button>
                                      </div>

                                    </div>
                                  </td>
                                </tr>
                              )}
                      </React.Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>

      {/* SIGN IN REQUIRED MODAL FOR COMPANY SHEETS */}
      {loginPromptCompany && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '32px', borderRadius: '24px', background: '#0e111a', border: '1px solid rgba(245, 158, 11, 0.3)', boxShadow: '0 25px 60px rgba(0,0,0,0.9)', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.15)', border: '2px solid #f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <Shield size={28} color="#f59e0b" />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
              Sign In Required
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '24px' }}>
              Please sign in to access <strong style={{ color: '#06b6d4' }}>{loginPromptCompany} Interview Sheet</strong> and track your company problem solutions.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => { setLoginPromptCompany(null); navigateTo && navigateTo('auth'); }}
                style={{ padding: '10px 24px', fontWeight: 800 }}
              >
                Sign In Now
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => setLoginPromptCompany(null)}
                style={{ padding: '10px 20px' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
