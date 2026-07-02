'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Package, Truck, ShieldCheck, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { MOBILE_EASE_OUT, TAP_SCALE } from '@/lib/constants/motion'

const NAV_ITEMS = {
  en: [
    { key: 'home', label: 'Home', href: '', icon: Home },
    { key: 'products', label: 'Products', href: '/products', icon: Package },
    { key: 'logistics', label: 'Logistics', href: '/logistics', icon: Truck },
    { key: 'quality', label: 'Quality', href: '/quality', icon: ShieldCheck },
    { key: 'contact', label: 'Contact', href: '/contact', icon: MessageCircle },
  ],
  ar: [
    { key: 'home', label: 'الرئيسية', href: '', icon: Home },
    { key: 'products', label: 'المنتجات', href: '/products', icon: Package },
    { key: 'logistics', label: 'اللوجستيات', href: '/logistics', icon: Truck },
    { key: 'quality', label: 'الجودة', href: '/quality', icon: ShieldCheck },
    { key: 'contact', label: 'اتصل', href: '/contact', icon: MessageCircle },
  ],
}

export default function MobileBottomNav({ lang }: { lang: string }) {
  const pathname = usePathname()
  const isAr = lang === 'ar'
  const items = NAV_ITEMS[lang as keyof typeof NAV_ITEMS] || NAV_ITEMS.en

  const isActive = (href: string) => {
    const full = `/${lang}${href}`
    if (href === '') return pathname === `/${lang}` || pathname === `/${lang}/`
    return pathname.startsWith(full)
  }

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-[90] mobile-bottom-nav gpu-accelerated will-change-transform"
      aria-label={isAr ? 'التنقل الرئيسي' : 'Main navigation'}
    >
      <div className="mx-3 mb-3 rounded-2xl border border-white/60 bg-white/75 backdrop-blur-2xl shadow-[0_8px_32px_rgba(13,27,42,0.12)]">
        <ul className="flex items-stretch justify-around px-1 py-1">
          {items.map((item) => {
            const active = isActive(item.href)
            const Icon = item.icon

            return (
              <li key={item.key} className="flex-1 min-w-0">
                <Link href={`/${lang}${item.href}`} className="block">
                  <motion.span
                    whileTap={TAP_SCALE}
                    transition={{ duration: 0.12, ease: MOBILE_EASE_OUT }}
                    className={cn(
                      'relative flex flex-col items-center justify-center gap-0.5',
                      'min-h-[48px] min-w-[48px] px-2 py-2 rounded-xl touch-manipulation',
                      active ? 'text-primary' : 'text-dark/55'
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="mobile-nav-pill"
                        className="absolute inset-1 rounded-xl bg-primary/10"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      />
                    )}
                    <Icon className="relative w-5 h-5 shrink-0" strokeWidth={active ? 2.5 : 2} />
                    <span
                      className={cn(
                        'relative text-[10px] font-bold leading-none truncate max-w-full',
                        isAr ? 'font-ibm-arabic' : 'font-inter'
                      )}
                    >
                      {item.label}
                    </span>
                  </motion.span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
