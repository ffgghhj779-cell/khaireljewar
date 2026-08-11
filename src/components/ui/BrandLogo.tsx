import { BRAND } from '@/lib/constants/brand'
import { cn } from '@/lib/utils/cn'

type BrandLogoVariant = 'header' | 'footer' | 'hero'

interface BrandLogoProps {
  variant?: BrandLogoVariant
  className?: string
  priority?: boolean
  /** Leaf mark only */
  iconOnly?: boolean
}

const SIZE: Record<BrandLogoVariant, { mark: string; word: string }> = {
  header: { mark: 'h-9 w-9 sm:h-10 sm:w-10', word: 'h-9 sm:h-10' },
  footer: { mark: 'h-12 w-12', word: 'h-12 sm:h-14' },
  hero: { mark: 'h-10 w-10 sm:h-12 sm:w-12', word: 'h-10 sm:h-12' },
}

/** Neighborly harvest — two leaves meeting (الجوار) + mustard seed */
function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0 drop-shadow-sm', className)}
      aria-hidden
    >
      <circle cx="32" cy="32" r="30" fill="#1A332A" />
      <circle cx="32" cy="32" r="26.5" stroke="#E5B84A" strokeOpacity="0.35" strokeWidth="1.25" fill="none" />
      <path
        d="M30 46C22 40 16 32 17 22C22 26 27 32 30 40C30 34 28 27 24 20C28 26 31 34 30 46Z"
        fill="#F7F4EC"
      />
      <path
        d="M34 46C42 40 48 32 47 22C42 26 37 32 34 40C34 34 36 27 40 20C36 26 33 34 34 46Z"
        fill="#F7F4EC"
      />
      <path d="M32 44V22" stroke="#1A332A" strokeWidth="1.6" strokeLinecap="round" opacity="0.25" />
      <circle cx="32" cy="28" r="3.2" fill="#E5B84A" />
      <circle cx="32" cy="28" r="1.15" fill="#F7F4EC" opacity="0.55" />
    </svg>
  )
}

function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0 w-auto', className)}
      role="img"
      aria-label={BRAND.nameFull.en}
    >
      <circle cx="32" cy="32" r="28" fill="#1A332A" />
      <circle cx="32" cy="32" r="24.5" stroke="#E5B84A" strokeOpacity="0.35" strokeWidth="1.2" fill="none" />
      <path
        d="M30 44C23.5 39 18.5 32.5 19.2 24C23 27 27 32 30 38.5C30 34 28.5 28.5 25.5 23C28.5 28 30.5 34.5 30 44Z"
        fill="#F7F4EC"
      />
      <path
        d="M34 44C40.5 39 45.5 32.5 44.8 24C41 27 37 32 34 38.5C34 34 35.5 28.5 38.5 23C35.5 28 33.5 34.5 34 44Z"
        fill="#F7F4EC"
      />
      <circle cx="32" cy="27" r="2.8" fill="#E5B84A" />
      <text
        x="72"
        y="30"
        fill="#1A332A"
        style={{
          fontFamily: 'var(--font-display), Georgia, serif',
          fontWeight: 600,
          fontSize: 18,
          letterSpacing: '-0.02em',
        }}
      >
        Khair Aljaar
      </text>
      <text
        x="72"
        y="48"
        fill="#1A332A"
        fillOpacity="0.55"
        style={{
          fontFamily: 'var(--font-sans), system-ui, sans-serif',
          fontWeight: 600,
          fontSize: 10,
          letterSpacing: '0.2em',
        }}
      >
        FOODS · JEDDAH
      </text>
    </svg>
  )
}

export default function BrandLogo({
  variant = 'header',
  className,
  iconOnly = false,
}: BrandLogoProps) {
  if (iconOnly) {
    return <Mark className={cn(SIZE[variant].mark, className)} />
  }

  return <Wordmark className={cn(SIZE[variant].word, className)} />
}
