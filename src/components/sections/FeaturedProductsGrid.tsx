'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import ProductCard from '@/components/sections/ProductCard'
import type { Product } from '@/lib/data/products'
import { cn } from '@/lib/utils/cn'

interface FeaturedProductsGridProps {
  lang: string
  products: Product[]
}

export default function FeaturedProductsGrid({ lang, products }: FeaturedProductsGridProps) {
  const isAr = lang === 'ar'

  return (
    <section className="py-24 relative">
      <Container size="large">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-4">
          <div className="max-w-3xl">
            <span className="terminal-badge mb-4">{isAr ? 'كتالوج التصدير' : 'Export Catalog'}</span>
            <h2 className={cn('text-4xl md:text-5xl font-black text-dark tracking-tight mb-4', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {isAr ? 'سلعنا المميزة' : 'Featured Commodities'}
            </h2>
            <p className={cn('text-lg text-gray-600 leading-relaxed', isAr ? 'font-ibm-arabic' : 'font-inter')}>
              {isAr
                ? 'محاصيل مصرية فاخرة بمواصفات B2B دقيقة — جاهزة للشحن إلى أسواق الخليج وأوروبا وأفريقيا.'
                : 'Premium Egyptian commodities with precise B2B specs — export-ready for GCC, Europe, and Africa.'}
            </p>
            <div className="mt-6 h-1 w-24 bg-primary rounded-full" />
          </div>
          <Link
            href={`/${lang}/products`}
            className={cn(
              'inline-flex items-center gap-2 shrink-0 px-6 py-3 rounded-xl font-bold text-sm',
              'bg-dark text-white hover:bg-primary transition-colors',
              isAr ? 'font-ibm-arabic' : 'font-inter'
            )}
          >
            {isAr ? 'عرض الكتالوج الكامل' : 'View Full Catalog'}
            <ArrowRight className={cn('w-4 h-4', isAr && 'rotate-180')} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} lang={lang} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )

}
