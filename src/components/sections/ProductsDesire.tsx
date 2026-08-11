'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import ProductCard from '@/components/sections/ProductCard'
import BotanicalMotif from '@/components/graphics/BotanicalMotif'
import type { Product } from '@/lib/data/products'
import { SCROLL_VIEWPORT_INSTANT, TAP_SCALE, BRAND_EASE } from '@/lib/constants/motion'
import { useLightMotion } from '@/hooks/useLightMotion'
import { cn } from '@/lib/utils/cn'

interface ProductsDesireProps {
  lang: string
  products: Product[]
}

export default function ProductsDesire({ lang, products }: ProductsDesireProps) {
  const isAr = lang === 'ar'
  const lightMotion = useLightMotion()
  const items = products.slice(0, 12)
  const mobileItems = products.slice(0, 8)

  return (
    <section className="relative z-0 overflow-hidden bg-cream-soft py-12 md:py-32">
      <BotanicalMotif
        kind="orange"
        tone="soft"
        className="absolute top-16 -start-4 hidden w-20 h-20 opacity-30 md:block soft-float"
      />
      <BotanicalMotif
        kind="berry"
        tone="soft"
        className="absolute bottom-20 -end-2 hidden w-16 h-16 opacity-25 lg:block soft-float-delay"
      />

      <Container size="large" className="relative z-10">
        <motion.div
          initial={lightMotion ? false : { opacity: 0, y: 16 }}
          whileInView={lightMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={SCROLL_VIEWPORT_INSTANT}
          transition={{ duration: 0.5, ease: BRAND_EASE }}
          className="mx-auto mb-10 max-w-2xl text-center md:mb-20"
        >
          <div className="mb-3 flex justify-center md:mb-4">
            <BotanicalMotif kind="date" className="h-8 w-6 opacity-45 md:h-9 md:w-7" />
          </div>
          <p className={cn('mb-2.5 text-primary font-semibold md:mb-3', isAr ? 'font-arabic' : 'font-display')}>
            {isAr ? 'المنتجات' : 'Our products'}
          </p>
          <h2
            className={cn(
              'text-[clamp(2rem,7vw,3.75rem)] font-medium text-primary leading-[1.12] tracking-tight text-balance',
              isAr ? 'font-arabic' : 'font-display'
            )}
          >
            {isAr ? 'من خير الجوار.' : 'Fresh from Khair Aljaar.'}
          </h2>
        </motion.div>

        <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 pb-1">
          {mobileItems.map((product, index) => (
            <div key={product.id} className="snap-start shrink-0 w-[72vw] max-w-[240px]">
              <ProductCard product={product} lang={lang} index={index} compact />
            </div>
          ))}
        </div>

        <div className="mx-auto hidden md:grid max-w-5xl grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {items.map((product, index) => (
            <ProductCard key={product.id} product={product} lang={lang} index={index} />
          ))}
        </div>

        <motion.div className="mt-12 flex justify-center">
          <Link href={`/${lang}/products`}>
            <motion.span
              whileTap={TAP_SCALE}
              className={cn(
                'magnetic-cta inline-flex items-center justify-center gap-2 min-h-[52px] px-8 rounded-xl font-semibold',
                'bg-primary text-cream hover:bg-primary-700',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {isAr ? 'كل المنتجات' : 'View all'}
              <ArrowRight className={cn('w-4 h-4', isAr && 'rotate-180')} />
            </motion.span>
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
