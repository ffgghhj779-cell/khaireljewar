import type { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import OurPartners from '@/components/sections/OurPartners'
import PartnerLogoMarquee from '@/components/sections/PartnerLogoMarquee'
import { buildPageMetadata } from '@/lib/seo'
import { cn } from '@/lib/utils/cn'

export function generateMetadata({ params: { lang } }: { params: { lang: string } }): Metadata {
  const isAr = lang === 'ar'
  return buildPageMetadata({
    lang,
    path: '/partners',
    title: isAr ? 'شركاؤنا' : 'Our Partners',
    description: isAr
      ? 'شركاء خير الجوار — نينجا، نون، تسامي الوطنية، الرهان الماسي، وثمار أرضنا.'
      : 'Khair Aljaar partners — Ninja, noon, Tasami, Al Rehan Al Masi, and Thimar Ardina.',
  })
}

export default function PartnersPage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'

  return (
    <div className="min-h-screen pb-0">
      <section className="bg-canvas-soft pb-10 pt-14 md:pb-12 md:pt-20">
        <Container size="large">
          <div className="mx-auto max-w-3xl text-center">
            <p className={cn('mb-3 text-sm font-semibold text-primary', isAr ? 'font-arabic' : 'font-sans')}>
              {isAr ? 'خير الجوار' : 'Khair Aljaar'}
            </p>
            <h1
              className={cn(
                'mb-5 text-4xl font-bold tracking-tight text-dark editorial-heading md:text-6xl',
                isAr ? 'font-arabic' : 'font-display'
              )}
            >
              {isAr ? 'شركاؤنا' : 'Our Partners'}
            </h1>
            <p className={cn('text-base leading-relaxed text-gray-600 md:text-lg', isAr ? 'font-arabic' : 'font-sans')}>
              {isAr
                ? 'شركاء غذائيون سعوديون نثق بهم — موثوقية توريد جملة، انضباط سلسلة التبريد، وجودة تصل المطابخ والأسواق في أنحاء المملكة.'
                : 'Trusted Saudi food partners we stand beside — wholesale reliability, cold-chain discipline, and quality that reaches kitchens and markets across the Kingdom.'}
            </p>
          </div>
        </Container>
      </section>

      <PartnerLogoMarquee lang={lang} />

      <section className="bg-cream py-16 md:py-24">
        <Container size="large">
          <OurPartners lang={lang} hideTitle />
        </Container>
      </section>

      <section className="bg-harvest py-14 text-center md:py-16">
        <Container size="large">
          <h2
            className={cn(
              'mb-6 text-2xl font-bold tracking-tight text-cream md:text-3xl',
              isAr ? 'font-arabic' : 'font-display'
            )}
          >
            {isAr ? 'جاهز للتصدير؟' : 'Ready for export?'}
          </h2>
          <Link
            href={`/${lang}/contact`}
            className={cn(
              'inline-flex min-h-[48px] items-center rounded-xl bg-cream px-6 text-sm font-semibold text-primary hover:bg-white',
              isAr ? 'font-arabic' : 'font-sans'
            )}
          >
            {isAr ? 'اطلب عرض سعر' : 'Request a quote'}
          </Link>
        </Container>
      </section>
    </div>
  )
}
