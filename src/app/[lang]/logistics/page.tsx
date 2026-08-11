import type { Metadata } from 'next'
import Link from 'next/link'
import { SECTION_IMAGES } from '@/lib/constants/images'
import { buildPageMetadata } from '@/lib/seo'
import Container from '@/components/ui/Container'
import ColdChainStepper from '@/components/logistics/ColdChainStepper'
import LogisticsEditorialGallery from '@/components/sections/LogisticsEditorialGallery'
import DepthHero from '@/components/graphics/DepthHero'
import { cn } from '@/lib/utils/cn'
import { Snowflake, Ship, MapPinned } from 'lucide-react'

export function generateMetadata({ params: { lang } }: { params: { lang: string } }): Metadata {
  const isAr = lang === 'ar'
  return buildPageMetadata({
    lang,
    path: '/logistics',
    title: isAr ? 'اللوجستيات' : 'Logistics',
    description: isAr
      ? 'من المزرعة إلى ميناء جدة — سلسلة تبريد وتوصيل موثوق.'
      : 'From farm to Jeddah port — cold chain and reliable delivery.',
  })
}

export default function LogisticsPage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'

  const pillars = [
    {
      icon: Snowflake,
      title: isAr ? 'سلسلة تبريد' : 'Cold chain',
      desc: isAr ? 'مناولة مضبوطة الحرارة من التعبئة حتى الميناء.' : 'Temperature-controlled handling from packing to port.',
    },
    {
      icon: Ship,
      title: isAr ? 'موانئ وشحن' : 'Ports & shipping',
      desc: isAr ? 'شبكة تصدير من جدة تغطي الخليج وأوروبا وأفريقيا.' : 'An export network from Jeddah covering GCC, Europe, and Africa.',
    },
    {
      icon: MapPinned,
      title: isAr ? 'تتبع واضح' : 'Clear tracking',
      desc: isAr ? 'متابعة الشحنات ومواعيد الوصول بشفافية.' : 'Transparent shipment follow-up and arrival timing.',
    },
  ]

  return (
    <div className="min-h-screen pb-0">
      <DepthHero
        lang={lang}
        src={SECTION_IMAGES.logisticsHub}
        alt={isAr ? 'عمليات اللوجستيات' : 'Logistics operations'}
        eyebrow={isAr ? 'اللوجستيات' : 'Logistics'}
        title={isAr ? 'من المزرعة إلى جدة… ثم العالم.' : 'From farm to Jeddah — then the world.'}
        subtitle={
          isAr
            ? 'تبريد دقيق، شحن منظم من جدة، ووصول موثوق لشركائنا حول العالم.'
            : 'Careful cold chain, organized shipping from Jeddah, and reliable arrival for partners worldwide.'
        }
      />

      <section className="py-16 md:py-24 bg-canvas-soft">
        <Container size="large">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 md:mb-20">
            {pillars.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title}>
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-soft">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <h2 className={cn('text-xl font-bold text-dark mb-2', isAr ? 'font-arabic' : 'font-display')}>
                    {item.title}
                  </h2>
                  <p className={cn('text-gray-600 text-[15px] leading-relaxed', isAr ? 'font-arabic' : 'font-sans')}>
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mb-4">
            <h2
              className={cn(
                'text-2xl md:text-4xl font-bold text-dark tracking-tight mb-3 editorial-heading',
                isAr ? 'font-arabic' : 'font-display'
              )}
            >
              {isAr ? 'رحلة التبريد' : 'The cold chain journey'}
            </h2>
            <p className={cn('text-gray-600 mb-8 max-w-xl', isAr ? 'font-arabic' : 'font-sans')}>
              {isAr
                ? 'مراقبة مستمرة في كل مرحلة من التعبئة إلى التسليم.'
                : 'Continuous care at every stage from packing to delivery.'}
            </p>
          </div>
          <ColdChainStepper lang={lang} activeStep={3} />

          <div className="mt-12">
            <Link
              href={`/${lang}/export-markets`}
              className={cn(
                'inline-flex text-sm font-semibold text-primary hover:text-dark transition-colors',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {isAr ? 'أسواق التصدير ←' : 'Export markets →'}
            </Link>
          </div>
        </Container>
      </section>

      <LogisticsEditorialGallery lang={lang} />
    </div>
  )
}
