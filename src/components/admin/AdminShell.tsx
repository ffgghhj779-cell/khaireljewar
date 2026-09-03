'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '◈' },
  { href: '/admin/orders', label: 'Orders', icon: '◫' },
]

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

export function formatEGP(amount: number) {
  return `EGP ${Number(amount).toLocaleString('en-EG', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-EG', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function AdminShell({ children, title }: { children: React.ReactNode; title: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  async function logout() {
    setLoggingOut(true)
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0ede6' }}>
      {/* Sidebar */}
      <aside style={{
        width: 220, flexShrink: 0,
        background: 'linear-gradient(180deg, #0d1f17 0%, #0a1810 100%)',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
      }}>
        {/* Brand */}
        <div style={{ padding: '1.5rem 1.25rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'linear-gradient(135deg, #2a7a5a, #1a4f38)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, flexShrink: 0,
            }}>🌿</div>
            <div>
              <p style={{ color: '#e8f0eb', fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>Khair Aljaar</p>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Admin</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: '0.75rem 0.75rem', flex: 1 }}>
          {NAV.map((item) => {
            const active = item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href)
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '0.625rem 0.875rem', borderRadius: 10,
                marginBottom: 4,
                background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: active ? '#e8f0eb' : 'rgba(255,255,255,0.45)',
                textDecoration: 'none', fontSize: 13, fontWeight: active ? 600 : 400,
                transition: 'all 0.15s',
              }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                {item.label}
                {active && <span style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: '#4ade80' }} />}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <button
            onClick={logout}
            disabled={loggingOut}
            style={{
              width: '100%', padding: '0.625rem', borderRadius: 10,
              background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.2)',
              color: '#fca5a5', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            {loggingOut ? 'Signing out…' : '→  Sign out'}
          </button>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 10, textAlign: 'center', marginTop: 12 }}>
            Khair Aljaar Group © {new Date().getFullYear()}
          </p>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <header style={{
          background: '#fff',
          borderBottom: '1px solid #e5e7eb',
          padding: '0 1.5rem',
          height: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          <h1 style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>{title}</h1>
          <a
            href="https://khairaljewargroup.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 12, color: '#6b7280', textDecoration: 'none' }}
          >
            ↗ View site
          </a>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: '1.5rem', overflowX: 'hidden' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
