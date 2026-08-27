import { createClient } from '@supabase/supabase-js'

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabasePublishableKey: string = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string

export const supabase = createClient(supabaseUrl, supabasePublishableKey)