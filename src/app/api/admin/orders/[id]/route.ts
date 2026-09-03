import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import type { OrderStatus } from '@/lib/supabase/types'

export const runtime = 'nodejs'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', params.id)
      .single()

    if (error || !data) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    return NextResponse.json(data)
  } catch (err) {
    console.error('[admin/orders/get]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = (await req.json()) as { status?: string; notes?: string }
    const allowed = ['pending_payment', 'paid', 'fulfillment', 'shipped', 'delivered', 'failed', 'cancelled']

    if (body.status && !allowed.includes(body.status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const update: { status?: OrderStatus; paid_at?: string } = {}
    if (body.status) update.status = body.status as OrderStatus
    if (body.status === 'paid') update.paid_at = new Date().toISOString()

    const { data, error } = await supabase
      .from('orders')
      .update(update)
      .eq('id', params.id)
      .select('id,order_number,status')
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (err) {
    console.error('[admin/orders/patch]', err)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}
