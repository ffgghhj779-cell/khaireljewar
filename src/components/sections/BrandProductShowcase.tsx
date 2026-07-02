'use client'

import { useState } from 'react'
import PremiumImage from '@/components/ui/PremiumImage'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PRODUCT_GALLERY, type ProductGalleryItem } from '@/lib/constants/brandAssets'
import { IMAGE_BLUR_DATA_URL } from '@/lib/constants/images'
import { SCROLL_VIEWPORT, TAP_SCALE } from '@/lib/constants/motion'
import { useIsMobile } from '@/hooks/useIsMobile'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils/cn'

const CATEGORIES = ['All', 'Fruits', 'Poultry', 'Meats', 'Frozen', 'Oils', 'Vegetables', 'Grains', 'Dates', 'Retail'] as const

export default function BrandProductShowcase({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const isMobile = useIsMobile()
  const [active, setActive] = useState<string>('All')

  const filtered =
    active === 'All'
      ? PRODUCT_GALLERY
      : PRODUCT_GALLERY.filter((p) => p.categoryEn === active)

  return (
    <section className="py-20 md:py-28 bg-gray-50 border-y border-gray-100">
      <Container size="large">
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 12 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SCROLL_VIEWPORT}
          transition={{ duration: isMobile ? 0.35 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14"
        >
          <div className="max-w-2xl">
            <span className="terminal-badge mb-4">
              {isAr ? 'معرض المنتجات' : 'Product Gallery'}
            </span>
            <h2
              className={cn(
                'text-3xl md:text-5xl font-black text-dark tracking-tight mb-4 editorial-heading',
                isAr ? 'font-ibm-arabic' : 'font-manrope'
              )}
            >
              {isAr ? 'تشكيلة خير الجوار الكاملة' : 'The Full KA Product Range'}
            </h2>
            <p className={cn('text-base text-gray-500 leading-relaxed', isAr ? 'font-ibm-arabic' : 'font-inter')}>
              {isAr
                ? 'صور حقيقية من علامتنا التجارية — فواكه، دواجن، لحوم، زيوت، حبوب، ومجمدات.'
                : 'Real brand photography — fruits, poultry, meats, oils, grains, and frozen lines.'}
            </p>
          </div>
          <Link
            href={`/${lang}/products`}
            className={cn(
              'inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-dark text-white text-sm font-bold hover:bg-primary transition-colors shrink-0 touch-manipulation',
              isAr ? 'font-ibm-arabic' : 'font-inter'
            )}
          >
            {isAr ? 'الكتالوج الكامل' : 'Full Catalog'}
            <ArrowRight className={cn('w-4 h-4', isAr && 'rotate-180')} />
          </Link>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              type="button"
              whileTap={TAP_SCALE}
              onClick={() => setActive(cat)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-colors duration-200 touch-manipulation',
                active === cat
                  ? 'bg-primary text-dark border-primary'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-primary/40'
              )}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((item) => (
            <GalleryTile key={item.id} item={item} isAr={isAr} lang={lang} isMobile={isMobile} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function GalleryTile({
  item,
  isAr,
  lang,
  isMobile,
}: {
  item: ProductGalleryItem
  isAr: boolean
  lang: string
  isMobile: boolean
}) {
  const wide = item.span === 2

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-soft',
        wide ? 'col-span-2 aspect-[16/9]' : 'col-span-1 aspect-[4/5] md:aspect-[3/4]'
      )}
    >
      <PremiumImage
        src={item.src}
        alt={item.titleEn}
        fill
        loading="lazy"
        sizes={wide ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
        placeholder="blur"
        blurDataURL={IMAGE_BLUR_DATA_URL}
        className={cn(
          'object-cover',
          isMobile ? '' : 'transition-transform duration-500 group-hover:scale-[1.04]'
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 p-3 md:p-4">
        <div className="flex flex-wrap gap-1 mb-1.5">
          <span className="inline-block px-2 py-0.5 rounded-md bg-primary/90 text-dark text-[9px] font-bold uppercase tracking-wider">
            {isAr ? item.categoryAr : item.categoryEn}
          </span>
          <span className="inline-block px-2 py-0.5 rounded-md bg-white/20 text-white text-[9px] font-bold border border-white/20">
            {isAr ? item.detailAr : item.detailEn}
          </span>
        </div>
        <p className={cn('text-white font-bold text-sm md:text-base leading-snug mb-1', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
          {isAr ? item.titleAr : item.titleEn}
        </p>
        <p className={cn('text-white/75 text-[10px] md:text-xs leading-relaxed line-clamp-2', isAr ? 'font-ibm-arabic' : 'font-inter')}>
          {isAr ? item.descAr : item.descEn}
        </p>
      </div>
      <Link
        href={`/${lang}/products`}
        className="absolute inset-0"
        aria-label={isAr ? item.titleAr : item.titleEn}
      />
    </div>
  )
}
