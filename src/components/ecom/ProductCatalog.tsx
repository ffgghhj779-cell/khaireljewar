'use client'
import { tx, localeFontClass } from '@/lib/i18n/localize'

import { useCallback, useDeferredValue, useEffect, useMemo, useState, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, PackageSearch, Search } from 'lucide-react'
import { PRODUCT_CATEGORIES, type Product } from '@/lib/data/products'
import ProductCard from '@/components/sections/ProductCard'
import CategoryShowcaseBanner, { CATEGORY_SHOWCASES } from '@/components/ecom/CategoryShowcaseBanner'
import EmptyState from '@/components/ui/EmptyState'
import { ProductCardSkeleton } from '@/components/ui/Skeleton'
import { BRAND } from '@/lib/constants/brand'
import { cn } from '@/lib/utils/cn'
import { MOBILE_EASE_OUT, TAP_SCALE } from '@/lib/constants/motion'

interface ProductCatalogProps {
  lang: string
  products: Product[]
}

const SECTION_IDS: readonly string[] = PRODUCT_CATEGORIES.map((c) => c.id).filter((id) => id !== 'All' && id !== 'New')
const MOBILE_ROW_LIMIT = 10

function normalizeCategory(raw: string | null): string {
  if (!raw) return 'All'
  const match = PRODUCT_CATEGORIES.find(
    (c) => c.id.toLowerCase() === raw.toLowerCase() || c.en.toLowerCase() === raw.toLowerCase()
  )
  return match?.id ?? 'All'
}

export default function ProductCatalog({ lang, products }: ProductCatalogProps) {
  const isAr = lang === 'ar' || lang === 'ur'
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
      const matchesCategory =
        activeCategory === 'All' ||
        (activeCategory === 'New' ? Boolean(product.isNew) : product.category.en === activeCategory)
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

  const openCategory = (category: string) => {
    setCategory(category)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const groupedView = activeCategory === 'All' && !deferredQuery.trim()

  const groups = useMemo(() => {
    const known = SECTION_IDS.map((id) => {
      const meta = PRODUCT_CATEGORIES.find((c) => c.id === id)
      return {
        id,
        label: { en: meta?.en ?? id, ar: meta?.ar ?? id },
        items: products.filter((p) => p.category.en === id),
      }
    })
    const rest = products.filter((p) => !SECTION_IDS.includes(p.category.en))
    const restGroups = Array.from(new Set(rest.map((p) => p.category.en))).map((id) => {
      const items = rest.filter((p) => p.category.en === id)
      return { id, label: items[0].category, items }
    })
    return [...known, ...restGroups].filter((g) => g.items.length > 0)
  }, [products])

  const showActiveBanner = !groupedView && !deferredQuery.trim() && Boolean(CATEGORY_SHOWCASES[activeCategory])
  const ViewAllIcon = isAr ? ChevronLeft : ChevronRight

  return (
    <>
      <div className="mb-8 md:mb-14">
        <p className={cn('text-primary font-semibold text-sm mb-2.5 md:mb-3', localeFontClass(lang))}>
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
        <p className={cn('text-gray-600 text-[15px] md:text-lg max-w-2xl mb-6 md:mb-8 leading-relaxed', localeFontClass(lang))}>
          {tx(lang, BRAND.sourcing)}
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
                  ? 'bg-secondary text-primary'
                  : 'bg-white text-gray-600 border border-dark/10 hover:border-primary/30',
                localeFontClass(lang)
              )}
            >
              {tx(lang, cat)}
            </motion.button>
          ))}
        </div>

        {activeCategory === 'New' && (
          <p className={cn('mt-4 max-w-2xl text-sm leading-relaxed text-primary/70', localeFontClass(lang))}>
            {isAr
              ? 'أحدث ما انضم للكتالوج: عجوة المدينة، فراولة وكيوي، فلفل أحمر، ومجمدات جديدة. السعر بعرض مكتوب.'
              : 'The latest additions: Ajwa from Al Madinah, strawberries and kiwi, red peppers, and new frozen lines. Priced by written quote.'}
          </p>
        )}

        {activeCategory === 'Rice' && (
          <p className={cn('mt-4 max-w-2xl text-sm leading-relaxed text-primary/70', localeFontClass(lang))}>
            {isAr
              ? 'أرز سلام بالوكالة الحصرية لتسامي الوطنية، ثم بسمتي وبقوليات ومكرونة. كل عبوة منتج مستقل، والسعر بعرض مكتوب.'
              : 'The rice department follows Tasami Al-Wataniya: Sallam under exclusive agency, then basmati, pulses, and pasta. Each pack is its own product, priced by written quote.'}
          </p>
        )}

        <p className={cn('mt-5 text-sm text-primary/50', localeFontClass(lang))}>
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
            className="mx-auto max-w-5xl"
          >
            {groupedView ? (
              groups.map((group) => (
                <section key={group.id} aria-label={tx(lang, group.label)} className="mb-10 md:mb-16">
                  <CategoryShowcaseBanner
                    categoryId={group.id}
                    products={products}
                    lang={lang}
                    primaryAction={{
                      label: isAr ? 'اعرض القسم كامل' : 'View full section',
                      onClick: () => openCategory(group.id),
                    }}
                  />
                  <div className="mb-3 flex items-center justify-between gap-3 md:mb-5">
                    <h2
                      className={cn(
                        'min-w-0 truncate text-xl font-bold text-dark md:text-2xl',
                        isAr ? 'font-arabic-display' : 'font-display'
                      )}
                    >
                      {tx(lang, group.label)}
                      <span className={cn('ms-2 text-sm font-semibold text-primary/45', localeFontClass(lang))}>
                        {group.items.length}
                      </span>
                    </h2>
                    <button
                      type="button"
                      onClick={() => openCategory(group.id)}
                      className={cn(
                        'inline-flex min-h-[40px] shrink-0 items-center gap-1 rounded-full border border-primary/15 bg-white px-3.5 text-[13px] font-semibold text-primary transition-colors hover:border-primary/35 touch-manipulation',
                        localeFontClass(lang)
                      )}
                    >
                      {isAr ? `عرض الكل (${group.items.length})` : `View all (${group.items.length})`}
                      <ViewAllIcon className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                  <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 scrollbar-hide md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4">
                    {group.items.map((product, index) => (
                      <div
                        key={product.id}
                        className={cn(
                          'w-[46%] shrink-0 snap-start md:w-auto',
                          index >= MOBILE_ROW_LIMIT && 'max-md:hidden'
                        )}
                      >
                        <ProductCard product={product} lang={lang} index={index} />
                      </div>
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <>
                {showActiveBanner && (
                  <CategoryShowcaseBanner
                    categoryId={activeCategory}
                    products={products}
                    lang={lang}
                    primaryAction={{
                      label: isAr ? 'كل الأقسام' : 'All sections',
                      onClick: () => openCategory('All'),
                    }}
                  />
                )}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 md:gap-5">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} lang={lang} index={index} />
                  ))}
                </div>
              </>
            )}
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
