import { createClient } from '@supabase/supabase-js';

// Reemplazá con tus credenciales reales de Supabase
const supabaseUrl = 'https://TU_URL.supabase.co';
const supabaseKey = 'TU_ANON_KEY_LARGA';

export const supabase = createClient(supabaseUrl, supabaseKey);
