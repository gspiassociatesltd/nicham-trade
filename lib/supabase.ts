import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin check - your email gspiassociatesltd@gmail.com is admin
export const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || 'gspiassociatesltd@gmail.com').split(',').map(e=>e.trim().toLowerCase())

export const isAdminEmail = (email?: string|null) => {
  if(!email) return false
  return ADMIN_EMAILS.includes(email.toLowerCase())
}
