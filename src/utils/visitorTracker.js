// 100% Real Authentic Live Visitor Counter API Integration (Powered by counterapi.dev)

let cachedRealVisitorCount = 1

/**
 * Fetch and increment 100% genuine live visitor count from global Counter API
 */
export async function fetchRealVisitorCount() {
  try {
    // Only increment once per session in localStorage to keep unique visit stats accurate
    const sessionKey = 'keetcode_session_tracked'
    const isTracked = sessionStorage.getItem(sessionKey)

    const url = isTracked
      ? 'https://api.counterapi.dev/v1/keetcode_prod_2026/visits' // Just read real count
      : 'https://api.counterapi.dev/v1/keetcode_prod_2026/visits/up' // Increment real count for new visitor

    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      if (data && typeof data.count === 'number') {
        cachedRealVisitorCount = data.count
        sessionStorage.setItem(sessionKey, 'true')
        window.dispatchEvent(new CustomEvent('visitor-count-updated', { detail: data.count }))
        return data.count
      }
    }
  } catch (e) {
    console.warn("Counter API notice:", e)
  }
  return cachedRealVisitorCount
}

/**
 * Get current cached real count
 */
export function getRealVisitorCount() {
  return cachedRealVisitorCount
}
