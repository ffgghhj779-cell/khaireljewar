import Image from 'next/image'
import { BRAND_LOGO, BRAND_MARK } from '@/lib/constants/images'
import { cn } from '@/lib/utils/cn'

type BrandLogoVariant = 'header' | 'footer' | 'hero'

interface BrandLogoProps {
  variant?: BrandLogoVariant
  className?: string
  priority?: boolean
  /** Calligraphic emblem only */
  iconOnly?: boolean
}

const SIZE: Record<BrandLogoVariant, { mark: string; word: string }> = {
  header: { mark: 'h-12 w-auto sm:h-14', word: 'h-14 w-auto sm:h-16' },
  footer: { mark: 'h-16 w-auto', word: 'h-40 w-auto md:h-48' },
  hero: { mark: 'h-14 w-auto sm:h-16', word: 'h-24 w-auto sm:h-28' },
}

export default function BrandLogo({
  variant = 'header',
  className,
  priority = false,
  iconOnly = false,
}: BrandLogoProps) {
  return (
    <Image
      src={iconOnly ? BRAND_MARK : BRAND_LOGO}
      alt="خير الجوار — Khair Aljewar"
      width={iconOnly ? 499 : 789}
      height={iconOnly ? 864 : 1196}
      className={cn('shrink-0 object-contain', iconOnly ? SIZE[variant].mark : SIZE[variant].word, className)}
      priority={priority}
    />
  )
}
