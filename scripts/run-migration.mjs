import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import pg from 'pg'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const envPath = join(root, '.env.local')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (m && process.env[m[1].trim()] == null) {
      process.env[m[1].trim()] = m[2].trim().replace(/^"|"$/g, '')
    }
  }
}

const projectRef = 'xngflcegntxcipnwggcs'
const passFile = join(root, 'scripts', '.db-pass.tmp')
const password = (
  process.env.SUPABASE_DB_PASSWORD ||
  (fs.existsSync(passFile) ? fs.readFileSync(passFile, 'utf8') : '')
).trim()

if (!password) {
  console.error('Missing database password. Set SUPABASE_DB_PASSWORD in .env.local')
  process.exit(1)
}

const migrationSql = fs.readFileSync(join(root, 'supabase/migrations/005_ecommerce_paymob.sql'), 'utf8')

const attempts = [
  { host: 'aws-1-eu-central-1.pooler.supabase.com', port: 5432, user: `postgres.${projectRef}` },
  { host: 'aws-1-eu-central-1.pooler.supabase.com', port: 6543, user: `postgres.${projectRef}` },
  { host: 'aws-0-eu-central-1.pooler.supabase.com', port: 5432, user: `postgres.${projectRef}` },
  { host: 'aws-0-eu-central-1.pooler.supabase.com', port: 6543, user: `postgres.${projectRef}` },
  { host: `db.${projectRef}.supabase.co`, port: 5432, user: 'postgres' },
]

let lastError = null
for (const cfg of attempts) {
  const client = new pg.Client({
    ...cfg,
    password,
    database: 'postgres',
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 12000,
  })
  try {
    console.log(`Connecting ${cfg.host}:${cfg.port} as ${cfg.user}...`)
    await client.connect()
    console.log('Connected. Running migration...')
    await client.query(migrationSql)
    const check = await client.query(`
      SELECT column_name FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'products' AND column_name = 'retail_price_egp'
    `)
    const orders = await client.query(`SELECT to_regclass('public.orders') AS orders`)
    const prices = await client.query(
      `SELECT slug, retail_price_egp, consumer_unit_ar FROM public.products ORDER BY slug`
    )
    console.log('Migration OK')
    console.log('orders table:', orders.rows[0].orders ? 'OK' : 'MISSING')
    console.log('retail_price_egp column:', check.rowCount ? 'OK' : 'MISSING')
    for (const p of prices.rows) {
      console.log(`  ${p.slug}: ${p.retail_price_egp ?? 'NULL'} EGP (${p.consumer_unit_ar ?? '-'})`)
    }
    await client.end()
    process.exit(0)
  } catch (err) {
    lastError = err
    console.log('FAIL', err.message.split('\n')[0])
    try {
      await client.end()
    } catch {
      // ignore
    }
  }
}

console.error('Could not run migration:', lastError?.message)
process.exit(1)
