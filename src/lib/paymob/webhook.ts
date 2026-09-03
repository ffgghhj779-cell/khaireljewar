import crypto from 'crypto'
import { getPaymobConfig } from '@/lib/paymob/config'

type TransactionPayload = Record<string, unknown>

function pick(obj: TransactionPayload, key: string): string {
  const v = obj[key]
  if (v === null || v === undefined) return ''
  return String(v)
}

/** Paymob transaction processed callback HMAC (Accept docs). */
export function verifyPaymobTransactionHmac(obj: TransactionPayload, provided: string): boolean {
  const cfg = getPaymobConfig()
  if (!cfg.hmacSecret) return false

  const source = (obj.source_data as Record<string, unknown> | undefined) || {}

  const parts = [
    pick(obj, 'amount_cents'),
    pick(obj, 'created_at'),
    pick(obj, 'currency'),
    pick(obj, 'error_occured'),
    pick(obj, 'has_parent_transaction'),
    pick(obj, 'id'),
    pick(obj, 'integration_id'),
    pick(obj, 'is_3d_secure'),
    pick(obj, 'is_auth'),
    pick(obj, 'is_capture'),
    pick(obj, 'is_refunded'),
    pick(obj, 'is_standalone_payment'),
    pick(obj, 'is_voided'),
    pick(obj, 'order'),
    pick(obj, 'owner'),
    pick(obj, 'pending'),
    pick(source, 'pan'),
    pick(source, 'sub_type'),
    pick(source, 'type'),
    pick(obj, 'success'),
  ]

  const digest = crypto.createHmac('sha512', cfg.hmacSecret).update(parts.join('')).digest('hex')
  return digest === provided
}

export function extractOrderReference(payload: TransactionPayload): string | null {
  const order = payload.order as Record<string, unknown> | undefined
  const merchantOrderId =
    pick(payload, 'merchant_order_id') ||
    pick(order || {}, 'merchant_order_id') ||
    pick(order || {}, 'shipping_data') ||
    pick(payload, 'special_reference')

  if (merchantOrderId && merchantOrderId.startsWith('KA-')) return merchantOrderId

  const obj = payload.obj as Record<string, unknown> | undefined
  if (obj) {
    const nestedOrder = obj.order as Record<string, unknown> | undefined
    const ref =
      pick(obj, 'merchant_order_id') ||
      pick(nestedOrder || {}, 'merchant_order_id') ||
      pick(obj, 'special_reference')
    if (ref.startsWith('KA-')) return ref
  }

  return null
}

export function isSuccessfulPayment(payload: TransactionPayload): boolean {
  const success = payload.success ?? (payload.obj as Record<string, unknown> | undefined)?.success
  return success === true || success === 'true'
}
