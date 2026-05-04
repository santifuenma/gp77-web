import React from 'react';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import ChairIcon from '@mui/icons-material/Chair';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import HandymanIcon from '@mui/icons-material/Handyman';
import EngineeringIcon from '@mui/icons-material/Engineering';

export const packages = [
    {
        id: 1,
        title: "Asesoría de Compra Inmobiliaria",
        target: "Personas que están evaluando la compra de un inmueble y necesitan criterio profesional para decidir si conviene o no realizar la inversión.",
        offer: "Una evaluación profesional del inmueble previa a la compra, enfocada en la detección de riesgos, posibles costos ocultos y viabilidad general, para ayudar al cliente a tomar una decisión fundamentada y con criterio.",
        scope: [
            "**Estado general:** Condición aparente del inmueble y nivel de mantenimiento.",
            "**Patologías visibles:** Humedades, grietas, filtraciones y señales de deterioro relevantes.",
            "**Instalaciones:** Estado visual de instalaciones eléctricas, sanitarias y de ventilación.",
            "**Estructura y envolvente:** Elementos que pueden limitar o encarecer intervenciones futuras.",
            "**Viabilidad de intervención:** Nivel general de intervención requerido tras la compra.",
            "**Riesgo económico:** Posibles costos ocultos que podrían aparecer tras la compra."
        ],
        exclusions: [
            "Diseño arquitectónico o propuestas de remodelación.",
            "Proyecto de diseño o gerencia de obra.",
            "Levantamiento métrico detallado.",
            "Renders o visualizaciones.",
            "Presupuesto definitivo de remodelación."
        ],
        deliverables: [
            "Descripción general del inmueble evaluado.",
            "Listado de riesgos y patologías detectadas.",
            "Nivel estimado de intervención posterior a la compra.",
            "Rango orientativo de inversión futura.",
            "Conclusión profesional para la toma de decisión (Compra recomendada, viable con condiciones o no recomendada)."
        ],
        priceDetails: [
            "Costo fijo por desplazamiento.",
            "Honorarios profesionales."
        ],
        disclaimer: "Esta asesoría no sustituye inspecciones estructurales especializadas ni peritajes legales. Se basa en una evaluación profesional visual y técnica orientada a la toma de decisiones.",
        icon: <HomeWorkIcon />
    },
    {
        id: 2,
        title: "Mantenimiento de Espacios",
        target: "Clientes que requieren mejoras puntuales o trabajos de mantenimiento, sin necesidad de una remodelación integral ni un proyecto arquitectónico.",
        offer: "Una evaluación puntual del espacio para identificar trabajos de mantenimiento necesarios y elaborar un presupuesto general orientativo que permita al cliente decidir si desea ejecutar las mejoras.",
        scope: [
            "**Visita diagnóstica:** Recorrido del espacio para detectar necesidades de mantenimiento.",
            "**Reparaciones menores:** Evaluación de trabajos como pintura, resanes, ajustes y correcciones básicas.",
            "**Estado general:** Revisión visual del estado de paredes, techos, pisos y elementos visibles.",
            "**Alcance de trabajos:** Definición general de los trabajos de mantenimiento requeridos."
        ],
        exclusions: [
            "Proyecto de diseño arquitectónico o interior.",
            "Gerencia de obra.",
            "Renders o visualizaciones.",
            "Presupuesto detallado por partidas de obra mayor."
        ],
        deliverables: [
            "Informe de Mantenimiento de Espacios (PDF).",
            "Descripción general de los trabajos recomendados.",
            "Presupuesto general orientativo de mantenimiento."
        ],
        priceDetails: [
            "Visita diagnóstica.",
            "Informe con presupuesto general."
        ],
        note: "El servicio se limita a mantenimiento y reparaciones menores. Si durante el mantenimiento se detectan necesidades mayores, se podrá recomendar un Diagnóstico de Potencial de Remodelación o un Proyecto de Diseño Integral.",
        disclaimer: "El presupuesto entregado es orientativo y puede variar al ejecutar los trabajos.",
        icon: <HandymanIcon />
    },
    {
        id: 3,
        title: "Diagnóstico Profesional de Potencial de Remodelación",
        target: "Propietarios que ya poseen el inmueble y desean evaluar de forma clara y ordenada hasta dónde puede transformarse.",
        offer: "Una evaluación profesional presencial del inmueble enfocado en su potencial de remodelación, nivel de intervención posible, complejidad del proyecto y escenarios de inversión, como paso previo a un Proyecto de Diseño Integral.",
        scope: [
            "**Contexto general:** Tipo de inmueble, antigüedad estimada y condiciones generales que influyen en la remodelación.",
            "**Distribución y funcionalidad:** Capacidad de mejora funcional, reorganización general de espacios y limitaciones detectadas (sin diseñar).",
            "**Instalaciones:** Impacto de las instalaciones existentes en una futura remodelación (renovación parcial o total).",
            "**Envolvente y patologías:** Condiciones que afectan el alcance de la intervención y el nivel de obra requerido.",
            "**Materiales y acabados:** Viabilidad de conservación, sustitución o actualización de acabados.",
            "**Potencial de intervención:** Definición de escenarios posibles: conservador, intermedio o integral."
        ],
        exclusions: [
            "Asesoría de compra inmobiliaria o recomendación de compra/venta.",
            "Levantamiento métrico detallado.",
            "Planos, croquis o propuestas de diseño.",
            "Renders o visualizaciones.",
            "Presupuesto definitivo de obra."
        ],
        deliverables: [
            "Descripción general del inmueble.",
            "Evaluación global por áreas mediante checklist profesional.",
            "Riesgos y consideraciones técnicas relevantes para la remodelación.",
            "Escenarios de intervención posibles (Conservador, Intermedio, Integral).",
            "Rangos estimados de inversión por nivel de intervención.",
            "Conclusión profesional y recomendación de siguientes pasos."
        ],
        priceDetails: [
            "Costo fijo por desplazamiento.",
            "Honorarios profesionales."
        ],
        note: "Si el cliente contrata el Proyecto de Diseño Integral, el monto del diagnóstico se descuenta total o parcialmente del fee de diseño.",
        icon: <DomainAddIcon />
    },
    {
        id: 4,
        title: "Diseño Interior",
        target: "Clientes que buscan definir la imagen y atmósfera de sus espacios a través de un diseño interior general y visualización mediante renders.",
        offer: "Un diseño interior general orientado a la definición estética y funcional de los espacios, con énfasis en la visualización mediante renders por ambiente, sin desarrollar un proyecto arquitectónico completo.",
        scope: [
            "**Visita inicial:** Recorrido del espacio para comprender necesidades, estilo y condiciones generales.",
            "**Concepto interior:** Definición de estilo, atmósfera y lineamientos generales de diseño.",
            "**Distribución básica:** Organización general de mobiliario (sin planos técnicos).",
            "**Materiales y acabados:** Selección conceptual de materiales, colores y texturas.",
            "**Renders:** Renders por ambiente para visualizar el diseño propuesto."
        ],
        exclusions: [
            "Proyecto arquitectónico integral.",
            "Planos técnicos de obra o instalaciones.",
            "Gerencia de obra.",
            "Presupuesto definitivo de remodelación."
        ],
        deliverables: [
            "Concepto general de diseño interior.",
            "Propuesta estética y funcional por ambiente.",
            "Renders por ambiente según alcance contratado."
        ],
        priceDetails: [
            "Honorarios de diseño interior.",
            "Visita al inmueble (si aplica)."
        ],
        note: "El servicio está enfocado en visualización, no en ejecución de obra. Si el cliente desea ejecutar el proyecto, el siguiente paso recomendado es realizar un Diagnóstico de Potencial de Remodelación y posteriormente un Proyecto de Diseño Integral.",
        disclaimer: "Los honorarios profesionales dependen del número de ambientes a diseñar y renderizar. Cambios adicionales pueden generar honorarios extra.",
        icon: <ChairIcon />
    },
    {
        id: 5,
        title: "Proyecto de Diseño Arquitectónico",
        target: "Clientes que desean un Proyecto de Diseño Arquitectónico y demás especialidades necesarias.",
        offer: "El desarrollo completo del proyecto de diseño arquitectónico del inmueble o áreas específicas del inmueble, definiendo soluciones espaciales, criterios técnicos y materiales, para ejecutar una remodelación sin improvisaciones.",
        scope: [
            "**Concepto de diseño:** Definición del concepto general y lineamientos estéticos y funcionales.",
            "**Distribución:** Propuesta de distribución y organización de espacios.",
            "**Materiales y acabados:** Selección y criterios de materiales, revestimientos y acabados.",
            "**Planos técnicos:** Planos necesarios para la correcta ejecución de la obra.",
            "**Criterios constructivos:** Lineamientos técnicos para garantizar viabilidad y calidad.",
            "**Presupuesto base:** Base coherente para cotizar la obra y controlar costos."
        ],
        exclusions: [
            "Gerencia de obra.",
            "Renders (se cotizan como servicio adicional).",
            "Cambios ilimitados fuera del alcance acordado."
        ],
        deliverables: [
            "Proyecto de Diseño Integral (PDF).",
            "Concepto y criterios de diseño.",
            "Planos de distribución y técnicos necesarios.",
            "Definición de materiales y acabados.",
            "Criterios constructivos y técnicos.",
            "Base de presupuesto para la obra."
        ],
        priceDetails: [
            "Los honorarios profesionales dependen del área (m2) a intervenir y complejidad."
        ],
        note: "Los honorarios profesionales del Diagnóstico de Potencial de Remodelación se descuenta del total del proyecto de diseño, siempre y cuando no supere los 3 meses para la contratación.",
        disclaimer: "El proyecto define el alcance final antes de iniciar obra. No se recomienda ejecutar obra sin este proyecto. Una vez aprobado el Proyecto de Diseño Integral, el siguiente paso es la Ejecución y Gerencia de Obra.",
        icon: <ArchitectureIcon />
    },
    {
        id: 6,
        title: "Construcción y Gerencia de Obra",
        target: "Clientes que desean que GP77 Construya y Gerencie su obra para garantizar que se ejecute conforme al proyecto aprobado, con control de costos, tiempos y calidad.",
        offer: "La construcción y gestión integral del proceso constructivo, coordinando equipos, controlando la ejecución y resolviendo incidencias, para proteger la inversión del cliente y asegurar el resultado final.",
        scope: [
            "**Ejecución de obra:** Ejecución directa de la obra como contratista.",
            "**Planificación:** Organización del cronograma de obra y secuencia de trabajos.",
            "**Coordinación:** Coordinación de contratistas, proveedores y equipos.",
            "**Supervisión técnica:** Seguimiento continuo de la ejecución conforme al proyecto.",
            "**Control de costos:** Verificación de partidas, desviaciones y ajustes necesarios.",
            "**Control de tiempos:** Seguimiento del avance y cumplimiento del cronograma.",
            "**Gestión de imprevistos:** Resolución técnica y toma de decisiones durante la obra.",
            "**Control de calidad:** Verificación de calidad de ejecución y materiales."
        ],
        exclusions: [
            "Proyecto de Diseño de Arquitectura u otras especialidades.",
            "Permisos Municipales de Construcción.",
            "Presupuesto de obra (inicial).",
            "Acuerdos sindicales."
        ],
        deliverables: [
            "Planificación y cronograma de obra.",
            "Reportes periódicos de avance.",
            "Control de costos y desviaciones.",
            "Seguimiento de calidad y cumplimiento del proyecto."
        ],
        priceDetails: [
            "Los honorarios profesionales corresponden al área (m2) a intervenir y alncance general de la obra."
        ],
        disclaimer: "No se inicia obra sin Proyecto de Diseño Integral aprobado. Cualquier modificación al proyecto puede afectar costos y plazos. La gerencia protege la inversión y evita improvisaciones.",
        icon: <EngineeringIcon />
    }
];
