# Product

## Register

product

## Users

Arquitectos internos de GP77 (empresa de arquitectura y construcción), no clientes externos. Acceden casi siempre desde el celular, muchas veces en el sitio de obra, con poco tiempo y sin escritorio a mano. Su tarea principal en el panel es generar presupuestos para clientes (calcular reparación de grietas por severidad y m², producir un PDF formal) y mantener datos internos (tarifas) al día. Necesitan poder entrar, hacer el cálculo, generar el documento y salir rápido, sin fricción.

## Product Purpose

Un hub interno (`/admin`) que reemplaza trabajo manual/ad-hoc de los arquitectos con herramientas reales respaldadas por una base de datos (Supabase), pensado para crecer: la primera herramienta es el Generador de Propuestas (grietas por sismo), la segunda es el editor de Tarifas. El éxito se ve como: un arquitecto genera una propuesta completa y correcta desde su celular en menos de un minuto, sin dudas sobre si el cálculo o el PDF están bien.

## Brand Personality

Profesional, pulido, premium — pero sirviendo una herramienta de trabajo, no vendiendo nada. La referencia deseada es el nivel de cuidado visual de productos tipo Linear/Notion: tipografía cuidada, mucho espacio en blanco, densidad de información baja-media, jerarquía clara. No debe sentirse como un formulario administrativo genérico ni como una hoja de cálculo. Hereda el color de marca de GP77 (`#312f4e`, Plus Jakarta Sans) pero la ejecución visual actual se siente plana/genérica y necesita el mismo nivel de pulido que un producto de software serio, no solo "reusar las clases del sitio de marketing".

## Anti-references

- Formularios de admin/ERP genéricos: campos apretados, jerarquía plana, todo del mismo tamaño y peso.
- Tarjetas idénticas repetidas sin variación de ritmo/espaciado (bento-grid genérico).
- Cualquier cosa que se sienta "hecha con el mismo componente reciclado del sitio público sin pensar en el contexto de uso" (uso rápido, con una mano, en el celular, en la obra).

## Design Principles

1. **Una mano, en la obra**: cada decisión de layout se valida primero en mobile (375px), no en desktop. Los targets táctiles, el orden de los campos y el scroll importan más que la elegancia en pantallas grandes.
2. **Pulido de producto, no de folleto**: el mismo cuidado tipográfico y de espaciado que un dashboard tipo Linear/Notion, no la estética de landing page ni de formulario administrativo plano.
3. **Jerarquía real, no plana**: contraste de peso/tamaño entre título, dato importante (total, tarifa) y metadata secundaria — no todo con el mismo peso visual.
4. **Confianza en el número**: el total del presupuesto y las tarifas son lo más importante en pantalla; el diseño debe hacer imposible confundir un subtotal con el total o dudar de qué tarifa se está usando.
5. **Consistente con la marca, no clonado de ella**: usa los tokens de `STYLEGUIDE.md` (color, fuente) como base pero con su propia ejecución de componente — no es aceptable simplemente reusar `.card`/`.btn-pill` del sitio público sin adaptarlos al contexto de herramienta interna.

## Accessibility & Inclusion

WCAG AA como mínimo (contraste de texto, foco visible en todos los inputs/botones). Targets táctiles de al menos 44px dado el uso predominante en celular. Sin requisitos de accesibilidad adicionales declarados por el usuario más allá de estos.
