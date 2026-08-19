import type { Metadata } from 'next'
import { Suspense } from 'react'
import Container from '@/components/ui/Container'
import ContactForm from '@/components/contact/ContactForm'
import DepthHero from '@/components/graphics/DepthHero'
import { BRAND } from '@/lib/constants/brand'
import { buildPageMetadata } from '@/lib/seo'
import { cn } from '@/lib/utils/cn'
import { MapPin, Phone, Mail, Clock, Building2 } from 'lucide-react'

export function generateMetadata({ params: { lang } }: { params: { lang: string } }): Metadata {
  const isAr = lang === 'ar'
  return buildPageMetadata({
    lang,
    path: '/contact',
    title: isAr ? 'تواصل معنا' : 'Contact',
    description: isAr
      ? `تواصل مع ${BRAND.nameFull.ar} في جدة — طلبات التسعير والتصدير.`
      : `Contact ${BRAND.nameFull.en} in Jeddah — quotes and export inquiries.`,
  })
}

export default function ContactPage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'

  const info = [
    {
      icon: MapPin,
      title: isAr ? 'العنوان السعودي' : 'Saudi address',
      content: isAr ? BRAND.contact.address.ar : BRAND.contact.address.en,
    },
    {
      icon: Phone,
      title: isAr ? 'الجوال السعودي' : 'Saudi mobile',
      content: BRAND.contact.phone,
      href: `tel:${BRAND.contact.phoneTel}`,
    },
    {
      icon: MapPin,
      title: isAr ? 'فرع مصر' : 'Egypt branch',
      content: isAr
        ? `${BRAND.contact.egypt.address.ar} – ${BRAND.contact.egypt.phone}`
        : `${BRAND.contact.egypt.address.en} – ${BRAND.contact.egypt.phone}`,
      href: `tel:${BRAND.contact.egypt.phoneTel}`,
    },
    {
      icon: Building2,
      title: isAr ? 'السجل التجاري' : 'Commercial registration',
      content: isAr ? BRAND.legal.line.ar : BRAND.legal.line.en,
    },
    {
      icon: Mail,
      title: isAr ? 'البريد' : 'Email',
      content: BRAND.contact.email,
      href: `mailto:${BRAND.contact.email}`,
    },
    {
      icon: Clock,
      title: isAr ? 'ساعات العمل' : 'Hours',
      content: isAr ? BRAND.contact.hours.ar : BRAND.contact.hours.en,
    },
  ]

  return (
    <div className="min-h-screen pb-24 bg-canvas-soft">
      <DepthHero
        lang={lang}
        src="/images/brand/sections/hospitality.webp"
        alt={isAr ? 'ضيافة خير الجوار' : 'Khair Aljaar hospitality'}
        eyebrow={isAr ? `${BRAND.city.ar} · ${BRAND.country.ar}` : `${BRAND.city.en} · ${BRAND.country.en}`}
        title={isAr ? 'تواصل معنا' : 'Talk to us'}
        subtitle={
          isAr
            ? 'نرد على استفسارات التصدير وطلبات التسعير بوضوح — بروح الجوار من جدة.'
            : 'Clear answers on export and quotes — with neighborly care from Jeddah.'
        }
        minHeightClass="min-h-[36vh] md:min-h-[42vh]"
      />

      <Container size="large" className="pt-12 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            {info.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl border border-farm/25 bg-farm-mist/80 p-4"
                >
                  <div className="w-10 h-10 rounded-full bg-white text-farm flex items-center justify-center shrink-0 shadow-soft">
                    <Icon className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h2 className={cn('text-sm font-semibold text-dark mb-1', isAr ? 'font-arabic' : 'font-sans')}>
                      {item.title}
                    </h2>
                    {item.href ? (
                      <a
                        href={item.href}
                        className={cn(
                          'text-gray-600 hover:text-primary transition-colors text-[15px] break-all',
                          isAr ? 'font-arabic' : 'font-sans'
                        )}
                        dir={item.icon === Phone ? 'ltr' : undefined}
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className={cn('text-gray-600 text-[15px]', isAr ? 'font-arabic' : 'font-sans')}>
                        {item.content}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}

            <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-soft">
              <iframe
                title={isAr ? 'خريطة جدة' : 'Jeddah map'}
                src="https://www.openstreetmap.org/export/embed.html?bbox=39.05%2C21.35%2C39.25%2C21.55&layer=mapnik&marker=21.45%2C39.15"
                className="h-52 w-full border-0 grayscale-[20%] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="border-t border-primary/8 px-4 py-3">
                <a
                  href="https://www.openstreetmap.org/?mlat=21.45&mlon=39.15#map=12/21.45/39.15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'text-xs font-semibold text-primary hover:underline',
                    isAr ? 'font-arabic' : 'font-sans'
                  )}
                >
                  {isAr ? 'افتح الخريطة ←' : 'Open full map →'}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white rounded-[2rem] p-6 md:p-10 shadow-soft border border-dark/5">
            <h2 className={cn('text-2xl font-bold text-dark mb-8', isAr ? 'font-arabic-display' : 'font-display')}>
              {isAr ? 'أرسل رسالة' : 'Send a message'}
            </h2>
            <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-canvas-soft" />}>
              <ContactForm lang={lang} />
            </Suspense>
          </div>
        </div>
      </Container>
    </div>
  )
}
