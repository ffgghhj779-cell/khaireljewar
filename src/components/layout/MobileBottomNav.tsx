'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Package, ShoppingCart, ShieldCheck } from 'lucide-react'
import { useCartStore } from '@/lib/commerce/cart-store'
import { cn } from '@/lib/utils/cn'

type NavItem = {
  key: string
  label: string
  href: string
  icon: typeof Home
  emphasize?: boolean
}

const NAV_ITEMS: Record<'en' | 'ar', NavItem[]> = {
  en: [
    { key: 'home', label: 'Home', href: '', icon: Home },
    { key: 'products', label: 'Products', href: '/products', icon: Package },
    { key: 'cart', label: 'Cart', href: '/cart', icon: ShoppingCart, emphasize: true },
    { key: 'quality', label: 'Quality', href: '/quality', icon: ShieldCheck },
  ],
  ar: [
    { key: 'home', label: 'الرئيسية', href: '', icon: Home },
    { key: 'products', label: 'المنتجات', href: '/products', icon: Package },
    { key: 'cart', label: 'السلة', href: '/cart', icon: ShoppingCart, emphasize: true },
    { key: 'quality', label: 'الجودة', href: '/quality', icon: ShieldCheck },
  ],
}

export default function MobileBottomNav({ lang }: { lang: string }) {
  const pathname = usePathname()
  const cartCount = useCartStore((s) => s.itemCount())
  const isAr = lang === 'ar'
  const navItems = NAV_ITEMS[lang as keyof typeof NAV_ITEMS] || NAV_ITEMS.en

  const isActive = (href: string) => {
    const full = `/${lang}${href}`
    if (href === '') return pathname === `/${lang}` || pathname === `/${lang}/`
    return pathname.startsWith(full)
  }

  return (
    <nav
      className="lg:hidden fixed inset-x-0 bottom-0 z-[100] border-t border-primary/10 bg-cream pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-4px_16px_rgba(26,51,42,0.08)]"
      aria-label={isAr ? 'التنقل الرئيسي' : 'Main navigation'}
    >
      <ul className="flex items-end justify-around max-w-lg mx-auto px-1.5 pt-1.5 pb-1.5">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          if (item.emphasize) {
            return (
              <li key={item.key} className="flex-1 flex justify-center min-w-0">
                <Link
                  href={`/${lang}${item.href}`}
                  className={cn(
                    'relative -mt-3.5 flex flex-col items-center justify-center',
                    'min-w-[52px] min-h-[52px] rounded-2xl touch-manipulation',
                    'bg-farm text-cream border-2 border-cream shadow-[0_8px_20px_rgba(43,182,115,0.35)]',
                    'active:scale-[0.96] transition-transform duration-150'
                  )}
                >
                  <Icon className="w-[18px] h-[18px]" strokeWidth={2.25} />
                  {item.key === 'cart' && cartCount > 0 && (
                    <span className="absolute -top-1 end-0 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-cream text-[9px] font-bold text-farm px-0.5">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                  <span className={cn('text-[9px] font-bold mt-0.5 leading-none', isAr ? 'font-arabic' : 'font-sans')}>
                    {item.label}
                  </span>
                </Link>
              </li>
            )
          }

          return (
            <li key={item.key} className="flex-1 min-w-0">
              <Link
                href={`/${lang}${item.href}`}
                className={cn(
                  'relative flex flex-col items-center justify-center gap-0.5',
                  'min-h-[48px] min-w-[48px] px-1 py-1.5 rounded-xl touch-manipulation',
                  'active:scale-[0.96] transition-transform duration-150',
                  active ? 'text-primary' : 'text-primary/40'
                )}
              >
                {active && (
                  <span className="absolute inset-0.5 rounded-xl bg-primary/8" aria-hidden />
                )}
                <Icon className="relative w-[18px] h-[18px] shrink-0" strokeWidth={active ? 2.25 : 1.75} />
                <span
                  className={cn(
                    'relative text-[10px] font-semibold leading-none truncate max-w-full',
                    isAr ? 'font-arabic' : 'font-sans'
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
