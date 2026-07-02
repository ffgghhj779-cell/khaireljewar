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
    description: isAr ? `شروط استخدام موقع ${BRAND.name.ar}` : `Terms of use for ${BRAND.name.en}`,
  })
}

export default function TermsPage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'

  return (
    <div className="min-h-screen py-12 pb-24">
      <Container size="small">
        <h1 className={cn('text-3xl md:text-4xl font-black text-dark mb-6', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
          {isAr ? 'الشروط والأحكام' : 'Terms of Service'}
        </h1>
        <div className={cn('text-gray-600 space-y-4 leading-relaxed', isAr ? 'font-ibm-arabic' : 'font-inter')}>
          <p>
            {isAr
              ? 'هذا الموقع مخصص لعملاء B2B والتصدير بالجملة. الأسعار والتوافر عرضة للتأكيد عند إصدار عرض السعر الرسمي.'
              : 'This website is intended for B2B wholesale and export clients. Prices and availability are subject to confirmation upon official quotation.'}
          </p>
          <p>
            {isAr
              ? 'جميع الصور والعلامات التجارية مملوكة لخير الجوار للأغذية. يُحظر إعادة استخدام المحتوى دون إذن كتابي.'
              : `All imagery and trademarks are property of ${BRAND.name.en}. Content may not be reused without written permission.`}
          </p>
        </div>
      </Container>
    </div>
  )
}
