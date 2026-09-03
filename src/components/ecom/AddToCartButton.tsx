'use client'

import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import type { Product } from '@/lib/data/products'
import { useCartStore } from '@/lib/commerce/cart-store'
import { getConsumerUnit, getRetailPriceEgp, formatEgp } from '@/lib/commerce/pricing'
import { TAP_SCALE } from '@/lib/constants/motion'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

export default function AddToCartButton({
  product,
  lang,
  variant = 'default',
}: {
  product: Product
  lang: string
  variant?: 'default' | 'onDark'
}) {
  const isAr = lang === 'ar'
  const addLine = useCartStore((s) => s.addLine)
  const [added, setAdded] = useState(false)
  const unit = getConsumerUnit(product)
  const price = getRetailPriceEgp(product)

  function handleAdd() {
    addLine({
      slug: product.slug,
      titleEn: product.title.en,
      titleAr: product.title.ar,
      image: product.image,
      unitLabelEn: unit.en,
      unitLabelAr: unit.ar,
      unitPriceEgp: price,
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <motion.div whileTap={TAP_SCALE} className="space-y-2">
      <button
        type="button"
        onClick={handleAdd}
        className={cn(
          'w-full mt-2 text-base font-semibold py-4 min-h-[52px] rounded-xl flex items-center justify-center gap-3 transition-colors duration-300 touch-manipulation',
          variant === 'onDark'
            ? added
              ? 'bg-farm text-cream'
              : 'bg-cream text-primary hover:bg-white'
            : added
              ? 'bg-farm text-cream'
              : 'bg-primary hover:bg-primary-700 text-cream',
          isAr ? 'font-arabic' : 'font-sans'
        )}
      >
        {added ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" strokeWidth={1.75} />}
        {added
          ? isAr
            ? 'تمت الإضافة للسلة'
            : 'Added to cart'
          : isAr
            ? `أضف للسلة — ${formatEgp(price, lang)}`
            : `Add to cart — ${formatEgp(price, lang)}`}
      </button>
      <p className={cn('text-center text-xs opacity-70', isAr ? 'font-arabic' : 'font-sans')}>
        {isAr ? `لكل ${unit.ar}` : `Per ${unit.en}`}
      </p>
    </motion.div>
  )
}
