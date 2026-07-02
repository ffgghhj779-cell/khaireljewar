import { NextResponse } from 'next/server'
import { BRAND } from '@/lib/constants/brand'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message, company, phone, lang } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const webhook = process.env.CONTACT_WEBHOOK_URL
    if (webhook) {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'khaireljewar-contact',
          name,
          company,
          email,
          phone,
          message,
          lang,
          to: BRAND.contact.email,
        }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 })
  }
}
