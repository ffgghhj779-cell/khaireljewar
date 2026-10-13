import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import AuthCard from '@/components/auth/AuthCard'
import AuthForm from '@/components/auth/AuthForm'
import { getAuthUser } from '@/lib/auth/session'
import { buildPageMetadata } from '@/lib/seo'
import { isSupabaseConfigured } from '@/lib/supabase/env'

export function generateMetadata({ params: { lang } }: { params: { lang: string } }): Metadata {
  const isAr = lang === 'ar'
  return buildPageMetadata({
    lang,
    path: '/login',
    title: isAr ? 'تسجيل الدخول' : 'Sign in',
    description: isAr ? 'سجّل الدخول إلى حساب خير الجوار.' : 'Sign in to your Khair Aljaar account.',
    noindex: true,
  })
}

export default async function LoginPage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'

  if (!isSupabaseConfigured()) {
    return (
      <AuthCard
        lang={lang}
        title={isAr ? 'تسجيل الدخول' : 'Sign in'}
        subtitle={isAr ? 'نظام الحسابات غير مفعّل حالياً.' : 'Account system is not configured yet.'}
      >
        <p className="text-[14px] text-primary/60">
          {isAr
            ? 'أضف إعدادات Supabase ثم أعد تشغيل الموقع.'
            : 'Add Supabase environment variables and restart the site.'}
        </p>
      </AuthCard>
    )
  }

  const user = await getAuthUser()
  if (user) redirect(`/${lang}/account`)

  return (
    <AuthCard
      lang={lang}
      title={isAr ? 'تسجيل الدخول' : 'Sign in'}
      subtitle={isAr ? 'ادخل ببريدك وكلمة المرور.' : 'Use your email and password.'}
    >
      <AuthForm lang={lang} mode="login" />
    </AuthCard>
  )
}
