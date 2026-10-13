/**
 * Create the two admin accounts in Supabase Auth + promote profiles.role = admin.
 *
 * Usage (from project root, with env vars set):
 *   node scripts/create-admins.mjs
 *
 * Required env:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Optional overrides:
 *   ADMIN1_EMAIL ADMIN1_PASSWORD ADMIN1_NAME
 *   ADMIN2_EMAIL ADMIN2_PASSWORD ADMIN2_NAME
 */

const { createClient } = require('@supabase/supabase-js')

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const admins = [
  {
    email: process.env.ADMIN1_EMAIL || 'admin@khairaljewargroup.com',
    password: process.env.ADMIN1_PASSWORD || 'KhairAdmin2026!',
    name: process.env.ADMIN1_NAME || 'Site Admin',
  },
  {
    email: process.env.ADMIN2_EMAIL || 'manager@khairaljewargroup.com',
    password: process.env.ADMIN2_PASSWORD || 'KhairManager2026!',
    name: process.env.ADMIN2_NAME || 'Operations Manager',
  },
]

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

async function ensureAdmin(admin) {
  const { data: listed, error: listError } = await supabase.auth.admin.listUsers({ perPage: 1000 })
  if (listError) throw listError

  const existing = listed.users.find((u) => u.email?.toLowerCase() === admin.email.toLowerCase())

  let userId = existing?.id
  if (!userId) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: admin.email,
      password: admin.password,
      email_confirm: true,
      user_metadata: {
        contact_name: admin.name,
        company_name: 'Khair Aljaar Admin',
        full_name: admin.name,
      },
    })
    if (error) throw error
    userId = data.user.id
    console.log(`Created user: ${admin.email}`)
  } else {
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      password: admin.password,
      email_confirm: true,
      user_metadata: {
        contact_name: admin.name,
        company_name: 'Khair Aljaar Admin',
        full_name: admin.name,
      },
    })
    if (error) throw error
    console.log(`Updated existing user: ${admin.email}`)
  }

  // Wait briefly for trigger profile insert, then upsert + promote
  await new Promise((r) => setTimeout(r, 400))

  const { error: upsertError } = await supabase.from('profiles').upsert(
    {
      id: userId,
      email: admin.email,
      company_name: 'Khair Aljaar Admin',
      contact_name: admin.name,
      role: 'admin',
    },
    { onConflict: 'id' }
  )
  if (upsertError) throw upsertError

  console.log(`Promoted to admin: ${admin.email}`)
}

async function main() {
  console.log('Seeding admin accounts…\n')
  for (const admin of admins) {
    await ensureAdmin(admin)
  }
  console.log('\nDone. Admin logins:')
  for (const admin of admins) {
    console.log(`  ${admin.email}  /  ${admin.password}`)
  }
  console.log('\nLogin at: /admin/login  (or /en/login)')
  console.log('Change these passwords after first login.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
