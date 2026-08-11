'use client'

import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import type { Product } from '@/lib/data/products'
import { TAP_SCALE } from '@/lib/constants/motion'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

/** CTA to contact — cart/checkout live on Zid store */
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
  const title = isAr ? product.title.ar : product.title.en

  return (
    <motion.div whileTap={TAP_SCALE}>
      <Link
        href={`/${lang}/contact?product=${encodeURIComponent(product.slug)}`}
        className={cn(
          'w-full mt-6 text-base font-semibold',
          'py-4 min-h-[52px] rounded-xl flex items-center justify-center gap-3',
          'transition-colors duration-300 touch-manipulation',
          variant === 'onDark'
            ? 'bg-cream text-primary hover:bg-white'
            : 'bg-primary hover:bg-primary-700 text-cream',
          isAr ? 'font-arabic' : 'font-sans'
        )}
        aria-label={isAr ? `اطلب عرض سعر لـ ${title}` : `Request quote for ${title}`}
      >
        <MessageCircle className="w-5 h-5" strokeWidth={1.75} />
        {isAr ? 'اطلب عرض سعر' : 'Request a quote'}
      </Link>
    </motion.div>
  )
}
