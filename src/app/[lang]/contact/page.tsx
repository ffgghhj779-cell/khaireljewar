import Container from '@/components/ui/Container'
import { BRAND } from '@/lib/constants/brand'
import { cn } from '@/lib/utils/cn'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'

  const info = [
    {
      icon: MapPin,
      title: isAr ? 'صندوق البريد' : 'P.O. Box',
      content: isAr ? BRAND.contact.address.ar : BRAND.contact.address.en,
    },
    {
      icon: Phone,
      title: isAr ? 'الهاتف' : 'Phone',
      content: BRAND.contact.phone,
      href: `tel:${BRAND.contact.phoneTel}`,
    },
    {
      icon: Mail,
      title: isAr ? 'البريد الإلكتروني' : 'Email',
      content: BRAND.contact.email,
      href: `mailto:${BRAND.contact.email}`,
    },
    {
      icon: Clock,
      title: isAr ? 'ساعات العمل' : 'Working Hours',
      content: isAr ? 'الأحد - الخميس: 9 ص - 5 م' : 'Sun - Thu: 9 AM - 5 PM',
    },
  ]

  return (
    <div className="min-h-screen py-12 pb-24">
      <Container size="large">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className={cn('text-primary font-bold text-sm mb-3', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
            {isAr ? BRAND.tagline.ar : BRAND.tagline.en}
          </p>
          <h1 className={cn('text-5xl md:text-7xl font-black text-dark tracking-tight mb-6', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
            {isAr ? 'تواصل معنا' : 'Contact Us'}
          </h1>
          <p className={cn('text-xl text-gray-500 leading-relaxed', isAr ? 'font-ibm-arabic' : 'font-inter')}>
            {isAr
              ? `فريق ${BRAND.name.ar} مستعد للرد على جميع استفساراتكم المتعلقة بتصدير المنتجات الغذائية وطلبات التسعير.`
              : `The ${BRAND.name.en} sales team is ready to answer all your food export and quote inquiries.`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            {info.map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={cn('text-lg font-bold text-dark mb-1', isAr ? 'font-ibm-arabic' : 'font-manrope')}>{item.title}</h3>
                  {item.href ? (
                    <a href={item.href} className="text-gray-500 hover:text-primary transition-colors" dir={item.icon === Phone ? 'ltr' : undefined}>
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-gray-500">{item.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 bg-white p-10 md:p-12 rounded-[2rem] shadow-soft border border-gray-100">
            <h2 className={cn('text-3xl font-black text-dark mb-8', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {isAr ? 'أرسل رسالة مباشرة' : 'Send a Direct Message'}
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={cn('block text-sm font-bold text-gray-700 mb-2', isAr ? 'font-ibm-arabic' : 'font-inter')}>{isAr ? 'الاسم' : 'Name'}</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className={cn('block text-sm font-bold text-gray-700 mb-2', isAr ? 'font-ibm-arabic' : 'font-inter')}>{isAr ? 'الشركة' : 'Company'}</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={cn('block text-sm font-bold text-gray-700 mb-2', isAr ? 'font-ibm-arabic' : 'font-inter')}>{isAr ? 'البريد الإلكتروني' : 'Email'}</label>
                  <input type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className={cn('block text-sm font-bold text-gray-700 mb-2', isAr ? 'font-ibm-arabic' : 'font-inter')}>{isAr ? 'رقم الهاتف' : 'Phone'}</label>
                  <input type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div>
                <label className={cn('block text-sm font-bold text-gray-700 mb-2', isAr ? 'font-ibm-arabic' : 'font-inter')}>{isAr ? 'الرسالة' : 'Message'}</label>
                <textarea rows={5} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
              </div>
              <button type="button" className="w-full bg-dark hover:bg-primary text-white py-4 rounded-xl font-bold transition-colors">
                {isAr ? 'إرسال الرسالة' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  )
}
