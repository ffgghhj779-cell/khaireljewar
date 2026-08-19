'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Globe } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

type LanguageSwitchVariant = 'default' | 'toolbar' | 'menu'

interface LanguageSwitchProps {
  lang: string
  className?: string
  variant?: LanguageSwitchVariant
  showIcon?: boolean
}

export default function LanguageSwitch({
  lang,
  className,
  variant = 'default',
  showIcon = false,
}: LanguageSwitchProps) {
  const pathname = usePathname()
  const targetLang = lang === 'ar' ? 'en' : 'ar'
  const href = pathname ? pathname.replace(`/${lang}`, `/${targetLang}`) : `/${targetLang}`
  const label = lang === 'ar' ? 'EN' : 'عربي'

  return (
    <Link
      href={href}
      className={cn(
        'relative z-[102] flex items-center justify-center gap-1.5 shrink-0 transition-colors touch-manipulation font-semibold',
        variant === 'default' && [
          'min-h-[40px] px-3.5 rounded-full',
          'text-dark bg-white border border-dark/10',
          'hover:border-primary/40 hover:text-primary active:scale-95',
        ],
        variant === 'toolbar' && [
          'h-10 min-w-[48px] px-3',
          'text-primary bg-transparent',
          'hover:bg-primary/8 active:scale-95',
        ],
        variant === 'menu' && [
          'min-h-[40px] px-4 rounded-full',
          'text-white bg-dark border border-dark',
          'hover:bg-primary active:scale-95',
        ],
        targetLang === 'ar' ? 'font-arabic text-sm' : 'font-sans text-xs tracking-wide',
        className
      )}
      aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      {showIcon && (
        <Globe
          className={cn('w-3.5 h-3.5', variant === 'toolbar' ? 'text-primary/60' : 'text-dark/50')}
          aria-hidden
        />
      )}
      {label}
    </Link>
  )
}
