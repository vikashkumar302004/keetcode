import React, { useState, useEffect, useRef } from 'react'
import { 
  Terminal, Cpu, ChevronRight, Sparkles, Layers, Code2, Play, 
  Zap, Award, CheckCircle2, ArrowRight, ShieldCheck, BookOpen, Flame, Star,
  RefreshCw, Edit3, Compass, GitBranch, Eye, Box, ArrowUpRight, HelpCircle,
  PlayCircle, PauseCircle, RotateCcw, Activity, Settings, Sliders, FastForward, Check,
  Bot, UserCheck, ArrowDown, History, Shield, Monitor, MessageSquare, Cpu as CpuIcon,
  Workflow, Building2, ChevronDown, Globe, Server, Database, Smartphone
} from 'lucide-react'
import { fetchRealVisitorCount, getRealVisitorCount } from '../utils/visitorTracker.js'

export default function Home({ navigateTo, onNavigate, isLoggedIn, user }) {
  const userName = user?.name || 'Vikash Kumar'
  const handleNav = navigateTo || onNavigate

  // 100% Real Authentic Live Visitor Counter State
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

  // Hero Compiler State
  const [activePreset, setActivePreset] = useState('dsa')
  const [userCode, setUserCode] = useState('')
  const [isAutoTyping, setIsAutoTyping] = useState(true)
  const [isRunning, setIsRunning] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState(null)

  const editorScrollRef = useRef(null)

  // FAQ Accordion State
  const [openFaqIdx, setOpenFaqIdx] = useState(0)

  const faqData = [
    {
      question: "How does KeetCode help me crack Tier-1 Tech Interviews?",
      answer: "KeetCode focuses on first-principles structural coding patterns (Two Pointers, Sliding Window, Monotonic Stack) with live step-by-step pointer visualizers, System Design notes (HLD & LLD), and company-wise target sheets for Google, Meta, Amazon, and Microsoft."
    },
    {
      question: "What is included in the System Design Notes (HLD & LLD)?",
      answer: "KeetCode includes a dedicated In-App System Design Reader covering both High-Level Design (HLD) and Low-Level Design (LLD). Features include Ad Click Event Aggregation, Kafka Event Queues, Rate Limiters, Payment Systems, and Google Maps routing with interactive architecture diagrams."
    },
    {
      question: "How do the Company Wise Sheets work?",
      answer: "The Company Sheet section lets you filter problems specifically asked in interviews at top tech companies like Google, Meta, Amazon, Microsoft, Apple, and Netflix, categorized by difficulty, frequency, and pattern."
    },
    {
      question: "How does the Interactive Algorithm Visualizer work?",
      answer: "You can type custom array inputs and target sums, then hit Play to watch array pointers move step-by-step in real-time, accompanied by an execution history log terminal and complexity analysis."
    },
    {
      question: "Can I track my LeetCode problem solved streak and progress?",
      answer: "Yes! KeetCode syncs directly with your official LeetCode profile to automatically sync your solved questions, current active streak, and submission heatmap statistics."
    },
    {
      question: "Is there AI Code Assistant and Editorial support?",
      answer: "Every problem sheet includes an integrated AI Hint Assistant and comprehensive C++ editorials to help you break down complex edge cases and optimize time/space complexity."
    },
    {
      question: "Are the C++ Language notes and RAM memory diagrams free?",
      answer: "Yes! KeetCode provides a complete C++ language curriculum covering memory layout, pointers, STL containers, OOPs, and escape sequences with interactive code snippet copying."
    }
  ]

  // Company Brand Marquee List with Authentic Vector SVGs
  const companyList = [
    { name: 'Google', color: '#4285F4' },
    { name: 'Meta', color: '#0668E1' },
    { name: 'Amazon', color: '#FF9900' },
    { name: 'Microsoft', color: '#00A4EF' },
    { name: 'Netflix', color: '#E50914' },
    { name: 'Apple', color: '#FFFFFF' },
    { name: 'Uber', color: '#10B981' },
    { name: 'Airbnb', color: '#FF5A5F' },
    { name: 'Stripe', color: '#635BFC' }
  ]

  const renderCompanyIcon = (name) => {
    if (name === 'Google') return (
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
      </svg>
    );
    if (name === 'Meta') return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#0668E1">
        <path d="M16.48 4.84c-1.94 0-3.66 1.03-4.48 2.58-.82-1.55-2.54-2.58-4.48-2.58C4.54 4.84 2 7.38 2 10.36c0 4.19 5.07 8.84 10 12.8 4.93-3.96 10-8.61 10-12.8 0-2.98-2.54-5.52-5.52-5.52z"/>
      </svg>
    );
    if (name === 'Amazon') return (
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path fill="#FF9900" d="M13.9 11.2c-.4 0-.8.1-1.2.3-.3.2-.6.4-.8.7v-1.8h-2.1v7.2h2.2v-3.7c0-.7.2-1.2.6-1.5.4-.3.9-.4 1.4-.4.5 0 .9.2 1.2.5.3.3.4.8.4 1.4v3.7h2.2v-4c0-1.1-.3-1.9-.9-2.5-.6-.5-1.5-.9-2.6-.9z"/>
        <path fill="#FF9900" d="M1.5 19.5c5.5 2.2 11.5 2.2 17 0"/>
      </svg>
    );
    if (name === 'Microsoft') return (
      <svg width="18" height="18" viewBox="0 0 24 24">
        <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
        <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
        <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
        <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
      </svg>
    );
    if (name === 'Netflix') return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#E50914">
        <path d="M5.4 0v24h4.5V11.3L15 24h4.6V0H15v12.7L9.9 0z"/>
      </svg>
    );
    if (name === 'Apple') return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.35c.67-.82 1.13-1.97.99-3.12-.98.04-2.18.66-2.88 1.48-.63.73-1.18 1.9-1.03 3.03 1.1.08 2.24-.56 2.92-1.39z"/>
      </svg>
    );
    if (name === 'Uber') return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#10B981">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4" fill="#000"/>
      </svg>
    );
    if (name === 'Airbnb') return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF5A5F">
        <path d="M12 2L2 22h20L12 2zm0 6l4 8H8l4-8z"/>
      </svg>
    );
    if (name === 'Stripe') return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#635BFC">
        <path d="M13.9 9.6c0-.8-.7-1.3-1.9-1.3-1.6 0-3.6.6-5.1 1.5L5.4 6c1.8-1.1 4.2-1.7 6.6-1.7 4.1 0 6.8 2.1 6.8 5.6 0 5.4-7.4 5.7-7.4 8.6 0 1 .9 1.4 2.2 1.4 1.9 0 4.3-.8 6-1.8l1.6 3.9c-2.1 1.4-4.9 2.1-7.6 2.1-4.4 0-7.3-2.2-7.3-5.7 0-5.7 7.6-6 7.6-8.8z"/>
      </svg>
    );
    return <Building2 size={18} color="#06b6d4" />;
  }

  const presets = {
    dsa: {
      name: 'DSA Pattern Engine',
      code: `// KeetCode Tier-1 Interview Prep Platform
#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    string student = "${userName}";
    cout << "==============================================\\n";
    cout << "  WELCOME TO KEETCODE, " << student << "! \\n";
    cout << "==============================================\\n";
    cout << "Candidate Status: Verified (" << student << ")\\n";
    cout << "Curriculum: System Design Notes (HLD & LLD) & DSA Sheets\\n";
    cout << "Target Companies: Google, Meta, Amazon, Microsoft\\n";
    cout << "==============================================\\n";
    return 0;
}`,
      output: `==============================================
  WELCOME TO KEETCODE, ${userName}! 
==============================================
Candidate Status: Verified (${userName})
Curriculum: System Design Notes (HLD & LLD) & DSA Sheets
Target Companies: Google, Meta, Amazon, Microsoft
==============================================`
    }
  }

  // Typewriter Animation
  useEffect(() => {
    let targetText = presets[activePreset].code
    setUserCode('')
    setTerminalOutput(null)
    setIsAutoTyping(true)

    let i = 0
    const timer = setInterval(() => {
      if (i < targetText.length) {
        setUserCode(prev => prev + targetText.charAt(i))
        i++
        if (editorScrollRef.current) {
          editorScrollRef.current.scrollTop = editorScrollRef.current.scrollHeight
        }
      } else {
        setIsAutoTyping(false)
        clearInterval(timer)
      }
    }, 8)

    return () => clearInterval(timer)
  }, [activePreset])

  // Run Code Execution
  const handleRunCode = () => {
    setIsRunning(true)
    setTerminalOutput(null)
    setTimeout(() => {
      setIsRunning(false)
      setTerminalOutput(presets[activePreset] ? presets[activePreset].output : 'Program executed successfully (Exit Code 0)')
    }, 400)
  }

  // LEETCODE STYLE C++ SYNTAX COLORIZER HELPER
  const renderLeetCodeColoredCode = (codeStr) => {
    const lines = codeStr.split('\n')
    return lines.map((line, lIdx) => {
      const trimmed = line.trim()

      if (trimmed.startsWith('//')) {
        return <div key={lIdx} style={{ color: '#6A9955', fontStyle: 'italic' }}>{line}</div>
      }
      if (trimmed.startsWith('#include') || trimmed.startsWith('#define')) {
        const parts = line.split(/(#include|#define|<[^>]+>)/g)
        return (
          <div key={lIdx}>
            {parts.map((p, pIdx) => {
              if (p === '#include' || p === '#define') return <span key={pIdx} style={{ color: '#C586C0', fontWeight: 700 }}>{p}</span>
              if (p.startsWith('<') && p.endsWith('>')) return <span key={pIdx} style={{ color: '#CE9178' }}>{p}</span>
              return <span key={pIdx} style={{ color: '#d4d4d4' }}>{p}</span>
            })}
          </div>
        )
      }

      // Regex tokenization for keywords, strings, functions
      const tokens = line.split(/(\s+|"[^"]*"|[\(\)\{\}<>;,=+\-*/]|<<|>>)/g)

      return (
        <div key={lIdx}>
          {tokens.map((token, tIdx) => {
            if (!token) return null
            if (token.startsWith('"') && token.endsWith('"')) {
              return <span key={tIdx} style={{ color: '#CE9178' }}>{token}</span> // String literals
            }
            if (['int', 'void', 'bool', 'double', 'float', 'char', 'auto', 'return', 'using', 'namespace', 'string'].includes(token)) {
              return <span key={tIdx} style={{ color: '#569CD6', fontWeight: 700 }}>{token}</span> // Keywords
            }
            if (['std', 'cout', 'cin', 'endl', 'vector'].includes(token)) {
              return <span key={tIdx} style={{ color: '#4EC9B0', fontWeight: 700 }}>{token}</span> // Std Types
            }
            if (['main', 'twoSumSorted'].includes(token)) {
              return <span key={tIdx} style={{ color: '#DCDCAA', fontWeight: 700 }}>{token}</span> // Functions
            }
            if (!isNaN(token) && token.trim() !== '') {
              return <span key={tIdx} style={{ color: '#B5CEA8' }}>{token}</span> // Numbers
            }
            return <span key={tIdx} style={{ color: '#d4d4d4' }}>{token}</span>
          })}
        </div>
      )
    })
  }

  // ==========================================
  // RE-ENGINEERED ALGORITHM VISUALIZER ENGINE
  // ==========================================
  const [customInputStr, setCustomInputStr] = useState('2, 7, 11, 15')
  const [customTarget, setCustomTarget] = useState(9)
  const [visArray, setVisArray] = useState([2, 7, 11, 15])
  const [visTarget, setVisTarget] = useState(9)

  const [leftPtr, setLeftPtr] = useState(0)
  const [rightPtr, setRightPtr] = useState(3)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [speedMs, setSpeedMs] = useState(1200)
  const [stepCount, setStepCount] = useState(1)
  const [isVisFinished, setIsVisFinished] = useState(false)
  
  // Execution History Terminal Logs
  const [historyLogs, setHistoryLogs] = useState([
    '[INIT] Loaded Sorted Array: [2, 7, 11, 15] | Target = 9',
    '[STEP 1] Left=0 (Val 2), Right=3 (Val 15) | Sum = 17 (Sum > Target 9)'
  ])

  // Apply Custom Inputs
  const handleApplyCustomInput = () => {
    try {
      const parsedArr = customInputStr.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n))
      if (parsedArr.length < 2) return

      setVisArray(parsedArr)
      setVisTarget(Number(customTarget))
      setLeftPtr(0)
      setRightPtr(parsedArr.length - 1)
      setStepCount(1)
      setIsVisFinished(false)
      setIsAutoPlaying(true)
      setHistoryLogs([`[INIT] Custom Array Loaded: [${parsedArr.join(', ')}] | Target = ${customTarget}`])
    } catch (e) {
      console.error(e)
    }
  }

  // Auto-Play Interval Loop Effect
  useEffect(() => {
    if (!isAutoPlaying || isVisFinished) return

    const interval = setInterval(() => {
      if (leftPtr >= rightPtr) {
        setIsVisFinished(true)
        setHistoryLogs(prev => [...prev, '[FINISHED] Search cycle ended. Restarting loop in 3s...'])
        setTimeout(() => {
          setLeftPtr(0)
          setRightPtr(visArray.length - 1)
          setStepCount(1)
          setIsVisFinished(false)
          setHistoryLogs([`[RESTART] Two Pointers search restarted.`])
        }, 3000)
        return
      }

      let currentSum = visArray[leftPtr] + visArray[rightPtr]
      if (currentSum === visTarget) {
        setHistoryLogs(prev => [
          ...prev, 
          `[STEP ${stepCount}] 🎉 MATCH FOUND! arr[${leftPtr}] (${visArray[leftPtr]}) + arr[${rightPtr}] (${visArray[rightPtr]}) == Target ${visTarget}!`
        ])
        setIsVisFinished(true)
        setTimeout(() => {
          setLeftPtr(0)
          setRightPtr(visArray.length - 1)
          setStepCount(1)
          setIsVisFinished(false)
          setHistoryLogs([`[RESTART] Two Pointers search restarted.`])
        }, 3000)
      } else if (currentSum < visTarget) {
        setHistoryLogs(prev => [
          ...prev, 
          `[STEP ${stepCount}] Left=${leftPtr} (${visArray[leftPtr]}) + Right=${rightPtr} (${visArray[rightPtr]}) = ${currentSum} < Target ${visTarget}. Incrementing Left Pointer (left++)`
        ])
        setLeftPtr(prev => prev + 1)
        setStepCount(prev => prev + 1)
      } else {
        setHistoryLogs(prev => [
          ...prev, 
          `[STEP ${stepCount}] Left=${leftPtr} (${visArray[leftPtr]}) + Right=${rightPtr} (${visArray[rightPtr]}) = ${currentSum} > Target ${visTarget}. Decrementing Right Pointer (right--)`
        ])
        setRightPtr(prev => prev - 1)
        setStepCount(prev => prev + 1)
      }
    }, speedMs)

    return () => clearInterval(interval)
  }, [isAutoPlaying, leftPtr, rightPtr, visArray, visTarget, speedMs, isVisFinished, stepCount])

  const codeLines = userCode.split('\n')

  return (
    <div className="home-page animate-fade">

      {/* Hero Section */}
      <section className="container hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Flame size={14} color="#f59e0b" fill="#f59e0b" />
            <span>The #1 Master DSA & System Design Preparation Platform</span>
          </div>

          <h1 className="hero-title">
            Master Data Structures, Algorithms & <br />
            <span className="gradient-text-animated">System Design Preparation</span>
          </h1>

          <p className="hero-subtitle">
            The #1 Platform to Master DSA Sheets (502+ Questions), 28 System Design Chapters (HLD & LLD), Company-Wise Target Sheets (Google, Amazon, Meta), Interactive Pointer Visualizers & LeetCode Streak Sync.
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '6px 14px', borderRadius: '20px', color: '#10b981', fontSize: '0.84rem', fontWeight: 800, marginBottom: '20px' }}>
            <Globe size={15} color="#10b981" />
            <span>100% Genuine Real Visitors: <strong style={{ color: '#fff' }}>{realCount}</strong> Total Visits</span>
          </div>

          <div className="hero-actions" style={{ gap: '16px', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary glow-primary" 
              onClick={() => handleNav && handleNav('problems')}
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
                color: '#fff',
                fontWeight: 900,
                fontSize: '1rem',
                padding: '14px 28px',
                borderRadius: '12px',
                boxShadow: '0 8px 25px rgba(6, 182, 212, 0.45)',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.25s ease'
              }}
            >
              <Layers size={18} />
              Explore Pattern Sheets
              <ArrowRight size={18} />
            </button>

            <button 
              className="btn btn-secondary glow-secondary" 
              onClick={() => handleNav && handleNav('courses')}
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '10px',
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.1))',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                color: '#f59e0b',
                fontWeight: 800,
                fontSize: '0.95rem',
                padding: '14px 26px',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(245, 158, 11, 0.2)'
              }}
            >
              <Cpu size={18} color="#f59e0b" />
              Read System Design Notes (HLD & LLD)
            </button>
          </div>

          <div className="hero-trust-bar" style={{ 
            marginTop: '32px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px' 
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#cbd5e1', fontWeight: 600 }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '4px', borderRadius: '50%', display: 'flex', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <CheckCircle2 size={15} color="#10b981" />
              </div>
              <span><strong style={{ color: '#fff' }}>15+ Structural DSA Sheets</strong> with Interactive Pointer Visualizers</span>
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#cbd5e1', fontWeight: 600 }}>
              <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '4px', borderRadius: '50%', display: 'flex', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                <CheckCircle2 size={15} color="#f59e0b" />
              </div>
              <span><strong style={{ color: '#fff' }}>Complete System Design Notes (HLD & LLD)</strong> featuring Architecture Flowcharts</span>
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#cbd5e1', fontWeight: 600 }}>
              <div style={{ background: 'rgba(6, 182, 212, 0.15)', padding: '4px', borderRadius: '50%', display: 'flex', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                <CheckCircle2 size={15} color="#06b6d4" />
              </div>
              <span><strong style={{ color: '#fff' }}>Visualize Your Code Execution</strong> with Live Animations & Pointer Tracing</span>
            </div>
          </div>
        </div>

        {/* FULL-WIDTH LEETCODE STYLE HERO IDE COMPILER (NO RIGHT SIDEBAR) */}
        <div className="hero-visual">
          <div className="ide-mockup-wrapper glass-panel" style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.15)', boxShadow: '0 25px 60px rgba(0,0,0,0.85)' }}>
            
            {/* Top IDE Header Bar */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justify: 'space-between', 
              padding: '14px 24px', 
              background: 'linear-gradient(90deg, #10141e, #0c0f17)', 
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              gap: '16px',
              flexWrap: 'nowrap'
            }}>
              
              {/* Left: Authentic macOS Window Controls & File Tab */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                
                {/* Authentic macOS Window Dots */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56', boxShadow: '0 0 8px rgba(255, 95, 86, 0.5)' }} />
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e', boxShadow: '0 0 8px rgba(255, 189, 46, 0.5)' }} />
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f', boxShadow: '0 0 8px rgba(39, 201, 63, 0.5)' }} />
                </div>

                {/* File Tab Pill */}
                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  padding: '6px 16px', 
                  background: 'rgba(6, 182, 212, 0.12)', 
                  borderRadius: '10px', 
                  border: '1px solid rgba(6, 182, 212, 0.3)' 
                }}>
                  <Code2 size={15} color="#06b6d4" />
                  <span style={{ fontSize: '0.88rem', color: '#fff', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>main.cpp</span>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 6px #10b981' }} />
                </div>

              </div>

              {/* Right: READY Badge & Run Code Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', padding: '5px 14px', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  C++ 20 (GCC)
                </span>

                <button 
                  onClick={handleRunCode}
                  disabled={isRunning}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justify: 'center',
                    background: 'linear-gradient(90deg, #10b981, #06b6d4)',
                    color: '#000',
                    padding: '8px 24px',
                    borderRadius: '8px',
                    fontWeight: 900,
                    fontSize: '0.88rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 18px rgba(16, 185, 129, 0.45)',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isRunning ? <RefreshCw size={15} className="spin-icon" color="#000" /> : <Play size={15} fill="#000" color="#000" />}
                  <span>{isRunning ? 'Compiling...' : 'Run Code'}</span>
                </button>
              </div>

            </div>

            {/* FULL WIDTH CODE EDITOR PANE (LEETCODE DARK THEME & SYNTAX HIGHLIGHTING) */}
            <div className="ide-code-pane" style={{ padding: '24px', background: '#090d16', minHeight: '290px', overflowY: 'auto', maxHeight: '340px' }} ref={editorScrollRef}>
              <div style={{ display: 'flex', gap: '20px', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', lineHeight: '1.7' }}>
                
                {/* Line Numbers */}
                <div style={{ color: '#475569', textAlign: 'right', userSelect: 'none', display: 'flex', flexDirection: 'column', fontWeight: 600 }}>
                  {codeLines.map((_, idx) => (
                    <span key={idx}>{idx + 1}</span>
                  ))}
                </div>

                {/* LeetCode Styled Colored Code */}
                <div style={{ flex: 1, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {renderLeetCodeColoredCode(userCode)}
                  {isAutoTyping && <span className="typing-cursor" style={{ color: '#06b6d4', fontWeight: 800 }}>|</span>}
                </div>

              </div>
            </div>

            {/* BOTTOM TERMINAL OUTPUT DRAWER (APPEARS ONLY WHEN RUN CODE IS CLICKED) */}
            {(isRunning || terminalOutput) && (
              <div style={{ background: '#05070f', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '16px 24px', animation: 'fadeIn 0.2s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 800, color: '#10b981' }}>
                    <Terminal size={14} color="#10b981" />
                    <span>TERMINAL OUTPUT CONSOLE</span>
                  </div>

                  {terminalOutput && (
                    <div style={{ display: 'flex', gap: '14px', fontSize: '0.75rem', fontWeight: 700 }}>
                      <span style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>Exit Code: 0</span>
                      <span style={{ color: '#06b6d4', background: 'rgba(6, 182, 212, 0.12)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(6, 182, 212, 0.25)' }}>Runtime: 12ms</span>
                      <span style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.12)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(245, 158, 11, 0.25)' }}>Memory: 2.4 MB</span>
                    </div>
                  )}
                </div>

                <div style={{ background: '#090d18', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '14px 18px', fontFamily: 'var(--font-mono)', fontSize: '0.83rem', color: '#e2e8f0', minHeight: '65px' }}>
                  {isRunning ? (
                    <div style={{ color: '#06b6d4', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <RefreshCw size={14} className="spin-icon" /> Compiling and executing main.cpp...
                    </div>
                  ) : (
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#34d399', fontFamily: 'inherit' }}>
                      {terminalOutput}
                    </pre>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>

      </section>

      {/* RE-ENGINEERED ALGORITHM POINTER VISUALIZER SECTION */}
      <section className="container visualizer-section" style={{ marginTop: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '6px 16px', borderRadius: '20px', color: '#10b981', fontSize: '0.82rem', fontWeight: 800, marginBottom: '14px' }}>
            <Activity size={15} /> Interactive Pointer Visualizer Engine
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>
            Two Pointers Search Visualizer
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.98rem', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>
            Watch the Left & Right pointers move live across memory elements to solve Two Sum in O(N) linear time.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '36px', borderRadius: '24px', background: '#0a0d17', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                value={customInputStr}
                onChange={e => setCustomInputStr(e.target.value)}
                placeholder="Sorted Array e.g. 2, 7, 11, 15"
                style={{ background: '#121624', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '8px 14px', borderRadius: '8px', fontSize: '0.85rem', width: '220px' }}
              />
              <input 
                type="number" 
                value={customTarget}
                onChange={e => setCustomTarget(e.target.value)}
                placeholder="Target Sum e.g. 9"
                style={{ background: '#121624', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '8px 14px', borderRadius: '8px', fontSize: '0.85rem', width: '130px' }}
              />
              <button 
                onClick={handleApplyCustomInput}
                style={{ background: 'linear-gradient(90deg, #06b6d4, #3b82f6)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer' }}
              >
                Apply Custom Input
              </button>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button 
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                style={{ background: isAutoPlaying ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)', border: isAutoPlaying ? '1px solid #f59e0b' : '1px solid #10b981', color: isAutoPlaying ? '#f59e0b' : '#10b981', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                {isAutoPlaying ? <PauseCircle size={15} /> : <PlayCircle size={15} />}
                {isAutoPlaying ? 'Pause Search' : 'Play Search'}
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'center', margin: '40px 0' }}>
            
            {/* Visualizer Array Elements */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
              {visArray.map((val, idx) => {
                const isLeft = idx === leftPtr
                const isRight = idx === rightPtr

                return (
                  <div key={idx} style={{ position: 'relative', textAlign: 'center', transition: 'all 0.3s ease' }}>
                    {isLeft && (
                      <div style={{ position: 'absolute', top: '-38px', left: '50%', transform: 'translateX(-50%)', color: '#06b6d4', fontWeight: 900, fontSize: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span>LEFT</span>
                        <ArrowDown size={14} color="#06b6d4" />
                      </div>
                    )}

                    {isRight && (
                      <div style={{ position: 'absolute', bottom: '-38px', left: '50%', transform: 'translateX(-50%)', color: '#10b981', fontWeight: 900, fontSize: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <ArrowDown size={14} color="#10b981" style={{ transform: 'rotate(180deg)' }} />
                        <span>RIGHT</span>
                      </div>
                    )}

                    <div 
                      style={{ 
                        width: '75px', 
                        height: '75px', 
                        borderRadius: '16px', 
                        background: isLeft ? 'rgba(6,182,212,0.25)' : isRight ? 'rgba(16,185,129,0.25)' : '#121624',
                        border: isLeft ? '2px solid #06b6d4' : isRight ? '2px solid #10b981' : '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justify: 'center',
                        color: isLeft ? '#06b6d4' : isRight ? '#10b981' : '#fff',
                        boxShadow: isLeft ? '0 0 20px rgba(6,182,212,0.4)' : isRight ? '0 0 20px rgba(16,185,129,0.4)' : 'none'
                      }}
                    >
                      <span style={{ fontSize: '1.4rem', fontWeight: 800, display: 'block' }}>{val}</span>
                      <span style={{ fontSize: '0.72rem', color: isLeft ? '#06b6d4' : isRight ? '#10b981' : '#64748b', fontWeight: 700 }}>
                        Index {idx}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* History Terminal Logs */}
            <div className="vis-history-terminal" style={{ marginTop: '30px', background: '#05070d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px', marginBottom: '12px' }}>
                <History size={15} color="#38bdf8" />
                <span>EXECUTION HISTORY TERMINAL LOGS</span>
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '140px', overflowY: 'auto' }}>
                {historyLogs.map((logLine, lIdx) => (
                  <div key={lIdx} style={{ color: logLine.includes('MATCH') ? '#10b981' : logLine.includes('RESTART') ? '#f59e0b' : '#94a3b8' }}>
                    {logLine}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ULTRA-PREMIUM WHY CHOOSE US SECTION WITH HIGH-TECH GRAPHICS */}
      <section className="container why-choose-us-section" style={{ marginTop: '100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <h2 style={{ fontSize: '2.8rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', fontFamily: 'var(--font-sans)', marginBottom: '14px' }}>
            Why Choose KeetCode?
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
            Learn smarter with modern tools, guided mentors, System Design notes (HLD & LLD), company problem sheets, and real-time algorithm visualizers.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '24px' }}>
          
          {/* Card 1: Company Wise Sheets */}
          <div 
            className="why-card glass-panel" 
            onClick={() => handleNav && handleNav('companies')}
            style={{ padding: '32px', borderRadius: '24px', background: '#090d16', border: '1px solid rgba(6, 182, 212, 0.3)', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
          >
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
              Company Wise Sheets
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Target Google, Meta, Amazon, Microsoft & Apple with curated problem sheets.
            </p>

            <div className="flex-center" style={{ background: 'linear-gradient(180deg, rgba(6,182,212,0.1), rgba(0,0,0,0.4))', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: '18px', padding: '20px', height: '170px' }}>
              <div style={{ textAlign: 'center', width: '100%' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(6,182,212,0.2)', border: '2px solid #06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto', boxShadow: '0 0 25px rgba(6,182,212,0.5)' }}>
                  <Building2 size={26} color="#06b6d4" />
                </div>
                <div className="flex-center" style={{ gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#10b981', background: 'rgba(16,185,129,0.15)', padding: '4px 8px', borderRadius: '6px' }}>Google & Meta</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#06b6d4', background: 'rgba(6,182,212,0.15)', padding: '4px 8px', borderRadius: '6px' }}>Amazon & MSFT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: AI Support & Editorial */}
          <div className="why-card glass-panel" style={{ padding: '32px', borderRadius: '24px', background: '#090d16', border: '1px solid rgba(56, 189, 248, 0.3)', position: 'relative', overflow: 'hidden' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
              AI Assistant & Editorial
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Instant AI code hints, solution editorials, and automated complexity feedback.
            </p>

            <div className="flex-center" style={{ background: 'linear-gradient(180deg, rgba(56,189,248,0.1), rgba(0,0,0,0.4))', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '18px', padding: '20px', height: '170px' }}>
              <div style={{ textAlign: 'center', width: '100%' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(56,189,248,0.2)', border: '2px solid #38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto', boxShadow: '0 0 25px rgba(56,189,248,0.5)' }}>
                  <Bot size={26} color="#38bdf8" />
                </div>
                <div className="flex-center" style={{ gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', background: 'rgba(56,189,248,0.15)', padding: '4px 8px', borderRadius: '6px' }}>Instant Hints</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#8b5cf6', background: 'rgba(139,92,246,0.15)', padding: '4px 8px', borderRadius: '6px' }}>Complexity Analysis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Algorithm Visualizer */}
          <div className="why-card glass-panel" style={{ padding: '32px', borderRadius: '24px', background: '#090d16', border: '1px solid rgba(16, 185, 129, 0.3)', position: 'relative', overflow: 'hidden' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
              Algorithm Visualizer
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Dynamic pointer animations and real-time execution history terminal logs.
            </p>

            <div className="flex-center" style={{ background: 'linear-gradient(180deg, rgba(16,185,129,0.1), rgba(0,0,0,0.4))', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '18px', padding: '20px', height: '170px' }}>
              <div style={{ textAlign: 'center', width: '100%' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16,185,129,0.2)', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto', boxShadow: '0 0 25px rgba(16,185,129,0.5)' }}>
                  <Monitor size={26} color="#10b981" />
                </div>
                <div className="flex-center" style={{ gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#10b981', background: 'rgba(16,185,129,0.15)', padding: '4px 8px', borderRadius: '6px' }}>Arrow Pointers ⬇</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#06b6d4', background: 'rgba(6,182,212,0.15)', padding: '4px 8px', borderRadius: '6px' }}>History Logs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: System Design Notes (HLD & LLD) */}
          <div 
            className="why-card glass-panel" 
            onClick={() => handleNav && handleNav('courses')}
            style={{ padding: '32px', borderRadius: '24px', background: '#090d16', border: '1px solid rgba(245, 158, 11, 0.35)', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
          >
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
              System Design Notes
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Complete High-Level & Low-Level Design curriculum with visual architecture flowcharts.
            </p>

            <div className="flex-center" style={{ background: 'linear-gradient(180deg, rgba(245,158,11,0.1), rgba(0,0,0,0.4))', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '18px', padding: '20px', height: '170px' }}>
              <div style={{ textAlign: 'center', width: '100%' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(245,158,11,0.2)', border: '2px solid #f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto', boxShadow: '0 0 25px rgba(245,158,11,0.5)' }}>
                  <Cpu size={26} color="#f59e0b" />
                </div>
                <div className="flex-center" style={{ gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#f59e0b', background: 'rgba(245,158,11,0.15)', padding: '4px 8px', borderRadius: '6px' }}>HLD Architecture</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#10b981', background: 'rgba(16,185,129,0.15)', padding: '4px 8px', borderRadius: '6px' }}>LLD Diagrams</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TIER-1 TECH COMPANIES MARQUEE BANNER WITH AUTHENTIC COMPANY SVGS */}
      <section style={{ marginTop: '70px', overflow: 'hidden', padding: '32px 0', background: 'linear-gradient(90deg, #090c14, #0d111c, #090c14)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '1.2px' }}>
            Target Companies Covered in Problem Sheets (Click to open company sheet)
          </span>
        </div>

        <div className="marquee-wrapper" style={{ display: 'flex', overflow: 'hidden', userSelect: 'none' }}>
          <div className="marquee-content flex-center" style={{ display: 'flex', gap: '24px', animation: 'marquee 22s linear infinite', whiteSpace: 'nowrap' }}>
            {[...companyList, ...companyList].map((comp, cIdx) => (
              <div 
                key={cIdx} 
                onClick={() => handleNav && handleNav('companies', comp.name)}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  background: 'rgba(255,255,255,0.04)', 
                  border: `1px solid ${comp.color}50`, 
                  padding: '10px 22px', 
                  borderRadius: '12px', 
                  color: '#f8fafc', 
                  fontWeight: 800, 
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: `0 4px 14px ${comp.color}25`,
                  transition: 'transform 0.2s ease'
                }}
              >
                {renderCompanyIcon(comp.name)}
                <span style={{ color: comp.color }}>{comp.name}</span> Sheet
                <ChevronRight size={14} color="#64748b" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPANDED FREQUENTLY ASKED QUESTIONS (FAQ) SECTION */}
      <section className="container" style={{ marginTop: '90px', marginBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f59e0b', background: 'rgba(245, 158, 11, 0.12)', padding: '4px 12px', borderRadius: '6px', border: '1px solid rgba(245, 158, 11, 0.3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Questions & Answers
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fff', margin: '12px 0 8px 0', letterSpacing: '-0.5px' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Everything you need to know about preparing for Tier-1 Tech Interviews with KeetCode.
          </p>
        </div>

        <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqData.map((faq, fIdx) => (
            <div 
              key={fIdx} 
              className="glass-panel"
              style={{ 
                borderRadius: '16px', 
                background: '#090d16', 
                border: '1px solid rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
                transition: 'all 0.2s ease'
              }}
            >
              <button 
                onClick={() => setOpenFaqIdx(openFaqIdx === fIdx ? null : fIdx)}
                style={{ 
                  width: '100%', 
                  textAlign: 'left', 
                  padding: '20px 24px', 
                  background: 'none', 
                  border: 'none', 
                  color: '#fff', 
                  fontSize: '1rem', 
                  fontWeight: 700, 
                  cursor: 'pointer',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <HelpCircle size={18} color="#06b6d4" />
                  {faq.question}
                </span>
                <ChevronDown size={18} color="#94a3b8" style={{ transform: openFaqIdx === fIdx ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
              </button>

              {openFaqIdx === fIdx && (
                <div style={{ padding: '0 24px 22px 54px', color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '14px' }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
