'use client'

import { useQuoteStore } from '@/store/useQuoteStore'
import type { Product } from '@/lib/data/products'
import { cn } from '@/lib/utils/cn'
import { ShoppingCart } from 'lucide-react'

export default function AddToCartButton({ product, lang }: { product: Product; lang: string }) {
  const { addItem } = useQuoteStore()
  const isAr = lang === 'ar'

  const handleAdd = () => {
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
    <button
      onClick={handleAdd}
      className="w-full mt-6 bg-dark hover:bg-primary text-white text-lg font-bold py-5 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 border border-dark"
    >
      <ShoppingCart className="w-6 h-6" />
      <span className={isAr ? 'font-ibm-arabic' : 'font-inter'}>
        {isAr ? 'إضافة إلى طلب التسعير' : 'Add to Quote List'}
      </span>
    </button>
  )
}
