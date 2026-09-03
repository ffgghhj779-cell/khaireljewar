'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import { formatEgp } from '@/lib/commerce/pricing'
import { cn } from '@/lib/utils/cn'

type OrderPayload = {
  orderNumber: string
  status: string
  totalEgp: number
}

export default function OrderSuccessClient({ lang, orderRef }: { lang: string; orderRef: string }) {
  const isAr = lang === 'ar'
  const [order, setOrder] = useState<OrderPayload | null>(null)

  useEffect(() => {
    if (!orderRef) return
    fetch(`/api/orders/${encodeURIComponent(orderRef)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setOrder(data))
      .catch(() => setOrder(null))
  }, [orderRef])

  return (
    <div className="bg-cream min-h-screen pt-28 pb-24">
      <Container className="max-w-xl text-center">
        <div className="rounded-2xl border border-farm/30 bg-farm-mist p-10">
          <h1 className={cn('text-2xl font-bold text-primary mb-3', isAr ? 'font-arabic' : 'font-display')}>
            {isAr ? 'شكرًا لطلبك!' : 'Thank you for your order!'}
          </h1>
          {orderRef && (
            <p className={cn('text-sm text-primary/70 mb-2', isAr ? 'font-arabic' : 'font-sans')}>
              {isAr ? 'رقم الطلب:' : 'Order:'}{' '}
              <span className="font-mono font-semibold">{orderRef}</span>
            </p>
          )}
          {order && (
            <p className={cn('text-sm text-primary/80 mb-4', isAr ? 'font-arabic' : 'font-sans')}>
              {isAr ? 'الحالة:' : 'Status:'}{' '}
              <span className="font-semibold">{order.status}</span>
              {' · '}
              {formatEgp(Number(order.totalEgp), lang)}
            </p>
          )}
          <p className={cn('text-sm text-primary/60 mb-8', isAr ? 'font-arabic' : 'font-sans')}>
            {isAr
              ? 'لو الدفع تم بنجاح، هنتواصل معاك لتأكيد التوصيل.'
              : 'If payment succeeded, we will contact you to confirm delivery.'}
          </p>
          <Link
            href={`/${lang}/products`}
            className={cn(
              'inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-cream',
              isAr ? 'font-arabic' : 'font-sans'
            )}
          >
            {isAr ? 'متابعة التسوق' : 'Continue shopping'}
          </Link>
        </div>
      </Container>
    </div>
  )
}
