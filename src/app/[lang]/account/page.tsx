import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Container from '@/components/ui/Container'
import AccountPanel from '@/components/auth/AccountPanel'
import { getAuthSession } from '@/lib/auth/session'
import { buildPageMetadata } from '@/lib/seo'
import { cn } from '@/lib/utils/cn'

export function generateMetadata({ params: { lang } }: { params: { lang: string } }): Metadata {
  const isAr = lang === 'ar'
  return buildPageMetadata({
    lang,
    path: '/account',
    title: isAr ? 'حسابي' : 'My account',
    description: isAr ? 'إدارة حسابك في خير الجوار.' : 'Manage your Khair Aljaar account.',
    noindex: true,
  })
}

export default async function AccountPage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'
  const session = await getAuthSession()
  if (!session) redirect(`/${lang}/login`)

  return (
    <div className="min-h-[70vh] bg-canvas-soft pb-24 pt-10 md:pt-14">
      <Container size="small">
        <h1 className={cn('mb-6 text-2xl font-bold text-primary', isAr ? 'font-arabic' : 'font-display')}>
          {isAr ? 'حسابي' : 'My account'}
        </h1>
        <AccountPanel lang={lang} email={session.user.email ?? ''} profile={session.profile} />
      </Container>
    </div>
  )
}
