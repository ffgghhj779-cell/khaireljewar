import Image from 'next/image'
import { BRAND_LOGO, IMAGE_QUALITY } from '@/lib/constants/images'
import { cn } from '@/lib/utils/cn'

type BrandLogoVariant = 'header' | 'footer' | 'hero'

const VARIANT_CLASS: Record<BrandLogoVariant, string> = {
  header: 'h-9 sm:h-10 lg:h-11 max-w-[200px] sm:max-w-[240px]',
  footer: 'h-16 max-w-[280px]',
  hero: 'h-8 sm:h-9 max-w-[200px]',
}

interface BrandLogoProps {
  variant?: BrandLogoVariant
  className?: string
  priority?: boolean
  /** Crop to KA mark only — readable on dark headers */
  iconOnly?: boolean
}

export default function BrandLogo({
  variant = 'header',
  className,
  priority = false,
  iconOnly = false,
}: BrandLogoProps) {
  if (iconOnly) {
    return (
      <div
        className={cn(
          'relative overflow-hidden shrink-0',
          variant === 'header' ? 'h-9 w-[50px] sm:h-10 sm:w-[56px]' : 'h-8 w-[44px] sm:h-9 sm:w-[50px]',
          className
        )}
        aria-hidden
      >
        <Image
          src={BRAND_LOGO}
          alt=""
          width={560}
          height={160}
          quality={IMAGE_QUALITY}
          priority={priority}
          className="absolute start-0 top-0 h-full w-auto max-w-none object-contain object-left"
        />
      </div>
    )
  }

  return (
    <Image
      src={BRAND_LOGO}
      alt="KHAIR ALJAAR FOODS"
      width={560}
      height={160}
      quality={IMAGE_QUALITY}
      priority={priority}
      className={cn('w-auto object-contain shrink-0', VARIANT_CLASS[variant], className)}
    />
  )
}
