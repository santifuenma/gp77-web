// Herramientas del panel de admin. Agregar una nueva herramienta es
// agregar una entrada aquí + su ruta en AnimatedRoutes.jsx — el Hub
// (AdminHub.jsx) no necesita tocarse.
export const adminTools = [
  {
    id: "propuestas",
    title: "Generador de Propuestas",
    description:
      "Calcula el presupuesto de reparación de grietas y genera el PDF para el cliente.",
    path: "/admin/propuestas",
  },
  {
    id: "tarifas",
    title: "Tarifas de Grietas",
    description: "Edita el precio por m² de cada tipo de grieta (A, B, C).",
    path: "/admin/tarifas",
  },
];
