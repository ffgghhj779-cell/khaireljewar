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
  paymentMethod?: string | null
}

export default function OrderSuccessClient({
  lang,
  orderRef,
  methodHint,
}: {
  lang: string
  orderRef: string
  methodHint?: string
}) {
  const isAr = lang === 'ar'
  const [order, setOrder] = useState<OrderPayload | null>(null)

  useEffect(() => {
    if (!orderRef) return
    fetch(`/api/orders/${encodeURIComponent(orderRef)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setOrder(data))
      .catch(() => setOrder(null))
  }, [orderRef])

  const isCod =
    methodHint === 'cod' ||
    order?.paymentMethod === 'cod' ||
    (order?.status === 'fulfillment' && order?.paymentMethod !== 'paymob')

  const statusLabel = (() => {
    if (!order) return null
    if (isCod || order.paymentMethod === 'cod') {
      return isAr ? 'مؤكد — الدفع عند الاستلام' : 'Confirmed — cash on delivery'
    }
    if (order.status === 'paid') return isAr ? 'مدفوع' : 'Paid'
    if (order.status === 'pending_payment') {
      return isAr ? 'بانتظار تأكيد الدفع' : 'Awaiting payment confirmation'
    }
    if (order.status === 'fulfillment') return isAr ? 'قيد التجهيز' : 'Being prepared'
    return order.status
  })()

  return (
    <div className="min-h-screen bg-cream pb-24 pt-28">
      <Container className="max-w-xl px-4 text-center sm:px-6">
        <div className="rounded-2xl border border-farm/30 bg-farm-mist p-6 sm:p-10">
          <h1 className={cn('mb-3 text-2xl font-bold text-primary', isAr ? 'font-arabic' : 'font-display')}>
            {isAr ? 'شكرًا لطلبك!' : 'Thank you for your order!'}
          </h1>
          {orderRef && (
            <p className={cn('mb-2 text-sm text-primary/70', isAr ? 'font-arabic' : 'font-sans')}>
              {isAr ? 'رقم الطلب:' : 'Order:'}{' '}
              <span className="font-mono font-semibold">{orderRef}</span>
            </p>
          )}
          {order && (
            <p className={cn('mb-4 text-sm text-primary/80', isAr ? 'font-arabic' : 'font-sans')}>
              {isAr ? 'الحالة:' : 'Status:'}{' '}
              <span className="font-semibold">{statusLabel}</span>
              {' · '}
              {formatEgp(Number(order.totalEgp), lang)}
            </p>
          )}
          <p className={cn('mb-8 text-sm leading-relaxed text-primary/60', isAr ? 'font-arabic' : 'font-sans')}>
            {isCod
              ? isAr
                ? 'طلبك اتأكد. هنتواصل معاك قبل التوصيل، والمبلغ يُسدَّد عند الاستلام.'
                : 'Your order is confirmed. We will contact you before delivery, and you pay on arrival.'
              : isAr
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
