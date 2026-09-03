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
import { faqJsonLd } from '@/lib/seo'

export default async function Home({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const products = await getProducts()

  return (
    <div className="relative bg-cream selection:bg-secondary/40 selection:text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(lang)) }}
      />
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
