'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import {
  IMAGE_BLUR_DATA_URL,
  resolveProductImage,
  isProductImagePending,
  getCategoryFallback,
  IMAGE_QUALITY_PRODUCT,
} from '@/lib/constants/images'

interface ProductDetailImageProps {
  src?: string | null
  alt: string
  categoryEn?: string
  slug?: string
  lang: string
}

export default function ProductDetailImage({ src, alt, categoryEn, slug, lang }: ProductDetailImageProps) {
  const isAr = lang === 'ar'
  const pending = isProductImagePending(src, slug)
  const initialSrc = resolveProductImage(src, categoryEn, slug)
  const [displaySrc, setDisplaySrc] = useState(initialSrc)
  const [failed, setFailed] = useState(false)

  const handleError = useCallback(() => {
    if (!failed) {
      setFailed(true)
      setDisplaySrc(getCategoryFallback(categoryEn))
    }
  }, [failed, categoryEn])

  if (pending) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-primary/5">
        <div className="w-20 h-20 rounded-2xl bg-dark/5 border border-gray-200 flex items-center justify-center mb-4">
          <ImageIcon className="w-10 h-10 text-dark/30" />
        </div>
        <span className={cn('text-xs font-bold uppercase tracking-widest text-dark/50', isAr && 'font-ibm-arabic')}>
          {isAr ? 'صورة عالية الدقة قريباً' : 'High-Res Coming Soon'}
        </span>
        <span className={cn('text-sm text-gray-400 mt-2 px-6 text-center', isAr && 'font-ibm-arabic')}>
          {isAr ? 'منتج معتمد — التصوير الاحترافي قيد الإعداد' : 'Certified product — professional imaging in progress'}
        </span>
      </div>
    )
  }

  return (
    <Image
      src={displaySrc}
      alt={alt}
      fill
      priority
      quality={IMAGE_QUALITY_PRODUCT}
      sizes="(max-width: 1024px) 100vw, 50vw"
      placeholder="blur"
      blurDataURL={IMAGE_BLUR_DATA_URL}
      onError={handleError}
      className="object-contain object-center p-6 sm:p-10 lg:p-12"
    />
  )
}
