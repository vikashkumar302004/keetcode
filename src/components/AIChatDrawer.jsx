import React, { useState, useRef, useEffect } from 'react'
import { Sparkles, Send, X, Bot, User, RefreshCw, Plus, Lightbulb, MessageSquare, Code, Cpu } from 'lucide-react'
import { askGroqAI } from '../utils/groqAI'

export default function AIChatDrawer({ isOpen, onClose, pageContext = '', title = 'KeetAI Assistant' }) {
  const initialGreeting = {
    role: 'assistant',
    content: `👋 **Namaste! I am KeetAI** - your C++ DSA & System Design AI Tutor.\n\nI have **100% Page Awareness** for **"${title}"**.\n\nAap mujhse **Hinglish** ya **English** me kuch bhi pooch sakte hain! Click **"Analyze Page"** ya niche di gayi tabs choose karein!`
  }

  const [messages, setMessages] = useState([initialGreeting])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  // Clear memory & start new conversation
  const handleNewConversation = () => {
    setMessages([
      {
        role: 'assistant',
        content: `🔄 **New Chat Started!**\n\nI am still aware of **"${title}"**. Aapka kya question hai bhai?`
      }
    ])
    setInput('')
  }

  const handleSend = async (customPrompt = null) => {
    const textToSend = customPrompt || input.trim()
    if (!textToSend || loading) return

    const newMessages = [...messages, { role: 'user', content: textToSend }]
    setMessages(newMessages)
    if (!customPrompt) setInput('')
    setLoading(true)

    try {
      // Pass entire conversation history for full multi-turn memory
      const apiMessages = newMessages.map(m => ({
        role: m.role,
        content: m.content
      }))

      const reply = await askGroqAI(apiMessages, pageContext)
      setMessages([...newMessages, { role: 'assistant', content: reply }])
    } catch (err) {
      console.error(err)
      setMessages([
        ...newMessages,
        { role: 'assistant', content: `⚠️ **AI Notice**: ${err.message || 'Rate limit reached. Please try again.'}` }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyzePage = () => {
    handleSend(`Bhai is page ("${title}") ko deeply analyze karo aur Hinglish me:
1. Core Intuition & Real-world Example do.
2. An ASCII Flowchart / Diagram banao.
3. Optimal Time & Space Complexity explain karo.`)
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '450px',
      maxWidth: '100vw',
      height: '100vh',
      background: '#070912',
      borderLeft: '1px solid rgba(6, 182, 212, 0.3)',
      boxShadow: '-10px 0 50px rgba(0,0,0,0.9)',
      zIndex: 999999,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'inherit',
      animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      
      {/* Header Bar */}
      <div style={{
        padding: '16px 20px',
        background: '#0c0f1e',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(6, 182, 212, 0.15)',
            border: '1.5px solid #06b6d4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 18px rgba(6, 182, 212, 0.35)'
          }}>
            <Sparkles size={18} color="#06b6d4" />
          </div>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>KeetAI Tutor</span>
              <span style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#10b981', fontSize: '0.66rem', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                Llama 70B
              </span>
            </div>
            <span style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              ● RAG Page Context Active
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* New Chat Button */}
          <button
            onClick={handleNewConversation}
            title="Start New Conversation"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#cbd5e1',
              padding: '5px 10px',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Plus size={13} color="#06b6d4" />
            <span>New Chat</span>
          </button>

          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* RAG Context Banner & Action */}
      <div style={{
        padding: '10px 16px',
        background: '#0e1224',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px'
      }}>
        <div style={{ fontSize: '0.78rem', color: '#cbd5e1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '240px' }}>
          <strong style={{ color: '#06b6d4' }}>Active Topic:</strong> {title}
        </div>

        <button
          onClick={handleAnalyzePage}
          disabled={loading}
          style={{
            background: 'linear-gradient(90deg, #06b6d4, #10b981)',
            color: '#000',
            border: 'none',
            padding: '5px 12px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 900,
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 2px 10px rgba(6, 182, 212, 0.3)'
          }}
        >
          <Lightbulb size={13} color="#000" />
          <span>Analyze Page</span>
        </button>
      </div>

      {/* Chat Messages Area */}
      <div style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        background: '#04060d'
      }}>
        {messages.map((m, idx) => (
          <div key={idx} style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-start',
            flexDirection: m.role === 'user' ? 'row-reverse' : 'row'
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: m.role === 'user' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(6, 182, 212, 0.2)',
              border: `1px solid ${m.role === 'user' ? '#8b5cf6' : '#06b6d4'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {m.role === 'user' ? <User size={14} color="#8b5cf6" /> : <Bot size={14} color="#06b6d4" />}
            </div>

            <div style={{
              maxWidth: '84%',
              padding: '12px 16px',
              borderRadius: m.role === 'user' ? '14px 2px 14px 14px' : '2px 14px 14px 14px',
              background: m.role === 'user' ? 'rgba(139, 92, 246, 0.15)' : '#0d101f',
              border: `1px solid ${m.role === 'user' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
              color: '#f8fafc',
              fontSize: '0.88rem',
              lineHeight: 1.65,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontFamily: m.content.includes('```') || m.content.includes('[') ? 'inherit' : 'inherit'
            }}>
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.2)', border: '1px solid #06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RefreshCw size={14} color="#06b6d4" className="animate-spin" />
            </div>
            <div style={{ background: '#0d101f', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '10px 14px', borderRadius: '2px 14px 14px 14px', color: '#06b6d4', fontSize: '0.85rem', fontWeight: 700 }}>
              KeetAI is analyzing & generating response...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestion Action Chips */}
      <div style={{ padding: '8px 14px', background: '#0a0d1a', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '6px', overflowX: 'auto' }}>
        {[
          "💬 Hinglish me samjhao simple example se",
          "🗺️ Draw ASCII Flowchart & Diagram",
          "💻 Step-by-step C++ Code Walkthrough",
          "⏱️ Time & Space Complexity analysis"
        ].map((chip, i) => (
          <button
            key={i}
            onClick={() => handleSend(chip)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
              padding: '4px 10px',
              color: '#cbd5e1',
              fontSize: '0.72rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              cursor: 'pointer'
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Form Footer */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        style={{
          padding: '12px 16px',
          background: '#0c0f1e',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}
      >
        <input
          type="text"
          placeholder="Type in Hinglish or English..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          style={{
            flex: 1,
            background: '#04060d',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '10px',
            padding: '10px 14px',
            color: '#fff',
            fontSize: '0.88rem',
            outline: 'none'
          }}
        />

        <button
          type="submit"
          disabled={!input.trim() || loading}
          style={{
            background: input.trim() && !loading ? 'linear-gradient(90deg, #06b6d4, #10b981)' : 'rgba(255,255,255,0.08)',
            border: 'none',
            borderRadius: '10px',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: input.trim() && !loading ? 'pointer' : 'not-allowed'
          }}
        >
          <Send size={18} color={input.trim() && !loading ? '#000' : '#64748b'} />
        </button>
      </form>

    </div>
  )
}
