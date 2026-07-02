import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

/** Public read client — no cookies, safe for SSG / generateStaticParams. */
export function createAnonClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
