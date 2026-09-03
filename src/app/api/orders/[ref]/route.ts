import { NextResponse } from 'next/server'
import { getOrderByNumber } from '@/lib/commerce/orders'

export const runtime = 'nodejs'

export async function GET(_req: Request, { params }: { params: { ref: string } }) {
  const order = await getOrderByNumber(decodeURIComponent(params.ref))
  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json({
    orderNumber: order.order_number,
    status: order.status,
    totalEgp: order.total_egp,
    subtotalEgp: order.subtotal_egp,
    shippingEgp: order.shipping_egp,
    customerName: order.customer_name,
    items: (order.order_items as Array<Record<string, unknown>> | undefined)?.map((i) => ({
      slug: i.product_slug,
      titleEn: i.title_en,
      titleAr: i.title_ar,
      quantity: i.quantity,
      lineTotalEgp: i.line_total_egp,
    })),
  })
}
