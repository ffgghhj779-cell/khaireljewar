import { NextResponse } from 'next/server'
import { createSessionToken, ADMIN_COOKIE, SESSION_MAX_AGE } from '@/lib/admin/auth'

export const runtime = 'nodejs'

// Simple in-process rate limiter (works per-instance; good enough for a single admin)
const attempts = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = attempts.get(ip)
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + 60_000 * 15 })
    return true // allowed
  }
  if (entry.count >= 5) return false // blocked
  entry.count++
  return true
}

export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again in 15 minutes.' },
      { status: 429 }
    )
  }

  const body = await req.json().catch(() => ({}))
  const { password } = body as { password?: string }

  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    return NextResponse.json({ error: 'Admin not configured' }, { status: 503 })
  }

  if (!password || password !== adminPassword) {
    // Constant-time delay to prevent timing attacks
    await new Promise((r) => setTimeout(r, 500))
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // Clear rate limit on success
  attempts.delete(ip)

  const token = await createSessionToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  })
  return res
}
