'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/commerce/cart-store'
import { cn } from '@/lib/utils/cn'

export default function CartButton({ lang }: { lang: string }) {
  const count = useCartStore((s) => s.itemCount())
  const isAr = lang === 'ar'

  return (
    <Link
      href={`/${lang}/cart`}
      className={cn(
        'relative inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-xl border border-primary/15 bg-cream-soft text-primary hover:bg-primary/5',
        isAr ? 'font-arabic' : 'font-sans'
      )}
      aria-label={isAr ? `السلة (${count})` : `Cart (${count})`}
    >
      <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
      {count > 0 && (
        <span className="absolute -top-1.5 -end-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-farm px-1 text-[10px] font-bold text-cream">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  )
}
