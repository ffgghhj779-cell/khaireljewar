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
    description: isAr ? `سياسة خصوصية ${BRAND.nameFull.ar}` : `Privacy policy for ${BRAND.nameFull.en}`,
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
              ? `${BRAND.nameFull.ar} تحترم خصوصيتك. نجمع فقط البيانات اللازمة لمعالجة طلبات التسعير والتواصل التجاري (الاسم، الشركة، البريد، الهاتف).`
              : `${BRAND.nameFull.en} respects your privacy. We collect only data needed to process quote requests and commercial inquiries (name, company, email, phone).`}
          </p>
          <p>
            {isAr
              ? 'لا نبيع بياناتك لأطراف ثالثة. يمكنك طلب حذف بياناتك عبر التواصل معنا.'
              : 'We do not sell your data to third parties. You may request deletion by contacting us.'}
          </p>
        </div>
      </Container>
    </div>
  )
}
