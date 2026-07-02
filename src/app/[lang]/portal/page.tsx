import PortalDashboard from '@/components/portal/PortalDashboard'

export default function PortalPage({ params: { lang } }: { params: { lang: string } }) {
  return <PortalDashboard lang={lang} />
}
