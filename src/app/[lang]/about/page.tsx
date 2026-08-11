import type { Metadata } from 'next'
import Link from 'next/link'
import { ABOUT_HERO_IMAGE } from '@/lib/constants/images'
import { BRAND } from '@/lib/constants/brand'
import { buildPageMetadata } from '@/lib/seo'
import Container from '@/components/ui/Container'
import PeoplePassionGallery from '@/components/sections/PeoplePassionGallery'
import DepthHero from '@/components/graphics/DepthHero'
import { cn } from '@/lib/utils/cn'

export function generateMetadata({ params: { lang } }: { params: { lang: string } }): Metadata {
  const isAr = lang === 'ar'
  return buildPageMetadata({
    lang,
    path: '/about',
    title: isAr ? 'من نحن' : 'About',
    description: isAr
      ? `${BRAND.nameFull.ar} — من جدة إلى العالم.`
      : `${BRAND.nameFull.en} — ${BRAND.tagline.en}.`,
  })
}

export default function AboutPage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'

  return (
    <div className="min-h-screen pb-0">
      <DepthHero
        lang={lang}
        src={ABOUT_HERO_IMAGE}
        alt={isAr ? 'فريق ومزارع خير الجوار' : 'Khair Aljaar farms and team'}
        eyebrow={isAr ? 'من نحن' : 'About us'}
        title={isAr ? BRAND.name.ar : BRAND.name.en}
        subtitle={isAr ? BRAND.tagline.ar : BRAND.tagline.en}
        minHeightClass="min-h-[55vh] md:min-h-[70vh]"
      />

      <section className="py-20 md:py-28 bg-canvas-soft">
        <Container size="large">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2
                className={cn(
                  'text-3xl md:text-4xl font-bold text-dark tracking-tight mb-6 editorial-heading',
                  isAr ? 'font-arabic' : 'font-display'
                )}
              >
                {isAr ? 'خير الجوار من جدة.' : 'Khair Aljaar of Jeddah.'}
              </h2>
              <div className={cn('space-y-5 text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl', isAr ? 'font-arabic' : 'font-sans')}>
                <p>
                  {isAr
                    ? `${BRAND.nameFull.ar} شركة غذائية من جدة تعمل بروح الجوار: ثقة، ضيافة، وجودة تصل لشركائنا.`
                    : `${BRAND.nameFull.en} is a Jeddah-based food company built on neighborly values: trust, hospitality, and quality that reaches our partners.`}
                </p>
                <p>
                  {isAr
                    ? `مقرنا في ${BRAND.contact.address.ar} — ومن هنا ندير توريد وتصدير المنتجات بعناية.`
                    : `We are based at ${BRAND.contact.address.en} — sourcing and exporting with care from here.`}
                </p>
                <p>{isAr ? BRAND.sourcing.ar : BRAND.sourcing.en}</p>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href={`/${lang}/products`}
                  className={cn(
                    'inline-flex items-center min-h-[48px] px-6 rounded-full bg-dark text-white font-semibold hover:bg-primary transition-colors',
                    isAr ? 'font-arabic' : 'font-sans'
                  )}
                >
                  {isAr ? 'استكشف المنتجات' : 'Explore products'}
                </Link>
                <Link
                  href={`/${lang}/contact`}
                  className={cn(
                    'inline-flex items-center min-h-[48px] px-6 rounded-full border border-dark/15 text-dark font-semibold hover:border-primary hover:text-primary transition-colors',
                    isAr ? 'font-arabic' : 'font-sans'
                  )}
                >
                  {isAr ? 'تواصل معنا' : 'Contact us'}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center gap-8 lg:border-s lg:border-dark/8 lg:ps-12">
              {[
                { value: '25+', label: isAr ? 'سنوات خبرة' : 'Years of experience' },
                { value: '40+', label: isAr ? 'وجهة تصدير' : 'Export destinations' },
                { value: '100%', label: isAr ? 'التزام بالجودة' : 'Quality commitment' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className={cn('text-4xl md:text-5xl font-bold text-primary mb-1', isAr ? 'font-arabic' : 'font-display')}>
                    {stat.value}
                  </p>
                  <p className={cn('text-sm text-gray-500', isAr ? 'font-arabic' : 'font-sans')}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <PeoplePassionGallery lang={lang} />
    </div>
  )
}
