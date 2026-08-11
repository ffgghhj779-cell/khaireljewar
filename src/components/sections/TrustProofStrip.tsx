import Link from 'next/link'
import { ShieldCheck, Snowflake, MapPinned, FileCheck2 } from 'lucide-react'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils/cn'

const PROOFS = {
  en: [
    { icon: ShieldCheck, title: 'Quality care', text: 'Graded lots, packing integrity, export-minded specs.' },
    { icon: Snowflake, title: 'Cold chain', text: 'Temperature-minded handling from hub to destination.' },
    { icon: FileCheck2, title: 'Documentation', text: 'Origin, packing lists, and partner-ready paperwork.' },
    { icon: MapPinned, title: 'Jeddah hub', text: 'Red Sea logistics base for GCC and beyond.' },
  ],
  ar: [
    { icon: ShieldCheck, title: 'عناية بالجودة', text: 'دفعات مفرزة وتعبئة سليمة ومواصفات تصدير.' },
    { icon: Snowflake, title: 'سلسلة التبريد', text: 'مناولة تراعي الحرارة من المركز إلى الوجهة.' },
    { icon: FileCheck2, title: 'وثائق', text: 'منشأ وقوائم تعبئة وأوراق جاهزة للشريك.' },
    { icon: MapPinned, title: 'مركز جدة', text: 'قاعدة لوجستية على البحر الأحمر للخليج وما بعده.' },
  ],
} as const

/** Quiet proof strip — trust without noise */
export default function TrustProofStrip({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const items = PROOFS[isAr ? 'ar' : 'en']

  return (
    <section className="border-y border-primary/8 bg-cream-soft py-10 md:py-16">
      <Container>
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p
              className={cn(
                'mb-2 text-sm font-semibold text-primary',
                isAr ? 'font-arabic' : 'font-display'
              )}
            >
              {isAr ? 'ثقة بهدوء' : 'Quiet confidence'}
            </p>
            <h2
              className={cn(
                'text-2xl md:text-3xl font-medium text-primary tracking-tight',
                isAr ? 'font-arabic' : 'font-display'
              )}
            >
              {isAr ? 'أربعة أعمدة يعتمد عليها الشريك.' : 'Four pillars partners can lean on.'}
            </h2>
          </div>
          <Link
            href={`/${lang}/quality`}
            className={cn(
              'text-sm font-semibold text-primary underline-offset-4 hover:underline',
              isAr ? 'font-arabic' : 'font-sans'
            )}
          >
            {isAr ? 'نظام الجودة ←' : 'Quality system →'}
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }) => (
            <div key={title} className="group">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 text-primary transition-colors group-hover:bg-primary group-hover:text-cream">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3
                className={cn(
                  'mb-2 text-lg font-semibold text-primary',
                  isAr ? 'font-arabic' : 'font-display'
                )}
              >
                {title}
              </h3>
              <p className={cn('text-sm leading-relaxed text-primary/60', isAr ? 'font-arabic' : 'font-sans')}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
