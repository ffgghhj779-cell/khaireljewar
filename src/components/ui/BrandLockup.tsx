import BrandLogo from '@/components/ui/BrandLogo'
import { BRAND } from '@/lib/constants/brand'
import { cn } from '@/lib/utils/cn'

interface BrandLockupProps {
  lang: string
  compact?: boolean
  priority?: boolean
  className?: string
  variant?: 'header' | 'footer'
}

export default function BrandLockup({
  lang,
  compact = false,
  priority = false,
  className,
  variant = 'header',
}: BrandLockupProps) {
  const isAr = lang === 'ar'
  const isFooter = variant === 'footer'

  if (isFooter) {
    return (
      <div className={cn('flex flex-col gap-3', className)}>
        <BrandLogo variant="footer" priority={priority} />
        <div>
          <p className={cn('text-dark font-bold text-lg mb-1', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
            {isAr ? BRAND.name.ar : BRAND.name.en}
          </p>
          <p className={cn('text-primary font-semibold text-sm', isAr ? 'font-ibm-arabic' : 'font-inter')}>
            {isAr ? BRAND.tagline.ar : BRAND.tagline.en}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center gap-2 sm:gap-2.5 min-w-0 text-white', className)}>
      <BrandLogo
        variant="header"
        priority={priority}
        iconOnly
        className={cn(compact && '!h-7 sm:!h-8 !w-[42px] sm:!w-[48px]')}
      />
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'font-bold leading-tight truncate text-white',
            compact ? 'text-[10px] sm:text-xs' : 'text-[11px] sm:text-sm',
            isAr ? 'font-ibm-arabic' : 'font-manrope tracking-wide'
          )}
        >
          {isAr ? BRAND.name.ar : BRAND.name.en}
        </p>
        <p
          className={cn(
            'font-semibold leading-snug truncate text-primary',
            compact ? 'text-[8px] sm:text-[10px]' : 'text-[9px] sm:text-xs',
            isAr ? 'font-ibm-arabic' : 'font-inter'
          )}
        >
          {isAr ? BRAND.tagline.ar : BRAND.tagline.en}
        </p>
      </div>
    </div>
  )
}
