import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kilvpwtjycfalhdiskmw.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpbHZwd3RqeWNmYWxoZGlza213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDM3NjEsImV4cCI6MjA3NDIxOTc2MX0.OG5tKozZpucj1FzjpctFMAqGKe1mTr3MarGfR48Y2_w'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)