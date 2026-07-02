'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'

interface LanguageSwitchProps {
  lang: string
  className?: string
}

export default function LanguageSwitch({ lang, className }: LanguageSwitchProps) {
  const pathname = usePathname()
  const targetLang = lang === 'ar' ? 'en' : 'ar'
  const href = pathname ? pathname.replace(`/${lang}`, `/${targetLang}`) : `/${targetLang}`
  const label = lang === 'ar' ? 'EN' : 'عربي'

  return (
    <Link
      href={href}
      className={cn(
        'relative z-[102] flex items-center justify-center shrink-0 rounded-xl transition-all touch-manipulation',
        'min-w-[48px] min-h-[48px] px-3',
        'bg-primary/15 text-primary border-2 border-primary/50',
        'hover:bg-primary hover:text-dark active:scale-95',
        'shadow-[0_0_12px_rgba(0,201,215,0.25)]',
        targetLang === 'ar' ? 'font-ibm-arabic text-sm font-bold' : 'font-manrope text-xs font-extrabold tracking-wide',
        className
      )}
      aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      {label}
    </Link>
  )
}
