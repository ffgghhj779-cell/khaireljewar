import { NextResponse } from 'next/server'
import { createOrderWithPaymob } from '@/lib/commerce/orders'
import type { CheckoutCustomer } from '@/lib/commerce/types'
import { createPaymobCheckout } from '@/lib/paymob/intention'
import { getPaymobConfig } from '@/lib/paymob/config'

export const runtime = 'nodejs'

function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      lang?: string
      items?: { slug: string; quantity: number }[]
      customer?: CheckoutCustomer
    }

    if (!getPaymobConfig().isConfigured) {
      return bad('Payment gateway is not configured yet. Contact support.', 503)
    }

    const lang = body.lang === 'en' ? 'en' : 'ar'
    const items = body.items
    const customer = body.customer

    if (!items?.length) return bad('Cart is empty')
    if (!customer?.fullName?.trim()) return bad('Full name is required')
    if (!customer.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      return bad('Valid email is required')
    }
    if (!customer.phone?.trim() || customer.phone.replace(/\D/g, '').length < 10) {
      return bad('Valid phone is required')
    }
    if (!customer.street?.trim() || !customer.city?.trim() || !customer.governorate?.trim()) {
      return bad('Complete shipping address is required')
    }

    const result = await createOrderWithPaymob({
      lang,
      items,
      customer,
      createCheckout: createPaymobCheckout,
    })

    return NextResponse.json(result)
  } catch (err) {
    console.error('[checkout]', err)
    const message = err instanceof Error ? err.message : 'Checkout failed'
    return bad(message, message.includes('not configured') ? 503 : 400)
  }
}
