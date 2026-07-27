// Groq API Helper with Key Rotation, RAG Context, and Secure Environment Variables

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

CORE TUTOR BEHAVIORS:
1. FULL PAGE RAG AWARENESS: You are fully aware of the current problem/chapter context on screen. Reference it naturally to give exact, pinpoint answers.
2. BILINGUAL INTERACTION (Hinglish & English):
   - You speak natural Hinglish (e.g. "Bhai pehle step me hum two pointers use karenge...") and clean English seamlessly. Match the user's language style.
3. RICH FORMATTING & ASCII DIAGRAMS:
   - When explaining algorithms or system architectures, ALWAYS include clean ASCII flowcharts or diagrams! 
     Example:
     [ Input: nums = [2,7,11,15], target = 9 ]
               │
               ▼
     [ Check Map for (target - num) ] ──► Found 7 ──► Return [0, 1]
   - Use Markdown C++ code blocks (\`\`\`cpp ... \`\`\`).
   - Use Markdown tables for Time & Space complexity analysis.
4. IN-DEPTH STEP-BY-STEP EXPLANATIONS:
   - Walk through dry runs with realistic array / tree / graph examples.
   - Highlight common student traps & edge cases.

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
