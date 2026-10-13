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
    path: '/guides/incoterms',
    title: isAr ? 'شروط الشحن FOB وCIF وCFR' : 'FOB, CIF, and CFR Shipping Terms',
    description: isAr
      ? 'شرح بسيط لشروط الشحن من جدة. FOB جدة هو الافتراضي، وCIF وCFR وEXW وDAP تُسعّر حسب الوجهة.'
      : 'Plain-language shipping terms from Jeddah. FOB Jeddah is the default. CIF, CFR, EXW, and DAP are quoted by destination.',
  })
}

export default function IncotermsGuidePage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'
  const terms = isAr
    ? [
        ['FOB جدة', 'التسليم على ظهر السفينة في جدة. هذا الشرط الافتراضي في عروض خير الجوار، إلا إذا نص العرض على غيره.'],
        ['CFR', 'التكلفة والشحن حتى ميناء الوصول. يُسعّر حسب المسار والحجم، وليس سعراً ثابتاً على الموقع.'],
        ['CIF', 'مثل CFR مع التأمين. يُسعّر أيضاً حسب المسار والحجم.'],
        ['EXW', 'التسليم من مكان التحميل المتفق عليه. المشتري يرتب النقل بعد ذلك.'],
        ['DAP', 'التسليم في المكان المسمى. التفاصيل والمسؤوليات تُكتب في عرض السعر.'],
      ]
    : [
        ['FOB Jeddah', 'Delivery on board at Jeddah. This is Khair Aljaar’s default unless the quotation says otherwise.'],
        ['CFR', 'Cost and freight to the destination port. Quoted by lane and volume, not as a fixed website price.'],
        ['CIF', 'CFR plus insurance. Also quoted by lane and volume.'],
        ['EXW', 'Delivery at the agreed loading place. The buyer arranges transport after that.'],
        ['DAP', 'Delivery at the named place. Responsibilities are written on the quotation.'],
      ]

  return (
    <div className="min-h-screen bg-canvas-soft pb-24 pt-14 md:pt-20">
      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { name: isAr ? 'اللوجستيات' : 'Logistics', path: '/logistics' },
          { name: isAr ? 'شروط الشحن' : 'Shipping terms', path: '/guides/incoterms' },
        ])}
      />
      <Container size="small">
        <p className={cn('mb-3 text-sm font-semibold text-primary', isAr ? 'font-arabic' : 'font-sans')}>
          {isAr ? 'من جدة' : 'From Jeddah'}
        </p>
        <h1 className={cn('mb-6 text-3xl font-bold text-dark editorial-heading md:text-5xl', isAr ? 'font-arabic' : 'font-display')}>
          {isAr ? 'شروط الشحن بلغة بسيطة' : 'Shipping terms in plain language'}
        </h1>
        <p className={cn('mb-8 text-[15px] leading-relaxed text-gray-600 md:text-base', isAr ? 'font-arabic' : 'font-sans')}>
          {isAr
            ? 'الشرط الذي يسري هو المكتوب في عرض السعر الرسمي. الأسعار على الموقع استرشادية.'
            : 'The term that applies is the one written on the official quotation. Prices on the website are indicative.'}
        </p>
        <div className="space-y-5">
          {terms.map(([title, body]) => (
            <section key={title} className="rounded-2xl border border-primary/10 bg-cream p-5">
              <h2 className={cn('mb-2 text-xl font-bold text-primary', isAr ? 'font-arabic' : 'font-display')}>{title}</h2>
              <p className={cn('leading-relaxed text-primary/75', isAr ? 'font-arabic' : 'font-sans')}>{body}</p>
            </section>
          ))}
        </div>
        <Link
          href={`/${lang}/contact`}
          className={cn('mt-8 inline-flex text-sm font-semibold text-primary hover:underline', isAr ? 'font-arabic' : 'font-sans')}
        >
          {isAr ? 'اطلب عرض سعر بالشرط المناسب ←' : 'Request a quote with the right term →'}
        </Link>
      </Container>
    </div>
  )
}
