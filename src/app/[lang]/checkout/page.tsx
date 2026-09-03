import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import CheckoutForm from '@/components/ecom/CheckoutForm'
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
    path: '/checkout',
    title: isAr ? 'إتمام الشراء' : 'Checkout',
    description: isAr
      ? 'ادفع أونلاين عبر Paymob أو عند الاستلام'
      : 'Pay online via Paymob or cash on delivery',
  })
}

export default function CheckoutPage({ params: { lang } }: { params: { lang: string } }) {
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
          {isAr ? 'إتمام الشراء والدفع' : 'Checkout & payment'}
        </h1>
        <CheckoutForm lang={lang} />
      </Container>
    </div>
  )
}
