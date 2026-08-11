'use client'

import Image from 'next/image'
import { useState, useCallback, useEffect } from 'react'
import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import {
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
  const isBrandWebp = initialSrc.includes('/images/brand/') && initialSrc.endsWith('.webp')
  const [displaySrc, setDisplaySrc] = useState(initialSrc)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setDisplaySrc(initialSrc)
    setFailed(false)
  }, [initialSrc])

  const handleError = useCallback(() => {
    if (!failed) {
      setFailed(true)
      setDisplaySrc(getCategoryFallback(categoryEn))
    }
  }, [failed, categoryEn])

  if (pending) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream">
        <div className="w-20 h-20 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center mb-4">
          <ImageIcon className="w-10 h-10 text-primary/30" />
        </div>
        <span className={cn('text-xs font-semibold tracking-wide text-primary/50', isAr && 'font-arabic')}>
          {isAr ? 'صورة عالية الدقة قريباً' : 'High-res coming soon'}
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
      unoptimized={isBrandWebp}
      sizes="(max-width: 1024px) 100vw, 50vw"
      onError={handleError}
      className="object-contain object-center p-8 md:p-12 bg-cream"
    />
  )
}
