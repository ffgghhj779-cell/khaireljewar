import Image from 'next/image'
import { BRAND_LOGO, IMAGE_QUALITY } from '@/lib/constants/images'
import { cn } from '@/lib/utils/cn'

type BrandLogoVariant = 'header' | 'footer' | 'hero'

const VARIANT_CLASS: Record<BrandLogoVariant, string> = {
  header: 'h-8 sm:h-9 lg:h-10 max-w-[150px] sm:max-w-[180px]',
  footer: 'h-14 max-w-[220px]',
  hero: 'h-7 sm:h-8 max-w-[170px]',
}

interface BrandLogoProps {
  variant?: BrandLogoVariant
  className?: string
  priority?: boolean
}

export default function BrandLogo({ variant = 'header', className, priority = false }: BrandLogoProps) {
  const logo = (
    <Image
      src={BRAND_LOGO}
      alt="KHAIR ALJAAR FOODS"
      width={280}
      height={80}
      quality={IMAGE_QUALITY}
      unoptimized
      priority={priority}
      className={cn('w-auto object-contain', VARIANT_CLASS[variant], className)}
    />
  )

  if (variant === 'header') {
    return <span className="bg-white rounded-lg px-2.5 py-1 shrink-0 shadow-sm">{logo}</span>
  }

  return logo
}
