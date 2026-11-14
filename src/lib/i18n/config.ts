export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'ar', 'ur', 'hi'] as const,
} as const

export type Locale = (typeof i18n)['locales'][number]

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  ur: 'اردو',
  hi: 'हिन्दी',
}

/** Short labels for the compact switcher control */
export const localeShort: Record<Locale, string> = {
  en: 'EN',
  ar: 'عربي',
  ur: 'اردو',
  hi: 'हिंदी',
}

export const localeDirections: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  ar: 'rtl',
  ur: 'rtl',
  hi: 'ltr',
}

/** Open Graph / hreflang locale codes */
export const localeOg: Record<Locale, string> = {
  en: 'en_US',
  ar: 'ar_SA',
  ur: 'ur_PK',
  hi: 'hi_IN',
}

/** Native market hint shown in the language menu */
export const localeMarkets: Record<Locale, string> = {
  en: 'Global',
  ar: 'السعودية / الخليج',
  ur: 'پاکستان',
  hi: 'भारत',
}

export function isLocale(value: string): value is Locale {
  return (i18n.locales as readonly string[]).includes(value)
}

export function asLocale(value: string | undefined | null): Locale {
  if (value && isLocale(value)) return value
  return i18n.defaultLocale
}
