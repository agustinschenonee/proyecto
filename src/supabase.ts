import { createClient } from '@supabase/supabase-js';

// Datos de tu proyecto ISI-2026-DEVpapois
const supabaseUrl = 'https://wybiblrhcphwuhrmgkhv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5YmlibHJoY3Bod3Vocm1na2h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwOTYxOTUsImV4cCI6MjA4OTY3MjE5NX0.qiBG-FqFhI8IaRqlTT-qb10qHQ2SEJrnZ_Djh49VvyA';

export const supabase = createClient(supabaseUrl, supabaseKey);
