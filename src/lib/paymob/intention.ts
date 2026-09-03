import { getPaymobConfig, unifiedCheckoutUrl } from '@/lib/paymob/config'
import { egpToPiasters } from '@/lib/commerce/pricing'

export type PaymobBilling = {
  fullName: string
  email: string
  phone: string
  street: string
  city: string
  governorate: string
}

export type PaymobLineItem = {
  name: string
  amountEgp: number
  quantity: number
  description?: string
}

export async function createPaymobCheckout(params: {
  orderNumber: string
  totalEgp: number
  billing: PaymobBilling
  items: PaymobLineItem[]
  lang: string
}): Promise<{ checkoutUrl: string; intentionId: string }> {
  const cfg = getPaymobConfig()
  if (!cfg.isConfigured || !cfg.secretKey || !cfg.publicKey || !cfg.integrationId) {
    throw new Error('Paymob is not configured')
  }

  const [firstName, ...rest] = params.billing.fullName.trim().split(/\s+/)
  const lastName = rest.join(' ') || firstName
  const phone = params.billing.phone.replace(/\D/g, '').replace(/^0/, '')
  const amountCents = egpToPiasters(params.totalEgp)

  const payload = {
    amount: amountCents,
    currency: 'EGP',
    payment_methods: [cfg.integrationId],
    items: params.items.map((item) => ({
      name: item.name.slice(0, 50),
      amount: egpToPiasters(item.amountEgp),
      description: item.description?.slice(0, 120) || item.name.slice(0, 120),
      quantity: item.quantity,
    })),
    billing_data: {
      apartment: 'NA',
      first_name: firstName.slice(0, 50),
      last_name: lastName.slice(0, 50),
      street: params.billing.street.slice(0, 120),
      building: 'NA',
      phone_number: phone,
      country: 'EG',
      email: params.billing.email.slice(0, 120),
      floor: 'NA',
      state: params.billing.governorate.slice(0, 50),
      city: params.billing.city.slice(0, 50),
    },
    special_reference: params.orderNumber,
    notification_url: `${cfg.siteUrl}/api/paymob/webhook`,
    redirection_url: `${cfg.siteUrl}/${params.lang}/order/success?ref=${encodeURIComponent(params.orderNumber)}`,
  }

  const res = await fetch('https://accept.paymob.com/v1/intention/', {
    method: 'POST',
    headers: {
      Authorization: `Token ${cfg.secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = (await res.json()) as {
    client_secret?: string
    id?: string
    detail?: string
    message?: string
  }

  if (!res.ok || !data.client_secret) {
    const msg = data.detail || data.message || `Paymob HTTP ${res.status}`
    throw new Error(msg)
  }

  return {
    checkoutUrl: unifiedCheckoutUrl(cfg.publicKey, data.client_secret),
    intentionId: String(data.id || ''),
  }
}
