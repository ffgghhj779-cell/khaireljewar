'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { BRAND, INCOTERMS } from '@/lib/constants/brand'
import { cn } from '@/lib/utils/cn'
import { CheckCircle2, Loader2, MessageCircle } from 'lucide-react'

interface ContactFormProps {
  lang: string
}

const inputClass =
  'w-full border border-gray-200 rounded-2xl px-4 py-3.5 min-h-[48px] bg-canvas-soft/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 focus:bg-white touch-manipulation transition-all'

export default function ContactForm({ lang }: ContactFormProps) {
  const isAr = lang === 'ar'
  const searchParams = useSearchParams()
  const productSlug = searchParams.get('product')
  const defaultMessage = useMemo(() => {
    if (!productSlug) return ''
    return isAr
      ? `أرغب في عرض سعر للمنتج: ${productSlug}`
      : `I would like a quote for: ${productSlug}`
  }, [productSlug, isAr])

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(null)
  const labelClass = cn('block text-sm font-semibold text-gray-700 mb-2', isAr ? 'font-arabic' : 'font-sans')

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
    const destinationCountry = String(data.get('destinationCountry') ?? '').trim()
    const destinationPort = String(data.get('destinationPort') ?? '').trim()
    const quantity = String(data.get('quantity') ?? '').trim()
    const unit = String(data.get('unit') ?? '').trim()
    const incoterm = String(data.get('incoterm') ?? '').trim()
    const shipWindow = String(data.get('shipWindow') ?? '').trim()

    if (!name || !email || !message) {
      setError(isAr ? 'يرجى تعبئة الاسم والبريد والرسالة.' : 'Please fill in name, email, and message.')
      return
    }

    setStatus('sending')

    const subject = isAr
      ? `طلب عرض سعر من ${name} — ${BRAND.name.ar}`
      : `RFQ from ${name} — ${BRAND.name.en}`

    const body = [
      isAr ? `الاسم: ${name}` : `Name: ${name}`,
      company ? (isAr ? `الشركة: ${company}` : `Company: ${company}`) : null,
      isAr ? `البريد: ${email}` : `Email: ${email}`,
      phone ? (isAr ? `الهاتف: ${phone}` : `Phone: ${phone}`) : null,
      productSlug ? (isAr ? `المنتج: ${productSlug}` : `Product: ${productSlug}`) : null,
      destinationCountry
        ? isAr
          ? `بلد الوجهة: ${destinationCountry}`
          : `Destination country: ${destinationCountry}`
        : null,
      destinationPort
        ? isAr
          ? `ميناء الوجهة: ${destinationPort}`
          : `Destination port: ${destinationPort}`
        : null,
      quantity
        ? isAr
          ? `الكمية: ${quantity} ${unit}`
          : `Quantity: ${quantity} ${unit}`
        : null,
      incoterm ? (isAr ? `شرط الشحن: ${incoterm}` : `Incoterm: ${incoterm}`) : null,
      shipWindow ? (isAr ? `نافذة الشحن: ${shipWindow}` : `Ship window: ${shipWindow}`) : null,
      '',
      message,
    ]
      .filter(Boolean)
      .join('\n')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          message,
          product: productSlug,
          destinationCountry,
          destinationPort,
          quantity,
          unit,
          incoterm,
          shipWindow,
          lang,
        }),
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

  const waText = [
    isAr ? `مرحباً ${BRAND.name.ar}` : `Hello ${BRAND.name.en}`,
    productSlug
      ? isAr
        ? `أود عرض سعر لـ ${productSlug}.`
        : `I would like a quote for ${productSlug}.`
      : isAr
        ? 'أود الاستفسار عن التصدير.'
        : 'I would like to inquire about food export.',
  ].join(' — ')

  if (status === 'sent') {
    return (
      <div className="text-center py-8">
        <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-4" strokeWidth={1.5} />
        <h3 className={cn('text-xl font-bold text-dark mb-2', isAr ? 'font-arabic' : 'font-display')}>
          {isAr ? 'تم إرسال طلبك' : 'Request sent'}
        </h3>
        <p className={cn('text-gray-500 mb-6', isAr ? 'font-arabic' : 'font-sans')}>
          {isAr ? 'فريق المبيعات سيتواصل معك قريباً.' : 'Our sales team will get back to you shortly.'}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className={cn('text-primary font-semibold text-sm hover:underline touch-manipulation', isAr ? 'font-arabic' : 'font-sans')}
        >
          {isAr ? 'إرسال طلب آخر' : 'Send another request'}
        </button>
      </div>
    )
  }

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-name" className={labelClass}>
              {isAr ? 'الاسم' : 'Name'} *
            </label>
            <input id="contact-name" name="name" required type="text" autoComplete="name" className={cn(inputClass, isAr ? 'font-arabic' : 'font-sans')} />
          </div>
          <div>
            <label htmlFor="contact-company" className={labelClass}>
              {isAr ? 'الشركة' : 'Company'}
            </label>
            <input id="contact-company" name="company" type="text" autoComplete="organization" className={cn(inputClass, isAr ? 'font-arabic' : 'font-sans')} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-email" className={labelClass}>
              {isAr ? 'البريد الإلكتروني' : 'Email'} *
            </label>
            <input id="contact-email" name="email" required type="email" autoComplete="email" className={cn(inputClass, isAr ? 'font-arabic' : 'font-sans')} />
          </div>
          <div>
            <label htmlFor="contact-phone" className={labelClass}>
              {isAr ? 'رقم الهاتف' : 'Phone'}
            </label>
            <input id="contact-phone" name="phone" type="tel" autoComplete="tel" dir="ltr" className={cn(inputClass, 'font-sans')} />
          </div>
        </div>

        <div className="rounded-2xl border border-secondary/30 bg-secondary/10 p-4 space-y-4">
          <p className={cn('text-sm font-semibold text-primary', isAr ? 'font-arabic' : 'font-sans')}>
            {isAr ? 'تفاصيل عرض السعر (اختياري)' : 'Quote details (optional)'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="destination-country" className={labelClass}>
                {isAr ? 'بلد الوجهة' : 'Destination country'}
              </label>
              <input id="destination-country" name="destinationCountry" type="text" className={cn(inputClass, isAr ? 'font-arabic' : 'font-sans')} />
            </div>
            <div>
              <label htmlFor="destination-port" className={labelClass}>
                {isAr ? 'ميناء الوجهة' : 'Destination port'}
              </label>
              <input id="destination-port" name="destinationPort" type="text" className={cn(inputClass, isAr ? 'font-arabic' : 'font-sans')} />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-1">
              <label htmlFor="quantity" className={labelClass}>
                {isAr ? 'الكمية' : 'Quantity'}
              </label>
              <input id="quantity" name="quantity" type="text" inputMode="decimal" className={cn(inputClass, 'font-sans')} />
            </div>
            <div className="col-span-1">
              <label htmlFor="unit" className={labelClass}>
                {isAr ? 'الوحدة' : 'Unit'}
              </label>
              <select id="unit" name="unit" defaultValue="MT" className={cn(inputClass, isAr ? 'font-arabic' : 'font-sans')}>
                <option value="MT">{isAr ? 'طن' : 'MT'}</option>
                <option value="Containers">{isAr ? 'حاوية' : 'Containers'}</option>
                <option value="KG">{isAr ? 'كجم' : 'KG'}</option>
              </select>
            </div>
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="incoterm" className={labelClass}>
                {isAr ? 'شرط الشحن' : 'Incoterm'}
              </label>
              <select id="incoterm" name="incoterm" defaultValue="FOB" className={cn(inputClass, 'font-sans')}>
                {INCOTERMS.map((term) => (
                  <option key={term} value={term}>
                    {term}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="ship-window" className={labelClass}>
                {isAr ? 'نافذة الشحن' : 'Ship window'}
              </label>
              <input
                id="ship-window"
                name="shipWindow"
                type="text"
                placeholder={isAr ? 'مثلاً: خلال 3 أسابيع' : 'e.g. within 3 weeks'}
                className={cn(inputClass, isAr ? 'font-arabic' : 'font-sans')}
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClass}>
            {isAr ? 'الرسالة' : 'Message'} *
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            defaultValue={defaultMessage}
            className={cn(inputClass, 'resize-y min-h-[140px]', isAr ? 'font-arabic' : 'font-sans')}
          />
        </div>
        {error && (
          <p className="text-red-600 text-sm font-medium" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={status === 'sending'}
          className={cn(
            'w-full bg-secondary hover:bg-secondary-400 disabled:opacity-60 text-primary py-4 min-h-[52px] rounded-full font-semibold transition-colors touch-manipulation flex items-center justify-center gap-2',
            isAr ? 'font-arabic' : 'font-sans'
          )}
        >
          {status === 'sending' && <Loader2 className="w-5 h-5 animate-spin" />}
          {isAr ? 'إرسال طلب العرض' : 'Submit RFQ'}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-dark/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className={cn('text-sm text-gray-500', isAr ? 'font-arabic' : 'font-sans')}>
          {isAr ? 'أو تواصل فوراً عبر واتساب' : 'Or reach us on WhatsApp'}
        </p>
        <a
          href={`https://wa.me/${BRAND.contact.phoneWa}?text=${encodeURIComponent(waText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 min-h-[48px] rounded-full bg-[#25D366] text-white font-semibold text-sm hover:opacity-90 transition-opacity touch-manipulation"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp
        </a>
      </div>
    </>
  )
}
