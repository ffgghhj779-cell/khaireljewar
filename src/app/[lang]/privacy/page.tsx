import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import { BRAND } from '@/lib/constants/brand'
import { buildPageMetadata } from '@/lib/seo'
import { cn } from '@/lib/utils/cn'

export function generateMetadata({ params: { lang } }: { params: { lang: string } }): Metadata {
  const isAr = lang === 'ar'
  return buildPageMetadata({
    lang,
    path: '/privacy',
    title: isAr ? 'سياسة الخصوصية' : 'Privacy Policy',
    description: isAr
      ? 'البيانات التي تجمعها خير الجوار لطلبات الأسعار والاستفسارات، وكيفية طلب حذفها.'
      : 'What data Khair Aljaar Foods collects for quotes and inquiries, and how to request deletion.',
  })
}

export default function PrivacyPage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'

  return (
    <div className="min-h-screen py-14 md:py-20 pb-24 bg-canvas-soft">
      <Container size="small">
        <p className={cn('text-primary font-semibold text-sm mb-3', isAr ? 'font-arabic' : 'font-sans')}>
          {isAr ? 'قانوني' : 'Legal'}
        </p>
        <h1
          className={cn(
            'text-3xl md:text-5xl font-bold text-dark mb-8 editorial-heading',
            isAr ? 'font-arabic' : 'font-display'
          )}
        >
          {isAr ? 'سياسة الخصوصية' : 'Privacy policy'}
        </h1>
        <div className={cn('text-gray-600 space-y-5 leading-relaxed text-[15px] md:text-base', isAr ? 'font-arabic' : 'font-sans')}>
          <p>
            {isAr
              ? `${BRAND.nameFull.ar} تجمع البيانات اللازمة للرد على طلبات الأسعار والرسائل، ولإنشاء الحساب، ولإتمام الطلب: الاسم، الشركة، البريد، الهاتف، وعنوان التوصيل عند الشراء.`
              : `${BRAND.nameFull.en} collects the data needed to answer quote requests and messages, to create an account, and to complete an order: name, company, email, phone, and a delivery address when you buy.`}
          </p>
          <p>
            {isAr
              ? 'نستخدم هذه البيانات للرد والتوريد والمتابعة. لا نبيعها. قد تُشارك مع جهة الدفع أو الشحن بالقدر اللازم لتنفيذ الطلب فقط.'
              : 'We use this data to reply, supply, and follow up. We do not sell it. It may be shared with a payment or shipping provider only as needed to carry out the order.'}
          </p>
          <p>
            {isAr
              ? 'الموقع يستخدم ملفات تعريف ارتباط لجلسة الدخول والسلة. يمكنك طلب تصحيح بياناتك أو حذفها عبر صفحة التواصل.'
              : 'The site uses cookies for the sign-in session and the cart. You can ask us to correct or delete your data from the contact page.'}
          </p>
          <p>
            {isAr
              ? `مكان التعامل الظاهر هو جدة. للطلبات المتعلقة بالبيانات راسلنا على ${BRAND.contact.email}.`
              : `The published place of business is Jeddah. For data requests, email ${BRAND.contact.email}.`}
          </p>
        </div>
      </Container>
    </div>
  )
}
