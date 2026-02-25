import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('[Supabase] Faltan VITE_SUPABASE_URL o VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY en .env')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
