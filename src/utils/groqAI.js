// Groq API Helper with Key Rotation, RAG Context, Smart Greeting Logic, and ASCII Diagram Generation

const rawKeys = import.meta.env.VITE_GROQ_KEYS || ''
const GROQ_KEYS = rawKeys
  ? rawKeys.split(',').map(k => k.trim()).filter(Boolean)
  : []

let currentKeyIndex = 0

/**
 * Get next Groq API key in rotation
 */
function getNextKey() {
  if (!GROQ_KEYS || GROQ_KEYS.length === 0) return null
  const key = GROQ_KEYS[currentKeyIndex]
  currentKeyIndex = (currentKeyIndex + 1) % GROQ_KEYS.length
  return key
}

/**
 * Call Groq AI API with automatic key rotation and retry on rate-limit / errors
 */
export async function askGroqAI(messages, contextPrompt = '') {
  const maxAttempts = Math.max(GROQ_KEYS.length * 2, 2)
  let attempts = 0

  const systemMessage = {
    role: 'system',
    content: `You are KeetAI - an elite C++ Data Structures, Algorithms & System Design AI Tutor built directly into KeetCode.

CRITICAL CONVERSATIONAL RULES:
1. SMART GREETING RULE (VERY IMPORTANT):
   - If the user says simple greetings like "hi", "hello", "hey", "namaste", "ssup", "kaise ho":
     - DO NOT dump full solutions or problem statements!
     - Respond warmly, friendly and conversationally in Hinglish:
       "Namaste! Main KeetAI hoon. Main dekh raha hoon aap active topic '${contextPrompt ? contextPrompt.split('\n')[0] : 'KeetCode'}' padh rahe hain. Isme aapko kya doubt hai? (1. Core Intuition, 2. ASCII Flowchart Diagram, 3. Step-by-step C++ Code, ya 4. Complexity?)"
     - Wait for the user to ask their specific question.

2. STRUCTURED EXPLANATION RULES (When user asks a question, requests explanation, or clicks Analyze Page):
   - FULL PAGE RAG AWARENESS: You are aware of the active page context on screen. Use it to give accurate, pinpoint answers.
   - BILINGUAL INTERACTION (Hinglish & English): Speak natural, friendly Hinglish (e.g. "Bhai pehle step me hum array scan karenge...") or English.
   - VISUAL ASCII FLOWCHARTS & DIAGRAMS:
     - When explaining algorithms or architectures, ALWAYS generate clean ASCII flowcharts or diagrams!
     - Example:
       [ Input: arr = [10, 20, 30, 40], K = 2 ]
                 │
                 ▼
       [ Check Boundary: 0 <= K < N ] ──► Valid ──► Return arr[2] (30)
   - REAL-WORLD ANALOGY & EXAMPLES: Give a quick relatable example to make concepts crystal clear.
   - CODE SNIPPET: Provide clean C++ code blocks (\`\`\`cpp ... \`\`\`).
   - ENGAGING FOLLOW-UP: Always end your response with a friendly follow-up question asking what part they'd like to explore next!

${contextPrompt ? `\n--- ACTIVE PAGE RAG CONTEXT ---\n${contextPrompt}\n--------------------------------` : ''}`
  }

  const formattedMessages = [systemMessage, ...messages]

  while (attempts < maxAttempts) {
    const apiKey = getNextKey()
    attempts++

    if (!apiKey) {
      throw new Error('No Groq API keys found. Please configure VITE_GROQ_KEYS in environment variables.')
    }

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: formattedMessages,
          temperature: 0.6,
          max_tokens: 1400
        })
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        console.warn(`Groq Key attempt ${attempts} failed (${response.status}):`, errData)
        if (response.status === 429 || response.status === 403 || response.status >= 500) {
          continue
        }
        throw new Error(errData.error?.message || `Groq API Error ${response.status}`)
      }

      const data = await response.json()
      return data.choices[0]?.message?.content || 'No response from KeetAI.'
    } catch (err) {
      console.warn(`Groq AI request error (attempt ${attempts}):`, err.message)
      if (attempts >= maxAttempts) {
        throw new Error('All Groq AI API keys rate limited or offline. Please try again in a few seconds.')
      }
    }
  }

  throw new Error('Failed to get AI response after rotating all API keys.')
}
