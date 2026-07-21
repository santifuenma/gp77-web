import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";
import logo from "../assets/img/LogoGP.png";
import "../styles/admin-tokens.css";
import "./AdminLayout.css";

function AdminHeader() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <header className="admin-header">
      <Link to="/admin" className="admin-header__brand">
        <img src={logo} alt="GP77" className="admin-header__logo" />
        <span>Admin</span>
      </Link>

      {user && (
        <div className="admin-header__user">
          <span className="admin-header__email">{user.email}</span>
          <button
            type="button"
            className="admin-btn admin-btn--secondary admin-header__signout"
            onClick={handleSignOut}
          >
            Salir
          </button>
        </div>
      )}
    </header>
  );
}

export default function AdminLayout() {
  return (
    <AuthProvider>
      <div className="admin-shell">
        <AdminHeader />
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
}
