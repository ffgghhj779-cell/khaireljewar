'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CalendarDays, Package, Tag } from 'lucide-react'
import type { Product } from '@/lib/data/products'
import { BRAND_EASE, SCROLL_VIEWPORT_INSTANT } from '@/lib/constants/motion'
import { useLightMotion } from '@/hooks/useLightMotion'
import ProductImage from '@/components/ui/ProductImage'
import { getConsumerUnit, getRetailPriceEgp, formatEgp } from '@/lib/commerce/pricing'
import { cn } from '@/lib/utils/cn'

interface ProductCardProps {
  product: Product
  lang: string
  index?: number
  compact?: boolean
}

/** Rich card — price, MOQ, packaging & season visible without opening PDP */
export default function ProductCard({ product, lang, index = 0, compact = false }: ProductCardProps) {
  const isAr = lang === 'ar'
  const lightMotion = useLightMotion()
  const title = isAr ? product.title.ar : product.title.en
  const category = isAr ? product.category.ar : product.category.en
  const packaging = isAr ? product.packaging.ar : product.packaging.en
  const season = isAr ? product.harvestSeason.ar : product.harvestSeason.en
  const unitLabel =
    product.unit === 'Containers' ? (isAr ? 'حاوية' : 'ctr') : isAr ? 'طن' : 'MT'
  const retailPrice = getRetailPriceEgp(product)
  const consumerUnit = getConsumerUnit(product)
  const moq = `${product.minOrder} ${unitLabel}`

  return (
    <motion.div
      initial={lightMotion ? { opacity: 0, y: 10 } : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={SCROLL_VIEWPORT_INSTANT}
      transition={{
        duration: lightMotion ? 0.3 : 0.4,
        delay: Math.min(index * 0.04, 0.16),
        ease: BRAND_EASE,
      }}
      className="group h-full"
    >
      <article className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-primary/10 bg-cream shadow-[0_8px_24px_rgba(26,51,42,0.07)]">
        <Link
          href={`/${lang}/products/${product.slug}`}
          className="relative block aspect-square overflow-hidden bg-cream sm:aspect-[5/4]"
        >
          <ProductImage
            src={product.image}
            alt={title}
            categoryEn={product.category.en}
            slug={product.slug}
            lang={lang}
            priority={index < 1}
            variant="card"
            fit="contain"
            className="!aspect-auto absolute inset-0 rounded-none border-0 !bg-cream"
            sizes={compact ? '280px' : '(max-width: 768px) 45vw, (max-width: 1200px) 30vw, 280px'}
          />
          {retailPrice > 0 && (
            <span
              className={cn(
                'absolute top-2 end-2 z-[1] max-w-[calc(100%-1rem)] truncate rounded-full bg-farm px-2 py-0.5 text-[9px] font-bold leading-tight text-cream shadow-sm sm:top-2.5 sm:end-2.5 sm:px-2.5 sm:py-1 sm:text-[10px]',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {formatEgp(retailPrice, lang)}
              <span className="mt-0.5 hidden text-[8px] font-semibold uppercase tracking-wide opacity-80 sm:block">
                {isAr ? consumerUnit.ar : consumerUnit.en}
              </span>
            </span>
          )}
        </Link>

        <Link
          href={`/${lang}/products/${product.slug}`}
          className="flex min-w-0 flex-1 flex-col bg-farm-panel px-2.5 py-2.5 sm:px-3.5 sm:py-3 md:px-4 md:py-3.5"
        >
          <p
            className={cn(
              'text-[10px] uppercase tracking-[0.12em] text-primary/55 mb-0.5',
              isAr ? 'font-arabic normal-case tracking-normal text-[11px]' : 'font-sans'
            )}
          >
            {category}
          </p>
          <h3
            className={cn(
              'text-[13px] md:text-[15px] font-semibold text-primary leading-snug line-clamp-2 mb-2.5',
              isAr ? 'font-arabic' : 'font-display'
            )}
          >
            {title}
          </h3>

          <ul className="mt-auto space-y-1.5 border-t border-primary/12 pt-2.5">
            <li className="flex items-center gap-1.5 text-primary">
              <Tag className="h-3.5 w-3.5 shrink-0 text-farm" strokeWidth={2.4} aria-hidden />
              <span className={cn('text-[11px] font-semibold truncate', isAr ? 'font-arabic' : 'font-sans')}>
                {isAr ? `من ${moq}` : `From ${moq}`}
              </span>
            </li>
            {!compact && (
              <li className="flex items-center gap-1.5 text-primary/80">
                <Package className="h-3.5 w-3.5 shrink-0 text-farm" strokeWidth={2.4} aria-hidden />
                <span className={cn('text-[10px] truncate', isAr ? 'font-arabic' : 'font-sans')}>{packaging}</span>
              </li>
            )}
            {!compact && (
              <li className="flex items-center gap-1.5 text-primary/80">
                <CalendarDays className="h-3.5 w-3.5 shrink-0 text-farm" strokeWidth={2.4} aria-hidden />
                <span className={cn('text-[10px] truncate', isAr ? 'font-arabic' : 'font-sans')}>{season}</span>
              </li>
            )}
          </ul>
        </Link>
      </article>
    </motion.div>
  )
}
