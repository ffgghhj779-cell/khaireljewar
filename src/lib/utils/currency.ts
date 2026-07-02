export type CurrencyCode = 'USD' | 'EUR' | 'AED' | 'EGP'

export const CURRENCIES: { code: CurrencyCode; symbol: string; label: { en: string; ar: string } }[] = [
  { code: 'USD', symbol: '$', label: { en: 'US Dollar', ar: 'دولار أمريكي' } },
  { code: 'EUR', symbol: '€', label: { en: 'Euro', ar: 'يورو' } },
  { code: 'AED', symbol: 'د.إ', label: { en: 'UAE Dirham', ar: 'درهم إماراتي' } },
  { code: 'EGP', symbol: 'ج.م', label: { en: 'Egyptian Pound', ar: 'جنيه مصري' } },
]

/** Static indicative rates vs USD for B2B display */
const RATES: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  AED: 3.67,
  EGP: 50.5,
}

export function convertFromUsd(amountUsd: number, to: CurrencyCode): number {
  return amountUsd * RATES[to]
}

export function formatCurrency(amount: number, currency: CurrencyCode, locale = 'en'): string {
  const info = CURRENCIES.find((c) => c.code === currency)!
  if (currency === 'AED' || currency === 'EGP') {
    return `${info.symbol} ${amount.toLocaleString(locale === 'ar' ? 'ar-EG' : 'en-US', { maximumFractionDigits: 0 })}`
  }
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function parsePricePerMt(priceStr: string): number {
  const match = priceStr.match(/[\d,]+/)
  return match ? parseInt(match[0].replace(/,/g, ''), 10) : 0
}
