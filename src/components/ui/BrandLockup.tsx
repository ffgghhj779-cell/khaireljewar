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
  const isFooter = variant === 'footer'
  const onDark = tone === 'light'

  if (isFooter) {
    return (
      <div className={cn('flex flex-col gap-4', className)}>
        <BrandLogo variant="footer" priority={priority} iconOnly className="!h-12 !w-12" />
        <div>
          <p className={cn('text-white text-xl mb-1', isAr ? 'font-arabic font-bold' : 'font-display font-bold')}>
            {isAr ? BRAND.name.ar : BRAND.name.en}
          </p>
          <p className={cn('text-secondary text-sm font-semibold', isAr ? 'font-arabic' : 'font-sans')}>
            {isAr ? BRAND.tagline.ar : BRAND.tagline.en}
          </p>
        </div>
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
        className={cn(compact && '!h-8 !w-8 sm:!h-9 sm:!w-9')}
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
