import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { CANONICAL_HOST, shouldRedirectHost } from '@/lib/seo'

async function withSupabase(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  await supabase.auth.getUser()
  return { supabase, response }
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const host = request.headers.get('host') ?? ''
  const path = url.pathname
  const supabaseReady = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  // ── Admin panel protection (Supabase session + profiles.role = admin) ──
  if (path.startsWith('/admin')) {
    if (!supabaseReady) {
      if (path === '/admin/login') return NextResponse.next()
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    const { supabase, response } = await withSupabase(request)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (path === '/admin/login') {
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .maybeSingle()
        if (profile?.role === 'admin') {
          return NextResponse.redirect(new URL('/admin', request.url))
        }
      }
      return response
    }

    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    return response
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

  if (supabaseReady) {
    const { response } = await withSupabase(request)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
