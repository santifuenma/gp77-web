# GP77 — Guía de Estilos

Esta guía documenta el lenguaje visual que ya usa el sitio (extraído de los
componentes existentes) y lo convierte en un sistema de tokens reutilizable
en [`src/styles/main.css`](src/styles/main.css). Ese archivo se importa una
sola vez, globalmente, desde [`src/App.jsx`](src/App.jsx), así que sus
variables y clases están disponibles en todo el proyecto sin más imports.

**Regla general: todo componente nuevo debe usar las variables y clases de
esta guía en vez de hardcodear colores, radios, sombras o fuentes sueltas.**
Así cualquier cosa que agreguemos se ve como parte del mismo sitio.

---

## 1. Identidad de marca

- **Color de marca:** un navy-purple oscuro, `#312f4e`. Es el color de texto
  de encabezados, bordes de botones, iconos y fondos de hero. Es el hilo
  conductor de todo el sitio.
- **Tipografía:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
  para absolutamente todo (títulos, cuerpo, botones, labels).
- **Forma:** botones y pastillas con `border-radius: 100px` y borde grueso
  (3.5px) del color de marca; tarjetas con esquinas entre 10px y 20px y
  sombras muy suaves en gris o en el tono de marca.
- **Movimiento:** transiciones discretas de 0.3–0.4s, `ease` / `ease-in-out`.

## 2. Colores

Todas las variables viven en `:root` dentro de `src/styles/main.css`.

| Variable | Valor | Uso |
|---|---|---|
| `--color-primary` | `#312f4e` | Texto de marca, bordes, botones, fondos oscuros |
| `--color-primary-light` | `#3d3b5e` | Segundo stop de gradientes de hero |
| `--color-primary-deep` | `#2a283e` | Overlay/gradiente más oscuro (banners) |
| `--color-primary-border` | `rgba(49,47,78,.345)` | Borde de inputs |
| `--color-primary-text-soft` | `rgba(49,47,78,.835)` | Texto de marca atenuado sobre fondo claro |
| `--color-primary-tint-bg` | `rgba(49,47,78,.153)` | Fondo tipo chip/badge |
| `--color-text-muted` | `#605e6b` | Subtítulos, texto secundario |
| `--color-text-soft` | `#6d6d7d` | Cuerpo de texto sobre fondo claro |
| `--color-text-faint` | `#92929d` | Labels/eyebrows en mayúsculas |
| `--color-placeholder` | `#a7a7b1` | Placeholders de formulario |
| `--color-bg` | `#f2f2f2` | Fondo general de página |
| `--color-surface` | `#ffffff` | Tarjetas, inputs en foco, modales |
| `--color-surface-muted` | `#f7f7fb` | Fondo de inputs, paneles sutiles |
| `--color-border` | `#eef0f5` | Líneas divisorias, bordes de tarjeta |
| `--color-success` / `-bg` / `-border` | `#146c43` / `#e8f6ef` / `#c9eadc` | Mensajes de éxito |
| `--color-error` / `-bg` / `-border` | `#b42323` / `#ffecec` / `#ffd2d2` | Mensajes de error |

**No introduzcas colores nuevos** (ni siquiera "muy parecidos") sin agregarlos
primero como variable aquí y documentarlos.

## 3. Tipografía

```css
--font-primary: "Plus Jakarta Sans", system-ui, sans-serif;
```

Pesos disponibles: `--fw-regular` (400), `--fw-medium` (500),
`--fw-semibold` (600), `--fw-bold` (700), `--fw-black` (800).

Escala fluida (usa `clamp()` para que el texto respire en todos los
tamaños de pantalla sin media queries adicionales):

| Variable | Uso típico |
|---|---|
| `--fs-eyebrow` | Labels pequeños en mayúsculas |
| `--fs-body` | Párrafos de cuerpo |
| `--fs-lead` | Texto introductorio bajo un título de sección |
| `--fs-h3` | Subtítulos de bloque |
| `--fs-h2` | Títulos de sección |
| `--fs-h1` | Títulos de hero de página interna |
| `--fs-display` | Titulares grandes tipo manifiesto (ej. "Nosotros") |

> Nota de deuda técnica: `index.html` carga las fuentes Poppins, Quicksand
> y Borel además de Plus Jakarta Sans y Lato, pero **ninguna se usa en el
> CSS** salvo Lato (solo en el menú móvil del Navbar). Son requests
> desperdiciados. No los quité en este pase para no tocar nada visual sin
> que lo pidas, pero es una limpieza segura y recomendable a futuro.

