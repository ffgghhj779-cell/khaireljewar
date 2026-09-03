'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/commerce/cart-store'
import { formatEgp } from '@/lib/commerce/pricing'
import { SHIPPING_FEE_EGP } from '@/lib/commerce/types'
import { cn } from '@/lib/utils/cn'
import { resolveProductImage } from '@/lib/constants/images'

export default function CartView({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const lines = useCartStore((s) => s.lines)
  const setQuantity = useCartStore((s) => s.setQuantity)
  const removeLine = useCartStore((s) => s.removeLine)
  const subtotal = useCartStore((s) => s.subtotalEgp())
  const total = subtotal + (lines.length ? SHIPPING_FEE_EGP : 0)

  if (!lines.length) {
    return (
      <div className="rounded-2xl border border-primary/10 bg-cream-soft p-10 text-center">
        <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-primary/30" />
        <p className={cn('text-lg font-semibold text-primary', isAr ? 'font-arabic' : 'font-display')}>
          {isAr ? 'السلة فارغة' : 'Your cart is empty'}
        </p>
        <Link
          href={`/${lang}/products`}
          className={cn(
            'mt-6 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-cream',
            isAr ? 'font-arabic' : 'font-sans'
          )}
        >
          {isAr ? 'تسوق المنتجات' : 'Browse products'}
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <ul className="space-y-4">
        {lines.map((line) => {
          const title = isAr ? line.titleAr : line.titleEn
          const unit = isAr ? line.unitLabelAr : line.unitLabelEn
          return (
            <li
              key={line.slug}
              className="flex gap-4 rounded-2xl border border-primary/10 bg-cream p-4 shadow-soft"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-cream-soft">
                <Image
                  src={resolveProductImage(line.image, '', line.slug)}
                  alt={title}
                  fill
                  className="object-contain p-1"
                  sizes="96px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className={cn('font-semibold text-primary', isAr ? 'font-arabic' : 'font-display')}>{title}</p>
                <p className={cn('text-xs text-primary/55', isAr ? 'font-arabic' : 'font-sans')}>{unit}</p>
                <p className={cn('mt-1 text-sm font-bold text-farm', isAr ? 'font-arabic' : 'font-sans')}>
                  {formatEgp(line.unitPriceEgp, lang)}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="inline-flex items-center rounded-lg border border-primary/15">
                    <button
                      type="button"
                      onClick={() => setQuantity(line.slug, line.quantity - 1)}
                      className="p-2 text-primary"
                      aria-label={isAr ? 'تقليل' : 'Decrease'}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[2rem] text-center text-sm font-semibold">{line.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(line.slug, line.quantity + 1)}
                      className="p-2 text-primary"
                      aria-label={isAr ? 'زيادة' : 'Increase'}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLine(line.slug)}
                    className="inline-flex items-center gap-1 text-xs text-red-700"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {isAr ? 'حذف' : 'Remove'}
                  </button>
                </div>
              </div>
              <p className={cn('shrink-0 text-sm font-bold text-primary', isAr ? 'font-arabic' : 'font-sans')}>
                {formatEgp(line.unitPriceEgp * line.quantity, lang)}
              </p>
            </li>
          )
        })}
      </ul>

      <aside className="h-fit rounded-2xl border border-primary/10 bg-primary p-6 text-cream">
        <h2 className={cn('text-lg font-semibold mb-4', isAr ? 'font-arabic' : 'font-display')}>
          {isAr ? 'ملخص الطلب' : 'Order summary'}
        </h2>
        <div className={cn('space-y-2 text-sm', isAr ? 'font-arabic' : 'font-sans')}>
          <div className="flex justify-between">
            <span>{isAr ? 'المجموع' : 'Subtotal'}</span>
            <span>{formatEgp(subtotal, lang)}</span>
          </div>
          <div className="flex justify-between">
            <span>{isAr ? 'الشحن' : 'Delivery'}</span>
            <span>{formatEgp(SHIPPING_FEE_EGP, lang)}</span>
          </div>
          <div className="flex justify-between border-t border-cream/20 pt-3 text-base font-bold">
            <span>{isAr ? 'الإجمالي' : 'Total'}</span>
            <span>{formatEgp(total, lang)}</span>
          </div>
        </div>
        <Link
          href={`/${lang}/checkout`}
          className={cn(
            'mt-6 flex w-full items-center justify-center rounded-xl bg-cream py-3.5 text-sm font-bold text-primary',
            isAr ? 'font-arabic' : 'font-sans'
          )}
        >
          {isAr ? 'إتمام الشراء' : 'Proceed to checkout'}
        </Link>
      </aside>
    </div>
  )
}
