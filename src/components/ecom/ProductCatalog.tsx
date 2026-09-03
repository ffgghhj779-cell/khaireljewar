'use client'

import { useCallback, useDeferredValue, useEffect, useMemo, useState, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { PackageSearch, Search } from 'lucide-react'
import { PRODUCT_CATEGORIES, type Product } from '@/lib/data/products'
import ProductCard from '@/components/sections/ProductCard'
import EmptyState from '@/components/ui/EmptyState'
import { ProductCardSkeleton } from '@/components/ui/Skeleton'
import { BRAND } from '@/lib/constants/brand'
import { cn } from '@/lib/utils/cn'
import { MOBILE_EASE_OUT, TAP_SCALE } from '@/lib/constants/motion'

interface ProductCatalogProps {
  lang: string
  products: Product[]
}

function normalizeCategory(raw: string | null): string {
  if (!raw) return 'All'
  const match = PRODUCT_CATEGORIES.find(
    (c) => c.id.toLowerCase() === raw.toLowerCase() || c.en.toLowerCase() === raw.toLowerCase()
  )
  return match?.id ?? 'All'
}

export default function ProductCatalog({ lang, products }: ProductCatalogProps) {
  const isAr = lang === 'ar'
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [activeCategory, setActiveCategory] = useState(() => normalizeCategory(searchParams.get('category')))
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '')
  const deferredQuery = useDeferredValue(searchQuery)

  useEffect(() => {
    setActiveCategory(normalizeCategory(searchParams.get('category')))
    setSearchQuery(searchParams.get('q') ?? '')
  }, [searchParams])

  const syncUrl = useCallback(
    (category: string, q: string) => {
      const params = new URLSearchParams()
      if (category && category !== 'All') params.set('category', category)
      if (q.trim()) params.set('q', q.trim())
      const qs = params.toString()
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
      })
    },
    [pathname, router]
  )

  const setCategory = (category: string) => {
    setActiveCategory(category)
    syncUrl(category, searchQuery)
  }

  const onSearchChange = (value: string) => {
    setSearchQuery(value)
    syncUrl(activeCategory, value)
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category.en === activeCategory
      const q = deferredQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        product.title.en.toLowerCase().includes(q) ||
        product.title.ar.includes(deferredQuery) ||
        product.origin.en.toLowerCase().includes(q) ||
        product.commodityClass.en.toLowerCase().includes(q) ||
        product.category.en.toLowerCase().includes(q) ||
        product.category.ar.includes(deferredQuery)
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, deferredQuery, products])

  const clearFilters = () => {
    setActiveCategory('All')
    setSearchQuery('')
    syncUrl('All', '')
  }

  return (
    <>
      <div className="mb-8 md:mb-14">
        <p className={cn('text-primary font-semibold text-sm mb-2.5 md:mb-3', isAr ? 'font-arabic' : 'font-sans')}>
          {isAr ? 'الكتالوج' : 'Catalog'}
        </p>
        <h1
          className={cn(
            'text-[clamp(1.85rem,7vw,3.75rem)] font-bold text-dark tracking-tight editorial-heading mb-3 md:mb-4 text-balance',
            isAr ? 'font-arabic-display' : 'font-display'
          )}
        >
          {isAr ? 'منتجات تُطلب.' : 'Made to be wanted.'}
        </h1>
        <p className={cn('text-gray-600 text-[15px] md:text-lg max-w-2xl mb-6 md:mb-8 leading-relaxed', isAr ? 'font-arabic' : 'font-sans')}>
          {isAr ? BRAND.sourcing.ar : BRAND.sourcing.en}
        </p>

        <div className="relative max-w-md w-full mb-6">
          <Search
            className={cn(
              'absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400',
              isAr ? 'right-4' : 'left-4'
            )}
          />
          <input
            type="search"
            placeholder={isAr ? 'ابحث عن منتج...' : 'Search products...'}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={cn(
              'w-full bg-white border border-gray-200 rounded-full py-3.5 min-h-[48px] text-[15px] text-dark',
              'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30',
              'shadow-soft transition-all touch-manipulation',
              isAr ? 'pr-11 pl-4 font-arabic' : 'pl-11 pr-4 font-sans'
            )}
          />
        </div>

        <div className="flex gap-2 w-full overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
          {PRODUCT_CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              whileTap={TAP_SCALE}
              transition={{ duration: 0.12, ease: MOBILE_EASE_OUT }}
              onClick={() => setCategory(cat.id)}
              aria-pressed={activeCategory === cat.id}
              className={cn(
                'shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors min-h-[40px]',
                activeCategory === cat.id
                  ? 'bg-primary text-cream'
                  : 'bg-white text-gray-600 border border-dark/10 hover:border-primary/30',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {isAr ? cat.ar : cat.en}
            </motion.button>
          ))}
        </div>

        <p className={cn('mt-5 text-sm text-primary/50', isAr ? 'font-arabic' : 'font-sans')}>
          {isAr
            ? `${filteredProducts.length} منتج${isPending ? '…' : ''}`
            : `${filteredProducts.length} product${filteredProducts.length === 1 ? '' : 's'}${isPending ? '…' : ''}`}
        </p>
      </div>

      {isPending && filteredProducts.length === 0 ? (
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 md:gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory + deferredQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 md:gap-5"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} lang={lang} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {filteredProducts.length === 0 && !isPending && (
        <EmptyState
          icon={PackageSearch}
          title={isAr ? 'لا توجد منتجات مطابقة' : 'No matching products'}
          description={
            isAr
              ? 'جرّب تصنيفًا آخر أو امسح البحث لعرض الكتالوج كاملًا.'
              : 'Try another category or clear search to see the full catalog.'
          }
          action={{
            label: isAr ? 'مسح الفلاتر' : 'Clear filters',
            onClick: clearFilters,
          }}
          className="mt-6 border-primary/15 bg-cream-soft"
        />
      )}
    </>
  )
}
