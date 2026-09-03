import fs from 'fs'
import dns from 'dns/promises'
import { Client } from 'pg'

const sql = fs.readFileSync('supabase/SETUP_NEW_PROJECT.sql', 'utf8')
const password = process.env.SUPABASE_DB_PASSWORD
if (!password) {
  console.error('Missing SUPABASE_DB_PASSWORD')
  process.exit(1)
}

dns.setServers(['8.8.8.8', '1.1.1.1'])

const regions = [
  'eu-west-1',
  'eu-west-2',
  'eu-west-3',
  'eu-central-1',
  'eu-central-2',
  'eu-north-1',
  'us-east-1',
  'us-east-2',
  'us-west-1',
  'us-west-2',
  'ap-southeast-1',
  'ap-south-1',
  'ap-northeast-1',
]

const configs = []

// Direct IPv6
try {
  const aaaa = await dns.resolve6('db.xngflcegntxcipnwggcs.supabase.co')
  console.log('AAAA', aaaa)
  for (const ip of aaaa) {
    configs.push({
      host: ip,
      port: 5432,
      user: 'postgres',
      database: 'postgres',
      password,
      ssl: { rejectUnauthorized: false },
      label: `ipv6:${ip}`,
    })
  }
} catch (e) {
  console.log('no AAAA via node dns', e.message)
}

for (const region of regions) {
  for (const port of [6543, 5432]) {
    configs.push({
      host: `aws-0-${region}.pooler.supabase.com`,
      port,
      user: 'postgres.xngflcegntxcipnwggcs',
      database: 'postgres',
      password,
      ssl: { rejectUnauthorized: false },
      label: `pooler:${region}:${port}`,
    })
  }
}

for (const cfg of configs) {
  const label = cfg.label || `${cfg.host}:${cfg.port}`
  const client = new Client({
    host: cfg.host,
    port: cfg.port,
    user: cfg.user,
    database: cfg.database,
    password: cfg.password,
    ssl: cfg.ssl,
    connectionTimeoutMillis: 8000,
  })
  try {
    await client.connect()
    console.log('CONNECTED', label)
    await client.query(sql)
    console.log('SQL_OK')
    const products = await client.query(
      'select slug, title_en from public.products order by sort_order'
    )
    console.log('PRODUCTS', JSON.stringify(products.rows))
    const bucket = await client.query(
      "select id, public from storage.buckets where id = 'product-images'"
    )
    console.log('BUCKET', JSON.stringify(bucket.rows))
    await client.end()
    process.exit(0)
  } catch (err) {
    console.log('FAIL', label, err.message.split('\n')[0])
    try {
      await client.end()
    } catch {
      // ignore
    }
  }
}

process.exit(1)
