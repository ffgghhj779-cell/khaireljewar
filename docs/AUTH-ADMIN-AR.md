# Auth & Admin accounts (Supabase)

## Customer pages
- Sign in: `/en/login` or `/ar/login`
- Sign up: `/en/signup` or `/ar/signup`
- Account: `/en/account` or `/ar/account`

## Admin
- Login: `/admin/login`
- Only users with `profiles.role = 'admin'` can open `/admin`

## Create the two admin users

From the project root (with env loaded):

```bash
node scripts/create-admins.mjs
```

Default accounts (change after first login):

| Email | Password |
| --- | --- |
| `admin@khairaljewargroup.com` | `KhairAdmin2026!` |
| `manager@khairaljewargroup.com` | `KhairManager2026!` |

Override via env: `ADMIN1_EMAIL`, `ADMIN1_PASSWORD`, `ADMIN2_EMAIL`, `ADMIN2_PASSWORD`.

Also run SQL migration `supabase/migrations/006_auth_role_guard.sql` in the Supabase SQL editor (role protection + promote by email).

## Supabase Auth setting
In Supabase → Authentication → Providers → Email:
- For easier testing, you can disable **Confirm email** so new signups can log in immediately.
