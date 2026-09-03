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
    description: isAr ? 'ادفع بأمان عبر Paymob' : 'Pay securely with Paymob',
  })
}

export default function CheckoutPage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'
  return (
    <div className="bg-cream min-h-screen pt-28 pb-24 lg:pb-16">
      <Container>
        <h1 className={cn('text-3xl md:text-4xl font-medium text-primary mb-8', isAr ? 'font-arabic' : 'font-display')}>
          {isAr ? 'إتمام الشراء والدفع' : 'Checkout & payment'}
        </h1>
        <CheckoutForm lang={lang} />
      </Container>
    </div>
  )
}
