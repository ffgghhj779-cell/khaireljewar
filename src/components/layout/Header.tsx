'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import LanguageSwitch from './LanguageSwitch'
import { cn } from '@/lib/utils/cn'

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
  const isAr = lang === 'ar'
  const navItems = navigation[lang as keyof typeof navigation] || navigation.en

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-dark shadow-2xl border-b border-white/5 py-4">
      <Container>
        <nav className="flex items-center justify-between relative z-[101]">
          <Link
            href={`/${lang}`}
            className="relative z-[102] flex items-center gap-3 shrink-0 cursor-pointer pointer-events-auto"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Image
              src="/images/logo/khair-aljaar-logo-white.svg"
              alt="KHAIR ALJAAR FOODS"
              width={180}
              height={48}
              className="h-11 w-auto"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1 xl:gap-2 relative z-[102] pointer-events-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={`/${lang}${item.href}`}
                className={cn(
                  'relative z-[102] px-3 py-2 text-xs font-semibold tracking-wide uppercase transition-colors',
                  'text-white/90 hover:text-primary cursor-pointer pointer-events-auto',
                  isAr ? 'font-ibm-arabic' : 'font-inter'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 relative z-[102] pointer-events-auto">
            <LanguageSwitch lang={lang} />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="lg:hidden relative z-[102] text-white cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden relative z-[102] mt-4 rounded-2xl border border-white/10 bg-dark-800/95 backdrop-blur-xl shadow-2xl pointer-events-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={`/${lang}${item.href}`}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block px-5 py-3.5 text-sm font-semibold text-white/90 border-b border-white/5 last:border-0',
                  'hover:text-primary hover:bg-white/5 transition-colors cursor-pointer',
                  isAr ? 'font-ibm-arabic' : 'font-inter'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </header>
  )
}
