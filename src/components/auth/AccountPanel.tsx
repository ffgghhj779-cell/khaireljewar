'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils/cn'
import type { ProfileRow } from '@/lib/supabase/types'

export default function AccountPanel({
  lang,
  email,
  profile,
}: {
  lang: string
  email: string
  profile: ProfileRow | null
}) {
  const isAr = lang === 'ar'
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const isAdmin = profile?.role === 'admin'

  async function logout() {
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace(`/${lang}/login`)
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-primary/10 bg-cream p-6">
        <p className={cn('text-[12px] font-semibold uppercase tracking-wide text-primary/45', isAr ? 'font-arabic' : 'font-sans')}>
          {isAr ? 'الحساب' : 'Account'}
        </p>
        <p className={cn('mt-2 text-lg font-bold text-primary', isAr ? 'font-arabic' : 'font-display')}>
          {profile?.contact_name || profile?.company_name || email}
        </p>
        <p className="mt-1 text-[14px] text-primary/60">{email}</p>
        {profile?.company_name && (
          <p className={cn('mt-3 text-[14px] text-primary/70', isAr ? 'font-arabic' : 'font-sans')}>
            {isAr ? 'الشركة:' : 'Company:'} {profile.company_name}
          </p>
        )}
        <p className="mt-2 inline-flex rounded-lg bg-farm-mist px-2.5 py-1 text-[12px] font-semibold text-primary">
          {isAdmin ? (isAr ? 'مدير' : 'Admin') : isAr ? 'عميل' : 'Client'}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        {isAdmin && (
          <Link
            href="/admin"
            className={cn(
              'inline-flex flex-1 items-center justify-center rounded-xl bg-primary px-4 py-3 text-[14px] font-bold text-cream',
              isAr ? 'font-arabic' : 'font-sans'
            )}
          >
            {isAr ? 'لوحة الإدارة' : 'Admin panel'}
          </Link>
        )}
        <Link
          href={`/${lang}/products`}
          className={cn(
            'inline-flex flex-1 items-center justify-center rounded-xl border border-primary/15 px-4 py-3 text-[14px] font-semibold text-primary hover:bg-primary/5',
            isAr ? 'font-arabic' : 'font-sans'
          )}
        >
          {isAr ? 'تصفح المنتجات' : 'Browse products'}
        </Link>
        <button
          type="button"
          onClick={logout}
          disabled={loading}
          className={cn(
            'inline-flex flex-1 items-center justify-center rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] font-semibold text-red-700 disabled:opacity-60',
            isAr ? 'font-arabic' : 'font-sans'
          )}
        >
          {loading ? (isAr ? 'جارٍ الخروج…' : 'Signing out…') : isAr ? 'تسجيل الخروج' : 'Sign out'}
        </button>
      </div>
    </div>
  )
}
