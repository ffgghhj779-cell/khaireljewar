'use client'

import { useState } from 'react'
import { Banknote, CreditCard } from 'lucide-react'
import { useCartStore } from '@/lib/commerce/cart-store'
import { formatEgp } from '@/lib/commerce/pricing'
import {
  EGYPT_GOVERNORATES,
  SHIPPING_FEE_EGP,
  type CheckoutCustomer,
  type PaymentMethod,
} from '@/lib/commerce/types'
import { cn } from '@/lib/utils/cn'

export default function CheckoutForm({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const lines = useCartStore((s) => s.lines)
  const subtotal = useCartStore((s) => s.subtotalEgp())
  const clear = useCartStore((s) => s.clear)
  const total = subtotal + SHIPPING_FEE_EGP

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('paymob')
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
          paymentMethod,
        }),
      })
      const data = (await res.json()) as {
        checkoutUrl?: string
        orderNumber?: string
        paymentMethod?: string
        error?: string
      }
      if (!res.ok || !data.checkoutUrl) {
        throw new Error(data.error || (isAr ? 'فشل إنشاء الطلب' : 'Checkout failed'))
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

  const methods: {
    id: PaymentMethod
    titleAr: string
    titleEn: string
    descAr: string
    descEn: string
    icon: typeof CreditCard
  }[] = [
    {
      id: 'paymob',
      titleAr: 'دفع إلكتروني الآن',
      titleEn: 'Pay online now',
      descAr: 'بطاقة · محفظة · فوري عبر Paymob',
      descEn: 'Card · wallet · Fawry via Paymob',
      icon: CreditCard,
    },
    {
      id: 'cod',
      titleAr: 'الدفع عند الاستلام',
      titleEn: 'Cash on delivery',
      descAr: 'ادفع للكابتن عند وصول الطلب',
      descEn: 'Pay the courier when your order arrives',
      icon: Banknote,
    },
  ]

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)]">
      <div className="min-w-0 space-y-4">
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

        <div className="space-y-3 pt-2 pb-4">
          <h3 className={cn('text-base font-semibold text-primary', isAr ? 'font-arabic' : 'font-display')}>
            {isAr ? 'طريقة الدفع' : 'Payment method'}
          </h3>
          <div className="grid gap-3">
            {methods.map((method) => {
              const Icon = method.icon
              const active = paymentMethod === method.id
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-2xl border px-4 py-3.5 text-start transition',
                    active
                      ? 'border-farm bg-farm-mist shadow-[0_8px_20px_rgba(26,51,42,0.08)]'
                      : 'border-primary/12 bg-cream hover:border-primary/25'
                  )}
                >
                  <span
                    className={cn(
                      'mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                      active ? 'bg-farm text-cream' : 'bg-primary/5 text-primary'
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        'block text-sm font-semibold text-primary',
                        isAr ? 'font-arabic' : 'font-sans'
                      )}
                    >
                      {isAr ? method.titleAr : method.titleEn}
                    </span>
                    <span
                      className={cn(
                        'mt-0.5 block text-xs leading-relaxed text-primary/60',
                        isAr ? 'font-arabic' : 'font-sans'
                      )}
                    >
                      {isAr ? method.descAr : method.descEn}
                    </span>
                  </span>
                  <span
                    className={cn(
                      'mt-1 h-4 w-4 shrink-0 rounded-full border-2',
                      active ? 'border-farm bg-farm' : 'border-primary/25'
                    )}
                    aria-hidden
                  />
                </button>
              )
            })}
          </div>
        </div>

        {error && (
          <p className={cn('rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800', isAr ? 'font-arabic' : 'font-sans')}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={cn(
            'mb-2 w-full rounded-xl bg-primary py-4 text-sm font-bold text-cream disabled:opacity-60',
            isAr ? 'font-arabic' : 'font-sans'
          )}
        >
          {loading
            ? paymentMethod === 'cod'
              ? isAr
                ? 'جاري تأكيد الطلب...'
                : 'Confirming order...'
              : isAr
                ? 'جاري التحويل للدفع...'
                : 'Redirecting to payment...'
            : paymentMethod === 'cod'
              ? isAr
                ? 'تأكيد الطلب — ادفع عند الاستلام'
                : 'Place order — pay on delivery'
              : isAr
                ? 'ادفع الآن أونلاين'
                : 'Pay online now'}
        </button>
        <p className={cn('text-xs leading-relaxed text-primary/50', isAr ? 'font-arabic' : 'font-sans')}>
          {paymentMethod === 'cod'
            ? isAr
              ? 'هيتم تجهيز الطلب والتواصل معاك قبل التوصيل. المبلغ يُسدَّد للكابتن نقدًا أو تحويل حسب المتاح.'
              : 'We will prepare your order and contact you before delivery. Pay the courier in cash or transfer if available.'
            : isAr
              ? 'الدفع آمن عبر Paymob — فيزا / ماستركارد / محافظ / فوري'
              : 'Secure payment via Paymob — cards, wallets & Fawry'}
        </p>
      </div>

      <aside className="h-fit min-w-0 rounded-2xl border border-primary/10 bg-cream-soft p-5">
        <p className={cn('mb-3 font-semibold text-primary', isAr ? 'font-arabic' : 'font-display')}>
          {isAr ? 'ملخص' : 'Summary'}
        </p>
        <ul className={cn('mb-4 space-y-2 text-sm text-primary/80', isAr ? 'font-arabic' : 'font-sans')}>
          {lines.map((l) => (
            <li key={l.slug} className="flex justify-between gap-2">
              <span className="min-w-0 truncate">{isAr ? l.titleAr : l.titleEn} × {l.quantity}</span>
              <span className="shrink-0">{formatEgp(l.unitPriceEgp * l.quantity, lang)}</span>
            </li>
          ))}
        </ul>
        <div className={cn('space-y-1 border-t border-primary/10 pt-3 text-sm', isAr ? 'font-arabic' : 'font-sans')}>
          <div className="flex justify-between gap-2">
            <span>{isAr ? 'شحن' : 'Shipping'}</span>
            <span>{formatEgp(SHIPPING_FEE_EGP, lang)}</span>
          </div>
          <div className="flex justify-between gap-2 font-bold text-primary">
            <span>{isAr ? 'الإجمالي' : 'Total'}</span>
            <span>{formatEgp(total, lang)}</span>
          </div>
          <p className="pt-2 text-[11px] text-primary/50">
            {paymentMethod === 'cod'
              ? isAr
                ? 'يُحصَّل عند الاستلام'
                : 'Collected on delivery'
              : isAr
                ? 'يُدفع أونلاين قبل الشحن'
                : 'Paid online before shipping'}
          </p>
        </div>
      </aside>
    </form>
  )
}
