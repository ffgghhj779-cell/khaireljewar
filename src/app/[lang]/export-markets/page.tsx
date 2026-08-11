import type { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import ExportRoutesDiagram from '@/components/graphics/ExportRoutesDiagram'
import PartnerStrip from '@/components/sections/PartnerStrip'
import { BRAND } from '@/lib/constants/brand'
import { buildPageMetadata } from '@/lib/seo'
import { cn } from '@/lib/utils/cn'

export function generateMetadata({ params: { lang } }: { params: { lang: string } }): Metadata {
  const isAr = lang === 'ar'
  return buildPageMetadata({
    lang,
    path: '/export-markets',
    title: isAr ? 'أسواق التصدير' : 'Export Markets',
    description: isAr
      ? `من ${BRAND.city.ar} إلى أكثر من 40 وجهة حول العالم.`
      : `From ${BRAND.city.en} to 40+ destinations worldwide.`,
  })
}

export default function ExportMarketsPage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'

  const regions = [
    {
      name: isAr ? 'الخليج' : 'GCC',
      focus: isAr ? 'قرب جغرافي وسرعة توريد' : 'Proximity and reliable lead times',
      detail: isAr
        ? 'برامج تجزئة وHORECA بسلسلة تبريد قصيرة من مركز جدة.'
        : 'Retail and HORECA programs with short cold-chain legs from Jeddah.',
      countries: isAr
        ? ['الإمارات', 'الكويت', 'عُمان', 'البحرين', 'قطر']
        : ['UAE', 'Kuwait', 'Oman', 'Bahrain', 'Qatar'],
    },
    {
      name: isAr ? 'أوروبا' : 'Europe',
      focus: isAr ? 'مواصفات تجزئة ومعالجة دقيقة' : 'Retail and processing-grade specs',
      detail: isAr
        ? 'معايرة ونسبة سكر ووثائق تناسب مستوردي أوروبا.'
        : 'Caliber, Brix, and paperwork tuned for European importers.',
      countries: isAr
        ? ['هولندا', 'ألمانيا', 'المملكة المتحدة', 'إيطاليا', 'إسبانيا']
        : ['Netherlands', 'Germany', 'UK', 'Italy', 'Spain'],
    },
    {
      name: isAr ? 'آسيا' : 'Asia',
      focus: isAr ? 'برامج جودة للأسواق النامية' : 'Growing premium demand programs',
      detail: isAr
        ? 'كميات جملة مرنة مع معايير تعبئة واضحة.'
        : 'Flexible wholesale volumes with clear packing standards.',
      countries: isAr
        ? ['الهند', 'ماليزيا', 'سنغافورة', 'الصين']
        : ['India', 'Malaysia', 'Singapore', 'China'],
    },
    {
      name: isAr ? 'أفريقيا' : 'Africa',
      focus: isAr ? 'شراكات جملة مستقرة' : 'Steady wholesale partnerships',
      detail: isAr
        ? 'مسارات موثوقة لشركاء يبحثون عن انتظام التوريد.'
        : 'Dependable lanes for partners who need supply regularity.',
      countries: isAr
        ? ['كينيا', 'جنوب أفريقيا', 'السنغال']
        : ['Kenya', 'South Africa', 'Senegal'],
    },
  ]

  return (
    <div className="min-h-screen pb-24 bg-cream">
      <section className="relative overflow-hidden border-b border-primary/8 bg-cream-soft pt-14 md:pt-20 pb-12 md:pb-16">
        <Container size="large">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className={cn('text-primary font-semibold text-sm mb-3', isAr ? 'font-arabic' : 'font-sans')}>
                {isAr ? `${BRAND.city.ar} · مركز التصدير` : `${BRAND.city.en} · Export hub`}
              </p>
              <h1
                className={cn(
                  'text-4xl md:text-6xl font-bold text-primary tracking-tight mb-5 editorial-heading',
                  isAr ? 'font-arabic-display' : 'font-display'
                )}
              >
                {isAr ? 'من جدة إلى العالم.' : 'From Jeddah outward.'}
              </h1>
              <p className={cn('text-base md:text-lg text-primary/65 leading-relaxed max-w-md', isAr ? 'font-arabic' : 'font-sans')}>
                {isAr
                  ? 'ننسّق التوريد والتصدير من جدة إلى أكثر من 40 وجهة — بمعايير تناسب كل سوق.'
                  : 'We coordinate sourcing and export from Jeddah to 40+ destinations — with standards that fit each market.'}
              </p>
            </div>
            <div className="lg:col-span-7">
              <ExportRoutesDiagram lang={lang} className="shadow-luxury" />
            </div>
          </div>
        </Container>
      </section>

      <PartnerStrip lang={lang} />

      <Container size="large" className="py-14 md:py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className={cn('text-2xl md:text-4xl font-medium text-primary mb-3', isAr ? 'font-arabic-display' : 'font-display')}>
            {isAr ? 'أربع مناطق. معيار واحد.' : 'Four regions. One standard.'}
          </h2>
          <p className={cn('text-primary/60', isAr ? 'font-arabic' : 'font-sans')}>
            {isAr
              ? 'كل سوق له إيقاعه — ونحن نضبط التعبئة والوثائق وسلسلة التبريد وفقه.'
              : 'Each market has its rhythm — we tune packing, paperwork, and cold chain to match.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {regions.map((region, i) => (
            <article
              key={region.name}
              className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-white p-7 md:p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury"
            >
              <span
                className={cn(
                  'mb-4 inline-flex text-[11px] font-bold tracking-[0.14em] text-secondary',
                  isAr ? 'font-arabic tracking-normal' : 'font-sans'
                )}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className={cn('text-2xl md:text-3xl font-bold text-primary mb-2', isAr ? 'font-arabic-display' : 'font-display')}>
                {region.name}
              </h3>
              <p className={cn('text-sm font-semibold text-primary/80 mb-3', isAr ? 'font-arabic' : 'font-sans')}>
                {region.focus}
              </p>
              <p className={cn('text-[15px] text-primary/55 leading-relaxed mb-5', isAr ? 'font-arabic' : 'font-sans')}>
                {region.detail}
              </p>
              <div className="flex flex-wrap gap-2">
                {region.countries.map((c) => (
                  <span
                    key={c}
                    className={cn(
                      'rounded-full bg-cream-soft px-3 py-1 text-xs font-semibold text-primary/70',
                      isAr ? 'font-arabic' : 'font-sans'
                    )}
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-start scale-x-0 bg-secondary transition-transform duration-500 group-hover:scale-x-100" />
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-primary px-8 py-10 md:px-12 md:py-12 text-center">
          <h2 className={cn('text-2xl md:text-3xl font-medium text-cream mb-4', isAr ? 'font-arabic-display' : 'font-display')}>
            {isAr ? 'جاهزون لفتح مسار جديد.' : 'Ready to open a new lane.'}
          </h2>
          <p className={cn('mx-auto mb-8 max-w-md text-cream/70', isAr ? 'font-arabic' : 'font-sans')}>
            {isAr
              ? 'أخبرنا بالوجهة والكميات — ونرد بمسار تصدير واضح من جدة.'
              : 'Tell us destination and volumes — we will respond with a clear export path from Jeddah.'}
          </p>
          <Link
            href={`/${lang}/contact`}
            className={cn(
              'inline-flex min-h-[52px] items-center rounded-xl bg-cream px-8 font-semibold text-primary hover:bg-white',
              isAr ? 'font-arabic' : 'font-sans'
            )}
          >
            {isAr ? 'تواصل للتصدير' : 'Talk export with us'}
          </Link>
        </div>
      </Container>
    </div>
  )
}
