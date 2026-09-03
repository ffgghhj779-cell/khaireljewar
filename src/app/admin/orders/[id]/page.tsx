import { createAdminClient } from '@/lib/supabase/admin'
import AdminShell, { StatusBadge, PayBadge, formatEGP, formatDate } from '@/components/admin/AdminShell'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import OrderActions from './OrderActions'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { id: string } }) {
  return { title: `Order ${params.id.slice(0, 8)}` }
}

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const supabase = createAdminClient()
  const { data: order } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', params.id)
    .single()

  if (!order) return notFound()

  const items = (order.order_items as Array<Record<string, unknown>>) ?? []

  return (
    <AdminShell title={`Order ${order.order_number}`}>
      <div style={{ display: 'flex', gap: 12, marginBottom: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link href="/admin/orders" style={{ fontSize: 13, color: '#6b7280', textDecoration: 'none' }}>← Back to Orders</Link>
        <StatusBadge status={order.status ?? ''} />
        <PayBadge method={order.payment_method ?? 'paymob'} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: '1.25rem', alignItems: 'start' }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minWidth: 0 }}>
          {/* Customer info */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '1.25rem 1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: '1rem', paddingBottom: '0.625rem', borderBottom: '1px solid #f3f4f6' }}>
              Customer Information
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
              <Info label="Name" value={order.customer_name} />
              <Info label="Phone" value={order.customer_phone} link={`tel:${order.customer_phone}`} />
              <Info label="Email" value={order.customer_email} link={`mailto:${order.customer_email}`} />
              <Info label="Governorate" value={order.shipping_governorate} />
              <Info label="City" value={order.shipping_city} />
              <Info label="Street" value={order.shipping_street} />
              {order.customer_notes && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <Info label="Notes" value={order.customer_notes} />
                </div>
              )}
            </div>
          </div>

          {/* Order items */}
          <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111827', padding: '1rem 1.5rem', borderBottom: '1px solid #f3f4f6' }}>
              Items ({items.length})
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f9fafb' }}>
                  {['Product', 'Unit', 'Qty', 'Unit Price', 'Total'].map((h) => (
                    <th key={h} style={{ padding: '0.625rem 1.25rem', textAlign: 'left', color: '#6b7280', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} style={{ borderTop: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '0.75rem 1.25rem', fontWeight: 600, color: '#111827' }}>{String(item.title_en ?? item.title_ar ?? item.product_slug)}</td>
                    <td style={{ padding: '0.75rem 1.25rem', color: '#6b7280' }}>{String(item.unit_label_en ?? '')}</td>
                    <td style={{ padding: '0.75rem 1.25rem', fontWeight: 700 }}>{String(item.quantity ?? 1)}</td>
                    <td style={{ padding: '0.75rem 1.25rem', color: '#6b7280' }}>{formatEGP(Number(item.unit_price_egp ?? 0))}</td>
                    <td style={{ padding: '0.75rem 1.25rem', fontWeight: 700, color: '#111827' }}>{formatEGP(Number(item.line_total_egp ?? 0))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Order summary */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>Summary</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
              <Row label="Order #" value={order.order_number} mono />
              <Row label="Date" value={formatDate(order.created_at)} />
              <Row label="Subtotal" value={formatEGP(order.subtotal_egp)} />
              <Row label="Shipping" value={formatEGP(order.shipping_egp)} />
              <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 8 }}>
                <Row label="Total" value={formatEGP(order.total_egp)} bold />
              </div>
              {order.paid_at && <Row label="Paid at" value={formatDate(order.paid_at)} />}
              {order.paymob_transaction_id && <Row label="Transaction" value={String(order.paymob_transaction_id)} mono />}
            </div>
          </div>

          {/* Status actions */}
          <OrderActions orderId={order.id} currentStatus={order.status ?? 'pending_payment'} />
        </div>
      </div>
    </AdminShell>
  )
}

function Info({ label, value, link }: { label: string; value: string; link?: string }) {
  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{label}</p>
      {link ? (
        <a href={link} style={{ fontSize: 14, color: '#2a7a5a', fontWeight: 500, textDecoration: 'none' }}>{value}</a>
      ) : (
        <p style={{ fontSize: 14, color: '#111827', fontWeight: 500 }}>{value || '—'}</p>
      )}
    </div>
  )
}

function Row({ label, value, bold, mono }: { label: string; value: string; bold?: boolean; mono?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
      <span style={{ color: '#6b7280', fontSize: 13 }}>{label}</span>
      <span style={{
        color: '#111827', fontSize: 13,
        fontWeight: bold ? 800 : 500,
        fontFamily: mono ? 'monospace' : 'inherit',
        textAlign: 'right',
      }}>{value}</span>
    </div>
  )
}
