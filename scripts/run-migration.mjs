import fs from 'fs'
import pg from 'pg'

const projectRef = 'wmjfvijkgsjqlpfjcioy'
const passFile = new URL('./.db-pass.tmp', import.meta.url)
const password = fs.readFileSync(passFile, 'utf8').trim()

const ensureUpdatedAt = `CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$;`

const migrationSql = fs.readFileSync('supabase/migrations/005_ecommerce_paymob.sql', 'utf8')

const client = new pg.Client({
  host: 'aws-1-eu-central-1.pooler.supabase.com',
  port: 5432,
  user: `postgres.${projectRef}`,
  password,
  database: 'postgres',
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 30000,
})

try {
  console.log('Connecting...')
  await client.connect()
  console.log('Connected. Running migration...')
  await client.query(ensureUpdatedAt)
  await client.query(migrationSql)
  console.log('Migration OK')
} finally {
  await client.end()
  if (fs.existsSync(passFile)) fs.unlinkSync(passFile)
}
