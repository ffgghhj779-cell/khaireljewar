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
    <div className="min-h-screen bg-cream pb-[calc(10rem+env(safe-area-inset-bottom,0px))] pt-24 sm:pt-28 lg:pb-16">
      <Container>
        <h1
          className={cn(
            'mb-6 text-[clamp(1.6rem,6vw,2.5rem)] font-medium leading-tight text-primary sm:mb-8',
            isAr ? 'font-arabic' : 'font-display'
          )}
        >
          {isAr ? 'سلة التسوق' : 'Shopping cart'}
        </h1>
        <CartView lang={lang} />
      </Container>
    </div>
  )
}
