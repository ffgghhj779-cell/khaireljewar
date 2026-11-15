'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '@/components/ui/Container'
import BrandLockup from '@/components/ui/BrandLockup'
import LanguageSwitch from './LanguageSwitch'
import CartButton from '@/components/ecom/CartButton'
import { useScrollCompact } from '@/hooks/useScrollCompact'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { cn } from '@/lib/utils/cn'
import { MOBILE_EASE_OUT } from '@/lib/constants/motion'
import { localeDisplayClass, localeFontClass, tx } from '@/lib/i18n/localize'
import { UI } from '@/lib/i18n/ui'

const NAV_HREFS = [
  { key: 'products' as const, href: '/products' },
  { key: 'about' as const, href: '/about' },
  { key: 'partners' as const, href: '/partners' },
  { key: 'quality' as const, href: '/quality' },
  { key: 'logistics' as const, href: '/logistics' },
  { key: 'contact' as const, href: '/contact' },
]

/** Cream nav — brand-forward; consumer cart + checkout */
export default function Header({ lang }: { lang: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [signedIn, setSignedIn] = useState(false)
  const isCompact = useScrollCompact()
  const pathname = usePathname()
  const font = localeFontClass(lang)
  const display = localeDisplayClass(lang)
  const navItems = NAV_HREFS.map((item) => ({
    name: tx(lang, UI.nav[item.key]),
    href: item.href,
  }))

  useEffect(() => {
    if (!isSupabaseConfigured()) return
    const supabase = createClient()
    supabase.auth.getSession().then(({ data }) => {
      setSignedIn(Boolean(data.session))
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session))
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  const isActive = (href: string) => {
    const full = `/${lang}${href}`
    if (href === '/') return pathname === `/${lang}` || pathname === `/${lang}/`
    return pathname === full || pathname.startsWith(`${full}/`)
  }

  const linkClass = (href: string) =>
    cn(
      'px-3.5 py-2 text-[13px] font-semibold transition-colors min-h-[44px] flex items-center rounded-lg',
      isActive(href)
        ? 'text-primary bg-primary/8'
        : 'text-primary/75 hover:text-primary hover:bg-primary/5',
      font
    )

  const accountLabel = signedIn
    ? tx(lang, { en: 'Account', ar: 'حسابي', ur: 'میرا اکاؤنٹ', hi: 'मेरा खाता' })
    : tx(lang, UI.nav.login)

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-[100] touch-pan-y',
        'bg-cream border-b border-primary/10',
        'transition-[padding,box-shadow] duration-300 ease-luxury',
        isCompact ? 'py-2 shadow-header' : 'py-2.5 md:py-4'
      )}
    >
      <Container>
        <nav className="flex items-center justify-between relative z-[101] gap-3">
          <div className="hidden lg:flex items-center gap-1 relative z-[102] flex-1">
            {navItems.slice(0, 3).map((item) => (
              <Link
                key={item.href}
                href={`/${lang}${item.href}`}
                className={linkClass(item.href)}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <Link
            href={`/${lang}`}
            className="relative z-[102] flex items-center justify-center shrink min-w-0 lg:flex-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            <BrandLockup lang={lang} priority compact={isCompact} tone="dark" />
          </Link>

          <div className="hidden lg:flex items-center justify-end gap-1 relative z-[102] flex-1">
            {navItems.slice(3).map((item) => (
              <Link
                key={item.href}
                href={`/${lang}${item.href}`}
                className={linkClass(item.href)}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}

            <div className="ms-2 flex items-center gap-1.5 rounded-2xl border border-farm/30 bg-farm-mist p-1">
              <LanguageSwitch lang={lang} />
              <CartButton lang={lang} />
              <Link
                href={signedIn ? `/${lang}/account` : `/${lang}/login`}
                className={cn(
                  'hidden xl:inline-flex min-h-[40px] items-center rounded-xl border border-primary/15 px-3 text-[12px] font-semibold text-primary hover:bg-primary/5',
                  font
                )}
              >
                {accountLabel}
              </Link>
              <Link
                href={`/${lang}/contact`}
                className={cn(
                  'hidden xl:inline-flex min-h-[40px] items-center rounded-xl border border-primary/15 px-3 text-[12px] font-semibold text-primary hover:bg-primary/5',
                  font
                )}
              >
                {tx(lang, UI.nav.reach)}
              </Link>
            </div>
          </div>

          <div className="lg:hidden flex items-center h-10 rounded-xl border border-farm/40 bg-farm-panel shrink-0 relative z-[120]">
            <LanguageSwitch lang={lang} variant="toolbar" showIcon />
            <div className="w-px h-4 bg-primary/20 shrink-0" aria-hidden />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="min-w-[44px] h-10 flex items-center justify-center transition-colors touch-manipulation active:scale-95 text-primary hover:bg-primary/8 rounded-e-xl"
              aria-label={
                mobileMenuOpen
                  ? tx(lang, { en: 'Close menu', ar: 'إغلاق القائمة', ur: 'مینو بند کریں', hi: 'मेनू बंद करें' })
                  : tx(lang, { en: 'Open menu', ar: 'فتح القائمة', ur: 'مینو کھولیں', hi: 'मेनू खोलें' })
              }
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: MOBILE_EASE_OUT }}
              className="lg:hidden relative z-[102] mt-3 rounded-2xl border border-primary/10 bg-cream shadow-soft overflow-hidden"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${lang}${item.href}`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'block px-5 py-4 min-h-[52px] text-[15px] font-semibold border-b border-primary/8 last:border-0',
                    'hover:bg-primary/4 transition-colors touch-manipulation',
                    isActive(item.href) ? 'text-primary bg-primary/5' : 'text-primary',
                    display
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href={signedIn ? `/${lang}/account` : `/${lang}/login`}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block px-5 py-4 min-h-[52px] text-[15px] font-semibold border-b border-primary/8',
                  'hover:bg-primary/4 transition-colors touch-manipulation text-primary',
                  display
                )}
              >
                {signedIn
                  ? tx(lang, { en: 'My account', ar: 'حسابي', ur: 'میرا اکاؤنٹ', hi: 'मेरा खाता' })
                  : tx(lang, {
                      en: 'Sign in',
                      ar: 'تسجيل الدخول',
                      ur: 'سائن ان',
                      hi: 'साइन इन',
                    })}
              </Link>
              {!signedIn && (
                <Link
                  href={`/${lang}/signup`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block px-5 py-4 min-h-[52px] text-[15px] font-semibold border-b border-primary/8',
                    'hover:bg-primary/4 transition-colors touch-manipulation text-primary',
                    display
                  )}
                >
                  {tx(lang, {
                    en: 'Create account',
                    ar: 'إنشاء حساب',
                    ur: 'اکاؤنٹ بنائیں',
                    hi: 'खाता बनाएँ',
                  })}
                </Link>
              )}
              <Link
                href={`/${lang}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block w-full px-5 py-4 min-h-[52px] text-start text-[15px] font-semibold text-primary bg-secondary',
                  display
                )}
              >
                {tx(lang, UI.cta.requestQuote)}
              </Link>
              <div className="p-4 border-t border-primary/8 flex items-center justify-between gap-3 bg-cream-deep">
                <span className={cn('text-sm text-primary/50', font)}>{tx(lang, UI.cta.switchLanguage)}</span>
                <LanguageSwitch lang={lang} variant="menu" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  )
}
