import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { BRAND } from '@/lib/constants/brand'

export default function AuthCard({
  lang,
  title,
  subtitle,
  children,
}: {
  lang: string
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  const isAr = lang === 'ar'

  return (
    <div className="relative min-h-[70vh] bg-canvas-soft pb-24 pt-10 md:pt-14">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(43,182,115,0.18), transparent), linear-gradient(180deg, #f7f4ec 0%, #efebe1 100%)',
        }}
      />
      <div className="relative mx-auto w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <Link href={`/${lang}`} className="inline-block">
            <p className={cn('text-2xl font-bold tracking-tight text-primary', isAr ? 'font-arabic' : 'font-display')}>
              {isAr ? BRAND.name.ar : BRAND.name.en}
            </p>
          </Link>
          <h1 className={cn('mt-4 text-xl font-bold text-primary', isAr ? 'font-arabic' : 'font-display')}>
            {title}
          </h1>
          <p className={cn('mt-2 text-[14px] text-primary/55', isAr ? 'font-arabic' : 'font-sans')}>
            {subtitle}
          </p>
        </div>

        <div className="rounded-2xl border border-primary/10 bg-cream p-6 shadow-[0_20px_50px_rgba(26,51,42,0.08)] md:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
