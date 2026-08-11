import HeroBrand from '@/components/sections/HeroBrand'
import OriginStory from '@/components/sections/OriginStory'
import ProductsDesire from '@/components/sections/ProductsDesire'
import TrustQuiet from '@/components/sections/TrustQuiet'
import TrustProofStrip from '@/components/sections/TrustProofStrip'
import PartnerStrip from '@/components/sections/PartnerStrip'
import BrandMarquee from '@/components/sections/BrandMarquee'
import HomeCloser from '@/components/sections/HomeCloser'
import { getProducts } from '@/lib/actions/products'

export default async function Home({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const products = await getProducts()

  return (
    <div className="relative overflow-x-clip selection:bg-secondary/40 selection:text-primary">
      <HeroBrand lang={lang} />
      <PartnerStrip lang={lang} />
      <div className="mobile-scroll-section">
        <OriginStory lang={lang} />
      </div>
      <div className="mobile-scroll-section">
        <ProductsDesire lang={lang} products={products} />
      </div>
      <div className="mobile-scroll-section">
        <TrustQuiet lang={lang} />
      </div>
      <div className="mobile-scroll-section">
        <TrustProofStrip lang={lang} />
      </div>
      <div className="mobile-scroll-section">
        <BrandMarquee lang={lang} />
      </div>
      <div className="mobile-scroll-section">
        <HomeCloser lang={lang} />
      </div>
    </div>
  )
}
