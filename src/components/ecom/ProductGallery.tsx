'use client'

import { useState } from 'react'
import ProductImage from '@/components/ui/ProductImage'
import { cn } from '@/lib/utils/cn'

interface GalleryImage {
  src: string
  alt: string
  fit?: 'contain' | 'cover'
}

export default function ProductGallery({
  images,
  lang,
}: {
  images: GalleryImage[]
  lang: string
}) {
  const isAr = lang === 'ar'
  const [active, setActive] = useState(0)
  const current = images[active] ?? images[0]

  if (!current) return null

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex-1 min-h-[38vh] lg:min-h-[calc(100dvh-76px)] bg-cream overflow-hidden">
        <ProductImage
          key={current.src}
          src={current.src}
          alt={current.alt}
          variant="detail"
          lang={lang}
          priority
          fit={current.fit ?? 'contain'}
          className="!aspect-auto absolute inset-0 rounded-none border-0"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-t border-primary/8 bg-cream-soft p-3 md:p-4">
          {images.map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={isAr ? `صورة ${i + 1}` : `Image ${i + 1}`}
              aria-current={i === active}
              className={cn(
                'relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all md:h-[4.5rem] md:w-[4.5rem]',
                i === active ? 'border-primary shadow-soft' : 'border-transparent opacity-70 hover:opacity-100'
              )}
            >
              <ProductImage
                src={img.src}
                alt=""
                variant="thumb"
                lang={lang}
                fit={img.fit ?? 'cover'}
                className="!w-full !h-full rounded-none border-0"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
