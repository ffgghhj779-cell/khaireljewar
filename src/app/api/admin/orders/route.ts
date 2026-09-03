import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') || 'all'
    const search = searchParams.get('q') || ''
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
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

    const { data, error, count } = await query
    if (error) throw error

    return NextResponse.json({ orders: data ?? [], total: count ?? 0, page, limit })
  } catch (err) {
    console.error('[admin/orders]', err)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}
