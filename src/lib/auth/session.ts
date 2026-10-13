import { createClient } from '@/lib/supabase/server'
import type { ProfileRow } from '@/lib/supabase/types'
import type { User } from '@supabase/supabase-js'

export type AuthSession = {
  user: User
  profile: ProfileRow | null
}

export async function getAuthUser(): Promise<User | null> {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getAuthSession(): Promise<AuthSession | null> {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  return { user, profile }
}

export async function requireAdminSession(): Promise<AuthSession | null> {
  const session = await getAuthSession()
  if (!session?.profile || session.profile.role !== 'admin') return null
  return session
}
