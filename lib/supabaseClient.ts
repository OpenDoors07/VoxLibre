// lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js'

// Zmienne środowiskowe z .env.local lub Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Eksport gotowego klienta Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)




