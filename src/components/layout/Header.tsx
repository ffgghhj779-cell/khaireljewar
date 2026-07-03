'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import Container from '@/components/ui/Container'
import BrandLockup from '@/components/ui/BrandLockup'
import LanguageSwitch from './LanguageSwitch'
import { useQuoteItems, useQuoteStore } from '@/store/useQuoteStore'
import { useScrollCompact } from '@/hooks/useScrollCompact'
import { cn } from '@/lib/utils/cn'
import { MOBILE_EASE_OUT, TAP_SCALE } from '@/lib/constants/motion'

const navigation = {
  en: [
    { name: 'Home', href: '' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Logistics', href: '/logistics' },
    { name: 'Quality', href: '/quality' },
    { name: 'Export Markets', href: '/export-markets' },
    { name: 'Contact', href: '/contact' },
  ],
  ar: [
    { name: 'الرئيسية', href: '' },
    { name: 'من نحن', href: '/about' },
    { name: 'المنتجات', href: '/products' },
    { name: 'اللوجستيات', href: '/logistics' },
    { name: 'الجودة', href: '/quality' },
    { name: 'أسواق التصدير', href: '/export-markets' },
    { name: 'اتصل بنا', href: '/contact' },
  ],
}

export default function Header({ lang }: { lang: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isCompact = useScrollCompact()
  const items = useQuoteItems()
  const toggleCart = useQuoteStore((s) => s.toggleCart)
  const isAr = lang === 'ar'
  const navItems = navigation[lang as keyof typeof navigation] || navigation.en
  const cartCount = items.length

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-[100] border-b border-white/10 shadow-2xl',
        'max-lg:bg-dark max-lg:backdrop-blur-none',
        'lg:backdrop-blur-2xl lg:bg-dark/90',
        'transition-[padding] duration-200 ease-out touch-pan-y',
        isCompact ? 'py-2' : 'py-2.5 md:py-3.5'
      )}
    >
      <Container>
        <nav className="flex items-center justify-between relative z-[101] gap-2">
          <Link
            href={`/${lang}`}
            className="relative z-[102] flex items-center gap-2 sm:gap-3 shrink min-w-0 max-w-[58%] xs:max-w-[62%] sm:max-w-[65%] lg:max-w-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            <BrandLockup lang={lang} priority compact={isCompact} />
          </Link>

          <div className="hidden lg:flex items-center gap-1 xl:gap-2 relative z-[102]">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={`/${lang}${item.href}`}
                className={cn(
                  'px-3 py-2 text-xs font-semibold tracking-wide uppercase transition-colors',
                  'text-white/90 hover:text-primary min-h-[48px] flex items-center',
                  isAr ? 'font-ibm-arabic' : 'font-inter'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 relative z-[102] shrink-0">
            <LanguageSwitch lang={lang} className="hidden lg:flex" />

            <motion.button
              type="button"
              onClick={toggleCart}
              whileTap={TAP_SCALE}
              transition={{ duration: 0.12, ease: MOBILE_EASE_OUT }}
              className="hidden lg:flex min-w-[40px] min-h-[40px] items-center justify-center text-white rounded-lg hover:bg-white/10 transition-colors relative"
              aria-label={isAr ? 'سلة التسعير' : 'Quote cart'}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 end-1 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-dark text-[9px] font-bold flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </motion.button>

            <div className="lg:hidden flex items-center h-10 rounded-xl overflow-hidden bg-primary shadow-[0_2px_12px_rgba(0,201,215,0.35)] border border-primary/80">
              <LanguageSwitch lang={lang} variant="toolbar" showIcon />
              <div className="w-px h-5 bg-dark/15 shrink-0" aria-hidden />
              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className={cn(
                  'min-w-[44px] h-10 flex items-center justify-center transition-colors touch-manipulation active:scale-95',
                  'text-dark hover:bg-dark/10',
                  mobileMenuOpen && 'bg-dark/15'
                )}
                aria-label={mobileMenuOpen ? (isAr ? 'إغلاق القائمة' : 'Close menu') : (isAr ? 'فتح القائمة' : 'Open menu')}
                aria-expanded={mobileMenuOpen}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25} aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: MOBILE_EASE_OUT }}
              className="lg:hidden relative z-[102] mt-2 rounded-2xl border border-primary/25 bg-dark/95 backdrop-blur-md shadow-2xl overflow-hidden"
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={`/${lang}${item.href}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block px-4 py-3.5 min-h-[48px] text-[15px] font-semibold text-white border-b border-white/8 last:border-0',
                    'hover:text-primary hover:bg-white/5 transition-colors touch-manipulation',
                    isAr ? 'font-ibm-arabic font-bold' : 'font-manrope'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="p-3 border-t border-white/10 flex items-center justify-between gap-3 bg-white/5">
                <span className={cn('text-xs text-white/60', isAr ? 'font-ibm-arabic' : 'font-inter')}>
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
