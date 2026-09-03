'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import type { Product } from '@/lib/data/products'
import { useCartStore } from '@/lib/commerce/cart-store'
import { getConsumerUnit, getRetailPriceEgp, formatEgp } from '@/lib/commerce/pricing'
import { cn } from '@/lib/utils/cn'

export default function ProductStickyCta({ product, lang }: { product: Product; lang: string }) {
  const isAr = lang === 'ar'
  const addLine = useCartStore((s) => s.addLine)
  const unit = getConsumerUnit(product)
  const price = getRetailPriceEgp(product)

  return (
    <div className="mobile-sticky-cta-offset fixed inset-x-0 z-[90] border-t border-primary/10 bg-cream lg:hidden pb-0 shadow-[0_-4px_20px_rgba(26,51,42,0.06)]">
      <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-2.5">
        <div className="min-w-0 flex-1">
          <p className={cn('truncate text-sm font-semibold text-primary', isAr ? 'font-arabic' : 'font-display')}>
            {isAr ? product.title.ar : product.title.en}
          </p>
          <p className={cn('text-[11px] text-farm font-semibold', isAr ? 'font-arabic' : 'font-sans')}>
            {formatEgp(price, lang)} / {isAr ? unit.ar : unit.en}
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            addLine({
              slug: product.slug,
              titleEn: product.title.en,
              titleAr: product.title.ar,
              image: product.image,
              unitLabelEn: unit.en,
              unitLabelAr: unit.ar,
              unitPriceEgp: price,
            })
          }
          className={cn(
            'shrink-0 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-cream min-h-[44px] flex items-center gap-2 touch-manipulation active:scale-[0.98]',
            isAr ? 'font-arabic' : 'font-sans'
          )}
        >
          <ShoppingCart className="w-4 h-4" />
          {isAr ? 'أضف' : 'Add'}
        </button>
        <Link
          href={`/${lang}/cart`}
          className={cn(
            'shrink-0 rounded-xl border border-primary/20 px-3 py-3 text-xs font-semibold text-primary min-h-[44px] flex items-center',
            isAr ? 'font-arabic' : 'font-sans'
          )}
        >
          {isAr ? 'السلة' : 'Cart'}
        </Link>
      </div>
    </div>
  )
}
