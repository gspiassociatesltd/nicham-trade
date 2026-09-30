import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const ADMIN_EMAILS = ['gspiassociatesltd@gmail.com', 'godwinabaniwo@gmail.com']
export const WHATSAPP_NUMBER = '2347050477950'
