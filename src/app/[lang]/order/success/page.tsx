import type { Metadata } from 'next'
import OrderSuccessClient from '@/components/ecom/OrderSuccessClient'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const isAr = lang === 'ar'
  return buildPageMetadata({
    lang,
    path: '/order/success',
    title: isAr ? 'تم الطلب' : 'Order received',
    description: isAr ? 'تأكيد الطلب' : 'Order confirmation',
  })
}

export default function OrderSuccessPage({
  params: { lang },
  searchParams,
}: {
  params: { lang: string }
  searchParams: { ref?: string; method?: string }
}) {
  return (
    <OrderSuccessClient
      lang={lang}
      orderRef={searchParams.ref || ''}
      methodHint={searchParams.method || ''}
    />
  )
}
