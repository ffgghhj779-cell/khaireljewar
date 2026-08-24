'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import {
  IMAGE_BLUR_DATA_URL,
  resolveProductImage,
  isProductImagePending,
  getCategoryFallback,
  IMAGE_QUALITY_PRODUCT,
  IMAGE_QUALITY_THUMB,
} from '@/lib/constants/images'

type ProductImageVariant = 'card' | 'detail' | 'thumb'

interface ProductImageProps {
  src?: string | null
  alt: string
  categoryEn?: string
  slug?: string
  priority?: boolean
  sizes?: string
  variant?: ProductImageVariant
  className?: string
  lang?: string
  /** Studio shots look best contained on cream; lifestyle can cover */
  fit?: 'cover' | 'contain'
}

const VARIANT_STYLES: Record<ProductImageVariant, { aspect: string; sizes: string }> = {
  card: {
    aspect: 'aspect-square',
    sizes: '(max-width: 768px) 45vw, (max-width: 1200px) 30vw, 240px',
  },
  detail: {
    aspect: 'aspect-[4/3] lg:aspect-auto lg:absolute lg:inset-0',
    sizes: '(max-width: 1024px) 100vw, 50vw',
  },
  thumb: {
    aspect: 'w-14 h-14',
    sizes: '56px',
  },
}

function PendingOverlay({ lang, variant }: { lang: string; variant: ProductImageVariant }) {
  const isAr = lang === 'ar'
  const compact = variant === 'thumb'

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream">
      <div
        className={cn(
          'rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center',
          compact ? 'w-7 h-7' : 'w-12 h-12 mb-2'
        )}
      >
        <ImageIcon className={cn('text-primary/35', compact ? 'w-3.5 h-3.5' : 'w-6 h-6')} />
      </div>
      {!compact && (
        <span className={cn('text-[10px] font-semibold tracking-wide text-primary/45', isAr && 'font-arabic')}>
          {isAr ? 'صورة قيد التجهيز' : 'Image coming soon'}
        </span>
      )}
    </div>
  )
}

export default function ProductImage({
  src,
  alt,
  categoryEn,
  slug,
  priority = false,
  sizes,
  variant = 'card',
  className,
  lang = 'en',
  fit = 'contain',
}: ProductImageProps) {
  const pending = isProductImagePending(src, slug)
  const resolvedSrc = resolveProductImage(src, categoryEn, slug)
  const styles = VARIANT_STYLES[variant]
  const isBrandWebp = resolvedSrc.includes('/images/brand/') && resolvedSrc.endsWith('.webp')
  const isRemoteUpload = /^https?:\/\//i.test(resolvedSrc)

  const [displaySrc, setDisplaySrc] = useState(resolvedSrc)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setDisplaySrc(resolvedSrc)
    setFailed(false)
  }, [resolvedSrc])

  const handleError = useCallback(() => {
    const original = (src || '').trim()
    // Uploaded remote URLs must never fall back to another SKU photo
    if (/^https?:\/\//i.test(original)) {
      setFailed(true)
      return
    }
    const fallback = getCategoryFallback(categoryEn)
    if (displaySrc !== fallback) {
      setDisplaySrc(fallback)
    } else {
      setFailed(true)
    }
  }, [displaySrc, categoryEn, src])

  const showPendingOverlay = pending || failed
  const objectFit =
    fit === 'cover'
      ? 'object-cover object-center'
      : 'object-contain object-center p-2 sm:p-3 md:p-4'

  return (
    <div
      className={cn(
        'relative overflow-hidden will-change-auto',
        variant === 'card' || variant === 'detail' ? 'bg-cream' : 'bg-cream-deep',
        styles.aspect,
        variant === 'thumb' && 'rounded-lg border border-primary/8 shrink-0',
        className
      )}
    >
      {!showPendingOverlay && (
        <Image
          src={displaySrc}
          alt={alt}
          fill
          sizes={sizes ?? styles.sizes}
          priority={priority}
          quality={variant === 'thumb' ? IMAGE_QUALITY_THUMB : variant === 'card' ? 78 : IMAGE_QUALITY_PRODUCT}
          unoptimized={isBrandWebp || isRemoteUpload}
          placeholder={isBrandWebp || isRemoteUpload ? 'empty' : 'blur'}
          blurDataURL={isBrandWebp || isRemoteUpload ? undefined : IMAGE_BLUR_DATA_URL}
          onError={handleError}
          className={cn(objectFit)}
        />
      )}
      {showPendingOverlay && <PendingOverlay lang={lang} variant={variant} />}
    </div>
  )
}
