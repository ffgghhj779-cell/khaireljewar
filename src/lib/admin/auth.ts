// Admin session management — works in both Edge (middleware) and Node (API routes)

export const ADMIN_COOKIE = 'ka_admin'
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

/**
 * Creates a deterministic HMAC-SHA256 token from the admin password + session secret.
 * Stateless — no DB needed. Rotates only when password or secret changes.
 */
export async function createSessionToken(): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET ?? 'fallback-change-me'
  const password = process.env.ADMIN_PASSWORD ?? ''
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(password))
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function verifyAdminSession(cookieValue: string | undefined): Promise<boolean> {
  if (!cookieValue) return false
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) return false
  try {
    const expected = await createSessionToken()
    return cookieValue === expected
  } catch {
    return false
  }
}
