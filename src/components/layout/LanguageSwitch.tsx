'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Check, ChevronDown, Globe } from 'lucide-react'
import {
  i18n,
  localeMarkets,
  localeNames,
  localeShort,
  type Locale,
} from '@/lib/i18n/config'
import { asLocale, isRtl, localeFontClass, tx } from '@/lib/i18n/localize'
import { UI } from '@/lib/i18n/ui'
import { cn } from '@/lib/utils/cn'

type LanguageSwitchVariant = 'default' | 'toolbar' | 'menu'

interface LanguageSwitchProps {
  lang: string
  className?: string
  variant?: LanguageSwitchVariant
  showIcon?: boolean
}

function swapLocalePath(pathname: string | null, from: string, to: Locale) {
  if (!pathname) return `/${to}`
  if (pathname === `/${from}` || pathname.startsWith(`/${from}/`)) {
    return pathname.replace(`/${from}`, `/${to}`)
  }
  return `/${to}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}

export default function LanguageSwitch({
  lang,
  className,
  variant = 'default',
  showIcon = true,
}: LanguageSwitchProps) {
  const pathname = usePathname()
  const current = asLocale(lang)
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const rtl = isRtl(current)

  useEffect(() => {
    if (!open) return
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className={cn('relative z-[102] shrink-0', className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={tx(current, UI.a11y.chooseLanguage)}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'relative flex items-center justify-center gap-1.5 touch-manipulation font-semibold transition-colors',
          variant === 'default' && [
            'min-h-[40px] px-3.5 rounded-full',
            'text-dark bg-white border border-dark/10',
            'hover:border-primary/40 hover:text-primary active:scale-95',
          ],
          variant === 'toolbar' && [
            'h-10 min-w-[48px] px-3',
            'text-primary bg-transparent',
            'hover:bg-primary/8 active:scale-95',
          ],
          variant === 'menu' && [
            'min-h-[40px] px-4 rounded-full',
            'text-primary bg-white border border-primary/15',
            'hover:border-primary/40 active:scale-95',
          ],
          localeFontClass(current),
          current === 'en' ? 'text-xs tracking-wide' : 'text-sm'
        )}
      >
        {showIcon && (
          <Globe
            className={cn('w-3.5 h-3.5', variant === 'toolbar' ? 'text-primary/60' : 'text-dark/50')}
            aria-hidden
          />
        )}
        <span>{localeShort[current]}</span>
        <ChevronDown
          className={cn('w-3.5 h-3.5 opacity-60 transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open && (
        <div
          id={menuId}
          role="listbox"
          aria-label={tx(current, UI.cta.switchLanguage)}
          className={cn(
            'absolute top-[calc(100%+0.5rem)] z-[110] min-w-[13.5rem] overflow-hidden rounded-2xl border border-primary/10 bg-white py-1.5 shadow-[0_18px_40px_-20px_rgba(26,51,42,0.45)]',
            rtl ? 'start-0' : 'end-0'
          )}
        >
          {i18n.locales.map((locale) => {
            const active = locale === current
            const href = swapLocalePath(pathname, current, locale)
            return (
              <Link
                key={locale}
                href={href}
                role="option"
                aria-selected={active}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-2.5 transition-colors',
                  active ? 'bg-primary/8 text-primary' : 'text-primary/80 hover:bg-primary/5 hover:text-primary',
                  localeFontClass(locale)
                )}
              >
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-sm font-semibold leading-none">{localeNames[locale]}</span>
                  <span className="text-[11px] font-medium text-primary/45">{localeMarkets[locale]}</span>
                </span>
                {active && <Check className="h-4 w-4 shrink-0 text-farm" aria-hidden />}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
