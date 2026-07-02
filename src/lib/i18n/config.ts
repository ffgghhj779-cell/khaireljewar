export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'ar'],
} as const

export type Locale = (typeof i18n)['locales'][number]

export const localeNames: Record<Locale, string> = {
  ar: 'العربية',
  en: 'English',
}

export const localeDirections: Record<Locale, 'ltr' | 'rtl'> = {
  ar: 'rtl',
  en: 'ltr',
}
