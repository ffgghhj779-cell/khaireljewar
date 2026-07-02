'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Building2, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react'
import { useQuoteStore } from '@/store/useQuoteStore'
import { submitQuoteRequest } from '@/lib/actions/products'
import { BRAND } from '@/lib/constants/brand'
import { cn } from '@/lib/utils/cn'

export default function QuoteCheckoutModal({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const { isCheckoutOpen, toggleCheckout, items, clearCart, currency } = useQuoteStore()
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    country: '',
    incoterm: 'FOB',
    destinationPort: '',
  })

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? BRAND.contact.phoneWa

  const handleSubmit = async () => {
    setSubmitting(true)
    setSubmitError(null)

    const result = await submitQuoteRequest({
      companyName: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      incoterm: formData.incoterm,
      destinationPort: formData.destinationPort,
      currency,
      items,
    })

    if (!result.success) {
      setSubmitError(result.error ?? (isAr ? 'فشل حفظ الطلب' : 'Failed to save quote request'))
      setSubmitting(false)
      return
    }

    let text = `*KHAIR ALJAAR FOODS — B2B Quote Request*\n`
    if (result.quoteId) text += `Ref: ${result.quoteId}\n`
    text += `\n*Company Details:*\n`
    text += `Name: ${formData.companyName}\n`
    text += `Email: ${formData.email}\n`
    text += `Phone: ${formData.phone}\n`
    text += `Country: ${formData.country}\n\n`
    text += `*Shipping Preferences:*\n`
    text += `Incoterm: ${formData.incoterm}\n`
    text += `Destination Port: ${formData.destinationPort}\n\n`
    text += `*Requested Items:*\n`

    items.forEach((item, index) => {
      const unit = item.unit === 'Containers' ? 'Container(s)' : 'MT'
      text += `${index + 1}. ${item.title.en} — ${item.quantity} ${unit} (${item.packaging})\n`
    })

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank')
    setSubmitting(false)
    setStep(3)
    setTimeout(() => {
      clearCart()
      toggleCheckout()
      setStep(1)
      setSubmitError(null)
      setFormData({ companyName: '', email: '', phone: '', country: '', incoterm: 'FOB', destinationPort: '' })
    }, 4000)
  }

  const renderStep = () => {
    if (step === 1) {
      return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-primary" />
            <h3 className={cn('text-xl font-bold text-dark', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {isAr ? 'معلومات الشركة' : 'Company Details'}
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className={cn('block text-sm font-semibold text-gray-700 mb-1', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                {isAr ? 'اسم الشركة' : 'Company Name'} *
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={cn('block text-sm font-semibold text-gray-700 mb-1', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                  {isAr ? 'البريد الإلكتروني' : 'Corporate Email'} *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className={cn('block text-sm font-semibold text-gray-700 mb-1', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                  {isAr ? 'رقم الهاتف' : 'Phone Number'} *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label className={cn('block text-sm font-semibold text-gray-700 mb-1', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                {isAr ? 'الدولة' : 'Country'} *
              </label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={!formData.companyName || !formData.email || !formData.phone || !formData.country}
            className="w-full mt-8 bg-dark hover:bg-primary text-white py-4 rounded-xl font-bold transition-colors disabled:opacity-50 border border-dark"
          >
            {isAr ? 'التالي: تفاصيل الشحن' : 'Next: Shipping Details'}
          </button>
        </motion.div>
      )
    }

    if (step === 2) {
      return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-primary" />
            <h3 className={cn('text-xl font-bold text-dark', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {isAr ? 'تفاصيل الشحن واللوجستيات' : 'Shipping & Logistics'}
            </h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className={cn('block text-sm font-semibold text-gray-700 mb-3', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                {isAr ? 'شروط الشحن (Incoterms)' : 'Incoterms'} *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['FOB', 'CIF', 'EXW'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setFormData({ ...formData, incoterm: term })}
                    className={cn(
                      'py-3 rounded-xl font-bold transition-all border',
                      formData.incoterm === term
                        ? 'bg-dark text-white border-dark'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-dark'
                    )}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={cn('block text-sm font-semibold text-gray-700 mb-1', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                {isAr ? 'ميناء الوصول' : 'Destination Port'} *
              </label>
              <input
                type="text"
                value={formData.destinationPort}
                onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
              />
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className={cn('text-xs font-bold text-gray-500 uppercase mb-2', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                {isAr ? 'ملخص الطلب' : 'Order Summary'}
              </p>
              {items.map((item) => (
                <p key={item.id} className="text-sm text-dark font-medium">
                  {isAr ? item.title.ar : item.title.en} — {item.quantity} {item.unit}
                </p>
              ))}
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <button onClick={() => setStep(1)} className="w-1/3 bg-gray-100 hover:bg-gray-200 text-dark py-4 rounded-xl font-bold transition-colors border border-gray-200">
              {isAr ? 'رجوع' : 'Back'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formData.destinationPort || submitting}
              className="w-2/3 bg-primary text-dark hover:bg-dark hover:text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border border-primary disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              <span>
                {submitting
                  ? isAr
                    ? 'جاري الحفظ...'
                    : 'Saving...'
                  : isAr
                    ? 'تأكيد وإرسال عبر الواتساب'
                    : 'Confirm & Send via WhatsApp'}
              </span>
            </button>
          </div>
          {submitError && (
            <p className="mt-4 text-sm text-red-600 font-medium text-center">{submitError}</p>
          )}
        </motion.div>
      )
    }

    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6 border border-green-200"
        >
          <CheckCircle2 className="w-10 h-10" />
        </motion.div>
        <h3 className={cn('text-2xl font-black text-dark mb-2', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
          {isAr ? 'تم استلام طلبك بنجاح' : 'Request Received Successfully'}
        </h3>
        <p className={cn('text-gray-500', isAr ? 'font-ibm-arabic' : 'font-inter')}>
          {isAr ? 'سيقوم فريق المبيعات بالتواصل معك فوراً.' : 'Our sales team will contact you immediately.'}
        </p>
      </motion.div>
    )
  }

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={step !== 3 ? toggleCheckout : undefined}
          className="fixed inset-0 bg-dark/60 backdrop-blur-md z-[200] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-200"
          >
            <div className="bg-gray-50 p-6 flex justify-between items-center border-b border-gray-200">
              <div>
                <h2 className={cn('text-xl font-bold text-dark', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                  {isAr ? 'إتمام طلب التسعير B2B' : 'Complete B2B Quote Request'}
                </h2>
                <p className="text-primary text-xs mt-1 font-bold">
                  {step === 1
                    ? isAr
                      ? 'الخطوة 1 من 2'
                      : 'Step 1 of 2'
                    : step === 2
                      ? isAr
                        ? 'الخطوة 2 من 2'
                        : 'Step 2 of 2'
                      : ''}
                </p>
              </div>
              {step !== 3 && (
                <button onClick={toggleCheckout} className="p-2 hover:bg-gray-200 rounded-lg transition text-dark">
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>
            <div className="p-8">
              <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
