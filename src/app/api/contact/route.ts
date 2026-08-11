import { NextResponse } from 'next/server'
import { BRAND } from '@/lib/constants/brand'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      message,
      company,
      phone,
      lang,
      product,
      destinationCountry,
      destinationPort,
      quantity,
      unit,
      incoterm,
      shipWindow,
    } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const payload = {
      source: 'khaireljewar-contact',
      name,
      company,
      email,
      phone,
      message,
      product,
      destinationCountry,
      destinationPort,
      quantity,
      unit,
      incoterm,
      shipWindow,
      lang,
      to: BRAND.contact.email,
      receivedAt: new Date().toISOString(),
    }

    const webhook = process.env.CONTACT_WEBHOOK_URL?.trim()
    if (webhook) {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        return NextResponse.json({ error: 'Delivery failed' }, { status: 502 })
      }
      return NextResponse.json({ ok: true, delivered: true })
    }

    // No webhook configured — accept locally so mailto fallback can still work on client,
    // but signal that delivery was not configured (ops must set CONTACT_WEBHOOK_URL).
    if (process.env.NODE_ENV === 'production') {
      console.warn('[contact] CONTACT_WEBHOOK_URL is not set — inquiry accepted without delivery')
    }

    return NextResponse.json({ ok: true, delivered: false })
  } catch {
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 })
  }
}
