'use client'

import { useRef, useState, type MouseEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { MapPin, Plus, ArrowUpRight, Check } from 'lucide-react'
import type { Product } from '@/lib/data/products'
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
  const { addItem } = useQuoteStore()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 20 })

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

  const handleAdd = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(
      {
        id: product.id,
        slug: product.slug,
        title: product.title,
        image: product.image,
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
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group perspective-1000 gpu-accelerated"
    >
      <Link href={`/${lang}/products/${product.slug}`} className="block h-full">
        <article className="luxury-card h-full flex flex-col hover:-translate-y-1.5">
          {/* Image viewport */}
          <div className="relative aspect-[4/3] overflow-hidden bg-silver-100">
            <Image
              src={product.image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 6}
              className="object-cover luxury-card-image"
            />

            {/* Gradient veil */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-dark/5 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-600" />

            {/* Shimmer on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 animate-shimmer bg-shimmer" />
            </div>

            {/* Glass badges */}
            <div className="absolute top-4 start-4 flex flex-col gap-2 z-10">
              <span className="glass-badge px-3 py-1.5 text-micro text-dark rounded-lg">
                {category}
              </span>
              <span className="glass-badge px-3 py-1.5 text-micro text-dark-500 rounded-lg flex items-center gap-1">
                <MapPin className="w-3 h-3 text-primary shrink-0" />
                {origin}
              </span>
            </div>

            {/* MOQ badge */}
            <div className="absolute top-4 end-4 z-10">
              <span className="glass-badge px-3 py-1.5 text-micro text-primary-700 rounded-lg border-primary/20 bg-primary-50/80">
                MOQ {product.minOrder} {product.unit}
              </span>
            </div>

            {/* Price ticker */}
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

            {/* Quick-add magnetic button */}
            <div className="absolute bottom-4 end-4 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 ease-luxury">
              <MagneticButton
                onClick={handleAdd}
                strength={0.35}
                aria-label={isAr ? 'إضافة للتسعير' : 'Add to quote'}
                className={cn(
                  'w-11 h-11 rounded-xl flex items-center justify-center border shadow-luxury transition-colors duration-300',
                  added
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'bg-white border-silver-200 text-dark hover:bg-primary hover:border-primary hover:text-dark'
                )}
              >
                {added ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </MagneticButton>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col p-6">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3
                className={cn(
                  'text-heading-md text-dark group-hover:text-primary transition-colors duration-400',
                  isAr ? 'font-ibm-arabic' : 'font-manrope'
                )}
              >
                {title}
              </h3>
              <ArrowUpRight className="w-4 h-4 text-silver-400 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-400 shrink-0 mt-1" />
            </div>

            <p className={cn('text-body-md text-dark-500 line-clamp-2 mb-5 flex-1', isAr ? 'font-ibm-arabic' : 'font-inter')}>
              {isAr ? product.desc.ar : product.desc.en}
            </p>

            {/* Spec grid */}
            <div className="spec-grid mb-5">
              <div className="spec-cell">
                <span className="text-micro text-silver-500 block mb-0.5">{isAr ? 'المعايرة' : 'Caliber'}</span>
                <span className="text-xs font-bold text-dark font-mono">{isAr ? product.sizes.ar : product.sizes.en}</span>
              </div>
              <div className="spec-cell">
                <span className="text-micro text-silver-500 block mb-0.5">{isAr ? 'الموسم' : 'Season'}</span>
                <span className="text-xs font-bold text-dark">{isAr ? product.harvestSeason.ar : product.harvestSeason.en}</span>
              </div>
              <div className="spec-cell">
                <span className="text-micro text-silver-500 block mb-0.5">{isAr ? 'التعبئة' : 'Packaging'}</span>
                <span className="text-xs font-bold text-dark truncate block">{isAr ? product.packaging.ar : product.packaging.en}</span>
              </div>
              <div className="spec-cell">
                <span className="text-micro text-silver-500 block mb-0.5">{isAr ? 'التوفر' : 'Status'}</span>
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

            {/* CTA row */}
            <div className="flex items-center justify-between pt-4 border-t border-silver-200">
              <MagneticButton
                onClick={handleAdd}
                strength={0.2}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-colors duration-400',
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
              <span className="text-micro text-silver-500 group-hover:text-primary transition-colors duration-400">
                {isAr ? 'التفاصيل الفنية' : 'Full Specs'}
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
