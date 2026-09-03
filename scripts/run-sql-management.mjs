import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

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

const token = (process.env.SUPABASE_ACCESS_TOKEN || '').trim()
const projectRef = 'xngflcegntxcipnwggcs'
if (!token) {
  console.error('Missing SUPABASE_ACCESS_TOKEN in .env.local')
  process.exit(1)
}

const sql = fs.readFileSync(join(root, 'supabase/migrations/005_ecommerce_paymob.sql'), 'utf8')

const res = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: sql }),
})

const text = await res.text()
if (!res.ok) {
  console.error('SQL failed', res.status, text.slice(0, 800))
  process.exit(1)
}
console.log('Migration applied via Management API')
console.log(text.slice(0, 400))
