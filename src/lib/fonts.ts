import { Cairo, DM_Sans, Fraunces, IBM_Plex_Sans_Arabic, Noto_Sans_Devanagari } from 'next/font/google'

/** Editorial serif — headlines & brand (EN) */
export const display = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  preload: true,
  weight: ['400', '500', '600', '700'],
})

/** Clean body — UI + paragraphs (EN) */
export const sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  preload: true,
  weight: ['400', '500', '600', '700'],
})

/** Arabic + Urdu body/UI (Arabic script) */
export const arabic = Cairo({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-arabic',
  preload: true,
  weight: ['400', '500', '600', '700'],
})

/** Arabic display — headlines with editorial weight */
export const arabicDisplay = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-arabic-display',
  preload: true,
  weight: ['500', '600', '700'],
})

/** Hindi (Devanagari) — UI + headlines */
export const hindi = Noto_Sans_Devanagari({
  subsets: ['devanagari', 'latin'],
  display: 'swap',
  variable: '--font-hindi',
  preload: true,
  weight: ['400', '500', '600', '700'],
})

export const fontVariables = `${display.variable} ${sans.variable} ${arabic.variable} ${arabicDisplay.variable} ${hindi.variable}`
