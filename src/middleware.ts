import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { CANONICAL_HOST, shouldRedirectHost } from '@/lib/seo'
import { updateSession } from '@/lib/supabase/middleware'
import { verifyAdminSession, ADMIN_COOKIE } from '@/lib/admin/auth'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const host = request.headers.get('host') ?? ''
  const path = url.pathname

  // ── Admin panel protection ────────────────────────────────────────────────
  if (path.startsWith('/admin')) {
    if (path === '/admin/login') {
      // Already on login — pass through (avoid redirect loop)
      return NextResponse.next()
    }
    const session = request.cookies.get(ADMIN_COOKIE)?.value
    const valid = await verifyAdminSession(session)
    if (!valid) {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  if (shouldRedirectHost(host)) {
    url.protocol = 'https:'
    url.hostname = CANONICAL_HOST
    url.port = ''
    if (url.pathname === '/') {
      url.pathname = '/en'
    }
    return NextResponse.redirect(url, 308)
  }

  const certifications = url.pathname.match(/^\/(en|ar)\/certifications\/?$/)
  if (certifications) {
    url.pathname = `/${certifications[1]}/quality`
    return NextResponse.redirect(url, 308)
  }

  if (url.pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url))
  }

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return updateSession(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
