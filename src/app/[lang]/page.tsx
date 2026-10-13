export const revalidate = 60

import HeroBrand from '@/components/sections/HeroBrand'
import OriginStory from '@/components/sections/OriginStory'
import BrandPackaging from '@/components/sections/BrandPackaging'
import ProductsDesire from '@/components/sections/ProductsDesire'
import TrustQuiet from '@/components/sections/TrustQuiet'
import TrustProofStrip from '@/components/sections/TrustProofStrip'
import PartnerStrip from '@/components/sections/PartnerStrip'
import PartnerLogoMarquee from '@/components/sections/PartnerLogoMarquee'
import OurPartners from '@/components/sections/OurPartners'
import BrandMarquee from '@/components/sections/BrandMarquee'
import ExportDocsStrip from '@/components/sections/ExportDocsStrip'
import HomeFaq from '@/components/sections/HomeFaq'
import HomeCloser from '@/components/sections/HomeCloser'
import Container from '@/components/ui/Container'
import { getProducts } from '@/lib/actions/products'
import JsonLd from '@/components/seo/JsonLd'
import { faqJsonLd, buildPageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export function generateMetadata({ params: { lang } }: { params: { lang: string } }): Metadata {
  const isAr = lang === 'ar'
  return buildPageMetadata({
    lang,
    path: '',
    title: isAr
      ? 'توريد وتصدير الخضار والفاكهة من جدة | خير الجوار'
      : 'Fresh & Frozen Produce Exporter from Jeddah | Khair Aljaar',
    description: isAr
      ? 'مورّد جملة من جدة للموالح والتمور والفواكه والخضروات والمجمدات IQF. توريد وتصدير للسعودية والخليج. اطلب عرض سعر.'
      : 'Jeddah wholesale supplier of citrus, dates, fruits, vegetables, and IQF frozen produce. Export across Saudi Arabia and the Gulf. Request a quote.',
  })
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const products = await getProducts()

  return (
    <div className="relative bg-cream selection:bg-secondary/40 selection:text-primary">
      <JsonLd data={faqJsonLd(lang)} />
      <HeroBrand lang={lang} />
      <PartnerStrip lang={lang} />
      <PartnerLogoMarquee lang={lang} />
      <OriginStory lang={lang} />
      <BrandPackaging lang={lang} />
      <ProductsDesire lang={lang} products={products} />
      <ExportDocsStrip lang={lang} />
      <TrustQuiet lang={lang} />
      <TrustProofStrip lang={lang} />
      <section id="partners" className="scroll-mt-24 bg-canvas-soft py-16 md:py-24">
        <Container size="large">
          <OurPartners lang={lang} />
        </Container>
      </section>
      <HomeFaq lang={lang} />
      <BrandMarquee lang={lang} />
      <HomeCloser lang={lang} />
    </div>
  )
}
