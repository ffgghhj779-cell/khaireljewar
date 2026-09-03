import fs from 'fs'
import { createClient } from '@supabase/supabase-js'

for (const line of fs.readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
  const m = line.match(/^([^#=]+)=(.*)$/)
  if (m) process.env[m[1].trim()] = m[2].trim().replace(/^"|"$/g, '')
}

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const orders = await sb.from('orders').select('id').limit(1)
const products = await sb
  .from('products')
  .select('slug, retail_price_egp, consumer_unit_ar')
  .order('slug')

console.log('orders table:', orders.error ? orders.error.message : 'OK')
console.log('products with retail prices:')
if (products.error) console.log(products.error.message)
else {
  for (const p of products.data ?? []) {
    console.log(`  ${p.slug}: ${p.retail_price_egp ?? 'NULL'} EGP (${p.consumer_unit_ar ?? '-'})`)
  }
}
