import HeroPremium from '@/components/sections/HeroPremium'
import MarketTicker from '@/components/sections/MarketTicker'
import PremiumBentoGrid from '@/components/sections/PremiumBentoGrid'
import FeaturedProductsGrid from '@/components/sections/FeaturedProductsGrid'
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
    <div className="relative overflow-x-hidden selection:bg-primary selection:text-white">
      <HeroPremium lang={lang} />
      <MarketTicker lang={lang} products={products} />
      <PremiumBentoGrid lang={lang} />
      <FeaturedProductsGrid lang={lang} products={products.slice(0, 6)} />
      <LogisticsTerminal lang={lang} />
      <CertificationsBanner lang={lang} />
    </div>
  )
}
