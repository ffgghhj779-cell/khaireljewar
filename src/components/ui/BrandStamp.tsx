import Image from 'next/image'
import { cn } from '@/lib/utils/cn'

const SIZES = {
  sm: { box: 'px-1.5 py-1 rounded-md', img: 'h-[18px] sm:h-5' },
  md: { box: 'px-2 py-1.5 rounded-lg', img: 'h-6 sm:h-7' },
  lg: { box: 'px-2.5 py-2 rounded-xl', img: 'h-8 sm:h-10' },
} as const

/** Khair Aljaar lockup laid over in-orchard product photos, so crops never cut the brand */
export default function BrandStamp({
  size = 'sm',
  className,
}: {
  size?: keyof typeof SIZES
  className?: string
}) {
  const s = SIZES[size]
  return (
    <span
      aria-hidden
      className={cn(
        'pointer-events-none absolute bottom-2 left-2 z-[1] inline-flex items-center bg-cream/90 shadow-[0_6px_18px_-6px_rgba(12,24,18,0.45)] ring-1 ring-secondary/40 backdrop-blur-sm sm:bottom-3 sm:left-3',
        s.box,
        className
      )}
    >
      <Image
        src="/images/logo/khair-aljewar-lockup.png"
        alt=""
        width={575}
        height={256}
        sizes="120px"
        className={cn('w-auto', s.img)}
      />
    </span>
  )
}
