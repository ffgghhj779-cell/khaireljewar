import { asLocale, isLocale, localeDirections, type Locale } from './config'

/** Bilingual content extended with South-Asian locales (optional until filled). */
export type LocalizedString = {
  en: string
  ar: string
  ur?: string
  hi?: string
}

export type LocalizedList = {
  en: readonly string[]
  ar: readonly string[]
  ur?: readonly string[]
  hi?: readonly string[]
}

export function isRtl(lang: string): boolean {
  const locale = asLocale(lang)
  return localeDirections[locale] === 'rtl'
}

/** Arabic-script UI font (Arabic + Urdu). Hindi/English use Latin/Devanagari stacks. */
export function usesArabicScript(lang: string): boolean {
  return lang === 'ar' || lang === 'ur'
}

export function usesDevanagari(lang: string): boolean {
  return lang === 'hi'
}

/** Tailwind font utility for body/UI copy */
export function localeFontClass(lang: string): string {
  if (usesArabicScript(lang)) return 'font-arabic'
  if (usesDevanagari(lang)) return 'font-hindi'
  return 'font-sans'
}

/** Tailwind font utility for display headlines */
export function localeDisplayClass(lang: string): string {
  if (usesArabicScript(lang)) return 'font-arabic'
  if (usesDevanagari(lang)) return 'font-hindi'
  return 'font-display'
}

/**
 * Pick the best string for the active locale.
 * Fallbacks: ur → ar → en · hi → en → ar · ar/en → own → sibling
 */
export function tx(lang: string, value: LocalizedString | string | null | undefined): string {
  if (value == null) return ''
  if (typeof value === 'string') return value

  const locale = asLocale(lang)
  const direct = value[locale]
  if (direct) return direct

  if (locale === 'ur') return value.ar || value.en || value.hi || ''
  if (locale === 'hi') return value.en || value.ar || value.ur || ''
  if (locale === 'ar') return value.ar || value.en || ''
  return value.en || value.ar || ''
}

export function txList(
  lang: string,
  value: LocalizedList | readonly string[] | null | undefined
): string[] {
  if (value == null) return []
  if (Array.isArray(value)) return [...value]

  const dict = value as LocalizedList
  const locale = asLocale(lang)
  const direct = dict[locale]
  if (direct?.length) return [...direct]

  if (locale === 'ur') return [...(dict.ar || dict.en || dict.hi || [])]
  if (locale === 'hi') return [...(dict.en || dict.ar || dict.ur || [])]
  if (locale === 'ar') return [...(dict.ar || dict.en || [])]
  return [...(dict.en || dict.ar || [])]
}

/** Build a LocalizedString quickly */
export function L(en: string, ar: string, ur?: string, hi?: string): LocalizedString {
  return { en, ar, ...(ur ? { ur } : {}), ...(hi ? { hi } : {}) }
}

export function otherLocales(lang: string): Locale[] {
  const current = asLocale(lang)
  return i18nLocales().filter((l) => l !== current)
}

function i18nLocales(): Locale[] {
  return ['en', 'ar', 'ur', 'hi']
}

export { isLocale, asLocale }
