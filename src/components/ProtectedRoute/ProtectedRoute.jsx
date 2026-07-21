import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { isSupabaseConfigured } from "../../lib/supabaseClient";

export default function ProtectedRoute() {
  const { session, loading } = useAuth();

  // Fase A: sin proyecto de Supabase todavía nadie puede loguearse, así
  // que exigir sesión dejaría estas pantallas imposibles de probar. En
  // cuanto VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY existan, el chequeo
  // de sesión de abajo vuelve a aplicar sin cambiar nada de este archivo.
  if (!isSupabaseConfigured) {
    return <Outlet />;
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-text-soft)",
          fontFamily: "var(--font-primary)",
        }}
      >
        Cargando…
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
