'use client'

import { useRef, useState, type MouseEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { MapPin, Plus, ArrowUpRight, Check, Package } from 'lucide-react'
import type { Product } from '@/lib/data/products'
import { PRODUCT_IMAGE_FALLBACK } from '@/lib/constants/images'
import { SCROLL_VIEWPORT, SPRING_HOVER } from '@/lib/constants/motion'
import { useQuoteStore } from '@/store/useQuoteStore'
import MagneticButton from '@/components/ui/MagneticButton'
import { cn } from '@/lib/utils/cn'

interface ProductCardProps {
  product: Product
  lang: string
  index?: number
  onQuickAdd?: (product: Product) => void
}

export default function ProductCard({ product, lang, index = 0, onQuickAdd }: ProductCardProps) {
  const isAr = lang === 'ar'
  const cardRef = useRef<HTMLDivElement>(null)
  const [added, setAdded] = useState(false)
  const [imgSrc, setImgSrc] = useState(product.image || PRODUCT_IMAGE_FALLBACK)
  const [imgFailed, setImgFailed] = useState(false)
  const { addItem } = useQuoteStore()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), SPRING_HOVER)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), SPRING_HOVER)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleImageError = () => {
    if (!imgFailed) {
      setImgFailed(true)
      setImgSrc(PRODUCT_IMAGE_FALLBACK)
    }
  }

  const handleAdd = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(
      {
        id: product.id,
        slug: product.slug,
        title: product.title,
        image: imgSrc,
        quantity: product.minOrder,
        packaging: isAr ? product.packaging.ar : product.packaging.en,
        unit: product.unit,
        indexPrice: product.indexPrice,
      },
      lang
    )
    onQuickAdd?.(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const title = isAr ? product.title.ar : product.title.en
  const category = isAr ? product.category.ar : product.category.en
  const origin = isAr ? product.origin.ar : product.origin.en
  const isPositive = (product.trend ?? '0').startsWith('+')

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={SCROLL_VIEWPORT}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group perspective-1000 gpu-accelerated will-change-transform"
    >
      <Link href={`/${lang}/products/${product.slug}`} className="block h-full">
        <article className="luxury-card h-full flex flex-col hover:-translate-y-1.5 will-change-transform">
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 border-b border-gray-200">
            {!imgFailed ? (
              <Image
                src={imgSrc}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 6}
                className="object-cover luxury-card-image will-change-transform"
                onError={handleImageError}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
                <div className="w-16 h-16 rounded-2xl bg-dark/5 border border-gray-200 flex items-center justify-center mb-3">
                  <Package className="w-8 h-8 text-dark/30" />
                </div>
                <span className={cn('text-[10px] font-bold uppercase tracking-widest text-gray-400', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                  {isAr ? 'خير الجار فودز' : 'KHAIR ALJAAR FOODS'}
                </span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-dark/5 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 animate-shimmer bg-shimmer will-change-opacity" />
            </div>

            <div className="absolute top-4 start-4 flex flex-col gap-2 z-10">
              <span className="glass-badge px-3 py-1.5 text-micro text-dark rounded-lg">{category}</span>
              <span className="glass-badge px-3 py-1.5 text-micro text-dark-500 rounded-lg flex items-center gap-1">
                <MapPin className="w-3 h-3 text-primary shrink-0" />
                {origin}
              </span>
            </div>

            <div className="absolute top-4 end-4 z-10">
              <span className="glass-badge px-3 py-1.5 text-micro text-primary-700 rounded-lg border-primary/20 bg-primary-50/80">
                MOQ {product.minOrder} {product.unit}
              </span>
            </div>

            {product.indexPrice && (
              <div className="absolute bottom-4 start-4 z-10 flex items-center gap-2">
                <span className="glass-badge px-3 py-1.5 text-sm font-mono font-bold text-dark rounded-lg">
                  {product.indexPrice}
                </span>
                {product.trend && (
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

            <div className="absolute bottom-4 end-4 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 ease-luxury">
              <MagneticButton
                onClick={handleAdd}
                strength={0.35}
                aria-label={isAr ? 'إضافة للتسعير' : 'Add to quote'}
                className={cn(
                  'w-11 h-11 rounded-xl flex items-center justify-center border shadow-luxury transition-colors duration-300 will-change-transform',
                  added
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'bg-white border-gray-200 text-dark hover:bg-primary hover:border-primary hover:text-dark'
                )}
              >
                {added ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </MagneticButton>
            </div>
          </div>

          <div className="flex-1 flex flex-col p-6">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3
                className={cn(
                  'text-heading-md text-dark group-hover:text-primary transition-colors duration-400 editorial-heading',
                  isAr ? 'font-ibm-arabic' : 'font-manrope'
                )}
              >
                {title}
              </h3>
              <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-400 shrink-0 mt-1" />
            </div>

            <p className={cn('text-body-md text-gray-600 line-clamp-2 mb-5 flex-1 leading-relaxed', isAr ? 'font-ibm-arabic' : 'font-inter')}>
              {isAr ? product.desc.ar : product.desc.en}
            </p>

            <div className="spec-grid mb-5">
              <div className="spec-cell">
                <span className="text-micro text-gray-500 block mb-0.5">{isAr ? 'المعايرة' : 'Caliber'}</span>
                <span className="text-xs font-bold text-dark font-mono">{isAr ? product.sizes.ar : product.sizes.en}</span>
              </div>
              <div className="spec-cell">
                <span className="text-micro text-gray-500 block mb-0.5">{isAr ? 'الموسم' : 'Season'}</span>
                <span className="text-xs font-bold text-dark">{isAr ? product.harvestSeason.ar : product.harvestSeason.en}</span>
              </div>
              <div className="spec-cell">
                <span className="text-micro text-gray-500 block mb-0.5">{isAr ? 'التعبئة' : 'Packaging'}</span>
                <span className="text-xs font-bold text-dark truncate block">{isAr ? product.packaging.ar : product.packaging.en}</span>
              </div>
              <div className="spec-cell">
                <span className="text-micro text-gray-500 block mb-0.5">{isAr ? 'التوفر' : 'Status'}</span>
                <span
                  className={cn(
                    'text-xs font-bold',
                    product.availability.en === 'In Stock' ? 'text-green-600' : 'text-secondary'
                  )}
                >
                  {isAr ? product.availability.ar : product.availability.en}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <MagneticButton
                onClick={handleAdd}
                strength={0.25}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-colors duration-400 will-change-transform',
                  added
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-dark border-dark text-white hover:bg-primary hover:border-primary'
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
              <span className="text-micro text-gray-500 group-hover:text-primary transition-colors duration-400">
                {isAr ? 'التفاصيل الفنية' : 'Full Specs'}
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
