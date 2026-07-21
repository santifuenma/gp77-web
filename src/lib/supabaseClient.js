import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    "[GP77 Admin] Supabase no está configurado todavía. " +
    "Copia .env.example a .env.local y completa VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY."
  );
}

// Con placeholders válidos como URL para que createClient no explote antes
// de tener credenciales reales (Fase A del admin trabaja con datos de ejemplo).
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
