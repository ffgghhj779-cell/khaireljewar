'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import { PRODUCT_CATEGORIES, type Product } from '@/lib/data/products'
import ProductCard from '@/components/sections/ProductCard'
import { cn } from '@/lib/utils/cn'

interface ProductCatalogProps {
  lang: string
  products: Product[]
}

export default function ProductCatalog({ lang, products }: ProductCatalogProps) {
  const isAr = lang === 'ar'
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

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

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="flex-1 w-full">
          <span className="terminal-badge mb-4">{isAr ? 'الكتالوج العالمي' : 'Global Catalog'}</span>
          <h1
            className={cn(
              'text-display-md md:text-display-lg text-dark mb-4',
              isAr ? 'font-ibm-arabic' : 'font-manrope'
            )}
          >
            {isAr ? 'مصفوفة السلع' : 'Commodity Matrix'}
          </h1>
          <p className={cn('text-body-lg text-dark-500 max-w-2xl mb-8', isAr ? 'font-ibm-arabic' : 'font-inter')}>
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
                'w-full bg-white border border-silver-200 rounded-2xl py-3.5 text-body-md text-dark',
                'placeholder:text-silver-400 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30',
                'shadow-soft transition-all duration-400',
                isAr ? 'pr-11 pl-4 font-ibm-arabic' : 'pl-11 pr-4 font-inter'
              )}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {PRODUCT_CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'px-4 py-2 rounded-xl border text-caption transition-all duration-400',
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

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 min-h-[400px]">
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
