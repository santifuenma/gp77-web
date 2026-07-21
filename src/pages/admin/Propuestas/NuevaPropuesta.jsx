import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ProposalForm from "../../../components/admin/ProposalForm/ProposalForm";
import "./NuevaPropuesta.css";

export default function NuevaPropuesta() {
  return (
    <main>
      <Helmet>
        <title>Nueva Propuesta | Admin GP77</title>
      </Helmet>

      <Link to="/admin/propuestas" className="nueva-propuesta__back">
        ← Volver a propuestas
      </Link>

      <h1 className="admin-title nueva-propuesta__title">Nueva Propuesta</h1>
      <p className="admin-lead nueva-propuesta__lead">
        Ingresa los datos del cliente, agrega una línea por cada zona con
        grietas y el sistema calculará el presupuesto automáticamente.
      </p>

      <ProposalForm />
    </main>
  );
}
