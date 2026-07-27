import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { 
  Search, ChevronRight, ChevronDown, CheckCircle2, ArrowRight, ExternalLink, 
  Flame, Shuffle, RotateCcw, Filter, Check, Star, Layers, FileText, Plus, X,
  PlayCircle, Youtube, StickyNote, Eye, Save, Code, Copy, ArrowLeft, ThumbsUp, ThumbsDown, Zap,
  Maximize2, Minimize2, Eraser, PenTool, Trash2, Edit3, Square, Sparkles, Bot
} from 'lucide-react'
import { dsaProblemsData } from '../data/dsaProblemsData.js'
import { getEditorialForProblem } from '../utils/editorialGenerator.js'
import { syncProblemProgress, isProblemGloballySolved, getSyncedProblems, resetCurrentUserData } from '../utils/progressSync.js'
import { auth } from '../utils/firebase'
import VisualizerPage from './VisualizerPage.jsx'
import AIChatDrawer from './AIChatDrawer.jsx'
import Footer from './Footer'

// FULLSCREEN UNIFIED SCRATCHPAD & NOTES WORKSPACE MODAL
function FullscreenNotesModal({ problem, onClose, onSave, initialText, uid }) {
  const [textVal, setTextVal] = useState(initialText || '')
  const [activeTool, setActiveTool] = useState('pen') // 'pen', 'box', 'eraser'
  const [penColor, setPenColor] = useState('#06b6d4')
  const [penSize, setPenSize] = useState(3)

  const [isDrawing, setIsDrawing] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })

  const canvasRef = React.useRef(null)
  const snapshotRef = React.useRef(null)

  // Load existing canvas drawing image from localStorage
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    const savedDraw = localStorage.getItem(`keetcode_draw_${uid}_${problem.id}`)
    if (savedDraw) {
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0)
      }
      img.src = savedDraw
    }
  }, [problem.id, uid])

  const startDrawing = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0)) - rect.left
    const y = (e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0)) - rect.top

    setIsDrawing(true)
    setStartPos({ x, y })

    if (activeTool === 'box') {
      snapshotRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height)
    } else {
      ctx.beginPath()
      ctx.moveTo(x, y)
    }
  }

  const draw = (e) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0)) - rect.left
    const y = (e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0)) - rect.top

    if (activeTool === 'box') {
      if (snapshotRef.current) {
        ctx.putImageData(snapshotRef.current, 0, 0)
      }
      ctx.strokeStyle = penColor
      ctx.lineWidth = penSize
      ctx.strokeRect(startPos.x, startPos.y, x - startPos.x, y - startPos.y)
    } else {
      ctx.strokeStyle = activeTool === 'eraser' ? '#070912' : penColor
      ctx.lineWidth = activeTool === 'eraser' ? penSize * 5 : penSize
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    snapshotRef.current = null
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const insertCodeTemplate = () => {
    const snippet = `\n// C++ Code Snippet\n#include <iostream>\nusing namespace std;\n\n// Approach Logic\n`
    setTextVal(prev => prev + snippet)
  }

  const handleSave = () => {
    onSave(problem.id, textVal)
    const canvas = canvasRef.current
    if (canvas) {
      const dataUrl = canvas.toDataURL()
      localStorage.setItem(`keetcode_draw_${uid}_${problem.id}`, dataUrl)
    }
    onClose()
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#070912', zIndex: 99999, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Top Controls Toolbar */}
      <div style={{ background: '#0c0f1d', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Left: Title & Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)', padding: '6px 12px', borderRadius: '8px', color: '#06b6d4', fontWeight: 800, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Maximize2 size={14} /> Fullscreen Unified Scratchpad & Canvas
          </div>
          <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff' }}>{problem.name}</span>
        </div>

        {/* Center: Tools Palette (Pen, Box, Colors, Code Snippet, Eraser, Clear) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#121629', padding: '6px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Tools:</span>
          
          {/* Pen Tool */}
          <button 
            onClick={() => setActiveTool('pen')}
            style={{ background: activeTool === 'pen' ? 'rgba(6,182,212,0.25)' : 'transparent', border: activeTool === 'pen' ? '1px solid #06b6d4' : '1px solid transparent', color: activeTool === 'pen' ? '#06b6d4' : '#94a3b8', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontWeight: 800 }}
          >
            <PenTool size={13} /> Draw
          </button>

          {/* Box / Rectangle Tool */}
          <button 
            onClick={() => setActiveTool('box')}
            style={{ background: activeTool === 'box' ? 'rgba(16,185,129,0.25)' : 'transparent', border: activeTool === 'box' ? '1px solid #10b981' : '1px solid transparent', color: activeTool === 'box' ? '#10b981' : '#94a3b8', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontWeight: 800 }}
          >
            <Square size={13} /> Box Tool
          </button>

          {/* Code Snippet Button */}
          <button 
            onClick={insertCodeTemplate}
            style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: '#c084fc', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontWeight: 800 }}
          >
            <Code size={13} /> Add C++ Snippet
          </button>

          {/* Color Picker Palette */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginLeft: '6px', marginRight: '6px' }}>
            {['#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ffffff'].map(c => (
              <span 
                key={c}
                onClick={() => { setPenColor(c); if(activeTool==='eraser') setActiveTool('pen'); }}
                style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: c, border: penColor === c && activeTool !== 'eraser' ? '2px solid #fff' : '1px solid transparent', cursor: 'pointer', boxShadow: penColor === c && activeTool !== 'eraser' ? `0 0 10px ${c}` : 'none' }}
              />
            ))}
          </div>

          {/* Eraser Toggle */}
          <button 
            onClick={() => setActiveTool('eraser')}
            style={{ background: activeTool === 'eraser' ? 'rgba(239,68,68,0.25)' : 'transparent', border: activeTool === 'eraser' ? '1px solid #ef4444' : '1px solid transparent', color: activeTool === 'eraser' ? '#ef4444' : '#94a3b8', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontWeight: 700 }}
          >
            <Eraser size={13} /> Eraser
          </button>

          {/* Clear Canvas */}
          <button 
            onClick={clearCanvas}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontWeight: 700 }}
          >
            <Trash2 size={13} /> Clear Canvas
          </button>
        </div>

        {/* Right: Save & Close Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={handleSave}
            style={{ background: 'linear-gradient(90deg, #06b6d4, #10b981)', color: '#000', border: 'none', padding: '8px 22px', borderRadius: '8px', fontWeight: 900, fontSize: '0.88rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 18px rgba(6,182,212,0.45)' }}
          >
            <Save size={15} /> Save & Exit
          </button>
          <button 
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

      </div>

      {/* Main Workspace Body Split: Left Text & Code Notes, Right Interactive Canvas with Box/Pen */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '16px', background: '#070912', overflow: 'hidden' }}>
        
        {/* Left: Text & C++ Code Notes */}
        <div style={{ background: '#0b0e1a', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 800, color: '#06b6d4' }}>
              <Edit3 size={16} />
              <span>TEXT & C++ CODE NOTES</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Approach intuition & pseudocode</span>
          </div>

          <textarea 
            value={textVal}
            onChange={(e) => setTextVal(e.target.value)}
            placeholder="Type your intuition, step-by-step approach, time/space complexity analysis, or paste C++ code here..."
            style={{ flex: 1, width: '100%', background: '#070912', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', color: '#f8fafc', fontSize: '0.92rem', outline: 'none', resize: 'none', fontFamily: 'var(--font-mono)', lineHeight: 1.6 }}
          />
        </div>

        {/* Right: Excalidraw Canvas (Pen + Box Tool + Pointer Diagrams) */}
        <div style={{ background: '#0b0e1a', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', padding: '20px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 800, color: '#10b981' }}>
              <PenTool size={16} />
              <span>FREEHAND & BOX CANVAS (EXCALIDRAW STYLE)</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Drag to draw Array Boxes, Tree Nodes, or Pointers</span>
          </div>

          <div style={{ flex: 1, background: '#070912', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
            <canvas 
              ref={canvasRef}
              width={750}
              height={550}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              style={{ width: '100%', height: '100%', cursor: activeTool === 'box' ? 'crosshair' : activeTool === 'eraser' ? 'crosshair' : 'crosshair' }}
            />
          </div>
        </div>

      </div>

    </div>
  )
}

export default function Problems({ user, navigateTo }) {
  const problemsList = Array.isArray(dsaProblemsData) ? dsaProblemsData : []

  const isLoggedIn = user?.isLoggedIn || !!auth.currentUser
  const [showGuestWelcomeModal, setShowGuestWelcomeModal] = useState(!isLoggedIn)
  const [requireLoginFeature, setRequireLoginFeature] = useState(null)

  const [activeTab, setActiveTab] = useState('all') // 'all' vs 'revision'
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTopicFilter, setSelectedTopicFilter] = useState('All')
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState('All')

  // Currently opened Editorial Problem for FULL PAGE EDITORIAL READER VIEW
  const [selectedEditorialProblem, setSelectedEditorialProblem] = useState(null)
  const [isAIChatOpen, setIsAIChatOpen] = useState(false)
  
  // Currently opened Visualizer Problem for FULL PAGE VISUALIZER WORKSPACE
  const [selectedVisualizerProblem, setSelectedVisualizerProblem] = useState(null)
  
  // Currently opened Fullscreen Notes & Canvas Problem
  const [fullscreenNoteProblem, setFullscreenNoteProblem] = useState(null)
  
  // Outer Approach Accordions inside Editorial Page
  const [editorialAccordions, setEditorialAccordions] = useState({
    examples: true,
    brute: true,
    optimal: true
  })

  // Inner Sub-Accordions inside Brute Force Approach (MATCHING USER SCREENSHOT)
  const [bruteSubAccordions, setBruteSubAccordions] = useState({
    algorithm: true,
    code: true,
    complexity: true
  })

  // Inner Sub-Accordions inside Optimal Approach (MATCHING USER SCREENSHOT)
  const [optimalSubAccordions, setOptimalSubAccordions] = useState({
    algorithm: true,
    code: true,
    complexity: true
  })

  // Algorithm Language Toggle [ English | Hinglish ]
  const [bruteAlgoLang, setBruteAlgoLang] = useState('english')
  const [optimalAlgoLang, setOptimalAlgoLang] = useState('english')

  // Code Language Tabs [ C++ | Java | Python ]
  const [bruteLang, setBruteLang] = useState('cpp')
  const [optimalLang, setOptimalLang] = useState('cpp')
  const [copiedCode, setCopiedCode] = useState(false)

  // Track currently expanded inline note problem ID
  const [expandedNoteProblemId, setExpandedNoteProblemId] = useState(null)
  const [maximizedNoteProblemId, setMaximizedNoteProblemId] = useState(null)
  const [inlineNoteInput, setInlineNoteInput] = useState('')

  // Persistent notes dictionary
  const [problemNotes, setProblemNotes] = useState(() => {
    try {
      const uid = auth.currentUser?.uid || 'guest';
      const saved = localStorage.getItem(`keetcode_notes_${uid}`);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Track expanded accordion folder keys (NO AUTO OPEN BY DEFAULT)
  const [expandedAccordions, setExpandedAccordions] = useState({})

  // Track collapsed subtopic categories
  const [collapsedSubtopics, setCollapsedSubtopics] = useState({})

  const toggleSubtopic = (subName) => {
    setCollapsedSubtopics(prev => ({
      ...prev,
      [subName]: !prev[subName]
    }))
  }

  // Track solved problems in localStorage
  const [solvedProblemIds, setSolvedProblemIds] = useState(() => {
    try {
      const saved = localStorage.getItem('keetcode_solved_dsa')
      let localSolved = saved ? JSON.parse(saved) : []
      // Re-hydrate localSolved with globally solved problems on load (to ensure initial sync)
      const globalSynced = getSyncedProblems()
      return localSolved;
    } catch (e) {
      return []
    }
  })

  // Track revision problem IDs in localStorage
  const [revisionProblemIds, setRevisionProblemIds] = useState(() => {
    try {
      const saved = localStorage.getItem('keetcode_revision_dsa')
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('keetcode_solved_dsa', JSON.stringify(solvedProblemIds))
    } catch (e) {
      console.error(e)
    }
  }, [solvedProblemIds])

  useEffect(() => {
    try {
      localStorage.setItem('keetcode_revision_dsa', JSON.stringify(revisionProblemIds))
    } catch (e) {
      console.error(e)
    }
  }, [revisionProblemIds])

  useEffect(() => {
    try {
      const uid = auth.currentUser?.uid || 'guest';
      localStorage.setItem(`keetcode_notes_${uid}`, JSON.stringify(problemNotes));
    } catch (e) {
      console.error(e);
    }
  }, [problemNotes]);

  // Listen for global sync updates to re-render UI if changed elsewhere
  const [, setSyncRenderTrigger] = useState(0);
  useEffect(() => {
    const handleSync = () => {
      setSyncRenderTrigger(prev => prev + 1);
    };
    window.addEventListener('progress-sync-updated', handleSync);
    return () => window.removeEventListener('progress-sync-updated', handleSync);
  }, []);

  const toggleSolved = (pId, pLink) => {
    const globallySolved = isProblemGloballySolved(pLink);
    const locallySolved = solvedProblemIds.includes(pId);
    const currentlySolved = globallySolved || locallySolved;
    
    // Toggle global state
    if (pLink) {
      syncProblemProgress(pLink, !currentlySolved);
    }

    setSolvedProblemIds(prev => {
      // If we are unsolving, make sure it's removed from local state too
      if (currentlySolved) {
        return prev.filter(id => id !== pId);
      } else {
        return [...prev, pId];
      }
    })
  }

  const toggleRevision = (pId) => {
    setRevisionProblemIds(prev => 
      prev.includes(pId) ? prev.filter(id => id !== pId) : [...prev, pId]
    )
  }

  const toggleAccordion = (key) => {
    setExpandedAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const toggleEditorialAccordion = (key) => {
    setEditorialAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const toggleBruteSubAccordion = (key) => {
    setBruteSubAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const toggleOptimalSubAccordion = (key) => {
    setOptimalSubAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  // Toggle Inline Note Drawer for a Problem
  const toggleInlineNote = (pId) => {
    if (expandedNoteProblemId === pId) {
      setExpandedNoteProblemId(null)
      setInlineNoteInput('')
    } else {
      setExpandedNoteProblemId(pId)
      setInlineNoteInput(problemNotes[pId] || '')
    }
  }

  // Save Inline Note
  const saveInlineNote = (pId) => {
    setProblemNotes(prev => ({
      ...prev,
      [pId]: inlineNoteInput
    }))
    setExpandedNoteProblemId(null)
  }

  const copyCodeToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  // Pick Random Problem
  const handlePickRandom = () => {
    const unsolved = problemsList.filter(p => !solvedProblemIds.includes(p.id))
    const pool = unsolved.length > 0 ? unsolved : problemsList
    if (pool.length === 0) return
    const randomChoice = pool[Math.floor(Math.random() * pool.length)]
    if (randomChoice && randomChoice.link) {
      window.open(randomChoice.link, '_blank')
    }
  }

  // Group 502 problems into 18 Accordion Categories
  const accordionCategories = [
    {
      key: 'arrays',
      title: 'Solve Problems on Arrays [Easy -> Medium -> Hard]',
      filterTopics: ['Arrays', '2D Arrays']
    },
    {
      key: 'basic_maths',
      title: 'Learn the Basics [Basic Maths & Logic]',
      filterTopics: ['Basic Maths']
    },
    {
      key: 'sorting',
      title: 'Learn Important Sorting Techniques',
      filterTopics: ['Sorting']
    },
    {
      key: 'binary_search',
      title: 'Binary Search [1D, 2D Arrays, Search Space]',
      filterTopics: ['Binary Search']
    },
    {
      key: 'strings',
      title: 'Strings [Basic and Medium]',
      filterTopics: ['Strings']
    },
    {
      key: 'linked_list',
      title: 'Learn LinkedList [Single LL, Double LL, Medium, Hard Problems]',
      filterTopics: ['Linkedlist']
    },
    {
      key: 'recursion',
      title: 'Recursion & Backtracking [PatternWise]',
      filterTopics: ['Recursion', 'Backtracking']
    },
    {
      key: 'bit_manipulation',
      title: 'Bit Manipulation [Concepts & Problems]',
      filterTopics: ['Bit Manipulation']
    },
    {
      key: 'stacks_queues',
      title: 'Stacks and Queues [Learning, Pre-In-Post Fix, Monotonic]',
      filterTopics: ['Stacks', 'Queues']
    },
    {
      key: 'two_pointers',
      title: 'Sliding Window & Two Pointers Combined Problems',
      filterTopics: ['Two Pointers & Sliding Window', 'Prefix Sum']
    },
    {
      key: 'heaps',
      title: 'Heaps / Priority Queues [Learning, Medium, Hard]',
      filterTopics: ['Heaps / Priority Queues']
    },
    {
      key: 'hashmaps',
      title: 'Hashmaps & Frequency Counters',
      filterTopics: ['Hashmaps']
    },
    {
      key: 'trees',
      title: 'Binary Trees & Binary Search Trees (BST)',
      filterTopics: ['Binary Trees', 'Binary Search Trees']
    },
    {
      key: 'tries',
      title: 'Tries [Theory, Insert, Search, Problems]',
      filterTopics: ['Tries']
    },
    {
      key: 'greedy',
      title: 'Greedy Algorithms [Easy, Medium, Hard]',
      filterTopics: ['Greedy']
    },
    {
      key: 'graphs',
      title: 'Graphs [Concepts, BFS/DFS, Shortest Path, MST]',
      filterTopics: ['Graphs']
    },
    {
      key: 'dp',
      title: 'Dynamic Programming [1D, 2D, Grids, DP on Trees]',
      filterTopics: ['Dynamic Programming']
    }
  ]

  // Overall Statistics
  const isProbSolved = (p) => solvedProblemIds.includes(p.id) || isProblemGloballySolved(p.link, p.name)
  const totalProblems = problemsList.length
  const solvedTotal = problemsList.filter(p => isProbSolved(p)).length
  const overallPercent = totalProblems > 0 ? Math.round((solvedTotal / totalProblems) * 100) : 0

  const easyTotal = problemsList.filter(p => p.difficulty === 'Easy').length
  const easySolved = problemsList.filter(p => p.difficulty === 'Easy' && isProbSolved(p)).length

  const mediumTotal = problemsList.filter(p => p.difficulty === 'Medium').length
  const mediumSolved = problemsList.filter(p => p.difficulty === 'Medium' && isProbSolved(p)).length

  const hardTotal = problemsList.filter(p => p.difficulty === 'Hard').length
  const hardSolved = problemsList.filter(p => p.difficulty === 'Hard' && isProbSolved(p)).length

  // ==========================================
  // FULL PAGE EDITORIAL SOLUTION READER VIEW (MATCHING USER SCREENSHOTS)
  // ==========================================
  if (selectedEditorialProblem) {
    const ed = getEditorialForProblem(selectedEditorialProblem)

    return (
      <div className="editorial-page-view animate-fade" style={{ minHeight: '90vh', padding: '36px 0', background: '#0e0c0d', color: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          
          {/* Top Breadcrumb Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <button 
              onClick={() => setSelectedEditorialProblem(null)}
              className="flex-center"
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: '#06b6d4',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                padding: '10px 20px',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 800,
                cursor: 'pointer',
                gap: '8px'
              }}
            >
              <ArrowLeft size={18} />
              <span>Back to Master DSA Sheet</span>
            </button>

            <div className="flex-center" style={{ gap: '10px' }}>
              <button 
                onClick={() => setIsAIChatOpen(true)}
                style={{ background: 'linear-gradient(90deg, #06b6d4, #10b981)', color: '#000', border: 'none', padding: '8px 18px', borderRadius: '10px', fontWeight: 900, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 15px rgba(6,182,212,0.35)' }}
              >
                <Sparkles size={16} color="#000" />
                <span>Ask KeetAI Assistant</span>
              </button>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: ed.difficulty === 'Easy' ? '#10b981' : ed.difficulty === 'Medium' ? '#f59e0b' : '#f43f5e', background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                {ed.difficulty} • {ed.topic}
              </span>
            </div>
          </div>
          
          {/* Header Title & Rating */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.5px' }}>
                {ed.title}
              </h1>
              <div className="flex-center" style={{ gap: '14px', color: '#94a3b8' }}>
                <span className="flex-center" style={{ gap: '6px', fontSize: '0.85rem', cursor: 'pointer' }}><ThumbsUp size={16} /> 128</span>
                <span className="flex-center" style={{ gap: '6px', fontSize: '0.85rem', cursor: 'pointer' }}><ThumbsDown size={16} /> 2</span>
              </div>
            </div>

            {/* Problem Statement Block */}
            <div style={{ color: '#cbd5e1', fontSize: '0.96rem', lineHeight: 1.75, background: '#141011', padding: '20px 24px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <strong style={{ color: '#fff' }}>Problem Statement: </strong>
              {ed.problemStatement}
            </div>
          </div>

          {/* COLLAPSIBLE ACCORDION 1: EXAMPLES ˅ */}
          <div style={{ background: '#141011', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', marginBottom: '16px', overflow: 'hidden' }}>
            <div 
              onClick={() => toggleEditorialAccordion('examples')}
              style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none', background: editorialAccordions.examples ? '#1c1718' : 'transparent' }}
            >
              <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff' }}>Examples</span>
              <ChevronDown size={20} color="#94a3b8" style={{ transform: editorialAccordions.examples ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
            </div>

            {editorialAccordions.examples && (
              <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', background: '#0b090a' }}>
                {ed.examples.map((ex, idx) => (
                  <div key={idx} style={{ background: '#141011', padding: '18px 22px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: idx < ed.examples.length - 1 ? '16px' : 0, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    <div style={{ color: '#f8fafc', marginBottom: '6px' }}><strong style={{ color: '#06b6d4' }}>Input: </strong>{ex.input}</div>
                    <div style={{ color: '#10b981', fontWeight: 700, marginBottom: '8px' }}><strong style={{ color: '#06b6d4' }}>Output: </strong>{ex.output}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontFamily: 'inherit' }}><strong style={{ color: '#fff' }}>Explanation: </strong>{ex.explanation}</div>
                    {ex.note && <div style={{ color: '#f59e0b', fontSize: '0.83rem', marginTop: '6px', fontFamily: 'inherit' }}><strong>Note: </strong>{ex.note}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* COLLAPSIBLE ACCORDION 2: BRUTE FORCE APPROACH ˅ (WITH NESTED SUB-ACCORDIONS MATCHING SCREENSHOT) */}
          <div style={{ background: '#141011', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', marginBottom: '16px', overflow: 'hidden' }}>
            <div 
              onClick={() => toggleEditorialAccordion('brute')}
              style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none', background: editorialAccordions.brute ? '#1c1718' : 'transparent' }}
            >
              <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ea580c' }}>{ed.brute.title}</span>
              <ChevronDown size={20} color="#94a3b8" style={{ transform: editorialAccordions.brute ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
            </div>

            {editorialAccordions.brute && (
              <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', background: '#0b090a', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                
                {/* NESTED SUB-ACCORDION 1: Algorithm ˅ (MATCHING USER SCREENSHOT) */}
                <div style={{ background: '#120e0f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div 
                    onClick={() => toggleBruteSubAccordion('algorithm')}
                    style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none', background: bruteSubAccordions.algorithm ? '#181314' : 'transparent' }}
                  >
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>Algorithm & Pseudocode</span>
                    <ChevronDown size={18} color="#94a3b8" style={{ transform: bruteSubAccordions.algorithm ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                  </div>

                  {bruteSubAccordions.algorithm && (
                    <div style={{ padding: '18px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#080607' }}>
                      
                      {/* Language Switcher: [ English | Hinglish ] */}
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                        <button
                          onClick={() => setBruteAlgoLang('english')}
                          style={{ padding: '4px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: bruteAlgoLang === 'english' ? '#06b6d4' : 'rgba(255,255,255,0.05)', color: bruteAlgoLang === 'english' ? '#000' : '#94a3b8' }}
                        >
                          English
                        </button>
                        <button
                          onClick={() => setBruteAlgoLang('hinglish')}
                          style={{ padding: '4px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: bruteAlgoLang === 'hinglish' ? '#f59e0b' : 'rgba(255,255,255,0.05)', color: bruteAlgoLang === 'hinglish' ? '#000' : '#94a3b8' }}
                        >
                          Aasan Bhasha (Hinglish)
                        </button>
                      </div>

                      {/* Algorithm Text */}
                      <pre style={{ background: '#120f10', padding: '14px', borderRadius: '8px', color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', fontFamily: 'inherit', marginBottom: '16px' }}>
                        {ed.brute.algorithm[bruteAlgoLang]}
                      </pre>

                      {/* Pseudocode Box */}
                      {ed.brute.pseudocode && (
                        <div style={{ marginBottom: '16px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#06b6d4', display: 'block', marginBottom: '6px' }}>PSEUDOCODE INTUITION</span>
                          <pre style={{ background: '#050404', padding: '12px 16px', borderRadius: '8px', color: '#10b981', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.55, border: '1px solid rgba(16,185,129,0.2)' }}>
                            <code>{ed.brute.pseudocode}</code>
                          </pre>
                        </div>
                      )}

                      {/* Step-by-step Dry Run */}
                      <h5 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f59e0b', marginBottom: '8px' }}>🔍 Step-by-Step Dry Run Execution Table</h5>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ background: '#141011', color: '#94a3b8' }}>
                            <th style={{ padding: '8px 12px', width: '50px' }}>Step</th>
                            <th style={{ padding: '8px 12px' }}>Execution State</th>
                            <th style={{ padding: '8px 12px' }}>Action Taken</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ed.brute.dryRun.map((dr, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                              <td style={{ padding: '8px 12px', color: '#06b6d4', fontWeight: 800 }}>{dr.step}</td>
                              <td style={{ padding: '8px 12px', color: '#fff', fontFamily: 'var(--font-mono)' }}>{dr.state}</td>
                              <td style={{ padding: '8px 12px', color: '#94a3b8' }}>{dr.action}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                    </div>
                  )}
                </div>

                {/* NESTED SUB-ACCORDION 2: Code ˅ (MATCHING USER SCREENSHOT) */}
                <div style={{ background: '#120e0f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div 
                    onClick={() => toggleBruteSubAccordion('code')}
                    style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none', background: bruteSubAccordions.code ? '#181314' : 'transparent' }}
                  >
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>Code Implementation</span>
                    <ChevronDown size={18} color="#94a3b8" style={{ transform: bruteSubAccordions.code ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                  </div>

                  {bruteSubAccordions.code && (
                    <div style={{ padding: '18px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#080607' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {['cpp', 'java', 'python'].map((lang) => (
                            <button
                              key={lang}
                              onClick={() => setBruteLang(lang)}
                              style={{
                                padding: '5px 14px',
                                borderRadius: '6px',
                                fontSize: '0.78rem',
                                fontWeight: 800,
                                border: 'none',
                                cursor: 'pointer',
                                background: bruteLang === lang ? '#ea580c' : 'rgba(255,255,255,0.05)',
                                color: bruteLang === lang ? '#fff' : '#94a3b8',
                                textTransform: 'uppercase'
                              }}
                            >
                              {lang === 'cpp' ? 'C++' : lang === 'java' ? 'Java' : 'Python'}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => copyCodeToClipboard(ed.brute.code[bruteLang])}
                          style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#cbd5e1', padding: '5px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                        >
                          <Copy size={13} /> Copy Code
                        </button>
                      </div>

                      <pre style={{ background: '#050404', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '16px', color: '#38bdf8', fontFamily: 'var(--font-mono)', fontSize: '0.86rem', overflowX: 'auto', lineHeight: 1.55 }}>
                        <code>{ed.brute.code[bruteLang]}</code>
                      </pre>
                    </div>
                  )}
                </div>

                {/* NESTED SUB-ACCORDION 3: Complexity Analysis ˅ (MATCHING USER SCREENSHOT) */}
                <div style={{ background: '#120e0f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div 
                    onClick={() => toggleBruteSubAccordion('complexity')}
                    style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none', background: bruteSubAccordions.complexity ? '#181314' : 'transparent' }}
                  >
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>Complexity Analysis</span>
                    <ChevronDown size={18} color="#94a3b8" style={{ transform: bruteSubAccordions.complexity ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                  </div>

                  {bruteSubAccordions.complexity && (
                    <div style={{ padding: '18px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#080607' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div style={{ background: '#141011', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, display: 'block' }}>Time Complexity</span>
                          <span style={{ fontSize: '1rem', fontWeight: 800, color: '#ea580c', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '4px' }}>{ed.brute.timeComplexity}</span>
                          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{ed.brute.timeExplanation}</span>
                        </div>
                        <div style={{ background: '#141011', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, display: 'block' }}>Space Complexity</span>
                          <span style={{ fontSize: '1rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '4px' }}>{ed.brute.spaceComplexity}</span>
                          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{ed.brute.spaceExplanation}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>

          {/* COLLAPSIBLE ACCORDION 3: OPTIMAL APPROACH ˅ (WITH NESTED SUB-ACCORDIONS MATCHING SCREENSHOT) */}
          <div style={{ background: '#141011', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', marginBottom: '30px', overflow: 'hidden' }}>
            <div 
              onClick={() => toggleEditorialAccordion('optimal')}
              style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none', background: editorialAccordions.optimal ? '#1c1718' : 'transparent' }}
            >
              <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#06b6d4' }}>{ed.optimal.title}</span>
              <ChevronDown size={20} color="#94a3b8" style={{ transform: editorialAccordions.optimal ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
            </div>

            {editorialAccordions.optimal && (
              <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', background: '#0b090a', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                
                {/* NESTED SUB-ACCORDION 1: Algorithm ˅ */}
                <div style={{ background: '#120e0f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div 
                    onClick={() => toggleOptimalSubAccordion('algorithm')}
                    style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none', background: optimalSubAccordions.algorithm ? '#181314' : 'transparent' }}
                  >
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>Algorithm & Pseudocode</span>
                    <ChevronDown size={18} color="#94a3b8" style={{ transform: optimalSubAccordions.algorithm ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                  </div>

                  {optimalSubAccordions.algorithm && (
                    <div style={{ padding: '18px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#080607' }}>
                      
                      {/* Language Switcher: [ English | Hinglish ] */}
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                        <button
                          onClick={() => setOptimalAlgoLang('english')}
                          style={{ padding: '4px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: optimalAlgoLang === 'english' ? '#06b6d4' : 'rgba(255,255,255,0.05)', color: optimalAlgoLang === 'english' ? '#000' : '#94a3b8' }}
                        >
                          English
                        </button>
                        <button
                          onClick={() => setOptimalAlgoLang('hinglish')}
                          style={{ padding: '4px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: optimalAlgoLang === 'hinglish' ? '#f59e0b' : 'rgba(255,255,255,0.05)', color: optimalAlgoLang === 'hinglish' ? '#000' : '#94a3b8' }}
                        >
                          Aasan Bhasha (Hinglish)
                        </button>
                      </div>

                      {/* Algorithm Text */}
                      <pre style={{ background: '#120f10', padding: '14px', borderRadius: '8px', color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', fontFamily: 'inherit', marginBottom: '16px' }}>
                        {ed.optimal.algorithm[optimalAlgoLang]}
                      </pre>

                      {/* Pseudocode Box */}
                      {ed.optimal.pseudocode && (
                        <div style={{ marginBottom: '16px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#06b6d4', display: 'block', marginBottom: '6px' }}>PSEUDOCODE INTUITION</span>
                          <pre style={{ background: '#050404', padding: '12px 16px', borderRadius: '8px', color: '#10b981', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.55, border: '1px solid rgba(16,185,129,0.2)' }}>
                            <code>{ed.optimal.pseudocode}</code>
                          </pre>
                        </div>
                      )}

                      {/* Step-by-step Dry Run */}
                      <h5 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f59e0b', marginBottom: '8px' }}>🔍 Step-by-Step Dry Run Execution Table</h5>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ background: '#141011', color: '#94a3b8' }}>
                            <th style={{ padding: '8px 12px', width: '50px' }}>Step</th>
                            <th style={{ padding: '8px 12px' }}>Execution State</th>
                            <th style={{ padding: '8px 12px' }}>Action Taken</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ed.optimal.dryRun.map((dr, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                              <td style={{ padding: '8px 12px', color: '#06b6d4', fontWeight: 800 }}>{dr.step}</td>
                              <td style={{ padding: '8px 12px', color: '#fff', fontFamily: 'var(--font-mono)' }}>{dr.state}</td>
                              <td style={{ padding: '8px 12px', color: '#94a3b8' }}>{dr.action}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                    </div>
                  )}
                </div>

                {/* NESTED SUB-ACCORDION 2: Code ˅ */}
                <div style={{ background: '#120e0f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div 
                    onClick={() => toggleOptimalSubAccordion('code')}
                    style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none', background: optimalSubAccordions.code ? '#181314' : 'transparent' }}
                  >
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>Code Implementation</span>
                    <ChevronDown size={18} color="#94a3b8" style={{ transform: optimalSubAccordions.code ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                  </div>

                  {optimalSubAccordions.code && (
                    <div style={{ padding: '18px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#080607' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {['cpp', 'java', 'python'].map((lang) => (
                            <button
                              key={lang}
                              onClick={() => setOptimalLang(lang)}
                              style={{
                                padding: '5px 14px',
                                borderRadius: '6px',
                                fontSize: '0.78rem',
                                fontWeight: 800,
                                border: 'none',
                                cursor: 'pointer',
                                background: optimalLang === lang ? '#06b6d4' : 'rgba(255,255,255,0.05)',
                                color: optimalLang === lang ? '#000' : '#94a3b8',
                                textTransform: 'uppercase'
                              }}
                            >
                              {lang === 'cpp' ? 'C++' : lang === 'java' ? 'Java' : 'Python'}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => copyCodeToClipboard(ed.optimal.code[optimalLang])}
                          style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#cbd5e1', padding: '5px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                        >
                          <Copy size={13} /> Copy Code
                        </button>
                      </div>

                      <pre style={{ background: '#050404', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '16px', color: '#38bdf8', fontFamily: 'var(--font-mono)', fontSize: '0.86rem', overflowX: 'auto', lineHeight: 1.55 }}>
                        <code>{ed.optimal.code[optimalLang]}</code>
                      </pre>
                    </div>
                  )}
                </div>

                {/* NESTED SUB-ACCORDION 3: Complexity Analysis ˅ */}
                <div style={{ background: '#120e0f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div 
                    onClick={() => toggleOptimalSubAccordion('complexity')}
                    style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none', background: optimalSubAccordions.complexity ? '#181314' : 'transparent' }}
                  >
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>Complexity Analysis</span>
                    <ChevronDown size={18} color="#94a3b8" style={{ transform: optimalSubAccordions.complexity ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                  </div>

                  {optimalSubAccordions.complexity && (
                    <div style={{ padding: '18px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#080607' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div style={{ background: '#141011', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, display: 'block' }}>Time Complexity</span>
                          <span style={{ fontSize: '1rem', fontWeight: 800, color: '#06b6d4', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '4px' }}>{ed.optimal.timeComplexity}</span>
                          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{ed.optimal.timeExplanation}</span>
                        </div>
                        <div style={{ background: '#141011', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, display: 'block' }}>Space Complexity</span>
                          <span style={{ fontSize: '1rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '4px' }}>{ed.optimal.spaceComplexity}</span>
                          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{ed.optimal.spaceExplanation}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>

        {/* FLOATING KEETAI WIDGET */}
        <button
          onClick={() => setIsAIChatOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#0e1224',
            border: '1px solid #06b6d4',
            color: '#06b6d4',
            padding: '12px 20px',
            borderRadius: '30px',
            fontWeight: 900,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 10px 30px rgba(6,182,212,0.4)',
            zIndex: 99999
          }}
        >
          <Sparkles size={18} color="#06b6d4" />
          <span>KeetAI Assistant</span>
        </button>

        {/* AI CHAT ASSISTANT DRAWER */}
        <AIChatDrawer 
          isOpen={isAIChatOpen}
          onClose={() => setIsAIChatOpen(false)}
          title={ed.title}
          pageContext={`Problem: ${ed.title}\nStatement: ${ed.problemStatement}\nIntuition: ${ed.optimal?.algorithm || ''}\nOptimal C++ Code: ${ed.optimal?.cppCode || ''}`}
        />

        </div>
      </div>
    )
  }

  // ==========================================
  // FULL PAGE ALGORITHM VISUALIZER WORKSPACE
  // ==========================================
  if (selectedVisualizerProblem) {
    return (
      <VisualizerPage 
        problem={selectedVisualizerProblem} 
        onBack={() => setSelectedVisualizerProblem(null)} 
      />
    )
  }

  // ==========================================
  // MAIN MASTER DSA SHEET TABLE VIEW
  // ==========================================
  return (
    <div className="dsa-sheet-page animate-fade" style={{ minHeight: '85vh', padding: '30px 0', background: '#0a0909', color: '#f8fafc' }}>
      {/* FULL-WIDTH CONTAINER */}
      <div className="container" style={{ maxWidth: '96%', padding: '0 10px' }}>
        
        {/* TOP BAR CONTROL HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
          
          {/* Segmented Tab Switcher [All Problems | Revision] */}
          <div style={{ background: '#181415', padding: '4px', borderRadius: '10px', display: 'flex', gap: '4px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              onClick={() => setActiveTab('all')}
              style={{
                padding: '8px 22px',
                borderRadius: '8px',
                fontSize: '0.88rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'all' ? '#322b2d' : 'transparent',
                color: activeTab === 'all' ? '#fff' : '#94a3b8',
                transition: 'all 0.2s ease'
              }}
            >
              All Problems
            </button>
            <button
              onClick={() => setActiveTab('revision')}
              style={{
                padding: '8px 22px',
                borderRadius: '8px',
                fontSize: '0.88rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'revision' ? '#322b2d' : 'transparent',
                color: activeTab === 'revision' ? '#fff' : '#94a3b8',
                transition: 'all 0.2s ease'
              }}
            >
              Revision ({revisionProblemIds.length})
            </button>
          </div>

          {/* Right Controls: Search, Dropdowns, Random Problem */}
          <div className="flex-center" style={{ gap: '12px', flexWrap: 'wrap' }}>
            
            {/* Search Input */}
            <div className="flex-center" style={{ background: '#181415', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '6px 14px' }}>
              <Search size={16} color="#94a3b8" style={{ marginRight: '6px' }} />
              <input 
                type="text" 
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '0.85rem', width: '180px', outline: 'none' }}
              />
            </div>

            {/* Topic Dropdown */}
            <select
              value={selectedTopicFilter}
              onChange={(e) => setSelectedTopicFilter(e.target.value)}
              style={{ background: '#181415', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.08)', padding: '8px 14px', borderRadius: '10px', fontSize: '0.85rem', outline: 'none', cursor: 'pointer' }}
            >
              <option value="All">All problems ˅</option>
              <option value="Arrays">Arrays</option>
              <option value="Strings">Strings</option>
              <option value="Binary Search">Binary Search</option>
              <option value="Linkedlist">Linked List</option>
              <option value="Binary Trees">Binary Trees</option>
              <option value="Dynamic Programming">Dynamic Programming</option>
            </select>

            {/* Difficulty Dropdown */}
            <select
              value={selectedDifficultyFilter}
              onChange={(e) => setSelectedDifficultyFilter(e.target.value)}
              style={{ background: '#181415', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.08)', padding: '8px 14px', borderRadius: '10px', fontSize: '0.85rem', outline: 'none', cursor: 'pointer' }}
            >
              <option value="All">Difficulty ˅</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            {/* Random Problem Button */}
            <button
              onClick={handlePickRandom}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '10px',
                background: '#181415',
                color: '#cbd5e1',
                border: '1px solid rgba(255,255,255,0.08)',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Shuffle size={15} color="#06b6d4" />
              <span>Random Problem</span>
            </button>

          </div>
        </div>

        {/* OVERALL PROGRESS BANNER CARD */}
        <div 
          style={{ 
            background: '#141011', 
            border: '1px solid rgba(255, 255, 255, 0.08)', 
            borderRadius: '16px', 
            padding: '20px 28px', 
            display: 'flex', 
            justify: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          {/* Left Progress Circle */}
          <div className="flex-center" style={{ gap: '20px' }}>
            <div style={{ position: 'relative', width: '56px', height: '56px' }}>
              <svg width="56" height="56" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="3.5"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="3.5"
                  strokeDasharray={`${overallPercent}, 100`}
                />
              </svg>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.82rem' }}>
                {overallPercent}%
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: '#fff' }}>Overall Progress</h3>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f8fafc' }}>
                {solvedTotal} <span style={{ color: '#64748b', fontWeight: 600 }}>/ {totalProblems}</span>
              </span>
            </div>
          </div>

          {/* Right Difficulty Breakdown & Reset Button */}
          <div className="flex-center" style={{ gap: '20px', flexWrap: 'wrap' }}>
            <div className="flex-center" style={{ gap: '8px' }}>
              <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#10b981' }} />
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#10b981' }}>
                Easy <span style={{ color: '#f8fafc', fontWeight: 800 }}>{easySolved}</span><span style={{ color: '#64748b' }}>/{easyTotal}</span>
              </span>
            </div>

            <div className="flex-center" style={{ gap: '8px' }}>
              <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#f59e0b' }} />
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f59e0b' }}>
                Medium <span style={{ color: '#f8fafc', fontWeight: 800 }}>{mediumSolved}</span><span style={{ color: '#64748b' }}>/{mediumTotal}</span>
              </span>
            </div>

            <div className="flex-center" style={{ gap: '8px' }}>
              <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#f43f5e' }} />
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f43f5e' }}>
                Hard <span style={{ color: '#f8fafc', fontWeight: 800 }}>{hardSolved}</span><span style={{ color: '#64748b' }}>/{hardTotal}</span>
              </span>
            </div>

            <button 
              onClick={() => {
                if (window.confirm("Are you sure you want to reset all solved ticks and progress?")) {
                  resetCurrentUserData();
                  setSolvedProblemIds([]);
                }
              }}
              className="flex-center"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                padding: '5px 10px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                gap: '5px',
                transition: 'all 0.2s ease',
                marginLeft: '8px'
              }}
              title="Reset all solved ticks and progress"
            >
              <RotateCcw size={13} /> Reset Progress
            </button>
          </div>
        </div>

        {/* COLLAPSIBLE ACCORDION TOPIC ROWS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '60px' }}>
          
          {accordionCategories.map((cat) => {
            const isOpen = expandedAccordions[cat.key]
            
            let catProblems = problemsList.filter(p => cat.filterTopics.includes(p.topic))

            if (selectedTopicFilter !== 'All') {
              catProblems = catProblems.filter(p => p.topic === selectedTopicFilter)
            }
            if (selectedDifficultyFilter !== 'All') {
              catProblems = catProblems.filter(p => p.difficulty === selectedDifficultyFilter)
            }
            if (searchQuery) {
              catProblems = catProblems.filter(p => 
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.subtopic.toLowerCase().includes(searchQuery.toLowerCase())
              )
            }

            if (activeTab === 'revision') {
              catProblems = catProblems.filter(p => revisionProblemIds.includes(p.id))
            }

            if (catProblems.length === 0 && (searchQuery || selectedTopicFilter !== 'All' || activeTab === 'revision')) {
              return null
            }

            const catSolvedCount = catProblems.filter(p => isProbSolved(p)).length
            const catTotalCount = catProblems.length
            const catPercent = catTotalCount > 0 ? Math.round((catSolvedCount / catTotalCount) * 100) : 0

            const subtopicsGrouped = {}
            catProblems.forEach(p => {
              const sub = p.subtopic || 'General Problems'
              if (!subtopicsGrouped[sub]) subtopicsGrouped[sub] = []
              subtopicsGrouped[sub].push(p)
            })

            return (
              <div 
                key={cat.key}
                style={{
                  background: '#120f10',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  borderRadius: '14px',
                  overflow: 'hidden'
                }}
              >
                {/* Accordion Header Bar */}
                <div 
                  onClick={() => toggleAccordion(cat.key)}
                  style={{
                    padding: '16px 22px',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    userSelect: 'none',
                    background: isOpen ? '#1a1617' : 'transparent',
                    transition: 'background 0.2s ease'
                  }}
                >
                  <div className="flex-center" style={{ gap: '14px' }}>
                    <ChevronRight 
                      size={18} 
                      color="#94a3b8" 
                      style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease' }} 
                    />
                    <span style={{ fontSize: '0.98rem', fontWeight: 800, color: '#f8fafc' }}>
                      {cat.title}
                    </span>
                  </div>

                  <div className="flex-center" style={{ gap: '18px' }}>
                    <div style={{ width: '110px', height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${catPercent}%`, height: '100%', background: '#10b981', borderRadius: '3px', transition: 'width 0.3s ease' }} />
                    </div>

                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                      {catSolvedCount} <span style={{ color: '#64748b' }}>/ {catTotalCount}</span>
                    </span>
                  </div>
                </div>

                {/* Expanded Subtopic Categories & Problem Tables */}
                {isOpen && (
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#0b090a' }}>
                    {Object.entries(subtopicsGrouped).map(([subName, subProbs]) => {
                      const subSolved = subProbs.filter(p => isProbSolved(p)).length

                      return (
                        <div key={subName} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          
                          {/* Subtopic Header */}
                          <div 
                            onClick={() => toggleSubtopic(subName)}
                            style={{ padding: '8px 22px', background: 'rgba(6, 182, 212, 0.05)', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
                          >
                            <div className="flex-center" style={{ gap: '8px' }}>
                              <ChevronDown size={14} color="#06b6d4" style={{ transform: collapsedSubtopics[subName] ? 'rotate(-90deg)' : 'none', transition: 'transform 0.2s ease' }} />
                              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#06b6d4' }}>{subName}</span>
                            </div>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                              {subSolved} / {subProbs.length} Solved
                            </span>
                          </div>

                          {!collapsedSubtopics[subName] && (
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                            <thead>
                              <tr style={{ background: '#0f0c0d', color: '#64748b', fontSize: '0.76rem', borderBottom: '1px solid rgba(255,255,255,0.05)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                <th style={{ padding: '10px 14px', width: '40px', textAlign: 'center' }}>Status</th>
                                <th style={{ padding: '10px 14px' }}>Problem</th>
                                <th style={{ padding: '10px 10px', width: '90px', textAlign: 'center' }}>Visualizer</th>
                                <th style={{ padding: '10px 10px', width: '70px', textAlign: 'center' }}>Resource</th>
                                <th style={{ padding: '10px 10px', width: '70px', textAlign: 'center' }}>Editorial</th>
                                <th style={{ padding: '10px 10px', width: '70px', textAlign: 'center' }}>Practice</th>
                                <th style={{ padding: '10px 10px', width: '50px', textAlign: 'center' }}>Note</th>
                                <th style={{ padding: '10px 10px', width: '60px', textAlign: 'center' }}>Revision</th>
                                <th style={{ padding: '10px 14px', width: '80px', textAlign: 'right' }}>Difficulty</th>
                              </tr>
                            </thead>

                            <tbody>
                              {subProbs.map((prob) => {
                                const isSolved = solvedProblemIds.includes(prob.id) || isProblemGloballySolved(prob.link, prob.name)
                                const isRevise = revisionProblemIds.includes(prob.id)
                                const hasNote = Boolean(problemNotes[prob.id])
                                const isNoteExpanded = expandedNoteProblemId === prob.id

                                let diffColor = '#10b981'
                                let diffBg = 'rgba(16, 185, 129, 0.15)'

                                if (prob.difficulty === 'Medium') {
                                  diffColor = '#f59e0b'
                                  diffBg = 'rgba(245, 158, 11, 0.15)'
                                } else if (prob.difficulty === 'Hard') {
                                  diffColor = '#f43f5e'
                                  diffBg = 'rgba(244, 63, 94, 0.15)'
                                }

                                const ytUrl = prob.videoUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(prob.name + ' DSA Solution')}`

                                return (
                                  <React.Fragment key={prob.id}>
                                    <tr 
                                      style={{ 
                                        borderBottom: isNoteExpanded ? 'none' : '1px solid rgba(255,255,255,0.03)',
                                        background: isSolved ? 'rgba(16, 185, 129, 0.03)' : isNoteExpanded ? 'rgba(6, 182, 212, 0.05)' : 'transparent',
                                        transition: 'background 0.2s ease'
                                      }}
                                    >
                                      {/* Status Checkbox */}
                                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                                        <input 
                                          type="checkbox"
                                          checked={isSolved}
                                          onChange={() => toggleSolved(prob.id, prob.link)}
                                          style={{ width: '17px', height: '17px', accentColor: '#10b981', cursor: 'pointer' }}
                                        />
                                      </td>

                                      {/* Problem Title */}
                                      <td style={{ padding: '12px 14px', fontWeight: 700, color: isSolved ? '#94a3b8' : '#f8fafc' }}>
                                        <span style={{ textDecoration: isSolved ? 'line-through' : 'none' }}>
                                          {prob.name}
                                        </span>
                                      </td>

                                      {/* Visualizer Option */}
                                      <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                                        <button
                                          onClick={() => {
                                            if (!isLoggedIn) setRequireLoginFeature('Algorithm Visualizer Workspace');
                                            else setSelectedVisualizerProblem(prob);
                                          }}
                                          title="Open Full Page Algorithm Visualizer Workspace with Custom Inputs & Animation"
                                          style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            padding: '4px 8px',
                                            borderRadius: '6px',
                                            fontSize: '0.75rem',
                                            fontWeight: 800,
                                            background: 'rgba(6, 182, 212, 0.12)',
                                            color: '#06b6d4',
                                            border: '1px solid rgba(6, 182, 212, 0.3)',
                                            cursor: 'pointer'
                                          }}
                                        >
                                          <Eye size={12} />
                                          <span>Visualizer</span>
                                        </button>
                                      </td>

                                      {/* YouTube Video Badge */}
                                      <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                                        <a
                                          href={ytUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={(e) => {
                                            if (!isLoggedIn) {
                                              e.preventDefault();
                                              setRequireLoginFeature('YouTube Video Solutions');
                                            }
                                          }}
                                          title="Watch YouTube Video Solution"
                                          style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justify: 'center',
                                            gap: '4px',
                                            padding: '4px 8px',
                                            borderRadius: '6px',
                                            background: '#dc2626',
                                            color: '#fff',
                                            fontSize: '0.72rem',
                                            fontWeight: 800,
                                            textDecoration: 'none'
                                          }}
                                        >
                                          <Youtube size={13} fill="#fff" color="#dc2626" />
                                          <span>Video</span>
                                        </a>
                                      </td>

                                      {/* FULL PAGE EDITORIAL READER TRIGGER */}
                                      <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                                        <button
                                          onClick={() => {
                                            if (!isLoggedIn) setRequireLoginFeature('Solution Editorial Notes');
                                            else setSelectedEditorialProblem(prob);
                                          }}
                                          title="Open Full Page Editorial Solution (Examples, Brute Force, Optimal in C++, Java, Python)"
                                          style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            padding: '4px 8px',
                                            borderRadius: '6px',
                                            background: 'rgba(255,255,255,0.06)',
                                            color: '#cbd5e1',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            cursor: 'pointer'
                                          }}
                                        >
                                          <FileText size={13} color="#06b6d4" />
                                          <span>Editorial</span>
                                        </button>
                                      </td>

                                      {/* Solve Link */}
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

                                      {/* Notes Plus Button */}
                                      <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                                        <button
                                          onClick={() => toggleInlineNote(prob.id)}
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

                                      {/* Revision Star */}
                                      <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                                        <button
                                          onClick={() => toggleRevision(prob.id)}
                                          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                                        >
                                          <Star size={16} color={isRevise ? '#f59e0b' : '#475569'} fill={isRevise ? '#f59e0b' : 'none'} />
                                        </button>
                                      </td>

                                      {/* Difficulty Pill */}
                                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                                        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: diffColor, background: diffBg, padding: '4px 10px', borderRadius: '6px' }}>
                                          {prob.difficulty}
                                        </span>
                                      </td>

                                    </tr>

                                    {/* BIGGER INLINE EXPANDED NOTES BOX WITH SIZE CONTROLS */}
                                    {isNoteExpanded && (
                                      <tr style={{ background: '#161214', borderBottom: '1px solid rgba(6, 182, 212, 0.3)' }}>
                                        <td colSpan={9} style={{ padding: '18px 24px' }}>
                                          <div style={{ background: '#0c0a0b', padding: '20px', borderRadius: '14px', border: '1px solid rgba(6, 182, 212, 0.25)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                                            
                                            {/* Header Toolbar */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                                              <div className="flex-center" style={{ gap: '12px', flexWrap: 'wrap' }}>
                                                <StickyNote size={18} color="#06b6d4" />
                                                <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#06b6d4' }}>
                                                  Personal Study Notes for: {prob.name}
                                                </span>

                                                {/* Size Toggle Button */}
                                                <button 
                                                  onClick={() => setMaximizedNoteProblemId(maximizedNoteProblemId === prob.id ? null : prob.id)}
                                                  style={{ background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.3)', color: '#06b6d4', padding: '4px 10px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                                >
                                                  {maximizedNoteProblemId === prob.id ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                                                  <span>{maximizedNoteProblemId === prob.id ? 'Minimize Size' : 'Expand Size'}</span>
                                                </button>

                                                {/* Fullscreen Scratchpad Button */}
                                                <button 
                                                  onClick={() => setFullscreenNoteProblem(prob)}
                                                  style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#10b981', padding: '4px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                                                >
                                                  <PenTool size={13} /> Fullscreen Canvas Workspace
                                                </button>
                                              </div>

                                              <button 
                                                onClick={() => setExpandedNoteProblemId(null)}
                                                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                                              >
                                                <X size={18} />
                                              </button>
                                            </div>

                                            {/* Note Textarea with Dynamic Row Height */}
                                            <textarea
                                              rows={maximizedNoteProblemId === prob.id ? 14 : 5}
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
                                                onClick={() => saveInlineNote(prob.id)}
                                                style={{ padding: '8px 22px', borderRadius: '8px', background: 'linear-gradient(90deg, #06b6d4, #10b981)', color: '#000', border: 'none', fontSize: '0.86rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 15px rgba(6,182,212,0.35)' }}
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
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

              </div>
            )
          })}

        </div>

      </div>

      {/* GUEST WELCOME CHOICE MODAL - CENTERED VIA PORTAL */}
      {showGuestWelcomeModal && !isLoggedIn && ReactDOM.createPortal(
        <div style={{ position: 'fixed', inset: 0, top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999999, padding: '20px' }}>
          <div className="glass-panel animate-fade" style={{ width: '100%', maxWidth: '520px', padding: '36px', borderRadius: '24px', background: '#0e111a', border: '1px solid rgba(6, 182, 212, 0.35)', boxShadow: '0 25px 60px rgba(0,0,0,0.95)', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.15)', border: '2px solid #06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px auto', boxShadow: '0 0 25px rgba(6, 182, 212, 0.4)' }}>
              <Layers size={32} color="#06b6d4" />
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', marginBottom: '10px' }}>
              Welcome to KeetCode DSA Sheets
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '28px' }}>
              Sign in to unlock full <strong style={{ color: '#06b6d4' }}>Solution Editorials</strong>, <strong style={{ color: '#dc2626' }}>YouTube Breakdown Videos</strong>, <strong style={{ color: '#10b981' }}>Algorithm Pointer Visualizers</strong> & <strong style={{ color: '#f59e0b' }}>LeetCode Streak Sync</strong>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => { setShowGuestWelcomeModal(false); navigateTo && navigateTo('auth'); }}
                style={{ padding: '12px 24px', fontWeight: 900, fontSize: '0.95rem', borderRadius: '12px' }}
              >
                Sign In / Register
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => setShowGuestWelcomeModal(false)}
                style={{ padding: '10px 24px', fontSize: '0.88rem', borderRadius: '12px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#94a3b8' }}
              >
                Continue as Guest (Browse Questions Only)
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* FEATURE RESTRICTION LOGIN MODAL - CENTERED VIA PORTAL */}
      {requireLoginFeature && ReactDOM.createPortal(
        <div style={{ position: 'fixed', inset: 0, top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999999, padding: '20px' }}>
          <div className="glass-panel animate-fade" style={{ width: '100%', maxWidth: '480px', padding: '32px', borderRadius: '24px', background: '#0e111a', border: '1px solid rgba(245, 158, 11, 0.35)', boxShadow: '0 25px 60px rgba(0,0,0,0.95)', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.15)', border: '2px solid #f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <Zap size={28} color="#f59e0b" />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
              Login Required
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '24px' }}>
              Please sign in to unlock <strong style={{ color: '#06b6d4' }}>{requireLoginFeature}</strong> for this problem.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => { setRequireLoginFeature(null); navigateTo && navigateTo('auth'); }}
                style={{ padding: '10px 24px', fontWeight: 800 }}
              >
                Sign In Now
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => setRequireLoginFeature(null)}
                style={{ padding: '10px 20px' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* FULLSCREEN NOTES & DRAWING CANVAS WORKSPACE MODAL - CENTERED VIA PORTAL */}
      {fullscreenNoteProblem && ReactDOM.createPortal(
        <FullscreenNotesModal 
          problem={fullscreenNoteProblem}
          onClose={() => setFullscreenNoteProblem(null)}
          onSave={saveInlineNote}
          initialText={problemNotes[fullscreenNoteProblem.id] || ''}
          uid={auth.currentUser?.uid || 'guest'}
        />,
        document.body
      )}
    </div>
  )
}
