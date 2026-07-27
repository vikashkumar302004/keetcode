import React, { useState } from 'react'
import { 
  BookOpen, Github, ExternalLink, ArrowRight, Star, Code2, 
  Layers, CheckCircle2, Terminal, Cpu, Sparkles, Folder, FileText, 
  ArrowLeft, Clock, Award, ShieldCheck, ChevronRight, Search, Copy, Check, Activity, Image as ImageIcon
} from 'lucide-react'
import { cppNotesData } from '../data/cppNotesData.js'
import { systemDesignNotesData } from '../data/systemDesignNotesData.js'
import AIChatDrawer from './AIChatDrawer.jsx'

export default function Courses({ navigateTo }) {
  // Navigation State: null = Catalog, 'cpp-lang' = C++ Notes Reader, 'system-design' = SD Notes Reader
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isAIChatOpen, setIsAIChatOpen] = useState(false)
  
  // Section index state for C++ Notes and System Design Notes
  const [cppSectionIdx, setCppSectionIdx] = useState(0)
  const [sdSectionIdx, setSdSectionIdx] = useState(20) // Default to Chapter 21 (Ad Click Event Aggregation)
  
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedCode, setCopiedCode] = useState(false)

  const cppRepoUrl = "https://github.com/avinashtare/CPP-Notes"
  const sdRepoUrl = "https://github.com/liquidslr/system-design-notes"

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  // Helper to parse inline bold (**text**), code (`text`), and links ([text](url)) into clean React elements
  const formatInlineMarkdown = (contentStr) => {
    if (!contentStr) return null;
    
    // Strip raw HTML <div> tags or </div> tags
    let cleanStr = contentStr
      .replace(/<\/div>/gi, '')
      .replace(/<div[^>]*>/gi, '')
      .trim();

    if (!cleanStr) return null;

    // Split text by markdown tokens: **bold**, `code`, [link](url)
    const parts = cleanStr.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);

    return parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={pIdx} style={{ color: '#f8fafc', fontWeight: 800 }}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={pIdx} style={{ 
            background: 'rgba(6, 182, 212, 0.15)', 
            color: '#06b6d4', 
            padding: '2px 7px', 
            borderRadius: '5px', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.85rem',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            display: 'inline-block',
            margin: '0 2px'
          }}>
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
        const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
        if (linkMatch) {
          const [, linkText, linkUrl] = linkMatch;
          if (linkText.toLowerCase().includes('click here to learn')) return null;
          return (
            <a key={pIdx} href={linkUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#06b6d4', textDecoration: 'underline', fontWeight: 600 }}>
              {linkText}
            </a>
          );
        }
      }
      return part;
    });
  };

  // Robust Markdown Parser (Supporting Headings, Tables, Lists, Code Blocks, System Diagrams & Q&A Cards)
  const renderFormattedMarkdown = (text, folder = '') => {
    if (!text) return null;
    const lines = text.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeBlockText = [];
    let inTable = false;
    let tableHeader = [];
    let tableRows = [];

    const flushTable = (key) => {
      if (tableHeader.length > 0) {
        elements.push(
          <div key={`table-wrapper-${key}`} style={{ overflowX: 'auto', margin: '20px 0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#0a0c12' }}>
              <thead>
                <tr style={{ background: 'linear-gradient(90deg, #121826, #0e1420)', borderBottom: '2px solid rgba(6, 182, 212, 0.4)' }}>
                  {tableHeader.map((h, hIdx) => (
                    <th key={hIdx} style={{ padding: '12px 16px', textAlign: 'left', color: '#06b6d4', fontSize: '0.88rem', fontWeight: 800 }}>
                      {formatInlineMarkdown(h.trim())}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: rIdx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} style={{ padding: '10px 16px', fontSize: '0.86rem', color: '#cbd5e1' }}>
                        {formatInlineMarkdown(cell.trim().replace(/^`|`$/g, ''))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      tableHeader = [];
      tableRows = [];
      inTable = false;
    };

    lines.forEach((line, idx) => {
      // Skip dead link placeholders or repetitive readme titles
      if (
        line.toLowerCase().includes('click here to learn') || 
        line.trim().toLowerCase() === '## readme' ||
        line.trim().toLowerCase() === '### readme' ||
        line.trim().toLowerCase() === '#### thanks for reading' ||
        line.trim().toLowerCase() === '## license' ||
        line.trim().toLowerCase() === '## contact' ||
        line.trim().toLowerCase() === '## author'
      ) {
        return;
      }

      // Code Block Start/End
      if (line.startsWith('```')) {
        if (inTable) flushTable(`table-${idx}`);

        if (inCodeBlock) {
          const codeString = codeBlockText.join('\n');
          elements.push(
            <div key={`code-${idx}`} style={{ position: 'relative', margin: '20px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#121620', padding: '8px 16px', borderRadius: '10px 10px 0 0', border: '1px solid rgba(255,255,255,0.1)', borderBottom: 'none' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#06b6d4', fontFamily: 'var(--font-mono)' }}>System Architecture / Code Snippet</span>
                <button 
                  onClick={() => handleCopy(codeString)}
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', padding: '3px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  {copiedCode ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                  {copiedCode ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre style={{ margin: 0, background: '#080b12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0 0 10px 10px', padding: '18px', color: '#38ef7d', fontSize: '0.88rem', fontFamily: 'var(--font-mono)', overflowX: 'auto', lineHeight: 1.5 }}>
                <code>{codeString}</code>
              </pre>
            </div>
          );
          codeBlockText = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockText.push(line);
        return;
      }

      // System Design Diagram Image Processing (<img ...> or ![...](...))
      if (line.includes('<img') || line.includes('![')) {
        let imgSrc = '';
        let altText = 'System Architecture Diagram';
        
        const srcMatch = line.match(/src=["']([^"']+)["']/i) || line.match(/!\[.*?\]\((.*?)\)/i);
        const altMatch = line.match(/alt=["']([^"']+)["']/i) || line.match(/!\[(.*?)\]/i);

        if (srcMatch && srcMatch[1]) {
          imgSrc = srcMatch[1].trim();
          if (altMatch && altMatch[1]) altText = altMatch[1].trim();

          // Resolve relative GitHub image URL
          if (!imgSrc.startsWith('http')) {
            const cleanFolder = encodeURIComponent(folder || '');
            const imageName = imgSrc.replace(/^\.\/images\//, '').replace(/^images\//, '').replace(/^\.\//, '');
            imgSrc = `https://raw.githubusercontent.com/liquidslr/system-design-notes/main/${cleanFolder}/images/${imageName}`;
          }

          elements.push(
            <div key={`img-${idx}`} style={{ 
              margin: '28px 0', 
              padding: '20px', 
              background: 'linear-gradient(135deg, rgba(18, 22, 34, 0.95), rgba(10, 12, 20, 0.95))', 
              borderRadius: '16px', 
              border: '1px solid rgba(6, 182, 212, 0.35)',
              boxShadow: '0 12px 36px rgba(0,0,0,0.6)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#06b6d4', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Activity size={16} /> Architecture Diagram: {altText.replace(/[-_]/g, ' ').toUpperCase()}
              </div>
              <img 
                src={imgSrc} 
                alt={altText}
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '600px', 
                  borderRadius: '12px', 
                  border: '1px solid rgba(255, 255, 255, 0.15)', 
                  background: '#fff', 
                  padding: '10px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          );
          return;
        }
      }

      // Markdown Table Processing (| col1 | col2 |)
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        const parts = line.split('|').filter((_, pIdx, arr) => pIdx > 0 && pIdx < arr.length - 1);
        if (line.includes(':-') || line.includes('-:')) return;

        if (!inTable) {
          inTable = true;
          tableHeader = parts;
        } else {
          tableRows.push(parts);
        }
        return;
      } else if (inTable) {
        flushTable(`table-${idx}`);
      }

      // Interview Q&A Dialogue Cards (* C: Question / * I: Answer)
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith('* C:') || trimmedLine.startsWith('C:') || trimmedLine.startsWith('- C:')) {
        const questionText = trimmedLine.replace(/^([\*\-]\s*)?C:\s*/i, '');
        elements.push(
          <div key={`qa-c-${idx}`} style={{ 
            margin: '14px 0 8px 0', 
            padding: '14px 18px', 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12), rgba(6, 182, 212, 0.05))', 
            borderLeft: '4px solid #06b6d4',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            borderLeftWidth: '4px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
          }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>💡 Candidate Question (Scope Clarification)</span>
            </div>
            <div style={{ color: '#f8fafc', fontSize: '0.94rem', fontWeight: 600, lineHeight: 1.5 }}>
              {formatInlineMarkdown(questionText)}
            </div>
          </div>
        );
        return;
      }

      if (trimmedLine.startsWith('* I:') || trimmedLine.startsWith('I:') || trimmedLine.startsWith('- I:')) {
        const answerText = trimmedLine.replace(/^([\*\-]\s*)?I:\s*/i, '');
        elements.push(
          <div key={`qa-i-${idx}`} style={{ 
            margin: '4px 0 16px 0', 
            padding: '14px 18px', 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(16, 185, 129, 0.05))', 
            borderLeft: '4px solid #10b981',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderLeftWidth: '4px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
          }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>💬 Interviewer Requirement</span>
            </div>
            <div style={{ color: '#e2e8f0', fontSize: '0.94rem', lineHeight: 1.5 }}>
              {formatInlineMarkdown(answerText)}
            </div>
          </div>
        );
        return;
      }

      // Horizontal Divider Lines (---, ***, ___)
      if (line.trim() === '---' || line.trim() === '***' || line.trim() === '___') {
        elements.push(<div key={idx} style={{ borderTop: '1px solid rgba(255, 255, 255, 0.12)', margin: '28px 0' }} />);
        return;
      }

      // Headings
      if (line.startsWith('# ')) {
        elements.push(<h1 key={idx} style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', margin: '28px 0 14px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>{formatInlineMarkdown(line.slice(2))}</h1>);
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={idx} style={{ fontSize: '1.45rem', fontWeight: 800, color: '#06b6d4', margin: '22px 0 12px 0' }}>{formatInlineMarkdown(line.slice(3))}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={idx} style={{ fontSize: '1.18rem', fontWeight: 800, color: '#10b981', margin: '18px 0 10px 0' }}>{formatInlineMarkdown(line.slice(4))}</h3>);
      } else if (line.startsWith('#### ')) {
        elements.push(<h4 key={idx} style={{ fontSize: '1.02rem', fontWeight: 700, color: '#f59e0b', margin: '14px 0 8px 0' }}>{formatInlineMarkdown(line.slice(5))}</h4>);
      } else if (/^\d+\.\s/.test(line.trim())) {
        // Numbered list (e.g. 1. Redundancy:)
        const numMatch = line.trim().match(/^(\d+\.)\s*(.*)/);
        if (numMatch) {
          elements.push(
            <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', margin: '8px 0', fontSize: '0.94rem', color: '#cbd5e1' }}>
              <span style={{ color: '#f59e0b', fontWeight: 800 }}>{numMatch[1]}</span>
              <div>{formatInlineMarkdown(numMatch[2])}</div>
            </div>
          );
        }
      } else if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('  - ')) {
        const bulletContent = line.replace(/^(\s*[\*\-]\s*)/, '');
        elements.push(
          <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', margin: '6px 0', paddingLeft: line.startsWith('  - ') ? '18px' : '0px', fontSize: '0.92rem', color: '#cbd5e1' }}>
            <span style={{ color: '#06b6d4', fontWeight: 800, lineHeight: 1.5 }}>•</span>
            <div style={{ flex: 1 }}>{formatInlineMarkdown(bulletContent)}</div>
          </div>
        );
      } else if (line.trim() !== '') {
        const formatted = formatInlineMarkdown(line);
        if (formatted) {
          elements.push(<p key={idx} style={{ fontSize: '0.94rem', color: '#cbd5e1', lineHeight: 1.6, margin: '10px 0' }}>{formatted}</p>);
        }
      }
    });

    if (inTable) flushTable('end');

    return elements;
  }

  // =========================================================
  // VIEW 1: SYSTEM DESIGN NOTES READER VIEW (28 CHAPTERS)
  // =========================================================
  if (selectedCourse === 'system-design') {
    const activeSd = systemDesignNotesData[sdSectionIdx] || systemDesignNotesData[0]
    const filteredSdSections = systemDesignNotesData.filter(sec => 
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.content.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
      <div className="container animate-fade" style={{ paddingTop: '24px', paddingBottom: '80px' }}>
        
        {/* Top Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <button 
            onClick={() => setSelectedCourse(null)} 
            style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '8px', 
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', 
              cursor: 'pointer', fontSize: '0.88rem', fontWeight: 700, padding: '8px 16px', borderRadius: '10px'
            }}
          >
            <ArrowLeft size={16} /> Back to Courses Catalog
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={() => setIsAIChatOpen(true)}
              style={{ background: 'linear-gradient(90deg, #f59e0b, #10b981)', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.35)' }}
            >
              <Sparkles size={16} color="#000" /> Ask KeetAI Assistant
            </button>
            <a 
              href={sdRepoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#f59e0b', padding: '8px 14px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Github size={15} /> liquidslr/system-design-notes <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Reader Layout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '24px', alignItems: 'flex-start' }}>
          
          {/* LEFT SIDEBAR: Table of Contents */}
          <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', background: '#0e0c10', border: '1px solid rgba(255, 255, 255, 0.08)', position: 'sticky', top: '90px', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
            
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={16} color="#f59e0b" /> System Design Chapters (28)
            </h3>

            {/* Search Box */}
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
              <input 
                type="text" 
                placeholder="Search Ad Click, Rate Limiter..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '8px 10px 8px 32px', background: '#16131a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '0.8rem', outline: 'none' }}
              />
            </div>

            {/* Sections List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {filteredSdSections.map((sec, idx) => {
                const originalIndex = systemDesignNotesData.findIndex(s => s.id === sec.id)
                const isActive = originalIndex === sdSectionIdx

                return (
                  <button
                    key={sec.id}
                    onClick={() => setSdSectionIdx(originalIndex)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: isActive ? 'linear-gradient(90deg, rgba(245, 158, 11, 0.2), rgba(16, 185, 129, 0.1))' : 'transparent',
                      border: isActive ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid transparent',
                      color: isActive ? '#fff' : '#94a3b8',
                      fontSize: '0.84rem',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'space-between',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {sec.title}
                    </span>
                    <ChevronRight size={14} color={isActive ? "#f59e0b" : "#64748b"} />
                  </button>
                )
              })}
            </div>

          </div>

          {/* MAIN READER PANEL */}
          <div className="glass-panel" style={{ padding: '36px 40px', borderRadius: '20px', background: '#141117', border: '1px solid rgba(255, 255, 255, 0.08)', minHeight: '600px' }}>
            
            {/* Title & Top Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f59e0b', background: 'rgba(245, 158, 11, 0.12)', padding: '3px 10px', borderRadius: '6px' }}>
                  Chapter {sdSectionIdx + 1} of {systemDesignNotesData.length}
                </span>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', margin: '8px 0 0 0' }}>
                  {activeSd.title}
                </h2>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  disabled={sdSectionIdx === 0}
                  onClick={() => setSdSectionIdx(prev => Math.max(0, prev - 1))}
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '6px 14px', borderRadius: '6px', cursor: sdSectionIdx === 0 ? 'not-allowed' : 'pointer', opacity: sdSectionIdx === 0 ? 0.5 : 1, fontSize: '0.8rem', fontWeight: 700 }}
                >
                  ← Prev Chapter
                </button>
                <button 
                  disabled={sdSectionIdx === systemDesignNotesData.length - 1}
                  onClick={() => setSdSectionIdx(prev => Math.min(systemDesignNotesData.length - 1, prev + 1))}
                  style={{ background: '#f59e0b', border: 'none', color: '#000', padding: '6px 14px', borderRadius: '6px', cursor: sdSectionIdx === systemDesignNotesData.length - 1 ? 'not-allowed' : 'pointer', opacity: sdSectionIdx === systemDesignNotesData.length - 1 ? 0.5 : 1, fontSize: '0.8rem', fontWeight: 800 }}
                >
                  Next Chapter →
                </button>
              </div>
            </div>

            {/* Formatted Content with Visual Architecture Diagrams */}
            <div style={{ color: '#e2e8f0', fontSize: '0.95rem' }}>
              {renderFormattedMarkdown(activeSd.content, activeSd.folder)}
            </div>

            {/* Bottom Navigation */}
            <div style={{ marginTop: '48px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Source Notes: <strong>liquidslr/system-design-notes</strong>
              </span>

              {sdSectionIdx < systemDesignNotesData.length - 1 && (
                <button 
                  onClick={() => setSdSectionIdx(prev => prev + 1)}
                  style={{ background: 'linear-gradient(90deg, #f59e0b, #06b6d4)', border: 'none', color: '#000', fontWeight: 800, padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Continue to {systemDesignNotesData[sdSectionIdx + 1]?.title} <ArrowRight size={16} />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    )
  }

  // =========================================================
  // VIEW 2: C++ LANGUAGE NOTES READER VIEW (26 MODULES)
  // =========================================================
  if (selectedCourse === 'cpp-lang') {
    const activeSection = cppNotesData[cppSectionIdx] || cppNotesData[0]
    const filteredCppSections = cppNotesData.filter(sec => 
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.content.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
      <div className="container animate-fade" style={{ paddingTop: '24px', paddingBottom: '80px' }}>
        
        {/* Top Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <button 
            onClick={() => setSelectedCourse(null)} 
            style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '8px', 
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', 
              cursor: 'pointer', fontSize: '0.88rem', fontWeight: 700, padding: '8px 16px', borderRadius: '10px'
            }}
          >
            <ArrowLeft size={16} /> Back to Courses Catalog
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={() => setIsAIChatOpen(true)}
              style={{ background: 'linear-gradient(90deg, #06b6d4, #10b981)', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 15px rgba(6, 182, 212, 0.35)' }}
            >
              <Sparkles size={16} color="#000" /> Ask KeetAI Assistant
            </button>
            <a 
              href={cppRepoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ background: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.3)', color: '#06b6d4', padding: '8px 14px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Github size={15} /> Source GitHub Repo <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Reader Layout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '24px', alignItems: 'flex-start' }}>
          
          {/* LEFT SIDEBAR: Table of Contents */}
          <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', background: '#0e0c10', border: '1px solid rgba(255, 255, 255, 0.08)', position: 'sticky', top: '90px', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
            
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={16} color="#06b6d4" /> C++ Notes Curriculum
            </h3>

            {/* Search Box */}
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
              <input 
                type="text" 
                placeholder="Search C++ notes..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '8px 10px 8px 32px', background: '#16131a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '0.8rem', outline: 'none' }}
              />
            </div>

            {/* Sections List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {filteredCppSections.map((sec, idx) => {
                const originalIndex = cppNotesData.findIndex(s => s.id === sec.id)
                const isActive = originalIndex === cppSectionIdx

                return (
                  <button
                    key={sec.id}
                    onClick={() => setCppSectionIdx(originalIndex)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: isActive ? 'linear-gradient(90deg, rgba(6, 182, 212, 0.2), rgba(16, 185, 129, 0.1))' : 'transparent',
                      border: isActive ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid transparent',
                      color: isActive ? '#fff' : '#94a3b8',
                      fontSize: '0.84rem',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'space-between',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {sec.title}
                    </span>
                    <ChevronRight size={14} color={isActive ? "#06b6d4" : "#64748b"} />
                  </button>
                )
              })}
            </div>

          </div>

          {/* MAIN READER PANEL */}
          <div className="glass-panel" style={{ padding: '36px 40px', borderRadius: '20px', background: '#141117', border: '1px solid rgba(255, 255, 255, 0.08)', minHeight: '600px' }}>
            
            {/* Title & Top Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '3px 10px', borderRadius: '6px' }}>
                  Module {cppSectionIdx + 1} of {cppNotesData.length}
                </span>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', margin: '8px 0 0 0' }}>
                  {activeSection.title}
                </h2>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  disabled={cppSectionIdx === 0}
                  onClick={() => setCppSectionIdx(prev => Math.max(0, prev - 1))}
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '6px 14px', borderRadius: '6px', cursor: cppSectionIdx === 0 ? 'not-allowed' : 'pointer', opacity: cppSectionIdx === 0 ? 0.5 : 1, fontSize: '0.8rem', fontWeight: 700 }}
                >
                  ← Prev Module
                </button>
                <button 
                  disabled={cppSectionIdx === cppNotesData.length - 1}
                  onClick={() => setCppSectionIdx(prev => Math.min(cppNotesData.length - 1, prev + 1))}
                  style={{ background: '#10b981', border: 'none', color: '#000', padding: '6px 14px', borderRadius: '6px', cursor: cppSectionIdx === cppNotesData.length - 1 ? 'not-allowed' : 'pointer', opacity: cppSectionIdx === cppNotesData.length - 1 ? 0.5 : 1, fontSize: '0.8rem', fontWeight: 800 }}
                >
                  Next Module →
                </button>
              </div>
            </div>

            {/* Formatted Content */}
            <div style={{ color: '#e2e8f0', fontSize: '0.95rem' }}>
              {renderFormattedMarkdown(activeSection.content)}
            </div>

            {/* Bottom Next Section Button */}
            <div style={{ marginTop: '48px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Source Notes: <strong>Avinash Tare</strong> (avinashtare/CPP-Notes)
              </span>

              {cppSectionIdx < cppNotesData.length - 1 && (
                <button 
                  onClick={() => setCppSectionIdx(prev => prev + 1)}
                  style={{ background: 'linear-gradient(90deg, #10b981, #06b6d4)', border: 'none', color: '#000', fontWeight: 800, padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Continue to {cppNotesData[cppSectionIdx + 1]?.title} <ArrowRight size={16} />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    )
  }

  // =========================================================
  // VIEW 3: COURSES CATALOG PAGE (WITH C++ & SYSTEM DESIGN CARDS)
  // =========================================================
  return (
    <div className="container animate-fade" style={{ paddingTop: '32px', paddingBottom: '80px' }}>
      
      {/* Catalog Header */}
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 54px auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '6px 16px', borderRadius: '20px', color: '#06b6d4', fontSize: '0.85rem', fontWeight: 700, marginBottom: '16px' }}>
          <Sparkles size={16} /> KeetCode Courses & Learning Hub
        </div>

        <h1 style={{ fontSize: '2.8rem', fontWeight: 900, color: '#fff', margin: '0 0 14px 0', letterSpacing: '-1px' }}>
          Explore Platform Courses
        </h1>

        <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.6 }}>
          Master C++ language fundamentals, read 28 System Design chapters with live architecture diagrams (Ad Click Event Aggregation, Kafka, Rate Limiter), and practice Tier-1 DSA patterns.
        </p>
      </div>

      {/* Courses Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '30px' }}>
        
        {/* CARD 1: C++ LANGUAGE COURSE */}
        <div className="glass-panel glow-primary" style={{ 
          padding: '36px 30px', 
          borderRadius: '20px', 
          background: 'linear-gradient(145deg, rgba(24, 20, 28, 0.95), rgba(12, 10, 16, 0.95))',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#06b6d4', background: 'rgba(6, 182, 212, 0.15)', padding: '5px 12px', borderRadius: '8px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                26 Complete Notes Modules
              </span>
              <BookOpen size={20} color="#06b6d4" />
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', margin: '0 0 12px 0', letterSpacing: '-0.3px' }}>
              C++ Language Course
            </h2>

            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '22px' }}>
              Complete C++ programming course covering syntax, memory layout, pointers, OOPs, STL, and escape sequences with <strong>26 In-App Readable Notes Sections</strong>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#e2e8f0' }}>
                <CheckCircle2 size={16} color="#10b981" /> 26 Interactive In-App Notes Chapters
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#e2e8f0' }}>
                <CheckCircle2 size={16} color="#10b981" /> Formatted Markdown Tables & Diagrams
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#e2e8f0' }}>
                <CheckCircle2 size={16} color="#10b981" /> Runnable C++ Snippets with Copy
              </div>
            </div>
          </div>

          <button 
            onClick={() => setSelectedCourse('cpp-lang')}
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', borderRadius: '12px', fontWeight: 800, fontSize: '0.95rem', justifyContent: 'center' }}
          >
            Read C++ Notes & Course <ArrowRight size={18} />
          </button>
        </div>

        {/* CARD 2: TIER-1 SYSTEM DESIGN NOTES COURSE (FEATURING AD CLICK EVENT AGGREGATION & ARCHITECTURE DIAGRAMS) */}
        <div className="glass-panel glow-secondary" style={{ 
          padding: '36px 30px', 
          borderRadius: '20px', 
          background: 'linear-gradient(145deg, rgba(28, 22, 16, 0.95), rgba(16, 12, 8, 0.95))',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f59e0b', background: 'rgba(245, 158, 11, 0.15)', padding: '5px 12px', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                28 System Design Chapters
              </span>
              <Cpu size={20} color="#f59e0b" />
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', margin: '0 0 12px 0', letterSpacing: '-0.3px' }}>
              System Design Notes
            </h2>

            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '22px' }}>
              Full System Design Interview notes featuring <strong>Ad Click Event Aggregation</strong>, Rate Limiter, Kafka Message Queues, Payment Systems, and Google Maps architecture with <strong>Visual Architecture Diagrams</strong>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#e2e8f0' }}>
                <CheckCircle2 size={16} color="#f59e0b" /> Ad Click Event Aggregation & Architecture Flow
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#e2e8f0' }}>
                <CheckCircle2 size={16} color="#f59e0b" /> Embedded Visual System Architecture Diagrams
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#e2e8f0' }}>
                <CheckCircle2 size={16} color="#f59e0b" /> 28 Full High-Level Design Chapters
              </div>
            </div>
          </div>

          <button 
            onClick={() => setSelectedCourse('system-design')}
            className="btn btn-secondary"
            style={{ width: '100%', padding: '14px', borderRadius: '12px', fontWeight: 800, fontSize: '0.95rem', justifyContent: 'center', background: 'linear-gradient(90deg, #f59e0b, #d97706)', color: '#000', border: 'none' }}
          >
            Read System Design Notes <ArrowRight size={18} />
          </button>
        </div>

        {/* CARD 3: TIER-1 DSA PATTERNS COURSE */}
        <div className="glass-panel" style={{ 
          padding: '36px 30px', 
          borderRadius: '20px', 
          background: 'rgba(20, 18, 22, 0.85)', 
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', padding: '5px 12px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                15 Core Patterns
              </span>
              <Layers size={20} color="#10b981" />
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', margin: '0 0 12px 0', letterSpacing: '-0.3px' }}>
              DSA Pattern Sheets
            </h2>

            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '22px' }}>
              Master structural coding patterns like Two Pointers, Sliding Window, Monotonic Stack, and Tree Traversals with live interactive arrow visualizers.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#e2e8f0' }}>
                <CheckCircle2 size={16} color="#06b6d4" /> 15 Structural Problem Sheets
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#e2e8f0' }}>
                <CheckCircle2 size={16} color="#06b6d4" /> Step-by-Step Pointer Animations
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#e2e8f0' }}>
                <CheckCircle2 size={16} color="#06b6d4" /> Top Company Interview Questions
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigateTo('problems')}
            className="btn btn-secondary"
            style={{ width: '100%', padding: '14px', borderRadius: '12px', fontWeight: 800, fontSize: '0.95rem', justifyContent: 'center' }}
          >
            Explore DSA Sheets <ArrowRight size={18} />
          </button>
        </div>

      </div>

      {/* AI CHAT ASSISTANT DRAWER */}
      <AIChatDrawer 
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        title={selectedCourse === 'system-design' ? (systemDesignNotesData[sdSectionIdx]?.title || 'System Design') : selectedCourse === 'cpp-lang' ? (cppNotesData[cppSectionIdx]?.title || 'C++ Course') : 'KeetCode Courses'}
        pageContext={selectedCourse === 'system-design' ? `System Design Chapter: ${systemDesignNotesData[sdSectionIdx]?.title}\nContent:\n${systemDesignNotesData[sdSectionIdx]?.content}` : selectedCourse === 'cpp-lang' ? `C++ Module: ${cppNotesData[cppSectionIdx]?.title}\nContent:\n${cppNotesData[cppSectionIdx]?.content}` : 'KeetCode Courses Hub'}
      />

    </div>
  )
}
