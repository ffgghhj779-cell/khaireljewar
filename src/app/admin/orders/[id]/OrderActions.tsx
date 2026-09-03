'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Status = 'pending_payment' | 'paid' | 'fulfillment' | 'delivered' | 'failed' | 'cancelled'

const TRANSITIONS: Record<string, { label: string; next: Status; color: string; bg: string }[]> = {
  pending_payment: [
    { label: '✅ Mark as Paid', next: 'paid', color: '#065f46', bg: '#d1fae5' },
    { label: '✖ Cancel Order', next: 'cancelled', color: '#991b1b', bg: '#fee2e2' },
  ],
  paid: [
    { label: '🚚 Mark as Delivered', next: 'delivered', color: '#065f46', bg: '#d1fae5' },
    { label: '✖ Cancel Order', next: 'cancelled', color: '#991b1b', bg: '#fee2e2' },
  ],
  fulfillment: [
    { label: '🚚 Mark as Delivered', next: 'delivered', color: '#065f46', bg: '#d1fae5' },
    { label: '✖ Cancel Order', next: 'cancelled', color: '#991b1b', bg: '#fee2e2' },
  ],
  delivered: [],
  failed: [
    { label: '↩ Reopen (Pending)', next: 'pending_payment', color: '#92400e', bg: '#fef3c7' },
  ],
  cancelled: [
    { label: '↩ Reopen (Pending)', next: 'pending_payment', color: '#92400e', bg: '#fef3c7' },
  ],
}

export default function OrderActions({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')
  const router = useRouter()

  const actions = TRANSITIONS[currentStatus] ?? []

  async function updateStatus(next: Status) {
    setLoading(next)
    setError('')
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error ?? 'Update failed')
      }
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: '0.875rem' }}>Update Status</h2>

      {actions.length === 0 && (
        <p style={{ fontSize: 13, color: '#9ca3af' }}>No actions available for this status.</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {actions.map((a) => (
          <button
            key={a.next}
            onClick={() => updateStatus(a.next)}
            disabled={!!loading}
            style={{
              width: '100%', padding: '0.625rem 1rem',
              border: `1px solid ${a.bg}`,
              borderRadius: 10, cursor: loading ? 'not-allowed' : 'pointer',
              background: loading === a.next ? '#f3f4f6' : a.bg,
              color: a.color, fontSize: 13, fontWeight: 700,
              opacity: loading && loading !== a.next ? 0.5 : 1,
              transition: 'all 0.15s',
            }}
          >
            {loading === a.next ? 'Updating…' : a.label}
          </button>
        ))}
      </div>

      {error && (
        <p style={{ marginTop: 10, fontSize: 12, color: '#ef4444', padding: '0.5rem', background: '#fee2e2', borderRadius: 8 }}>
          {error}
        </p>
      )}
    </div>
  )
}
