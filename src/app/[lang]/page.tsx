export const revalidate = 60

import HeroBrand from '@/components/sections/HeroBrand'
import PartnerStrip from '@/components/sections/PartnerStrip'
import NewArrivals from '@/components/sections/NewArrivals'
import ProductsDesire from '@/components/sections/ProductsDesire'
import ExportDocsStrip from '@/components/sections/ExportDocsStrip'
import OurPartners from '@/components/sections/OurPartners'
import HomeFaq from '@/components/sections/HomeFaq'
import HomeCloser from '@/components/sections/HomeCloser'
import Container from '@/components/ui/Container'
import { getProducts } from '@/lib/actions/products'
import JsonLd from '@/components/seo/JsonLd'
import { faqJsonLd, buildPageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import { asLocale, tx } from '@/lib/i18n/localize'

export function generateMetadata({ params: { lang } }: { params: { lang: string } }): Metadata {
  const locale = asLocale(lang)
  return buildPageMetadata({
    lang: locale,
    path: '',
    title: tx(locale, {
      en: 'Fresh & Frozen Produce Exporter from Jeddah | Khair Aljaar',
      ar: 'توريد وتصدير الخضار والفاكهة من جدة | خير الجوار',
      ur: 'جدّہ سے تازہ اور منجمد پیداوار برآمد کنندہ | خیر الجوار',
      hi: 'जेद्दाह से ताज़ा व फ्रोज़न उपज निर्यातक | ख़ैर अल-जवार',
    }),
    description: tx(locale, {
      en: 'Jeddah wholesale supplier of citrus, dates, fruits, vegetables, and IQF frozen produce. Export across Saudi Arabia and the Gulf. Request a quote.',
      ar: 'مورّد جملة من جدة للموالح والتمور والفواكه والخضروات والمجمدات IQF. توريد وتصدير للسعودية والخليج. اطلب عرض سعر.',
      ur: 'جدّہ سے مرکبات، کھجور، پھل، سبزیاں اور IQF منجمد پیداوار بالجملہ۔ سعودی عرب اور خلیج کے لیے برآمد۔ قیمت کی درخواست کریں۔',
      hi: 'जेद्दाह से साइट्रस, खजूर, फल, सब्ज़ियाँ और IQF फ्रोज़न उपज थोक में। सऊदी अरब व खाड़ी के लिए निर्यात। कोटेशन माँगें।',
    }),
  })
}

/**
 * Premium home — fewer stacked bands, clearer hierarchy:
 * hero → trust → arrivals → catalog → docs → partners → FAQ → closer
 */
export default async function Home({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const products = await getProducts()
  const locale = asLocale(lang)

  return (
    <div className="relative bg-cream selection:bg-secondary/40 selection:text-primary">
      <JsonLd data={faqJsonLd(locale)} />
      <HeroBrand lang={locale} />
      <PartnerStrip lang={locale} />
      <NewArrivals lang={locale} products={products} />
      <ProductsDesire lang={locale} products={products} />
      <ExportDocsStrip lang={locale} />
      <section id="partners" className="scroll-mt-24 bg-canvas-soft py-12 md:py-16">
        <Container size="large">
          <OurPartners lang={locale} />
        </Container>
      </section>
      <HomeFaq lang={locale} />
      <HomeCloser lang={locale} />
    </div>
  )
}
