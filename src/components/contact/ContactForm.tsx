'use client'

import { useState, type FormEvent } from 'react'
import { BRAND } from '@/lib/constants/brand'
import { cn } from '@/lib/utils/cn'
import { CheckCircle2, Loader2, MessageCircle } from 'lucide-react'

interface ContactFormProps {
  lang: string
}

export default function ContactForm({ lang }: ContactFormProps) {
  const isAr = lang === 'ar'
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const company = String(data.get('company') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    if (!name || !email || !message) {
      setError(isAr ? 'يرجى تعبئة الاسم والبريد والرسالة.' : 'Please fill in name, email, and message.')
      return
    }

    setStatus('sending')

    const subject = isAr
      ? `استفسار من ${name} — ${BRAND.name.ar}`
      : `Inquiry from ${name} — ${BRAND.name.en}`

    const body = [
      isAr ? `الاسم: ${name}` : `Name: ${name}`,
      company ? (isAr ? `الشركة: ${company}` : `Company: ${company}`) : null,
      isAr ? `البريد: ${email}` : `Email: ${email}`,
      phone ? (isAr ? `الهاتف: ${phone}` : `Phone: ${phone}`) : null,
      '',
      message,
    ]
      .filter(Boolean)
      .join('\n')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email, phone, message, lang }),
      })

      if (!res.ok) throw new Error('send_failed')

      setStatus('sent')
      form.reset()
    } catch {
      window.location.href = `mailto:${BRAND.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setStatus('sent')
      form.reset()
    }
  }

  const waText = isAr
    ? `مرحباً ${BRAND.name.ar}، أود الاستفسار عن التصدير.`
    : `Hello ${BRAND.name.en}, I would like to inquire about food export.`

  if (status === 'sent') {
    return (
      <div className="text-center py-8">
        <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-4" />
        <h3 className={cn('text-xl font-bold text-dark mb-2', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
          {isAr ? 'تم إرسال رسالتك' : 'Message Sent'}
        </h3>
        <p className={cn('text-gray-500 mb-6', isAr ? 'font-ibm-arabic' : 'font-inter')}>
          {isAr ? 'سيتواصل معك فريق المبيعات قريباً.' : 'Our sales team will get back to you shortly.'}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-primary font-bold text-sm hover:underline touch-manipulation"
        >
          {isAr ? 'إرسال رسالة أخرى' : 'Send another message'}
        </button>
      </div>
    )
  }

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="contact-name" className={cn('block text-sm font-bold text-gray-700 mb-2', isAr ? 'font-ibm-arabic' : 'font-inter')}>
              {isAr ? 'الاسم' : 'Name'} *
            </label>
            <input id="contact-name" name="name" required type="text" autoComplete="name" className="w-full border border-gray-200 rounded-xl px-4 py-3 min-h-[48px] focus:outline-none focus:border-primary touch-manipulation" />
          </div>
          <div>
            <label htmlFor="contact-company" className={cn('block text-sm font-bold text-gray-700 mb-2', isAr ? 'font-ibm-arabic' : 'font-inter')}>
              {isAr ? 'الشركة' : 'Company'}
            </label>
            <input id="contact-company" name="company" type="text" autoComplete="organization" className="w-full border border-gray-200 rounded-xl px-4 py-3 min-h-[48px] focus:outline-none focus:border-primary touch-manipulation" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="contact-email" className={cn('block text-sm font-bold text-gray-700 mb-2', isAr ? 'font-ibm-arabic' : 'font-inter')}>
              {isAr ? 'البريد الإلكتروني' : 'Email'} *
            </label>
            <input id="contact-email" name="email" required type="email" autoComplete="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 min-h-[48px] focus:outline-none focus:border-primary touch-manipulation" />
          </div>
          <div>
            <label htmlFor="contact-phone" className={cn('block text-sm font-bold text-gray-700 mb-2', isAr ? 'font-ibm-arabic' : 'font-inter')}>
              {isAr ? 'رقم الهاتف' : 'Phone'}
            </label>
            <input id="contact-phone" name="phone" type="tel" autoComplete="tel" dir="ltr" className="w-full border border-gray-200 rounded-xl px-4 py-3 min-h-[48px] focus:outline-none focus:border-primary touch-manipulation" />
          </div>
        </div>
        <div>
          <label htmlFor="contact-message" className={cn('block text-sm font-bold text-gray-700 mb-2', isAr ? 'font-ibm-arabic' : 'font-inter')}>
            {isAr ? 'الرسالة' : 'Message'} *
          </label>
          <textarea id="contact-message" name="message" required rows={5} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary touch-manipulation resize-y min-h-[120px]" />
        </div>
        {error && (
          <p className="text-red-600 text-sm font-medium" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-dark hover:bg-primary disabled:opacity-60 text-white py-4 min-h-[48px] rounded-xl font-bold transition-colors touch-manipulation flex items-center justify-center gap-2"
        >
          {status === 'sending' && <Loader2 className="w-5 h-5 animate-spin" />}
          {isAr ? 'إرسال الرسالة' : 'Send Message'}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className={cn('text-sm text-gray-500', isAr ? 'font-ibm-arabic' : 'font-inter')}>
          {isAr ? 'أو تواصل فوراً عبر واتساب' : 'Or reach us instantly on WhatsApp'}
        </p>
        <a
          href={`https://wa.me/${BRAND.contact.phoneWa}?text=${encodeURIComponent(waText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 min-h-[48px] rounded-xl bg-[#25D366] text-white font-bold text-sm hover:opacity-90 transition-opacity touch-manipulation"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp
        </a>
      </div>
    </>
  )
}
