import Link from 'next/link'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils/cn'

export default function OrderFailedPage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'
  return (
    <div className="bg-cream min-h-screen pt-28 pb-24">
      <Container className="max-w-xl text-center">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-10">
          <h1 className={cn('text-2xl font-bold text-red-900 mb-3', isAr ? 'font-arabic' : 'font-display')}>
            {isAr ? 'لم يكتمل الدفع' : 'Payment not completed'}
          </h1>
          <p className={cn('text-sm text-red-800/80 mb-8', isAr ? 'font-arabic' : 'font-sans')}>
            {isAr ? 'يمكنك المحاولة مرة أخرى من السلة.' : 'You can try again from your cart.'}
          </p>
          <Link
            href={`/${lang}/checkout`}
            className={cn(
              'inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-cream',
              isAr ? 'font-arabic' : 'font-sans'
            )}
          >
            {isAr ? 'إعادة المحاولة' : 'Try again'}
          </Link>
        </div>
      </Container>
    </div>
  )
}
