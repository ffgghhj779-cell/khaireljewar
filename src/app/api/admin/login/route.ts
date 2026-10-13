import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

/** Legacy password cookie login removed — use Supabase email/password at /admin/login */
export async function POST() {
  return NextResponse.json(
    {
      error: 'Use /admin/login with your admin email and password (Supabase Auth).',
    },
    { status: 410 }
  )
}
