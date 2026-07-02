'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import ProductCard from '@/components/sections/ProductCard'
import type { Product } from '@/lib/data/products'
import { cn } from '@/lib/utils/cn'
import { TAP_SCALE, MOBILE_EASE_OUT } from '@/lib/constants/motion'

interface FeaturedProductsGridProps {
  lang: string
  products: Product[]
}

export default function FeaturedProductsGrid({ lang, products }: FeaturedProductsGridProps) {
  const isAr = lang === 'ar'

  return (
    <section className="py-12 md:py-24 relative overflow-x-hidden">
      <Container size="large">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 md:gap-8 mb-6 md:mb-4">
          <div className="max-w-3xl">
            <span className="terminal-badge mb-3 md:mb-4">{isAr ? 'كتالوج التصدير' : 'Export Catalog'}</span>
            <h2
              className={cn(
                'text-3xl md:text-5xl font-black text-dark tracking-tight mb-2 md:mb-4',
                isAr ? 'font-ibm-arabic' : 'font-manrope'
              )}
            >
              {isAr ? 'سلعنا المميزة' : 'Featured Commodities'}
            </h2>
            <p
              className={cn(
                'hidden md:block text-lg text-gray-600 leading-relaxed',
                isAr ? 'font-ibm-arabic' : 'font-inter'
              )}
            >
              {isAr
                ? 'محاصيل مصرية فاخرة بمواصفات B2B دقيقة — جاهزة للشحن إلى أسواق الخليج وأوروبا وأفريقيا.'
                : 'Premium Egyptian commodities with precise B2B specs — export-ready for GCC, Europe, and Africa.'}
            </p>
            <div className="mt-4 md:mt-6 h-1 w-20 md:w-24 bg-primary rounded-full" />
          </div>
          <Link
            href={`/${lang}/products`}
            className={cn(
              'hidden md:inline-flex items-center gap-2 shrink-0 px-6 py-3 min-h-[48px] rounded-xl font-bold text-sm',
              'bg-dark text-white hover:bg-primary transition-colors touch-manipulation',
              isAr ? 'font-ibm-arabic' : 'font-inter'
            )}
          >
            {isAr ? 'عرض الكتالوج الكامل' : 'View Full Catalog'}
            <ArrowRight className={cn('w-4 h-4', isAr && 'rotate-180')} />
          </Link>
        </div>

        {/* Mobile snap carousel */}
        <div className="md:hidden flex gap-4 overflow-x-auto snap-carousel scrollbar-hide -mx-4 px-4 pb-2 gpu-accelerated">
          {products.map((product, index) => (
            <div key={product.id} className="snap-center shrink-0 w-[85vw] max-w-sm">
              <ProductCard product={product} lang={lang} index={index} compact />
            </div>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} lang={lang} index={index} />
          ))}
        </div>

        <motion.div className="md:hidden mt-6 px-1">
          <Link href={`/${lang}/products`}>
            <motion.span
              whileTap={TAP_SCALE}
              transition={{ duration: 0.12, ease: MOBILE_EASE_OUT }}
              className={cn(
                'flex items-center justify-center gap-2 w-full min-h-[48px] px-6 py-3 rounded-xl font-bold text-sm',
                'bg-dark text-white touch-manipulation',
                isAr ? 'font-ibm-arabic' : 'font-inter'
              )}
            >
              {isAr ? 'عرض الكتالوج الكامل' : 'View Full Catalog'}
              <ArrowRight className={cn('w-4 h-4', isAr && 'rotate-180')} />
            </motion.span>
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
