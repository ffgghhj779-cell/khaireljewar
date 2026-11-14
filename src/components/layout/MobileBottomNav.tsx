'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Package, ShoppingCart, ShieldCheck, type LucideIcon } from 'lucide-react'
import { useCartStore } from '@/lib/commerce/cart-store'
import { localeFontClass, tx } from '@/lib/i18n/localize'
import { UI } from '@/lib/i18n/ui'
import { cn } from '@/lib/utils/cn'

type NavItem = {
  key: string
  label: string
  href: string
  icon: LucideIcon
  emphasize?: boolean
}

export default function MobileBottomNav({ lang }: { lang: string }) {
  const pathname = usePathname()
  const cartCount = useCartStore((s) => s.itemCount())
  const font = localeFontClass(lang)

  const navItems: NavItem[] = [
    { key: 'home', label: tx(lang, UI.nav.home), href: '', icon: Home },
    { key: 'products', label: tx(lang, UI.nav.products), href: '/products', icon: Package },
    { key: 'cart', label: tx(lang, UI.nav.cart), href: '/cart', icon: ShoppingCart, emphasize: true },
    { key: 'quality', label: tx(lang, UI.nav.quality), href: '/quality', icon: ShieldCheck },
  ]

  const isActive = (href: string) => {
    const full = `/${lang}${href}`
    if (href === '') return pathname === `/${lang}` || pathname === `/${lang}/`
    return pathname.startsWith(full)
  }

  return (
    <nav
      className="lg:hidden fixed inset-x-0 bottom-0 z-[100] border-t border-primary/10 bg-cream pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-4px_16px_rgba(26,51,42,0.08)]"
      aria-label={tx(lang, UI.a11y.mainNav)}
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
                  <span className={cn('text-[10px] font-bold mt-0.5 leading-none', font)}>{item.label}</span>
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
                {active && <span className="absolute inset-0.5 rounded-xl bg-primary/8" aria-hidden />}
                <Icon className="relative w-[18px] h-[18px] shrink-0" strokeWidth={active ? 2.25 : 1.75} />
                <span
                  className={cn(
                    'relative text-[10px] font-semibold leading-none truncate max-w-full',
                    font
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
