import React from "react";
import { Helmet } from "react-helmet-async";
import ProposalForm from "../../../components/admin/ProposalForm/ProposalForm";
import "./NuevaPropuesta.css";

export default function NuevaPropuesta() {
  return (
    <main>
      <Helmet>
        <title>Nueva Propuesta | Admin GP77</title>
      </Helmet>
      <h1 className="admin-title nueva-propuesta__title">Nueva Propuesta</h1>
      <ProposalForm />
    </main>
  );
}
