import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL'; // e.g., https://your-project-id.supabase.co
const supabaseKey = 'YOUR_ANON_PUBLIC_KEY'; // e.g., eyJhb...

export const supabase = createClient(supabaseUrl, supabaseKey);