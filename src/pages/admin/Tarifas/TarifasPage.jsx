import React from "react";
import { Helmet } from "react-helmet-async";
import TarifasEditor from "../../../components/admin/TarifasEditor/TarifasEditor";
import "./TarifasPage.css";

export default function TarifasPage() {
  return (
    <main>
      <Helmet>
        <title>Tarifas | Admin GP77</title>
      </Helmet>
      <h1 className="section-title tarifas-page__title">Tarifas de Grietas</h1>
      <p className="section-lead tarifas-page__lead">
        Precio por m² usado al calcular nuevas propuestas.
      </p>
      <TarifasEditor />
    </main>
  );
}
