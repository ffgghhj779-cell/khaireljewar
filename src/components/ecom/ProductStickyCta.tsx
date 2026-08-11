'use client'

import Link from 'next/link'
import type { Product } from '@/lib/data/products'
import { cn } from '@/lib/utils/cn'

/** Mobile sticky CTA — sits above bottom nav; solid (no blur) for perf */
export default function ProductStickyCta({ product, lang }: { product: Product; lang: string }) {
  const isAr = lang === 'ar'

  const unitLabel =
    product.unit === 'Containers'
      ? isAr
        ? 'حاوية'
        : 'container'
      : isAr
        ? 'طن'
        : 'MT'

  return (
    <div className="mobile-sticky-cta-offset fixed inset-x-0 z-[90] border-t border-primary/10 bg-cream lg:hidden pb-0 shadow-[0_-4px_20px_rgba(26,51,42,0.06)]">
      <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-2.5">
        <div className="min-w-0 flex-1">
          <p className={cn('truncate text-sm font-semibold text-primary', isAr ? 'font-arabic' : 'font-display')}>
            {isAr ? product.title.ar : product.title.en}
          </p>
          <p className={cn('text-[11px] text-primary/55', isAr ? 'font-arabic' : 'font-sans')}>
            {isAr ? `حد أدنى ${product.minOrder} ${unitLabel}` : `MOQ ${product.minOrder} ${unitLabel}`}
          </p>
        </div>
        <Link
          href={`/${lang}/contact?product=${encodeURIComponent(product.slug)}`}
          className={cn(
            'shrink-0 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-cream min-h-[44px] flex items-center touch-manipulation active:scale-[0.98]',
            isAr ? 'font-arabic' : 'font-sans'
          )}
        >
          {isAr ? 'اطلب عرض سعر' : 'Request quote'}
        </Link>
      </div>
    </div>
  )
}
