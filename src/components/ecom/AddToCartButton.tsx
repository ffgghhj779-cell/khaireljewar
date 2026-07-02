'use client'

import { motion } from 'framer-motion'
import { useAddToQuote } from '@/store/useQuoteStore'
import { resolveProductImage } from '@/lib/constants/images'
import { TAP_SCALE } from '@/lib/constants/motion'
import type { Product } from '@/lib/data/products'
import { ShoppingCart } from 'lucide-react'

export default function AddToCartButton({ product, lang }: { product: Product; lang: string }) {
  const addItem = useAddToQuote()
  const isAr = lang === 'ar'

  const handleAdd = () => {
    addItem(
      {
        id: product.id,
        slug: product.slug,
        title: product.title,
        image: resolveProductImage(product.image, product.category.en, product.slug),
        quantity: product.minOrder,
        packaging: isAr ? product.packaging.ar : product.packaging.en,
        unit: product.unit,
        indexPrice: product.indexPrice,
      },
      lang
    )
  }

  return (
    <motion.button
      type="button"
      onClick={handleAdd}
      whileTap={TAP_SCALE}
      className="w-full mt-6 bg-dark hover:bg-primary text-white text-lg font-bold py-5 min-h-[48px] rounded-xl flex items-center justify-center gap-3 transition-colors duration-150 border border-dark will-change-transform touch-manipulation"
    >
      <ShoppingCart className="w-6 h-6" />
      <span className={isAr ? 'font-ibm-arabic' : 'font-inter'}>
        {isAr ? 'إضافة إلى طلب التسعير' : 'Add to Quote List'}
      </span>
    </motion.button>
  )
}
