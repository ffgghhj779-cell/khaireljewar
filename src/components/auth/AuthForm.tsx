'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils/cn'

type Mode = 'login' | 'signup'

type Props = {
  lang: string
  mode: Mode
}

export default function AuthForm({ lang, mode }: Props) {
  const isAr = lang === 'ar'
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [contactName, setContactName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setInfo('')

    const supabase = createClient()

    try {
      if (mode === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              contact_name: contactName.trim() || null,
              company_name: companyName.trim() || (isAr ? 'عميل جديد' : 'New client'),
              full_name: contactName.trim() || null,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/${lang}/account`,
          },
        })

        if (signUpError) {
          setError(signUpError.message)
          setLoading(false)
          return
        }

        if (data.session) {
          router.replace(`/${lang}/account`)
          router.refresh()
          return
        }

        setInfo(
          isAr
            ? 'تم إنشاء الحساب. راجع بريدك لتأكيد الحساب ثم سجّل الدخول.'
            : 'Account created. Check your email to confirm, then sign in.'
        )
        setLoading(false)
        return
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (signInError) {
        setError(
          isAr
            ? 'بيانات الدخول غير صحيحة أو الحساب غير مفعّل.'
            : 'Invalid credentials or account not confirmed.'
        )
        setLoading(false)
        return
      }

      const userId = data.user?.id
      if (userId) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', userId)
          .maybeSingle()

        if (profile?.role === 'admin') {
          window.location.href = '/admin'
          return
        }
      }

      router.replace(`/${lang}/account`)
      router.refresh()
    } catch {
      setError(isAr ? 'حدث خطأ في الاتصال. حاول مرة أخرى.' : 'Connection error. Try again.')
      setLoading(false)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-primary/15 bg-cream px-4 py-3 text-[15px] text-primary outline-none transition focus:border-farm focus:ring-2 focus:ring-farm/20'

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === 'signup' && (
        <>
          <div>
            <label className={cn('mb-1.5 block text-[12px] font-semibold text-primary/60', isAr ? 'font-arabic' : 'font-sans')}>
              {isAr ? 'الاسم' : 'Full name'}
            </label>
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className={inputClass}
              autoComplete="name"
            />
          </div>
          <div>
            <label className={cn('mb-1.5 block text-[12px] font-semibold text-primary/60', isAr ? 'font-arabic' : 'font-sans')}>
              {isAr ? 'اسم الشركة' : 'Company name'}
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className={inputClass}
              autoComplete="organization"
            />
          </div>
        </>
      )}

      <div>
        <label className={cn('mb-1.5 block text-[12px] font-semibold text-primary/60', isAr ? 'font-arabic' : 'font-sans')}>
          {isAr ? 'البريد الإلكتروني' : 'Email'}
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          autoComplete="email"
          placeholder="name@company.com"
        />
      </div>

      <div>
        <label className={cn('mb-1.5 block text-[12px] font-semibold text-primary/60', isAr ? 'font-arabic' : 'font-sans')}>
          {isAr ? 'كلمة المرور' : 'Password'}
        </label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13px] text-red-700">
          {error}
        </div>
      )}
      {info && (
        <div className="rounded-xl border border-farm/30 bg-farm-mist px-3.5 py-2.5 text-[13px] text-primary">
          {info}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={cn(
          'w-full rounded-xl bg-primary py-3.5 text-[14px] font-bold text-cream transition',
          'hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60',
          isAr ? 'font-arabic' : 'font-sans'
        )}
      >
        {loading
          ? isAr
            ? 'جارٍ…'
            : 'Please wait…'
          : mode === 'signup'
            ? isAr
              ? 'إنشاء حساب'
              : 'Create account'
            : isAr
              ? 'تسجيل الدخول'
              : 'Sign in'}
      </button>

      <p className={cn('pt-1 text-center text-[13px] text-primary/55', isAr ? 'font-arabic' : 'font-sans')}>
        {mode === 'login' ? (
          <>
            {isAr ? 'ليس لديك حساب؟' : 'No account yet?'}{' '}
            <Link href={`/${lang}/signup`} className="font-semibold text-farm hover:underline">
              {isAr ? 'إنشاء حساب' : 'Sign up'}
            </Link>
          </>
        ) : (
          <>
            {isAr ? 'لديك حساب؟' : 'Already have an account?'}{' '}
            <Link href={`/${lang}/login`} className="font-semibold text-farm hover:underline">
              {isAr ? 'تسجيل الدخول' : 'Sign in'}
            </Link>
          </>
        )}
      </p>
    </form>
  )
}
