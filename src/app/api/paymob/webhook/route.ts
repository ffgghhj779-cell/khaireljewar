import { NextResponse } from 'next/server'
import { markOrderFailed, markOrderPaid } from '@/lib/commerce/orders'
import {
  extractOrderReference,
  isSuccessfulPayment,
  verifyPaymobTransactionHmac,
} from '@/lib/paymob/webhook'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as Record<string, unknown>
    const hmac = String(req.headers.get('hmac') || payload.hmac || '')

    const txn = (payload.obj as Record<string, unknown> | undefined) || payload
    if (hmac && !verifyPaymobTransactionHmac(txn, hmac)) {
      console.warn('[paymob webhook] invalid HMAC')
      return NextResponse.json({ ok: false }, { status: 401 })
    }

    const orderRef = extractOrderReference(payload) || extractOrderReference(txn)
    if (!orderRef) {
      return NextResponse.json({ ok: true, skipped: 'no order ref' })
    }

    if (isSuccessfulPayment(txn) || isSuccessfulPayment(payload)) {
      const txnId = String(txn.id || payload.id || '')
      const method = String(
        (txn.source_data as Record<string, unknown> | undefined)?.type || 'card'
      )
      await markOrderPaid(orderRef, txnId, method)
    } else {
      await markOrderFailed(orderRef)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[paymob webhook]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'paymob webhook ready' })
}
