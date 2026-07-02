'use client'

import { useRef, useState, useCallback, type MouseEvent } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { MapPin, Plus, ArrowUpRight, Check } from 'lucide-react'
import type { Product } from '@/lib/data/products'
import { resolveProductImage } from '@/lib/constants/images'
import { SCROLL_VIEWPORT, SPRING_HOVER, TAP_SCALE } from '@/lib/constants/motion'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useAddToQuote } from '@/store/useQuoteStore'
import ProductImage from '@/components/ui/ProductImage'
import MagneticButton from '@/components/ui/MagneticButton'
import { cn } from '@/lib/utils/cn'

interface ProductCardProps {
  product: Product
  lang: string
  index?: number
  compact?: boolean
  onQuickAdd?: (product: Product) => void
}

export default function ProductCard({ product, lang, index = 0, compact = false, onQuickAdd }: ProductCardProps) {
  const isAr = lang === 'ar'
  const isMobile = useIsMobile()
  const isCompact = compact || isMobile
  const cardRef = useRef<HTMLDivElement>(null)
  const [added, setAdded] = useState(false)
  const addItem = useAddToQuote()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), SPRING_HOVER)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), SPRING_HOVER)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isCompact || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleAdd = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const image = resolveProductImage(product.image, product.category.en, product.slug)
      addItem(
        {
          id: product.id,
          slug: product.slug,
          title: product.title,
          image,
          quantity: product.minOrder,
          packaging: isAr ? product.packaging.ar : product.packaging.en,
          unit: product.unit,
          indexPrice: product.indexPrice,
        },
        lang
      )
      onQuickAdd?.(product)
      setAdded(true)
      window.setTimeout(() => setAdded(false), 2000)
    },
    [addItem, product, lang, isAr, onQuickAdd]
  )

  const title = isAr ? product.title.ar : product.title.en
  const category = isAr ? product.category.ar : product.category.en
  const origin = isAr ? product.origin.ar : product.origin.en
  const desc = isAr ? product.desc.ar : product.desc.en
  const commodity = isAr ? product.commodityClass.ar : product.commodityClass.en
  const packaging = isAr ? product.packaging.ar : product.packaging.en
  const season = isAr ? product.harvestSeason.ar : product.harvestSeason.en
  const sizes = isAr ? product.sizes.ar : product.sizes.en
  const availability = isAr ? product.availability.ar : product.availability.en
  const isPositive = (product.trend ?? '0').startsWith('+')

  const addButtonClasses = cn(
    'flex items-center justify-center border shadow-luxury transition-colors duration-150 will-change-transform touch-manipulation',
    'min-w-[48px] min-h-[48px]',
    added
      ? 'bg-green-500 border-green-500 text-white scale-95'
      : 'bg-white border-gray-200 text-dark hover:bg-primary hover:border-primary hover:text-dark active:scale-95'
  )

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: isCompact ? 16 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={SCROLL_VIEWPORT}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={isCompact ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      className={cn('group perspective-1000 gpu-accelerated will-change-transform', isCompact && 'h-full')}
    >
      <Link href={`/${lang}/products/${product.slug}`} className="block h-full">
        <article
          className={cn(
            'luxury-card h-full flex flex-col will-change-transform',
            isCompact ? 'rounded-2xl' : 'hover:-translate-y-1.5'
          )}
        >
          <div className="relative border-b border-gray-200">
            <ProductImage
              src={product.image}
              alt={title}
              categoryEn={product.category.en}
              slug={product.slug}
              lang={lang}
              priority={index < 4}
              variant="card"
              className={cn(
                'w-full rounded-none border-0',
                isCompact ? '!aspect-[16/11]' : '!aspect-[4/3]'
              )}
              sizes={isCompact ? '85vw' : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent opacity-50 pointer-events-none will-change-opacity" />

            <div className="absolute top-3 start-3 flex flex-wrap gap-1.5 z-10 max-w-[70%] pointer-events-none">
              <span className="glass-badge px-2.5 py-1 text-micro text-dark rounded-lg">{category}</span>
              <span className="glass-badge px-2.5 py-1 text-micro text-dark-500 rounded-lg flex items-center gap-1">
                <MapPin className="w-3 h-3 text-primary shrink-0" />
                {origin}
              </span>
            </div>

            <div className="absolute top-3 end-3 z-10 pointer-events-none">
              <span className="glass-badge px-2.5 py-1 text-micro text-primary-700 rounded-lg border-primary/20 bg-primary-50/80">
                MOQ {product.minOrder} {product.unit}
              </span>
            </div>

            {product.indexPrice && (
              <div className="absolute bottom-3 start-3 z-10 flex items-center gap-1.5 pointer-events-none">
                <span className="glass-badge px-2.5 py-1 text-sm font-mono font-bold text-dark rounded-lg">
                  {product.indexPrice}
                </span>
                {product.trend && !isCompact && (
                  <span
                    className={cn(
                      'text-micro px-2 py-1 rounded-md font-mono',
                      isPositive ? 'text-green-700 bg-green-50' : 'text-red-600 bg-red-50'
                    )}
                  >
                    {product.trend}
                  </span>
                )}
              </div>
            )}

            {isCompact ? (
              <div className="absolute bottom-3 end-3 z-10">
                <motion.button
                  type="button"
                  onClick={handleAdd}
                  whileTap={TAP_SCALE}
                  aria-label={isAr ? 'إضافة للتسعير' : 'Add to quote'}
                  className={cn(addButtonClasses, 'w-12 h-12 rounded-xl')}
                >
                  {added ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </motion.button>
              </div>
            ) : (
              <div className="absolute bottom-4 end-4 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-luxury">
                <MagneticButton
                  onClick={handleAdd}
                  strength={0.35}
                  aria-label={isAr ? 'إضافة للتسعير' : 'Add to quote'}
                  className={cn(addButtonClasses, 'w-11 h-11 rounded-xl')}
                >
                  {added ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </MagneticButton>
              </div>
            )}
          </div>

          <div className={cn('flex-1 flex flex-col', isCompact ? 'p-4' : 'p-6')}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3
                className={cn(
                  'text-dark group-hover:text-primary transition-colors duration-300 editorial-heading line-clamp-2',
                  isCompact ? 'text-base' : 'text-heading-md',
                  isAr ? 'font-ibm-arabic' : 'font-manrope'
                )}
              >
                {title}
              </h3>
              {!isCompact && (
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-all duration-300 shrink-0 mt-1 will-change-transform" />
              )}
            </div>

            {!isCompact && (
              <>
                <p className={cn('text-body-md text-gray-600 line-clamp-2 mb-5 flex-1 leading-relaxed', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                  {desc}
                </p>

                <div className="spec-grid mb-5">
                  <div className="spec-cell">
                    <span className="text-micro text-gray-500 block mb-0.5">{isAr ? 'المعايرة' : 'Caliber'}</span>
                    <span className="text-xs font-bold text-dark font-mono">{sizes}</span>
                  </div>
                  <div className="spec-cell">
                    <span className="text-micro text-gray-500 block mb-0.5">{isAr ? 'الموسم' : 'Season'}</span>
                    <span className="text-xs font-bold text-dark">{season}</span>
                  </div>
                  <div className="spec-cell">
                    <span className="text-micro text-gray-500 block mb-0.5">{isAr ? 'التعبئة' : 'Packaging'}</span>
                    <span className="text-xs font-bold text-dark truncate block">{packaging}</span>
                  </div>
                  <div className="spec-cell">
                    <span className="text-micro text-gray-500 block mb-0.5">{isAr ? 'التوفر' : 'Status'}</span>
                    <span
                      className={cn(
                        'text-xs font-bold',
                        product.availability.en === 'In Stock' ? 'text-green-600' : 'text-secondary'
                      )}
                    >
                      {availability}
                    </span>
                  </div>
                </div>
              </>
            )}

            {isCompact && (
              <>
                <p className={cn('text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                  {desc}
                </p>
                <div className="grid grid-cols-2 gap-2 mb-3 text-[10px]">
                  <div className="bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-100">
                    <span className="text-gray-400 block">{isAr ? 'الفئة' : 'Class'}</span>
                    <span className="font-bold text-dark truncate block">{commodity}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-100">
                    <span className="text-gray-400 block">{isAr ? 'الموسم' : 'Season'}</span>
                    <span className="font-bold text-dark truncate block">{season}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-100">
                    <span className="text-gray-400 block">{isAr ? 'التعبئة' : 'Pack'}</span>
                    <span className="font-bold text-dark truncate block">{packaging}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-100">
                    <span className="text-gray-400 block">{isAr ? 'التوفر' : 'Status'}</span>
                    <span className={cn('font-bold truncate block', product.availability.en === 'In Stock' ? 'text-green-600' : 'text-secondary')}>
                      {availability}
                    </span>
                  </div>
                </div>
              </>
            )}

            {isCompact ? (
              <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
                <span className="text-[10px] text-gray-500 font-mono truncate">{product.indexPrice}</span>
                <span className="text-[10px] text-primary font-bold shrink-0">MOQ {product.minOrder} {product.unit}</span>
              </div>
            ) : (
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <MagneticButton
                  onClick={handleAdd}
                  strength={0.25}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors duration-150 will-change-transform min-h-[48px]',
                    added
                      ? 'bg-green-50 border-green-200 text-green-700 scale-95'
                      : 'bg-dark border-dark text-white hover:bg-primary hover:border-primary active:scale-95'
                  )}
                >
                  {added ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      {isAr ? 'تمت الإضافة' : 'Added'}
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      {isAr ? 'أضف للتسعير' : 'Add to Quote'}
                    </>
                  )}
                </MagneticButton>
                <span className="text-micro text-gray-500 group-hover:text-primary transition-colors duration-300 hidden sm:inline">
                  {isAr ? 'التفاصيل الفنية' : 'Full Specs'}
                </span>
              </div>
            )}
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
