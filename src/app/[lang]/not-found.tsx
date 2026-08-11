'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Container from '@/components/ui/Container'
import { BRAND } from '@/lib/constants/brand'
import { cn } from '@/lib/utils/cn'

export default function LangNotFound() {
  const pathname = usePathname()
  const isAr = pathname?.startsWith('/ar') ?? false
  const lang = isAr ? 'ar' : 'en'

  return (
    <div className="min-h-[70vh] flex items-center py-20 bg-canvas-soft">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <p className={cn('text-7xl md:text-8xl font-bold text-primary/25 mb-4 font-display')}>404</p>
          <h1 className={cn('text-3xl md:text-4xl font-bold text-dark mb-4', isAr ? 'font-arabic' : 'font-display')}>
            {isAr ? 'الصفحة غير موجودة' : 'Page not found'}
          </h1>
          <p className={cn('text-gray-500 mb-8', isAr ? 'font-arabic' : 'font-sans')}>
            {isAr
              ? 'الصفحة المطلوبة غير متاحة. ارجع للرئيسية أو تصفح المنتجات.'
              : 'The page you requested does not exist. Return home or browse our catalog.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${lang}`}
              className={cn(
                'px-7 py-3.5 min-h-[52px] rounded-full bg-secondary text-primary font-semibold hover:bg-secondary-400 transition-colors touch-manipulation',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <Link
              href={`/${lang}/products`}
              className={cn(
                'px-7 py-3.5 min-h-[52px] rounded-full border border-dark/15 font-semibold hover:border-primary hover:text-primary transition-colors touch-manipulation',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {isAr ? 'المنتجات' : 'Products'}
            </Link>
          </div>
          <p className={cn('mt-10 text-xs text-gray-400', isAr ? 'font-arabic' : 'font-sans')}>
            {isAr ? BRAND.nameFull.ar : BRAND.nameFull.en}
          </p>
        </div>
      </Container>
    </div>
  )
}
