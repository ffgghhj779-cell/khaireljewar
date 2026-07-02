'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Package, ShieldCheck, MessageCircle, ShoppingBag } from 'lucide-react'
import { useQuoteItems, useQuoteCartOpen, useQuoteStore } from '@/store/useQuoteStore'
import { cn } from '@/lib/utils/cn'
import { MOBILE_EASE_OUT, TAP_SCALE } from '@/lib/constants/motion'

type NavItem =
  | { key: string; label: string; href: string; icon: typeof Home; isCart?: false }
  | { key: 'cart'; label: string; isCart: true; icon: typeof ShoppingBag }

const NAV_ITEMS: Record<'en' | 'ar', NavItem[]> = {
  en: [
    { key: 'home', label: 'Home', href: '', icon: Home },
    { key: 'products', label: 'Products', href: '/products', icon: Package },
    { key: 'cart', label: 'Quote', isCart: true, icon: ShoppingBag },
    { key: 'quality', label: 'Quality', href: '/quality', icon: ShieldCheck },
    { key: 'contact', label: 'Contact', href: '/contact', icon: MessageCircle },
  ],
  ar: [
    { key: 'home', label: 'الرئيسية', href: '', icon: Home },
    { key: 'products', label: 'المنتجات', href: '/products', icon: Package },
    { key: 'cart', label: 'تسعير', isCart: true, icon: ShoppingBag },
    { key: 'quality', label: 'الجودة', href: '/quality', icon: ShieldCheck },
    { key: 'contact', label: 'اتصل', href: '/contact', icon: MessageCircle },
  ],
}

export default function MobileBottomNav({ lang }: { lang: string }) {
  const pathname = usePathname()
  const isAr = lang === 'ar'
  const items = useQuoteItems()
  const isOpen = useQuoteCartOpen()
  const toggleCart = useQuoteStore((s) => s.toggleCart)
  const cartCount = items.length
  const navItems = NAV_ITEMS[lang as keyof typeof NAV_ITEMS] || NAV_ITEMS.en

  const isActive = (href: string) => {
    const full = `/${lang}${href}`
    if (href === '') return pathname === `/${lang}` || pathname === `/${lang}/`
    return pathname.startsWith(full)
  }

  return (
    <nav
      className="lg:hidden fixed inset-x-0 bottom-0 z-[100] border-t border-gray-200/80 bg-white/95 backdrop-blur-md pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-4px_24px_rgba(13,27,42,0.08)]"
      aria-label={isAr ? 'التنقل الرئيسي' : 'Main navigation'}
    >
      <ul className="flex items-end justify-around max-w-lg mx-auto px-2 pt-1.5 pb-2">
        {navItems.map((item) => {
          const Icon = item.icon

          if (item.isCart) {
            return (
              <li key={item.key} className="flex-1 flex justify-center min-w-0">
                <motion.button
                  type="button"
                  onClick={toggleCart}
                  whileTap={TAP_SCALE}
                  transition={{ duration: 0.12, ease: MOBILE_EASE_OUT }}
                  aria-label={isAr ? 'سلة التسعير' : 'Quote cart'}
                  aria-expanded={isOpen}
                  className={cn(
                    'relative -mt-4 flex flex-col items-center justify-center',
                    'min-w-[52px] min-h-[52px] rounded-2xl touch-pan-y',
                    'bg-primary text-dark border-2 border-white shadow-[0_8px_24px_rgba(0,201,215,0.45)]'
                  )}
                >
                  <Icon className="w-5 h-5" strokeWidth={2.25} />
                  <span className={cn('text-[9px] font-bold mt-0.5', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                    {item.label}
                  </span>
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span
                        key={cartCount}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="absolute -top-1 -end-1 min-w-[18px] h-[18px] px-1 rounded-full bg-dark text-white text-[9px] font-bold flex items-center justify-center"
                      >
                        {cartCount > 9 ? '9+' : cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </li>
            )
          }

          const active = isActive(item.href)

          return (
            <li key={item.key} className="flex-1 min-w-0">
              <Link href={`/${lang}${item.href}`} className="block">
                <motion.span
                  whileTap={TAP_SCALE}
                  transition={{ duration: 0.12, ease: MOBILE_EASE_OUT }}
                  className={cn(
                    'relative flex flex-col items-center justify-center gap-0.5',
                    'min-h-[48px] min-w-[48px] px-1 py-1.5 rounded-xl touch-pan-y',
                    active ? 'text-primary' : 'text-dark/55'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="mobile-nav-pill"
                      className="absolute inset-0.5 rounded-xl bg-primary/10"
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
    </nav>
  )
}
