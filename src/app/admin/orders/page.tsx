import { createAdminClient } from '@/lib/supabase/admin'
import AdminShell, { StatusBadge, PayBadge, formatEGP, formatDate } from '@/components/admin/AdminShell'
import Link from 'next/link'
import OrdersClient from './OrdersClient'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Orders' }

const ALL_STATUSES = [
  { value: 'all', label: 'All' },
  { value: 'pending_payment', label: 'Pending Payment' },
  { value: 'paid', label: 'Paid' },
  { value: 'fulfillment', label: 'COD Fulfillment' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'failed', label: 'Failed' },
  { value: 'cancelled', label: 'Cancelled' },
]

interface Props {
  searchParams: { status?: string; q?: string; page?: string }
}

export default async function OrdersPage({ searchParams }: Props) {
  const status = searchParams.status || 'all'
  const search = searchParams.q || ''
  const page = Math.max(1, parseInt(searchParams.page || '1', 10))
  const limit = 20
  const offset = (page - 1) * limit

  const supabase = createAdminClient()
  let query = supabase
    .from('orders')
    .select('id,order_number,status,payment_method,total_egp,customer_name,customer_phone,created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (status !== 'all') query = (query as any).eq('status', status)
  if (search.trim()) {
    query = query.or(
      `order_number.ilike.%${search}%,customer_name.ilike.%${search}%,customer_phone.ilike.%${search}%`
    )
  }

  const { data: orders = [], count = 0 } = await query
  const totalPages = Math.ceil((count ?? 0) / limit)

  return (
    <AdminShell title="Orders">
      {/* Filters */}
      <OrdersClient currentStatus={status} currentSearch={search} statuses={ALL_STATUSES} />

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginTop: '1rem' }}>
        <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 13, color: '#6b7280' }}>
            {count} order{count !== 1 ? 's' : ''} {status !== 'all' ? `• ${status.replace('_', ' ')}` : ''}
          </p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                {['Order #', 'Date', 'Customer', 'Phone', 'Total', 'Payment', 'Status', ''].map((h) => (
                  <th key={h} style={{ padding: '0.625rem 1rem', textAlign: 'left', color: '#6b7280', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(!orders || orders.length === 0) && (
                <tr>
                  <td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>
                    No orders found
                  </td>
                </tr>
              )}
              {(orders ?? []).map((order) => (
                <tr key={order.id} style={{ borderTop: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: 12, whiteSpace: 'nowrap' }}>{order.order_number}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#6b7280', whiteSpace: 'nowrap', fontSize: 12 }}>{formatDate(order.created_at)}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#374151', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.customer_name}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#6b7280', whiteSpace: 'nowrap' }}>{order.customer_phone}</td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#111827', whiteSpace: 'nowrap' }}>{formatEGP(order.total_egp)}</td>
                  <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}><PayBadge method={order.payment_method ?? 'paymob'} /></td>
                  <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}><StatusBadge status={order.status ?? ''} /></td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <Link href={`/admin/orders/${order.id}`} style={{
                      display: 'inline-flex', padding: '4px 12px', borderRadius: 8,
                      background: '#f3f4f6', color: '#374151',
                      fontWeight: 600, textDecoration: 'none', fontSize: 12,
                    }}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid #f3f4f6', display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/admin/orders?status=${status}&q=${search}&page=${p}`}
                style={{
                  width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none',
                  background: p === page ? '#0d1f17' : '#f3f4f6',
                  color: p === page ? '#fff' : '#374151',
                }}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  )
}
