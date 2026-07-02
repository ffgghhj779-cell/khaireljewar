import Container from '@/components/ui/Container'
import ProductCatalog from '@/components/ecom/ProductCatalog'
import { getProducts } from '@/lib/actions/products'

export default async function ProductsPage({ params: { lang } }: { params: { lang: string } }) {
  const products = await getProducts()

  return (
    <div className="min-h-screen py-12 pb-24 relative">
      <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none" />
      <Container size="large" className="relative z-10">
        <ProductCatalog lang={lang} products={products} />
      </Container>
    </div>
  )
}
