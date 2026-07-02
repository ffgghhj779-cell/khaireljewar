'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, Plus } from 'lucide-react'
import { MOCK_PRODUCTS, PRODUCT_CATEGORIES } from '@/lib/data/products'
import { useQuoteStore } from '@/store/useQuoteStore'
import { cn } from '@/lib/utils/cn'

export default function ProductMatrix({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const { addItem } = useQuoteStore()

  const filtered = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => {
      const matchCat = category === 'All' || p.category.en === category
      const q = search.toLowerCase()
      const matchSearch =
        p.title.en.toLowerCase().includes(q) ||
        p.title.ar.includes(q) ||
        p.commodityClass.en.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [search, category])

  const handleAdd = (product: (typeof MOCK_PRODUCTS)[0]) => {
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
  }

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-10">
          <div>
            <span className="terminal-badge mb-4">{isAr ? 'مصفوفة المنتجات' : 'Product Matrix'}</span>
            <h2 className={cn('text-3xl md:text-4xl font-black text-dark tracking-tight', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {isAr ? 'كتالوج التصدير المباشر' : 'Live Export Product Matrix'}
            </h2>
            <p className={cn('text-gray-500 mt-2 text-sm', isAr ? 'font-ibm-arabic' : 'font-inter')}>
              {isAr ? 'المواصفات الفنية، التعبئة، ومتطلبات الحد الأدنى للطلب' : 'Technical specs, packaging, and MOQ requirements'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative">
              <Search className="absolute top-1/2 -translate-y-1/2 start-4 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={isAr ? 'بحث عن سلعة...' : 'Search commodity...'}
                className={cn(
                  'w-full sm:w-64 ps-10 pe-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30',
                  isAr ? 'font-ibm-arabic' : 'font-inter'
                )}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-bold border transition-all',
                    category === cat.id
                      ? 'bg-dark text-white border-dark'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-primary'
                  )}
                >
                  {isAr ? cat.ar : cat.en}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse text-sm min-w-[900px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 uppercase tracking-widest text-[10px]">
                  <th className="py-4 px-5 font-bold text-start">{isAr ? 'السلعة' : 'Commodity'}</th>
                  <th className="py-4 px-5 font-bold text-start">{isAr ? 'الفئة' : 'Class'}</th>
                  <th className="py-4 px-5 font-bold text-start">{isAr ? 'المعايرة' : 'Caliber'}</th>
                  <th className="py-4 px-5 font-bold text-start">{isAr ? 'التعبئة' : 'Packaging'}</th>
                  <th className="py-4 px-5 font-bold text-start">MOQ</th>
                  <th className="py-4 px-5 font-bold text-start">{isAr ? 'التوفر' : 'Status'}</th>
                  <th className="py-4 px-5 font-bold text-end">{isAr ? 'إجراء' : 'Action'}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors group"
                  >
                    <td className="py-4 px-5">
                      <Link href={`/${lang}/products/${p.slug}`} className="font-bold text-dark hover:text-primary transition-colors">
                        {isAr ? p.title.ar : p.title.en}
                      </Link>
                    </td>
                    <td className="py-4 px-5 text-gray-500">{isAr ? p.commodityClass.ar : p.commodityClass.en}</td>
                    <td className="py-4 px-5 text-primary font-mono text-xs">{isAr ? p.sizes.ar : p.sizes.en}</td>
                    <td className="py-4 px-5 text-gray-500 text-xs">{isAr ? p.packaging.ar : p.packaging.en}</td>
                    <td className="py-4 px-5 font-mono text-xs font-bold">
                      {p.minOrder} {p.unit}
                    </td>
                    <td className="py-4 px-5">
                      <span
                        className={cn(
                          'text-[10px] font-bold uppercase px-2 py-1 rounded-md',
                          p.availability.en === 'In Stock'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-orange-50 text-orange-700 border border-orange-200'
                        )}
                      >
                        {isAr ? p.availability.ar : p.availability.en}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-end">
                      <button
                        onClick={() => handleAdd(p)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all"
                        aria-label="Add to quote"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-gray-400">
              {isAr ? 'لا توجد نتائج مطابقة' : 'No matching commodities found'}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
