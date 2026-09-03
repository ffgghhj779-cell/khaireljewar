import BrandLogo from '@/components/ui/BrandLogo'
import { BRAND } from '@/lib/constants/brand'
import { cn } from '@/lib/utils/cn'

interface BrandLockupProps {
  lang: string
  compact?: boolean
  priority?: boolean
  className?: string
  variant?: 'header' | 'footer'
  /** Light header over photography / dark bar */
  tone?: 'light' | 'dark'
}

export default function BrandLockup({
  lang,
  compact = false,
  priority = false,
  className,
  variant = 'header',
  tone = 'dark',
}: BrandLockupProps) {
  const isAr = lang === 'ar'
  const onDark = tone === 'light'

  if (variant === 'footer') {
    return (
      <div className={cn(className)}>
        <BrandLogo variant="footer" priority={priority} />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex items-center gap-2.5 sm:gap-3 min-w-0',
        onDark ? 'text-white' : 'text-dark',
        className
      )}
    >
      <BrandLogo
        variant="header"
        priority={priority}
        iconOnly
        className={cn(compact && '!h-10 !w-auto sm:!h-11')}
      />
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'font-bold leading-tight truncate',
            compact ? 'text-sm sm:text-base' : 'text-base sm:text-lg',
            isAr ? 'font-arabic' : 'font-display tracking-tight',
            onDark ? 'text-white' : 'text-dark'
          )}
        >
          {isAr ? BRAND.name.ar : BRAND.name.en}
        </p>
        <p
          className={cn(
            'leading-snug truncate font-medium hidden sm:block',
            compact ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm',
            isAr ? 'font-arabic' : 'font-sans',
            onDark ? 'text-secondary' : 'text-primary'
          )}
        >
          {isAr ? BRAND.tagline.ar : BRAND.tagline.en}
        </p>
      </div>
    </div>
  )
}
