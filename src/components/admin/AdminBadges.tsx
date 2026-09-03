const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  pending_payment: { bg: '#fef3c7', text: '#92400e', label: 'Pending Payment' },
  paid:            { bg: '#d1fae5', text: '#065f46', label: 'Paid' },
  fulfillment:     { bg: '#dbeafe', text: '#1e40af', label: 'COD – Fulfillment' },
  delivered:       { bg: '#d1fae5', text: '#065f46', label: 'Delivered ✓' },
  failed:          { bg: '#fee2e2', text: '#991b1b', label: 'Failed' },
  cancelled:       { bg: '#f3f4f6', text: '#374151', label: 'Cancelled' },
}

export function StatusBadge({ status }: { status: string }) {
  const s = STATUS_COLORS[status] ?? { bg: '#f3f4f6', text: '#374151', label: status }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 20,
      background: s.bg, color: s.text,
      fontSize: 12, fontWeight: 600,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.text, opacity: 0.6 }} />
      {s.label}
    </span>
  )
}

export function PayBadge({ method }: { method: string }) {
  const isCod = method === 'cod'
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: 20,
      background: isCod ? '#fef9c3' : '#e0f2fe',
      color: isCod ? '#713f12' : '#0c4a6e',
      fontSize: 12, fontWeight: 600,
    }}>
      {isCod ? '💵 COD' : '💳 Paymob'}
    </span>
  )
}
