import dynamic from 'next/dynamic'
import HeroPremium from '@/components/sections/HeroPremium'
import MarketTicker from '@/components/sections/MarketTicker'
import { SectionSkeleton } from '@/components/ui/Skeleton'
import { getProducts } from '@/lib/actions/products'

const PremiumBentoGrid = dynamic(() => import('@/components/sections/PremiumBentoGrid'), {
  loading: () => <SectionSkeleton />,
})

const FeaturedProductsGrid = dynamic(() => import('@/components/sections/FeaturedProductsGrid'), {
  loading: () => <SectionSkeleton tall />,
})

const GlobalFootprint = dynamic(() => import('@/components/sections/GlobalFootprint'), {
  loading: () => <SectionSkeleton />,
})

const LogisticsTerminal = dynamic(() => import('@/components/sections/LogisticsTerminal'), {
  loading: () => <SectionSkeleton tall />,
})

const CertificationsBanner = dynamic(() => import('@/components/sections/CertificationsBanner'), {
  loading: () => <SectionSkeleton />,
})

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
      <PremiumBentoGrid lang={lang} />
      <FeaturedProductsGrid lang={lang} products={products.slice(0, 6)} />
      <GlobalFootprint lang={lang} />
      <LogisticsTerminal lang={lang} />
      <CertificationsBanner lang={lang} />
    </div>
  )
}
