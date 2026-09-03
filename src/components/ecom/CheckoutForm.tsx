'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/commerce/cart-store'
import { formatEgp } from '@/lib/commerce/pricing'
import { EGYPT_GOVERNORATES, SHIPPING_FEE_EGP, type CheckoutCustomer } from '@/lib/commerce/types'
import { cn } from '@/lib/utils/cn'

export default function CheckoutForm({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const lines = useCartStore((s) => s.lines)
  const subtotal = useCartStore((s) => s.subtotalEgp())
  const clear = useCartStore((s) => s.clear)
  const total = subtotal + SHIPPING_FEE_EGP

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<CheckoutCustomer>({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    governorate: isAr ? EGYPT_GOVERNORATES[0].ar : EGYPT_GOVERNORATES[0].en,
    notes: '',
  })

  if (!lines.length) {
    return (
      <p className={cn('text-primary/70', isAr ? 'font-arabic' : 'font-sans')}>
        {isAr ? 'السلة فارغة.' : 'Cart is empty.'}
      </p>
    )
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lang,
          items: lines.map((l) => ({ slug: l.slug, quantity: l.quantity })),
          customer: form,
        }),
      })
      const data = (await res.json()) as { checkoutUrl?: string; error?: string }
      if (!res.ok || !data.checkoutUrl) {
        throw new Error(data.error || (isAr ? 'فشل إنشاء الدفع' : 'Checkout failed'))
      }
      clear()
      window.location.href = data.checkoutUrl
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error')
      setLoading(false)
    }
  }

  const fieldClass =
    'w-full rounded-xl border border-primary/15 bg-cream px-4 py-3 text-sm text-primary outline-none focus:border-farm'

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <h2 className={cn('text-xl font-semibold text-primary', isAr ? 'font-arabic' : 'font-display')}>
          {isAr ? 'بيانات التوصيل' : 'Delivery details'}
        </h2>

        <input
          required
          className={fieldClass}
          placeholder={isAr ? 'الاسم الكامل' : 'Full name'}
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
        <input
          required
          type="email"
          className={fieldClass}
          placeholder={isAr ? 'البريد الإلكتروني' : 'Email'}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          required
          className={fieldClass}
          placeholder={isAr ? 'رقم الموبايل (01xxxxxxxxx)' : 'Mobile (01xxxxxxxxx)'}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          required
          className={fieldClass}
          placeholder={isAr ? 'الشارع / العنوان' : 'Street address'}
          value={form.street}
          onChange={(e) => setForm({ ...form, street: e.target.value })}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            required
            className={fieldClass}
            placeholder={isAr ? 'المدينة' : 'City'}
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
          <select
            required
            className={fieldClass}
            value={form.governorate}
            onChange={(e) => setForm({ ...form, governorate: e.target.value })}
          >
            {EGYPT_GOVERNORATES.map((g) => (
              <option key={g.en} value={isAr ? g.ar : g.en}>
                {isAr ? g.ar : g.en}
              </option>
            ))}
          </select>
        </div>
        <textarea
          className={cn(fieldClass, 'min-h-[88px]')}
          placeholder={isAr ? 'ملاحظات (اختياري)' : 'Notes (optional)'}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        {error && (
          <p className={cn('rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800', isAr ? 'font-arabic' : 'font-sans')}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={cn(
            'w-full rounded-xl bg-primary py-4 text-sm font-bold text-cream disabled:opacity-60',
            isAr ? 'font-arabic' : 'font-sans'
          )}
        >
          {loading
            ? isAr
              ? 'جاري التحويل للدفع...'
              : 'Redirecting to payment...'
            : isAr
              ? 'ادفع الآن'
              : 'Pay now'}
        </button>
        <p className={cn('text-xs text-primary/50', isAr ? 'font-arabic' : 'font-sans')}>
          {isAr
            ? 'الدفع آمن عبر Paymob — فيزا / ماستركارد / محافظ / فوري'
            : 'Secure payment via Paymob — cards, wallets & Fawry'}
        </p>
      </div>

      <aside className="h-fit rounded-2xl border border-primary/10 bg-cream-soft p-5">
        <p className={cn('font-semibold text-primary mb-3', isAr ? 'font-arabic' : 'font-display')}>
          {isAr ? 'ملخص' : 'Summary'}
        </p>
        <ul className={cn('space-y-2 text-sm text-primary/80 mb-4', isAr ? 'font-arabic' : 'font-sans')}>
          {lines.map((l) => (
            <li key={l.slug} className="flex justify-between gap-2">
              <span className="truncate">{isAr ? l.titleAr : l.titleEn} × {l.quantity}</span>
              <span>{formatEgp(l.unitPriceEgp * l.quantity, lang)}</span>
            </li>
          ))}
        </ul>
        <div className={cn('border-t border-primary/10 pt-3 text-sm space-y-1', isAr ? 'font-arabic' : 'font-sans')}>
          <div className="flex justify-between">
            <span>{isAr ? 'شحن' : 'Shipping'}</span>
            <span>{formatEgp(SHIPPING_FEE_EGP, lang)}</span>
          </div>
          <div className="flex justify-between font-bold text-primary">
            <span>{isAr ? 'الإجمالي' : 'Total'}</span>
            <span>{formatEgp(total, lang)}</span>
          </div>
        </div>
      </aside>
    </form>
  )
}
