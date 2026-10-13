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
    description: isAr
      ? 'شروط التعامل مع عملاء الجملة والتصدير. الأسعار والتوفر تُؤكد بعرض سعر رسمي.'
      : 'Terms for wholesale and export clients. Prices and availability are confirmed on an official quotation.',
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
              ? `هذا الموقع لعملاء الجملة والتصدير لدى ${BRAND.nameFull.ar}، ومركز التعامل الظاهر هو جدة في المملكة العربية السعودية. الأسعار والصور على الموقع استرشادية.`
              : `This website is for wholesale and export clients of ${BRAND.nameFull.en}. The published place of business is Jeddah, Saudi Arabia. Prices and photos on the site are indicative.`}
          </p>
          <p>
            {isAr
              ? 'العرض الرسمي المكتوب هو الذي يحدد السعر والتوفر والكمية وشرط الشحن. الطلب لا يُعد مؤكداً قبل هذا العرض أو عقد الشحنة.'
              : 'The written quotation sets the price, availability, quantity, and shipping term. An order is not confirmed before that quotation or the shipment contract.'}
          </p>
          <p>
            {isAr
              ? 'شرط الشحن الافتراضي هو FOB جدة، ما لم يذكر العرض شرطاً آخر مثل CIF أو CFR أو EXW أو DAP. بضاعة الجملة والتصدير لا تُعامل كمرتجعات تجزئة؛ أي ملاحظة على الشحنة تتبع ما هو مكتوب في العرض ومستندات الشحن.'
              : 'The default shipping term is FOB Jeddah, unless the quotation names another term such as CIF, CFR, EXW, or DAP. Wholesale and export goods are not handled as retail returns. Any shipment remark follows the quotation and the shipping documents.'}
          </p>
          <p>
            {isAr
              ? 'تخضع هذه الشروط والأنظمة الظاهرة على الموقع لأنظمة المملكة العربية السعودية، وتختص محاكم جدة بما ينشأ عنها، ما لم يتفق الطرفان كتابةً على غير ذلك في عقد الشحنة.'
              : 'These website terms follow the laws of the Kingdom of Saudi Arabia, and the courts of Jeddah hear disputes arising from them, unless the parties agree otherwise in writing in the shipment contract.'}
          </p>
          <p>
            {isAr
              ? `العلامات والصور الخاصة بـ ${BRAND.nameFull.ar} لا تُعاد استخدامها دون إذن كتابي. أسماء الشركات الأخرى المذكورة هي شركات المجموعة فقط.`
              : `Trademarks and images of ${BRAND.nameFull.en} may not be reused without written permission. Other company names on the site are group companies only.`}
          </p>
        </div>
      </Container>
    </div>
  )
}
