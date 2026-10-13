import { NextResponse } from 'next/server'
import { requireAdminSession } from '@/lib/auth/session'

/** Returns null when the caller is an admin; otherwise a 401/403 JSON response. */
export async function denyUnlessAdmin(): Promise<NextResponse | null> {
  const session = await requireAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}
