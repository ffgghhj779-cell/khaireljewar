'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Invalid credentials')
        setLoading(false)
        return
      }
      router.push('/admin/orders')
    } catch {
      setError('Connection error. Try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1610 0%, #0f2218 50%, #0a1610 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
    }}>
      {/* Subtle grid overlay */}
      <div style={{
        position: 'fixed', inset: 0, opacity: 0.03,
        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%', maxWidth: 400,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: '2.5rem 2rem',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
      }}>
        {/* Logo mark */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 56, height: 56, borderRadius: 14,
            background: 'linear-gradient(135deg, #2a7a5a, #1a4f38)',
            marginBottom: '1rem',
            boxShadow: '0 8px 24px rgba(42,122,90,0.4)',
          }}>
            {/* Leaf SVG */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6 2 3 7 3 12c0 3 1.5 5.5 4 7l1-4c-1.5-1-2.5-2.5-2.5-4 0-3 2-5 5-5 1.5 0 3 .5 4 1.5L12 12l6-6C16.5 3.5 14.5 2 12 2z" fill="rgba(255,255,255,0.9)" />
              <path d="M16 10l-4 4-2 6c2 .5 4 .5 6-.5 3-1.5 5-4.5 5-8 0-1-.2-2-.5-3L16 10z" fill="rgba(255,255,255,0.6)" />
            </svg>
          </div>
          <p style={{ color: '#e8f0eb', fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>
            Khair Aljaar
          </p>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, fontWeight: 500, marginTop: 4 }}>
            ADMIN PANEL
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
              Admin Password
            </label>
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: '100%', padding: '0.875rem 1rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 10, color: '#fff', fontSize: 15,
                outline: 'none', transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(42,122,90,0.7)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)',
              borderRadius: 8, padding: '0.625rem 0.875rem',
              color: '#fca5a5', fontSize: 13, marginBottom: '1.25rem',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '0.875rem',
              background: loading ? 'rgba(42,122,90,0.5)' : 'linear-gradient(135deg, #2a7a5a, #1a4f38)',
              border: 'none', borderRadius: 10,
              color: '#fff', fontSize: 14, fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.2s, transform 0.1s',
              letterSpacing: '0.01em',
              boxShadow: loading ? 'none' : '0 4px 20px rgba(42,122,90,0.35)',
            }}
          >
            {loading ? 'Authenticating…' : 'Sign In →'}
          </button>
        </form>

        <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: 11, textAlign: 'center', marginTop: '1.5rem' }}>
          Secured connection • Admin access only
        </p>
      </div>
    </div>
  )
}
