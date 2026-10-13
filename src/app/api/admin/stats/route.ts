import { NextResponse } from 'next/server'
import { denyUnlessAdmin } from '@/lib/auth/admin-guard'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'

export async function GET() {
  const denied = await denyUnlessAdmin()
  if (denied) return denied

  try {
    const supabase = createAdminClient()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [total, revenue, pending, todayOrders, byStatus] = await Promise.all([
      supabase.from('orders').select('id', { count: 'exact', head: true }),
      supabase.from('orders').select('total_egp').in('status', ['paid', 'fulfillment', 'delivered']),
      supabase.from('orders').select('id', { count: 'exact', head: true }).in('status', ['pending_payment', 'fulfillment']),
      supabase.from('orders').select('id', { count: 'exact', head: true }).gte('created_at', today.toISOString()),
      supabase.from('orders').select('status'),
    ])

    const totalRevenue = (revenue.data ?? []).reduce((sum, o) => sum + (Number(o.total_egp) || 0), 0)

    const statusCounts: Record<string, number> = {}
    for (const o of byStatus.data ?? []) {
      statusCounts[o.status] = (statusCounts[o.status] ?? 0) + 1
    }

    return NextResponse.json({
      totalOrders: total.count ?? 0,
      totalRevenue,
      pendingOrders: pending.count ?? 0,
      todayOrders: todayOrders.count ?? 0,
      byStatus: statusCounts,
    })
  } catch (err) {
    console.error('[admin/stats]', err)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
