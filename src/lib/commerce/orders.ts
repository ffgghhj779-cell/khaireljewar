import { getProductBySlug } from '@/lib/actions/products'
import { getConsumerUnit, getRetailPriceEgp } from '@/lib/commerce/pricing'
import { SHIPPING_FEE_EGP, type CheckoutCustomer } from '@/lib/commerce/types'
import { createAdminClient, isAdminClientConfigured } from '@/lib/supabase/admin'
import type { ProductRow } from '@/lib/supabase/types'

export type ResolvedCartItem = {
  slug: string
  productId: string | null
  titleEn: string
  titleAr: string
  unitLabelEn: string
  unitLabelAr: string
  quantity: number
  unitPriceEgp: number
  lineTotalEgp: number
}

function orderNumber(): string {
  const d = new Date()
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `KA-${y}${m}${day}-${rand}`
}

export async function resolveCheckoutItems(
  items: { slug: string; quantity: number }[]
): Promise<{ lines: ResolvedCartItem[]; subtotalEgp: number }> {
  const lines: ResolvedCartItem[] = []

  for (const item of items) {
    const qty = Math.floor(item.quantity)
    if (!item.slug || qty < 1 || qty > 99) {
      throw new Error(`Invalid quantity for ${item.slug}`)
    }

    const product = await getProductBySlug(item.slug)
    if (!product) throw new Error(`Product not found: ${item.slug}`)

    let row: ProductRow | null = null
    if (isAdminClientConfigured()) {
      const supabase = createAdminClient()
      const { data } = await supabase.from('products').select('*').eq('slug', item.slug).maybeSingle()
      row = (data as ProductRow | null) ?? null
    }

    const unit = getConsumerUnit(product, row)
    const unitPriceEgp = getRetailPriceEgp(product, row)
    lines.push({
      slug: product.slug,
      productId: row?.id ?? product.id ?? null,
      titleEn: product.title.en,
      titleAr: product.title.ar,
      unitLabelEn: unit.en,
      unitLabelAr: unit.ar,
      quantity: qty,
      unitPriceEgp,
      lineTotalEgp: unitPriceEgp * qty,
    })
  }

  const subtotalEgp = lines.reduce((s, l) => s + l.lineTotalEgp, 0)
  if (subtotalEgp < 50) throw new Error('Minimum order is 50 EGP')

  return { lines, subtotalEgp }
}

export async function createOrderWithPaymob(params: {
  lang: string
  items: { slug: string; quantity: number }[]
  customer: CheckoutCustomer
  createCheckout: (args: {
    orderNumber: string
    totalEgp: number
    billing: CheckoutCustomer & { fullName: string }
    items: { name: string; amountEgp: number; quantity: number }[]
    lang: string
  }) => Promise<{ checkoutUrl: string; intentionId: string }>
}) {
  if (!isAdminClientConfigured()) {
    throw new Error('Orders database is not configured')
  }

  const draft = await insertOrderDraft({
    lang: params.lang,
    items: params.items,
    customer: params.customer,
    paymentMethod: 'paymob',
    status: 'pending_payment',
  })

  const paymobItems = [
    ...draft.lines.map((l) => ({
      name: l.titleEn,
      amountEgp: l.unitPriceEgp,
      quantity: l.quantity,
    })),
    { name: 'Delivery', amountEgp: draft.shippingEgp, quantity: 1 },
  ]

  const checkout = await params.createCheckout({
    orderNumber: draft.orderNumber,
    totalEgp: draft.totalEgp,
    billing: params.customer,
    items: paymobItems,
    lang: params.lang,
  })

  const supabase = createAdminClient()
  await supabase
    .from('orders')
    .update({ paymob_intention_id: checkout.intentionId })
    .eq('id', draft.orderId)

  return {
    orderNumber: draft.orderNumber,
    checkoutUrl: checkout.checkoutUrl,
    totalEgp: draft.totalEgp,
    subtotalEgp: draft.subtotalEgp,
    shippingEgp: draft.shippingEgp,
    paymentMethod: 'paymob' as const,
  }
}

export async function createOrderWithCod(params: {
  lang: string
  items: { slug: string; quantity: number }[]
  customer: CheckoutCustomer
}) {
  if (!isAdminClientConfigured()) {
    throw new Error('Orders database is not configured')
  }

  const draft = await insertOrderDraft({
    lang: params.lang,
    items: params.items,
    customer: params.customer,
    paymentMethod: 'cod',
    status: 'fulfillment',
  })

  return {
    orderNumber: draft.orderNumber,
    checkoutUrl: `/${params.lang === 'en' ? 'en' : 'ar'}/order/success?ref=${encodeURIComponent(draft.orderNumber)}&method=cod`,
    totalEgp: draft.totalEgp,
    subtotalEgp: draft.subtotalEgp,
    shippingEgp: draft.shippingEgp,
    paymentMethod: 'cod' as const,
  }
}

async function insertOrderDraft(params: {
  lang: string
  items: { slug: string; quantity: number }[]
  customer: CheckoutCustomer
  paymentMethod: 'paymob' | 'cod'
  status: 'pending_payment' | 'fulfillment'
}) {
  const { lines, subtotalEgp } = await resolveCheckoutItems(params.items)
  const shippingEgp = SHIPPING_FEE_EGP
  const totalEgp = subtotalEgp + shippingEgp
  const number = orderNumber()
  const supabase = createAdminClient()

  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      order_number: number,
      status: params.status,
      lang: params.lang === 'en' ? 'en' : 'ar',
      currency: 'EGP',
      subtotal_egp: subtotalEgp,
      shipping_egp: shippingEgp,
      total_egp: totalEgp,
      customer_name: params.customer.fullName.trim(),
      customer_email: params.customer.email.trim(),
      customer_phone: params.customer.phone.trim(),
      shipping_street: params.customer.street.trim(),
      shipping_city: params.customer.city.trim(),
      shipping_governorate: params.customer.governorate.trim(),
      customer_notes: params.customer.notes?.trim() || null,
      payment_method: params.paymentMethod,
    })
    .select('id, order_number')
    .single()

  if (error || !order) throw new Error(error?.message || 'Failed to create order')

  const orderItems = lines.map((line) => ({
    order_id: order.id,
    product_id: line.productId,
    product_slug: line.slug,
    title_en: line.titleEn,
    title_ar: line.titleAr,
    unit_label_en: line.unitLabelEn,
    unit_label_ar: line.unitLabelAr,
    quantity: line.quantity,
    unit_price_egp: line.unitPriceEgp,
    line_total_egp: line.lineTotalEgp,
  }))

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems)
  if (itemsError) throw new Error(itemsError.message)

  return {
    orderId: order.id,
    orderNumber: number,
    lines,
    subtotalEgp,
    shippingEgp,
    totalEgp,
  }
}

export async function getOrderByNumber(orderNumber: string) {
  if (!isAdminClientConfigured()) return null
  const supabase = createAdminClient()
  const { data: order } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('order_number', orderNumber)
    .maybeSingle()
  return order
}

export async function markOrderPaid(orderNumber: string, transactionId: string, method?: string) {
  if (!isAdminClientConfigured()) return
  const supabase = createAdminClient()
  await supabase
    .from('orders')
    .update({
      status: 'paid',
      paymob_transaction_id: transactionId,
      payment_method: method || 'card',
      paid_at: new Date().toISOString(),
    })
    .eq('order_number', orderNumber)
}

export async function markOrderFailed(orderNumber: string) {
  if (!isAdminClientConfigured()) return
  const supabase = createAdminClient()
  await supabase.from('orders').update({ status: 'failed' }).eq('order_number', orderNumber)
}
