import Container from '@/components/ui/Container'
import ProductCatalog from '@/components/ecom/ProductCatalog'
import { getProducts } from '@/lib/actions/products'
import { buildPageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ProductCardSkeleton } from '@/components/ui/Skeleton'

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const isAr = lang === 'ar'
  return buildPageMetadata({
    lang,
    path: '/products',
    title: isAr ? 'المنتجات' : 'Products',
    description: isAr
      ? 'كتالوج منتجات خير الجوار الغذائية للتصدير'
      : 'Khair Aljaar Foods export product catalog',
  })
}

function CatalogFallback() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 pt-24">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export default async function ProductsPage({ params: { lang } }: { params: { lang: string } }) {
  const products = await getProducts()

  return (
    <div className="min-h-screen py-10 md:py-16 pb-24 bg-canvas-soft">
      <Container size="large">
        <Suspense fallback={<CatalogFallback />}>
          <ProductCatalog lang={lang} products={products} />
        </Suspense>
      </Container>
    </div>
  )
}
