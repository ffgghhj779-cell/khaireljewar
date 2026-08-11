'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '@/components/ui/Container'
import BrandLockup from '@/components/ui/BrandLockup'
import LanguageSwitch from './LanguageSwitch'
import { useScrollCompact } from '@/hooks/useScrollCompact'
import { cn } from '@/lib/utils/cn'
import { MOBILE_EASE_OUT } from '@/lib/constants/motion'

const navigation = {
  en: [
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Quality', href: '/quality' },
    { name: 'Logistics', href: '/logistics' },
    { name: 'Contact', href: '/contact' },
  ],
  ar: [
    { name: 'المنتجات', href: '/products' },
    { name: 'من نحن', href: '/about' },
    { name: 'الجودة', href: '/quality' },
    { name: 'اللوجستيات', href: '/logistics' },
    { name: 'اتصل بنا', href: '/contact' },
  ],
}

/** Cream nav — brand-forward, active states; quote → contact (Zid owns cart) */
export default function Header({ lang }: { lang: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isCompact = useScrollCompact()
  const pathname = usePathname()
  const isAr = lang === 'ar'
  const navItems = navigation[lang as keyof typeof navigation] || navigation.en

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
      isAr ? 'font-arabic' : 'font-sans'
    )

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
            {navItems.slice(0, 2).map((item) => (
              <Link
                key={item.name}
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

          <div className="hidden lg:flex items-center justify-end gap-0.5 relative z-[102] flex-1">
            {navItems.slice(2).map((item) => (
              <Link
                key={item.name}
                href={`/${lang}${item.href}`}
                className={linkClass(item.href)}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}

            <Link
              href={`/${lang}/contact`}
              className={cn(
                'ms-2 me-1 inline-flex min-h-[40px] items-center rounded-xl bg-primary px-3.5 text-[12px] font-semibold text-cream hover:bg-primary-700',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {isAr ? 'اطلب عرض سعر' : 'Request quote'}
            </Link>

            <LanguageSwitch lang={lang} className="ms-1" />
          </div>

          <div className="lg:hidden flex items-center h-10 rounded-xl overflow-hidden bg-primary shrink-0">
            <LanguageSwitch lang={lang} variant="toolbar" showIcon />
            <div className="w-px h-4 bg-cream/20 shrink-0" aria-hidden />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="min-w-[44px] h-10 flex items-center justify-center transition-colors touch-manipulation active:scale-95 text-cream hover:bg-cream/10"
              aria-label={mobileMenuOpen ? (isAr ? 'إغلاق القائمة' : 'Close menu') : (isAr ? 'فتح القائمة' : 'Open menu')}
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
                  key={item.name}
                  href={`/${lang}${item.href}`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'block px-5 py-4 min-h-[52px] text-[15px] font-semibold border-b border-primary/8 last:border-0',
                    'hover:bg-primary/4 transition-colors touch-manipulation',
                    isActive(item.href) ? 'text-primary bg-primary/5' : 'text-primary',
                    isAr ? 'font-arabic' : 'font-display'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href={`/${lang}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block w-full px-5 py-4 min-h-[52px] text-start text-[15px] font-semibold text-cream bg-primary',
                  isAr ? 'font-arabic' : 'font-display'
                )}
              >
                {isAr ? 'اطلب عرض سعر' : 'Request a quote'}
              </Link>
              <div className="p-4 border-t border-primary/8 flex items-center justify-between gap-3 bg-cream-deep">
                <span className={cn('text-sm text-primary/50', isAr ? 'font-arabic' : 'font-sans')}>
                  {isAr ? 'اللغة' : 'Language'}
                </span>
                <LanguageSwitch lang={lang} variant="menu" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  )
}
