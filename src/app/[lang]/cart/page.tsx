import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import CartView from '@/components/ecom/CartView'
import { buildPageMetadata } from '@/lib/seo'
import { cn } from '@/lib/utils/cn'

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const isAr = lang === 'ar'
  return buildPageMetadata({
    lang,
    path: '/cart',
    title: isAr ? 'سلة التسوق' : 'Shopping cart',
    description: isAr ? 'راجع طلبك قبل الدفع' : 'Review your order before checkout',
  })
}

export default function CartPage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'
  return (
    <div className="bg-cream min-h-screen pt-28 pb-24 lg:pb-16">
      <Container>
        <h1 className={cn('text-3xl md:text-4xl font-medium text-primary mb-8', isAr ? 'font-arabic' : 'font-display')}>
          {isAr ? 'سلة التسوق' : 'Shopping cart'}
        </h1>
        <CartView lang={lang} />
      </Container>
    </div>
  )
}
