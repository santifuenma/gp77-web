import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { adminTools } from "../../data/adminTools";
import { useAuth } from "../../context/AuthContext";
import "./AdminHub.css";

export default function AdminHub() {
  const { user } = useAuth();

  return (
    <div className="admin-hub">
      <Helmet>
        <title>Admin | GP77</title>
      </Helmet>

      <h1 className="admin-title">Panel de Herramientas</h1>
      <p className="admin-lead">
        {user ? `Hola, ${user.email}. ` : ""}
        Elige una herramienta para empezar.
      </p>

      <div className="admin-hub__grid">
        {adminTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link key={tool.id} to={tool.path} className="admin-hub__tile">
              {Icon && (
                <span className="admin-hub__tile-icon">
                  <Icon fontSize="inherit" />
                </span>
              )}
              <h2 className="admin-hub__tile-title">{tool.title}</h2>
              <p className="admin-hub__tile-desc">{tool.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
