import type { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbJsonLd, buildPageMetadata } from '@/lib/seo'
import { cn } from '@/lib/utils/cn'

export function generateMetadata({ params: { lang } }: { params: { lang: string } }): Metadata {
  const isAr = lang === 'ar'
  return buildPageMetadata({
    lang,
    path: '/guides/iqf',
    title: isAr ? 'ما هو التجميد IQF' : 'What IQF Freezing Is',
    description: isAr
      ? 'التجميد السريع الفردي IQF يحافظ على حبات المنتج منفصلة عند -18°م. خطوط الفراولة والخضروات المشكلة من جدة.'
      : 'IQF freezes each piece separately so it stays free-flowing at -18°C. Jeddah lines include strawberries and mixed vegetables.',
  })
}

export default function IqfGuidePage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'
  const points = isAr
    ? [
        ['ماذا يعني IQF', 'التجميد السريع الفردي: كل حبة أو قطعة تُجمّد وحدها، فلا تتكتل داخل الكرتونة.'],
        ['الحرارة', 'خطوط IQF على الموقع تُذكر عند -18°م. درجة الحرارة النهائية تُؤكد في عرض السعر وملاحظات الشحنة.'],
        ['ما المتاح', 'فراولة مجمدة IQF وخضروات مشكلة مجمدة IQF. الحد الأدنى للطلب ظاهر على صفحة كل منتج.'],
        ['لمن تُستخدم', 'المخابز والألبان والمشروبات وخدمات الطعام والتجزئة، حسب مواصفات كل خط.'],
      ]
    : [
        ['What IQF means', 'Individually Quick Frozen: each piece is frozen on its own, so it does not clump inside the carton.'],
        ['Temperature', 'IQF lines on this site are described at -18°C. The final temperature is confirmed on the quotation and shipment notes.'],
        ['What is listed', 'IQF frozen strawberries and IQF mixed vegetables. The minimum order is shown on each product page.'],
        ['Who uses it', 'Bakeries, dairy, beverages, foodservice, and retail, depending on the line.'],
      ]

  return (
    <div className="min-h-screen bg-canvas-soft pb-24 pt-14 md:pt-20">
      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { name: isAr ? 'المنتجات' : 'Products', path: '/products' },
          { name: isAr ? 'التجميد IQF' : 'IQF freezing', path: '/guides/iqf' },
        ])}
      />
      <Container size="small">
        <p className={cn('mb-3 text-sm font-semibold text-primary', isAr ? 'font-arabic' : 'font-sans')}>
          {isAr ? 'من جدة' : 'From Jeddah'}
        </p>
        <h1 className={cn('mb-6 text-3xl font-bold text-dark editorial-heading md:text-5xl', isAr ? 'font-arabic' : 'font-display')}>
          {isAr ? 'ما هو التجميد IQF؟' : 'What is IQF freezing?'}
        </h1>
        <p className={cn('mb-8 text-[15px] leading-relaxed text-gray-600 md:text-base', isAr ? 'font-arabic' : 'font-sans')}>
          {isAr
            ? 'هذا شرح لطريقة التجميد المستخدمة في خطوط المجمدات. المواصفة النهائية لكل شحنة تُكتب في عرض السعر.'
            : 'This explains the freezing method used on the frozen lines. The final specification for each shipment is written on the quotation.'}
        </p>
        <div className="space-y-5">
          {points.map(([title, body]) => (
            <section key={title} className="rounded-2xl border border-primary/10 bg-cream p-5">
              <h2 className={cn('mb-2 text-xl font-bold text-primary', isAr ? 'font-arabic' : 'font-display')}>{title}</h2>
              <p className={cn('leading-relaxed text-primary/75', isAr ? 'font-arabic' : 'font-sans')}>{body}</p>
            </section>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-6">
          <Link href={`/${lang}/products/frozen-strawberries`} className={cn('text-sm font-semibold text-primary hover:underline', isAr ? 'font-arabic' : 'font-sans')}>
            {isAr ? 'فراولة مجمدة IQF ←' : 'IQF frozen strawberries →'}
          </Link>
          <Link href={`/${lang}/products/frozen-mixed-vegetables`} className={cn('text-sm font-semibold text-primary hover:underline', isAr ? 'font-arabic' : 'font-sans')}>
            {isAr ? 'خضروات مشكلة مجمدة ←' : 'IQF mixed vegetables →'}
          </Link>
        </div>
      </Container>
    </div>
  )
}
