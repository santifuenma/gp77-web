import React from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ProposalForm from "../../../components/admin/ProposalForm/ProposalForm";
import "./NuevaPropuesta.css";

export default function EditarPropuesta() {
  const { id } = useParams();

  return (
    <main>
      <Helmet>
        <title>Editar Propuesta | Admin GP77</title>
      </Helmet>

      <Link to="/admin/propuestas" className="nueva-propuesta__back">
        ← Volver a propuestas
      </Link>

      <h1 className="admin-title nueva-propuesta__title">Editar Propuesta</h1>
      <p className="admin-lead nueva-propuesta__lead">
        Actualiza los datos del cliente o las líneas de la propuesta; el
        sistema recalculará el presupuesto con las tarifas vigentes.
      </p>

      <ProposalForm proposalId={id} />
    </main>
  );
}
