import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import { BRAND } from '@/lib/constants/brand'
import { buildPageMetadata } from '@/lib/seo'
import { cn } from '@/lib/utils/cn'

export function generateMetadata({ params: { lang } }: { params: { lang: string } }): Metadata {
  const isAr = lang === 'ar'
  return buildPageMetadata({
    lang,
    path: '/terms',
    title: isAr ? 'الشروط والأحكام' : 'Terms of Service',
    description: isAr ? `شروط استخدام موقع ${BRAND.nameFull.ar}` : `Terms of use for ${BRAND.nameFull.en}`,
  })
}

export default function TermsPage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'

  return (
    <div className="min-h-screen py-14 md:py-20 pb-24 bg-canvas-soft">
      <Container size="small">
        <p className={cn('text-primary font-semibold text-sm mb-3', isAr ? 'font-arabic' : 'font-sans')}>
          {isAr ? 'قانوني' : 'Legal'}
        </p>
        <h1
          className={cn(
            'text-3xl md:text-5xl font-bold text-dark mb-8 editorial-heading',
            isAr ? 'font-arabic' : 'font-display'
          )}
        >
          {isAr ? 'الشروط والأحكام' : 'Terms of service'}
        </h1>
        <div className={cn('text-gray-600 space-y-5 leading-relaxed text-[15px] md:text-base', isAr ? 'font-arabic' : 'font-sans')}>
          <p>
            {isAr
              ? 'هذا الموقع مخصص لعملاء الجملة والتصدير. الأسعار والتوافر عرضة للتأكيد عند إصدار عرض السعر الرسمي.'
              : 'This website is intended for wholesale and export clients. Prices and availability are subject to confirmation upon official quotation.'}
          </p>
          <p>
            {isAr
              ? `جميع الصور والعلامات التجارية مملوكة لـ ${BRAND.nameFull.ar}. يُحظر إعادة استخدام المحتوى دون إذن كتابي.`
              : `All imagery and trademarks are property of ${BRAND.nameFull.en}. Content may not be reused without written permission.`}
          </p>
        </div>
      </Container>
    </div>
  )
}
