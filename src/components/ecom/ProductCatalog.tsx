'use client'

import { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, type PanInfo } from 'framer-motion'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { PRODUCT_CATEGORIES, type Product } from '@/lib/data/products'
import ProductCard from '@/components/sections/ProductCard'
import { cn } from '@/lib/utils/cn'
import { MOBILE_EASE_OUT, TAP_SCALE } from '@/lib/constants/motion'

interface ProductCatalogProps {
  lang: string
  products: Product[]
}

export default function ProductCatalog({ lang, products }: ProductCatalogProps) {
  const isAr = lang === 'ar'
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const carouselRef = useRef<HTMLDivElement>(null)
  const dragX = useMotionValue(0)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category.en === activeCategory
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        product.title.en.toLowerCase().includes(q) ||
        product.title.ar.includes(q) ||
        product.origin.en.toLowerCase().includes(q) ||
        product.commodityClass.en.toLowerCase().includes(q)
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery, products])

  const scrollCarousel = (direction: 'prev' | 'next') => {
    const el = carouselRef.current
    if (!el) return
    const cardWidth = el.clientWidth * 0.85 + 16
    el.scrollBy({ left: direction === 'next' ? cardWidth : -cardWidth, behavior: 'smooth' })
  }

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const el = carouselRef.current
    if (!el) return
    const threshold = 60
    if (info.offset.x < -threshold) scrollCarousel('next')
    else if (info.offset.x > threshold) scrollCarousel('prev')
    dragX.set(0)
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-4 md:gap-8 px-4 md:px-0">
        <div className="flex-1 w-full">
          <span className="terminal-badge mb-3 md:mb-4">{isAr ? 'الكتالوج العالمي' : 'Global Catalog'}</span>
          <h1
            className={cn(
              'text-3xl md:text-display-lg text-dark mb-2 md:mb-4',
              isAr ? 'font-ibm-arabic' : 'font-manrope'
            )}
          >
            {isAr ? 'مصفوفة السلع' : 'Commodity Matrix'}
          </h1>
          <p
            className={cn(
              'hidden md:block text-body-lg text-dark-500 max-w-2xl mb-8',
              isAr ? 'font-ibm-arabic' : 'font-inter'
            )}
          >
            {isAr
              ? 'محاصيل مصرية فاخرة بمواصفات B2B دقيقة — جاهزة للتصدير إلى الخليج وأوروبا وأفريقيا.'
              : 'Premium Egyptian crops with precise B2B specifications — export-ready for GCC, Europe, and Africa.'}
          </p>

          <div className="relative max-w-md w-full group">
            <Search
              className={cn(
                'absolute top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400 group-focus-within:text-primary transition-colors',
                isAr ? 'right-4' : 'left-4'
              )}
            />
            <input
              type="text"
              placeholder={isAr ? 'ابحث بالسلعة أو المنشأ...' : 'Search commodity or origin...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'w-full bg-white border border-silver-200 rounded-2xl py-3.5 min-h-[48px] text-body-md text-dark',
                'placeholder:text-silver-400 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30',
                'shadow-soft transition-all duration-400 touch-manipulation',
                isAr ? 'pr-11 pl-4 font-ibm-arabic' : 'pl-11 pr-4 font-inter'
              )}
            />
          </div>
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide snap-carousel pb-1 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible">
          {PRODUCT_CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              whileTap={TAP_SCALE}
              transition={{ duration: 0.12, ease: MOBILE_EASE_OUT }}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'shrink-0 px-4 py-2.5 min-h-[48px] rounded-xl border text-caption transition-all duration-400 touch-manipulation',
                activeCategory === cat.id
                  ? 'bg-dark text-white border-dark shadow-soft'
                  : 'bg-white border-silver-200 text-dark-500 hover:border-primary/40 hover:text-primary'
              )}
            >
              {isAr ? cat.ar : cat.en}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Mobile: swipeable snap carousel */}
      <div className="md:hidden relative">
        {filteredProducts.length > 1 && (
          <div className="flex justify-end gap-2 mb-3 px-4">
            <motion.button
              type="button"
              whileTap={TAP_SCALE}
              onClick={() => scrollCarousel('prev')}
              className="min-w-[48px] min-h-[48px] rounded-xl border border-gray-200 bg-white flex items-center justify-center touch-manipulation"
              aria-label={isAr ? 'السابق' : 'Previous'}
            >
              <ChevronLeft className={cn('w-5 h-5', isAr && 'rotate-180')} />
            </motion.button>
            <motion.button
              type="button"
              whileTap={TAP_SCALE}
              onClick={() => scrollCarousel('next')}
              className="min-w-[48px] min-h-[48px] rounded-xl border border-gray-200 bg-white flex items-center justify-center touch-manipulation"
              aria-label={isAr ? 'التالي' : 'Next'}
            >
              <ChevronRight className={cn('w-5 h-5', isAr && 'rotate-180')} />
            </motion.button>
          </div>
        )}

        <motion.div
          ref={carouselRef}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={handleDragEnd}
          style={{ x: dragX }}
          className={cn(
            'flex gap-4 overflow-x-auto snap-carousel scrollbar-hide px-4 pb-2 min-h-[380px]',
            'touch-pan-x gpu-accelerated will-change-transform'
          )}
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="snap-center shrink-0 w-full flex flex-col items-center justify-center py-16 text-silver-400"
              >
                <Search className="w-12 h-12 mb-3 opacity-30" />
                <p className={cn('text-base text-dark-500', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                  {isAr ? 'لا توجد سلع مطابقة' : 'No matching commodities'}
                </p>
              </motion.div>
            ) : (
              filteredProducts.map((product, i) => (
                <div key={product.id} className="snap-center shrink-0 w-[85vw] max-w-sm">
                  <ProductCard product={product} lang={lang} index={i} compact />
                </div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Desktop: grid */}
      <motion.div layout className="hidden md:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 min-h-[400px] px-4 md:px-0">
        <AnimatePresence mode="popLayout">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full flex flex-col items-center justify-center py-24 text-silver-400"
            >
              <Search className="w-14 h-14 mb-4 opacity-30" />
              <p className={cn('text-heading-md text-dark-500', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                {isAr ? 'لا توجد سلع مطابقة' : 'No matching commodities'}
              </p>
            </motion.div>
          ) : (
            filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} lang={lang} index={i} />
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
