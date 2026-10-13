export const revalidate = 60

import Container from '@/components/ui/Container'
import ProductCatalog from '@/components/ecom/ProductCatalog'
import { getProducts } from '@/lib/actions/products'
import { buildPageMetadata, breadcrumbJsonLd, productListJsonLd } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
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
    title: isAr ? 'كتالوج الموالح والتمور والفواكه' : 'Citrus, Dates, Fruits & Vegetables Catalog',
    description: isAr
      ? 'كتالوج التصدير من جدة: برتقال فالنسيا ونافيل، تمر مجدول وبرحي، أفوكادو، مانجو، بطاطس، بصل، ومجمدات IQF. الحد الأدنى للطلب لكل منتج.'
      : 'Jeddah export catalog: Valencia and Navel oranges, Medjool and Barhi dates, avocados, mangoes, potatoes, onions, and IQF lines. Minimum order shown per product.',
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
      <JsonLd
        data={[
          breadcrumbJsonLd(lang, [{ name: lang === 'ar' ? 'المنتجات' : 'Products', path: '/products' }]),
          productListJsonLd(
            lang,
            products.map((product) => ({
              slug: product.slug,
              name: lang === 'ar' ? product.title.ar : product.title.en,
            }))
          ),
        ]}
      />
      <Container size="large">
        <Suspense fallback={<CatalogFallback />}>
          <ProductCatalog lang={lang} products={products} />
        </Suspense>
      </Container>
    </div>
  )
}
