import type { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import QualityStepper from '@/components/quality/QualityStepper'
import TrustComplianceHub from '@/components/sections/TrustComplianceHub'
import { buildPageMetadata } from '@/lib/seo'
import { cn } from '@/lib/utils/cn'
import { ShieldCheck, Leaf, FlaskConical, FileCheck } from 'lucide-react'

export function generateMetadata({ params: { lang } }: { params: { lang: string } }): Metadata {
  const isAr = lang === 'ar'
  return buildPageMetadata({
    lang,
    path: '/quality',
    title: isAr ? 'الجودة والاعتمادات' : 'Quality & Certifications',
    description: isAr
      ? 'نظام جودة متكامل بتنسيق من جدة — من المزرعة الشريكة إلى الشحنة.'
      : 'An integrated quality system coordinated from Jeddah — from partner farm to shipment.',
  })
}

export default function CertificationsPage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'

  const pillars = [
    {
      icon: Leaf,
      title: isAr ? 'من الحقل' : 'From the field',
      desc: isAr ? 'ممارسات زراعية مسؤولة وتتبع واضح للمنشأ.' : 'Responsible farming practices with clear origin traceability.',
    },
    {
      icon: FlaskConical,
      title: isAr ? 'فحوصات دقيقة' : 'Careful testing',
      desc: isAr ? 'فحوصات مخبرية لكل شحنة وفق متطلبات الأسواق.' : 'Lab checks on every shipment for destination market rules.',
    },
    {
      icon: FileCheck,
      title: isAr ? 'اعتمادات موثقة' : 'Documented certs',
      desc: isAr ? 'GlobalG.A.P. وISO وHACCP والحلال ضمن سلسلة التوريد.' : 'GlobalG.A.P., ISO, HACCP, and Halal across the supply chain.',
    },
    {
      icon: ShieldCheck,
      title: isAr ? 'ثقة مستمرة' : 'Ongoing trust',
      desc: isAr ? 'مراجعة مستمرة للمعايير قبل كل تصدير.' : 'Continuous standards review before every export.',
    },
  ]

  return (
    <div className="min-h-screen pb-0">
      <section className="pt-14 md:pt-20 pb-16 md:pb-20 bg-canvas-soft">
        <Container size="large">
          <div className="max-w-3xl">
            <p className={cn('text-primary font-semibold text-sm mb-3', isAr ? 'font-arabic' : 'font-sans')}>
              {isAr ? 'الجودة' : 'Quality'}
            </p>
            <h1
              className={cn(
                'text-4xl md:text-6xl font-bold text-dark tracking-tight mb-5 editorial-heading',
                isAr ? 'font-arabic' : 'font-display'
              )}
            >
              {isAr ? 'ثقة بلا ضوضاء.' : 'Quiet confidence.'}
            </h1>
            <p className={cn('text-base md:text-lg text-gray-600 leading-relaxed', isAr ? 'font-arabic' : 'font-sans')}>
              {isAr
                ? 'نظام جودة واضح من المزارع الشريكة إلى الشحنة — بتنسيق من جدة.'
                : 'A clear quality system from partner farms to shipment — coordinated from Jeddah.'}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {pillars.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title}>
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-soft">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <h2 className={cn('text-lg font-bold text-dark mb-2', isAr ? 'font-arabic' : 'font-display')}>
                    {item.title}
                  </h2>
                  <p className={cn('text-sm text-gray-600 leading-relaxed', isAr ? 'font-arabic' : 'font-sans')}>
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <Container size="large">
          <div className="max-w-2xl mb-10 md:mb-12">
            <h2
              className={cn(
                'text-2xl md:text-4xl font-bold text-dark tracking-tight mb-3 editorial-heading',
                isAr ? 'font-arabic' : 'font-display'
              )}
            >
              {isAr ? 'مسار الضمان' : 'How we assure quality'}
            </h2>
            <p className={cn('text-gray-600', isAr ? 'font-arabic' : 'font-sans')}>
              {isAr ? 'أربع مراحل بسيطة من الزراعة حتى الشحن.' : 'Four simple stages from farming to shipping.'}
            </p>
          </div>
          <QualityStepper lang={lang} />
          <div className="mt-10">
            <Link
              href={`/${lang}/contact`}
              className={cn(
                'inline-flex text-sm font-semibold text-primary hover:text-dark transition-colors',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {isAr ? 'اطلب مستندات الجودة ←' : 'Request quality documents →'}
            </Link>
          </div>
        </Container>
      </section>

      <TrustComplianceHub lang={lang} />
    </div>
  )
}