## 4. Radios y bordes

```css
--radius-pill: 100px;  /* botones, inputs, chips de filtro */
--radius-sm:   10px;   /* tarjetas pequeñas, alertas */
--radius-md:   16px;   /* tarjetas de servicio/proyecto */
--radius-lg:   20px;   /* tarjetas grandes, modales, contenedores destacados */

--border-brand: 3.5px solid var(--color-primary); /* borde grueso característico */
```

## 5. Sombras (escala de elevación)

```css
--shadow-sm:    2px 2px 10px 2px rgba(107,107,107,.08); /* tarjetas planas */
--shadow-md:    0 10px 30px rgba(0,0,0,.05);             /* tarjetas flotantes */
--shadow-lg:    0 10px 40px rgba(0,0,0,.1);              /* modales, contenido destacado */
--shadow-brand: 0 4px 20px rgba(49,47,78,.15);           /* heroes/banners con fondo de marca */
```

## 6. Movimiento

```css
--transition-fast: 0.2s ease;
--transition-base: 0.3s ease;
--transition-slow: 0.4s ease-in-out;   /* botones pill al hacer hover */
--ease-luxury: cubic-bezier(0.16, 1, 0.3, 1); /* animaciones "premium" lentas */
```

## 7. Breakpoints de referencia

El sitio actual mezcla breakpoints bastante inconsistentes (790px, 768px,
900px, 1024px, 1227px, 1650px...). Para código **nuevo**, usa esta escala
simple y no introduzcas puntos de quiebre arbitrarios adicionales:

```
mobile:    max-width: 600px
tablet:    max-width: 768px
tablet-lg: max-width: 1024px
desktop:   min-width: 1025px
```

(Las variables CSS no funcionan dentro de condiciones `@media`, así que
estos valores son solo de referencia — cópialos literalmente.)

## 8. Componentes reutilizables

Definidos en `src/styles/main.css`, listos para usar por nombre de clase.

### Botón píldora — `.btn-pill`
Reemplaza el patrón que hoy está copiado y pegado como
`.boton-contacto`, `.boton-conocemas`, `.cta-button`, `.cta-btn`, `.home-btn`.

```html
<a href="/contacto" class="btn-pill">Contáctanos</a>
```

### Tarjeta — `.card`
Contenedor blanco con esquina grande y sombra suave (patrón de
`service-card`, `pillar-item`, `split-image-container`).

```html
<div class="card">...</div>
```

### Título de sección — `.section-title` + `.section-lead`
Patrón repetido en `services-preview__header`, `catalogo-section`,
`ig-title`/`ig-section p`.

```html
<h2 class="section-title">Nuestros Servicios</h2>
<p class="section-lead">Soluciones integrales para tu hogar o negocio.</p>
```

### Eyebrow — `.eyebrow`
Label pequeño en mayúsculas (patrón de `service-package-label`).

```html
<span class="eyebrow">Servicio #3</span>
```

### Input de formulario — `.form-input`
Input tipo píldora (patrón de `.contact__input`).

```html
<input class="form-input" placeholder="Nombre y apellido" />
```

### Alertas — `.alert-error` / `.alert-success`
Mensajes de estado de formulario (patrón de `.contact__error/.contact__ok`
y `.pcalc__error`).

```html
<p class="alert-error">Este campo es obligatorio.</p>
```

---

## 9. Reglas de uso

1. Antes de escribir un color, radio, sombra o fuente nuevo, revisa si ya
   existe un token equivalente arriba.
2. Si necesitas un valor genuinamente nuevo, agrégalo primero como variable
   en `src/styles/main.css` y documéntalo aquí — no lo dejes suelto en el
   CSS del componente.
3. Prefiere las clases reutilizables (`.btn-pill`, `.card`, `.section-title`,
   etc.) antes que reescribir el mismo patrón con nombres de clase nuevos.
4. Este pase **no modificó el look actual del sitio** — solo se corrigieron
   dos variables CSS rotas que nunca estaban definidas
   (`--background-color` en `Proyectos.css` y `--pacific-cyan` en el
   componente `Catalogo` — que además no está enrutado/en uso). El resto de
   los archivos CSS existentes se dejaron intactos a propósito.
