import { createAdminClient } from '@/lib/supabase/admin'
import AdminShell, { StatusBadge, PayBadge, formatEGP, formatDate } from '@/components/admin/AdminShell'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Dashboard' }

async function getStats() {
  try {
    const supabase = createAdminClient()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [all, revenue, pending, todayRes, recent] = await Promise.all([
      supabase.from('orders').select('id', { count: 'exact', head: true }),
      supabase.from('orders').select('total_egp').in('status', ['paid', 'fulfillment', 'delivered']),
      supabase.from('orders').select('id', { count: 'exact', head: true }).in('status', ['pending_payment', 'fulfillment']),
      supabase.from('orders').select('id', { count: 'exact', head: true }).gte('created_at', today.toISOString()),
      supabase.from('orders')
        .select('id,order_number,status,payment_method,total_egp,customer_name,created_at')
        .order('created_at', { ascending: false })
        .limit(8),
    ])

    const totalRevenue = (revenue.data ?? []).reduce((s, o) => s + (Number(o.total_egp) || 0), 0)

    return {
      totalOrders: all.count ?? 0,
      totalRevenue,
      pendingOrders: pending.count ?? 0,
      todayOrders: todayRes.count ?? 0,
      recentOrders: recent.data ?? [],
    }
  } catch {
    return { totalOrders: 0, totalRevenue: 0, pendingOrders: 0, todayOrders: 0, recentOrders: [] }
  }
}

const STATS_CARDS = (s: Awaited<ReturnType<typeof getStats>>) => [
  { label: 'Total Orders', value: s.totalOrders.toLocaleString(), icon: '📦', color: '#1a332a', light: '#d1fae5' },
  { label: 'Total Revenue', value: formatEGP(s.totalRevenue), icon: '💰', color: '#065f46', light: '#a7f3d0' },
  { label: 'Pending Action', value: s.pendingOrders.toLocaleString(), icon: '⏳', color: '#92400e', light: '#fef3c7' },
  { label: "Today's Orders", value: s.todayOrders.toLocaleString(), icon: '📅', color: '#1e40af', light: '#dbeafe' },
]

export default async function AdminDashboard() {
  const stats = await getStats()
  const cards = STATS_CARDS(stats)

  return (
    <AdminShell title="Dashboard">
      {/* Stats grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        {cards.map((c) => (
          <div key={c.label} style={{
            background: '#fff', borderRadius: 16, padding: '1.25rem 1.5rem',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            display: 'flex', flexDirection: 'column', gap: 8,
            borderLeft: `4px solid ${c.light}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {c.label}
              </span>
              <span style={{ fontSize: 22 }}>{c.icon}</span>
            </div>
            <p style={{ fontSize: 26, fontWeight: 800, color: '#111827', lineHeight: 1 }}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>Recent Orders</h2>
          <Link href="/admin/orders" style={{ fontSize: 13, color: '#2a7a5a', fontWeight: 600, textDecoration: 'none' }}>
            View all →
          </Link>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                {['Order', 'Date', 'Customer', 'Total', 'Payment', 'Status', ''].map((h) => (
                  <th key={h} style={{ padding: '0.625rem 1rem', textAlign: 'left', color: '#6b7280', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.length === 0 && (
                <tr><td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>No orders yet</td></tr>
              )}
              {stats.recentOrders.map((order) => (
                <tr key={order.id} style={{ borderTop: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: 12 }}>{order.order_number}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#6b7280', whiteSpace: 'nowrap' }}>{formatDate(order.created_at)}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#374151' }}>{order.customer_name}</td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#111827', whiteSpace: 'nowrap' }}>{formatEGP(order.total_egp)}</td>
                  <td style={{ padding: '0.75rem 1rem' }}><PayBadge method={order.payment_method ?? 'paymob'} /></td>
                  <td style={{ padding: '0.75rem 1rem' }}><StatusBadge status={order.status ?? ''} /></td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <Link href={`/admin/orders/${order.id}`} style={{ color: '#2a7a5a', fontWeight: 600, textDecoration: 'none', fontSize: 12 }}>View →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  )
}
