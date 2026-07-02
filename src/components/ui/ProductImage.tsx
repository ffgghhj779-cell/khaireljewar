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
}

const VARIANT_STYLES: Record<ProductImageVariant, { aspect: string; image: string; sizes: string }> = {
  card: {
    aspect: 'aspect-[4/3]',
    image: 'object-contain object-center p-3 sm:p-4',
    sizes: '(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw',
  },
  detail: {
    aspect: 'aspect-[4/3] lg:aspect-auto lg:absolute lg:inset-0',
    image: 'object-contain object-center p-6 sm:p-10 lg:p-12',
    sizes: '(max-width: 1024px) 100vw, 50vw',
  },
  thumb: {
    aspect: 'w-16 h-16',
    image: 'object-contain object-center p-1',
    sizes: '64px',
  },
}

function PendingOverlay({ lang, variant }: { lang: string; variant: ProductImageVariant }) {
  const isAr = lang === 'ar'
  const compact = variant === 'thumb'

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-primary/5 border border-gray-100">
      <div
        className={cn(
          'rounded-xl bg-dark/5 border border-gray-200 flex items-center justify-center',
          compact ? 'w-8 h-8' : 'w-14 h-14 mb-2'
        )}
      >
        <ImageIcon className={cn('text-dark/35', compact ? 'w-4 h-4' : 'w-7 h-7')} />
      </div>
      {!compact && (
        <>
          <span className={cn('text-[10px] font-bold uppercase tracking-widest text-dark/45', isAr && 'font-ibm-arabic')}>
            {isAr ? 'صورة قيد التجهيز' : 'High-Res Coming Soon'}
          </span>
          <span className={cn('text-[9px] text-gray-400 mt-1 px-4 text-center', isAr && 'font-ibm-arabic')}>
            {isAr ? 'منتج معتمد — تصوير احترافي قريباً' : 'Certified product — professional imaging pending'}
          </span>
        </>
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
}: ProductImageProps) {
  const pending = isProductImagePending(src, slug)
  const resolvedSrc = resolveProductImage(src, categoryEn, slug)
  const styles = VARIANT_STYLES[variant]

  const [displaySrc, setDisplaySrc] = useState(resolvedSrc)
  const [failed, setFailed] = useState(false)

  const handleError = useCallback(() => {
    const fallback = getCategoryFallback(categoryEn)
    if (displaySrc !== fallback) {
      setDisplaySrc(fallback)
    } else {
      setFailed(true)
    }
  }, [displaySrc, categoryEn])

  const showPendingOverlay = pending || failed

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gray-50 will-change-transform',
        variant === 'thumb' ? styles.aspect : styles.aspect,
        variant === 'thumb' && 'rounded-lg border border-gray-200 shrink-0',
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
          placeholder="blur"
          blurDataURL={IMAGE_BLUR_DATA_URL}
          onError={handleError}
          className={cn(styles.image, 'will-change-transform')}
        />
      )}
      {showPendingOverlay && <PendingOverlay lang={lang} variant={variant} />}
    </div>
  )
}
