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
        'relative z-[102] flex items-center justify-center gap-1.5 shrink-0 transition-colors touch-manipulation',
        variant === 'default' && [
          'min-h-[40px] px-3 rounded-lg',
          'text-white/90 bg-white/8 border border-white/20',
          'hover:bg-white/15 hover:border-white/30 active:scale-95',
        ],
        variant === 'toolbar' && [
          'h-10 min-w-[44px] px-3 rounded-lg',
          'text-white/90 hover:bg-white/10 active:scale-95',
        ],
        variant === 'menu' && [
          'min-h-[40px] px-4 rounded-lg',
          'text-primary bg-primary/10 border border-primary/25',
          'hover:bg-primary hover:text-dark active:scale-95',
        ],
        targetLang === 'ar' ? 'font-ibm-arabic text-sm font-bold' : 'font-manrope text-xs font-extrabold tracking-wide',
        className
      )}
      aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      {showIcon && <Globe className="w-3.5 h-3.5 opacity-80" aria-hidden />}
      {label}
    </Link>
  )
}
