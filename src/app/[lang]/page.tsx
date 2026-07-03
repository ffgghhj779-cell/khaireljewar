import HeroPremium from '@/components/sections/HeroPremium'
import MarketTicker from '@/components/sections/MarketTicker'
import PremiumBentoGrid from '@/components/sections/PremiumBentoGrid'
import BrandProductShowcase from '@/components/sections/BrandProductShowcase'
import FeaturedProductsGrid from '@/components/sections/FeaturedProductsGrid'
import GlobalFootprint from '@/components/sections/GlobalFootprint'
import LogisticsTerminal from '@/components/sections/LogisticsTerminal'
import CertificationsBanner from '@/components/sections/CertificationsBanner'
import { getProducts } from '@/lib/actions/products'

export default async function Home({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const products = await getProducts()

  return (
    <div className="relative overflow-x-clip selection:bg-primary selection:text-white">
      <HeroPremium lang={lang} />
      <MarketTicker lang={lang} products={products} />
      <div className="mobile-scroll-section">
        <PremiumBentoGrid lang={lang} />
      </div>
      <div className="mobile-scroll-section">
        <BrandProductShowcase lang={lang} />
      </div>
      <div className="mobile-scroll-section">
        <FeaturedProductsGrid lang={lang} products={products.slice(0, 6)} />
      </div>
      <div className="mobile-scroll-section">
        <GlobalFootprint lang={lang} />
      </div>
      <div className="mobile-scroll-section">
        <LogisticsTerminal lang={lang} />
      </div>
      <div className="mobile-scroll-section">
        <CertificationsBanner lang={lang} />
      </div>
    </div>
  )
}
