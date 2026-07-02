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
    description: isAr ? `سياسة خصوصية ${BRAND.name.ar}` : `Privacy policy for ${BRAND.name.en}`,
  })
}

export default function PrivacyPage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'

  return (
    <div className="min-h-screen py-12 pb-24">
      <Container size="small">
        <h1 className={cn('text-3xl md:text-4xl font-black text-dark mb-6', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
          {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
        </h1>
        <div className={cn('text-gray-600 space-y-4 leading-relaxed', isAr ? 'font-ibm-arabic' : 'font-inter')}>
          <p>
            {isAr
              ? `${BRAND.name.ar} تحترم خصوصيتك. نجمع فقط البيانات اللازمة لمعالجة طلبات التسعير والتواصل التجاري (الاسم، الشركة، البريد، الهاتف).`
              : `${BRAND.name.en} respects your privacy. We collect only data required to process B2B quote requests and commercial inquiries (name, company, email, phone).`}
          </p>
          <p>
            {isAr
              ? 'لا نبيع بياناتك لأطراف ثالثة. يمكنك طلب حذف بياناتك عبر التواصل معنا.'
              : 'We do not sell your data to third parties. You may request data deletion by contacting us.'}
          </p>
        </div>
      </Container>
    </div>
  )
}
