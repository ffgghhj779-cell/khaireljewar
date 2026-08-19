import { Star } from 'lucide-react'
import { BRAND } from '@/lib/constants/brand'
import { cn } from '@/lib/utils/cn'

export default function SiteBio({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const lines = isAr ? BRAND.bio.ar : BRAND.bio.en

  return (
    <section className="relative z-10 border-t border-farm/25 bg-cream py-10 md:py-14">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <div className="mb-5 flex items-center justify-center gap-1.5" aria-label={isAr ? 'سبع نجوم' : 'Seven stars'}>
          {Array.from({ length: 7 }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-secondary text-secondary md:h-[18px] md:w-[18px]"
              strokeWidth={1.25}
            />
          ))}
        </div>
        <p
          className={cn(
            'text-[clamp(1.05rem,3.4vw,1.45rem)] font-medium leading-relaxed text-primary text-balance',
            isAr ? 'font-arabic' : 'font-display'
          )}
        >
          {lines[0]}
        </p>
        <p
          className={cn(
            'mt-2 text-[clamp(1rem,3vw,1.25rem)] font-medium leading-relaxed text-farm text-balance',
            isAr ? 'font-arabic' : 'font-display'
          )}
        >
          {lines[1]}
        </p>
      </div>
    </section>
  )
}
