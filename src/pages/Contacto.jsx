import React from "react";
import { Helmet } from "react-helmet-async";
import Formulario from "../components/Formulario/Formulario";


export default function Contacto() {
  return (
    <main>
      <Helmet>
        <title>Contacto | Gerencia y Proyectos 77</title>
        <meta name="description" content="Contáctanos para iniciar tu proyecto de arquitectura o construcción." />
      </Helmet>
      <Formulario />
    </main>
  );
}
