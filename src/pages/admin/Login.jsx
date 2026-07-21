import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../context/AuthContext";
import { isSupabaseConfigured } from "../../lib/supabaseClient";
import "./Login.css";

export default function Login() {
  const { session, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && session) {
    return <Navigate to="/admin" replace />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!isSupabaseConfigured) {
      setErr(
        "Supabase no está configurado todavía en este entorno (faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY)."
      );
      return;
    }

    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);

    if (error) {
      setErr("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="admin-login">
      <Helmet>
        <title>Admin | GP77</title>
      </Helmet>

      <div className="card admin-login__card">
        <h1 className="admin-login__title">Acceso Arquitectos</h1>
        <p className="section-lead admin-login__lead">
          Ingresa con tu cuenta para entrar al panel interno.
        </p>

        <form className="admin-login__form" onSubmit={onSubmit}>
          <input
            className="form-input"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
          <input
            className="form-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {err && <p className="alert-error">{err}</p>}

          <button className="btn-pill admin-login__submit" type="submit" disabled={submitting}>
            {submitting ? "Ingresando…" : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
