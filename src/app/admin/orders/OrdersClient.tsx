'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState, useTransition } from 'react'

interface StatusOption { value: string; label: string }

export default function OrdersClient({
  currentStatus,
  currentSearch,
  statuses,
}: {
  currentStatus: string
  currentSearch: string
  statuses: StatusOption[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [, startTransition] = useTransition()
  const [search, setSearch] = useState(currentSearch)

  function navigate(status: string, q: string) {
    const params = new URLSearchParams()
    if (status !== 'all') params.set('status', status)
    if (q.trim()) params.set('q', q.trim())
    startTransition(() => {
      router.push(`${pathname}${params.toString() ? '?' + params.toString() : ''}`)
    })
  }

  return (
    <div>
      {/* Search */}
      <div style={{ marginBottom: '0.875rem' }}>
        <input
          type="search"
          placeholder="Search by order #, customer name, or phone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') navigate(currentStatus, search) }}
          onBlur={() => navigate(currentStatus, search)}
          style={{
            width: '100%', maxWidth: 420, padding: '0.625rem 1rem',
            border: '1px solid #e5e7eb', borderRadius: 10,
            fontSize: 14, color: '#111827', outline: 'none',
            background: '#fff',
          }}
        />
      </div>

      {/* Status tabs */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {statuses.map((s) => (
          <button
            key={s.value}
            onClick={() => navigate(s.value, search)}
            style={{
              padding: '5px 14px', borderRadius: 20,
              border: '1px solid',
              borderColor: currentStatus === s.value ? '#0d1f17' : '#e5e7eb',
              background: currentStatus === s.value ? '#0d1f17' : '#fff',
              color: currentStatus === s.value ? '#fff' : '#374151',
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}
