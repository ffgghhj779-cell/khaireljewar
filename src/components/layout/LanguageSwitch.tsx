'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'

export default function LanguageSwitch({ lang }: { lang: string }) {
  const pathname = usePathname()
  const targetLang = lang === 'ar' ? 'en' : 'ar'
  const href = pathname ? pathname.replace(`/${lang}`, `/${targetLang}`) : `/${targetLang}`

  return (
    <Link
      href={href}
      className={cn(
        'relative z-[102] text-sm font-bold flex items-center justify-center min-w-[2.5rem] h-10 px-2 rounded-lg transition-all cursor-pointer pointer-events-auto',
        'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:text-primary',
        targetLang === 'ar' ? 'font-ibm-arabic' : 'font-inter'
      )}
    >
      {lang === 'ar' ? 'EN' : 'ع'}
    </Link>
  )
}
