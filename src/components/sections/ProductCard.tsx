'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Product } from '@/lib/data/products'
import { BRAND_EASE, SCROLL_VIEWPORT_INSTANT } from '@/lib/constants/motion'
import { useLightMotion } from '@/hooks/useLightMotion'
import ProductImage from '@/components/ui/ProductImage'
import { cn } from '@/lib/utils/cn'

interface ProductCardProps {
  product: Product
  lang: string
  index?: number
  compact?: boolean
}

/** Compact card — branded packaging photo is the identity (no floating seal) */
export default function ProductCard({ product, lang, index = 0, compact = false }: ProductCardProps) {
  const isAr = lang === 'ar'
  const lightMotion = useLightMotion()
  const title = isAr ? product.title.ar : product.title.en
  const category = isAr ? product.category.ar : product.category.en

  return (
    <motion.div
      initial={lightMotion ? false : { opacity: 0, y: 14 }}
      whileInView={lightMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={SCROLL_VIEWPORT_INSTANT}
      transition={
        lightMotion
          ? { duration: 0 }
          : { duration: 0.4, delay: Math.min(index * 0.04, 0.18), ease: BRAND_EASE }
      }
      className="group h-full"
    >
      <article className="card-lift relative h-full flex flex-col overflow-hidden rounded-xl shadow-[0_8px_28px_rgba(26,51,42,0.07)]">
        <Link
          href={`/${lang}/products/${product.slug}`}
          className="relative block aspect-[1/1] bg-cream overflow-hidden"
        >
          <ProductImage
            src={product.image}
            alt={title}
            categoryEn={product.category.en}
            slug={product.slug}
            lang={lang}
            priority={index < 1}
            variant="card"
            fit="cover"
            className="!aspect-auto absolute inset-0 rounded-none border-0 !bg-transparent transition-transform duration-600 ease-out group-hover:scale-[1.03]"
            sizes={compact ? '220px' : '(max-width: 768px) 45vw, (max-width: 1200px) 30vw, 240px'}
          />
        </Link>

        <Link
          href={`/${lang}/products/${product.slug}`}
          className="bg-primary px-4 py-3.5 md:px-5 md:py-4 flex flex-col justify-center min-h-[4.75rem]"
        >
          <p
            className={cn(
              'text-[10px] uppercase tracking-[0.14em] text-cream/55 mb-1',
              isAr ? 'font-arabic normal-case tracking-normal text-[11px]' : 'font-sans'
            )}
          >
            {category}
          </p>
          <h3
            className={cn(
              'text-sm md:text-[15px] font-semibold text-cream leading-snug line-clamp-2',
              isAr ? 'font-arabic' : 'font-display'
            )}
          >
            {title}
          </h3>
        </Link>
      </article>
    </motion.div>
  )
}
