import { IBM_Plex_Sans_Arabic, Inter, Manrope } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

export const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['500', '600', '700', '800'],
})

export const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-ibm-arabic',
  weight: ['400', '500', '600', '700'],
})

export const fontVariables = `${inter.variable} ${manrope.variable} ${ibmArabic.variable}`
