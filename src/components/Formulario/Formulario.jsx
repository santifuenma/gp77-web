import React, { useState } from "react";
import Select, { components } from "react-select";
import { motion } from "framer-motion";
import "./Formulario.css";

// Animation Variant
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Opciones
const PROJECT_OPTIONS = [
  { value: "Asesoría de Compra Inmobiliaria", label: "Servicio #1: Asesoría de Compra Inmobiliaria" },
  { value: "Mantenimiento de Espacios", label: "Servicio #2: Mantenimiento de Espacios" },
  { value: "Diagnóstico Profesional de Potencial de Remodelación", label: "Servicio #3: Diagnóstico Profesional de Potencial de Remodelación" },
  { value: "Diseño Interior", label: "Servicio #4: Diseño Interior" },
  { value: "Proyecto de Diseño Arquitectónico", label: "Servicio #5: Proyecto de Diseño Arquitectónico" },
  { value: "Construcción y Gerencia de Obra", label: "Servicio #6: Construcción y Gerencia de Obra" },
];

const SERVICE_OPTIONS = [
  { value: "Terraza", label: "Terraza" },
  { value: "Baño", label: "Baño" },
  { value: "Cocina", label: "Cocina" },
  { value: "Parrillera", label: "Parrillera" },
  { value: "Área social", label: "Área social" },
  { value: "Habitación", label: "Habitación" },
  { value: "Vestier/Closet", label: "Vestier/Closet" },
  { value: "Vivienda completa", label: "Vivienda completa" },
  { value: "Espacio comercial", label: "Espacio Comercial" },
];

// Checkbox visual (para multi)
const CheckboxOption = (props) => {
  const { isSelected, label } = props;
  return (
    <components.Option {...props}>
      <input type="checkbox" checked={isSelected} readOnly style={{ marginRight: 8 }} />
      <span>{label}</span>
    </components.Option>
  );
};

// Estilos de react-select
const selectStyles = {
  control: (base) => ({
    ...base,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#312f4e58",
    minHeight: 40,
    paddingLeft: 6,
    boxShadow: "none",
    backgroundColor: "#f7f7fb",
    ":hover": { borderColor: "#46464f72" },
    maxHeight: 40,


  }),
  placeholder: (base) => ({
    ...base,
    color: "#a7a7b1",
    fontFamily: "Plus Jakarta Sans, sans-serif",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "0.85rem",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "2px 8px",
    gap: 6,
    display: "flex",
    flexWrap: "nowrap",


  }),
  multiValue: (base) => ({
    ...base,
    background: "#eaeaf2",
    borderRadius: 999,

  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#312f4e",
    fontWeight: 600,
    fontSize: "0.9rem",
    padding: "2px 8px",
  }),
  multiValueRemove: (base) => ({
    ...base,
    ":hover": { background: "#d9d9e6", color: "#312f4e" },
    borderTopRightRadius: 999,
    borderBottomRightRadius: 999,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#f3f3f8" : "#fff",
    color: "#312f4e",
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 12px 30px rgba(0,0,0,.12)",
  }),
};

// 👉 Tu endpoint de Apps Script
const GAS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzj3ceiZPf53fCyE-TIgPZeRXfRWmDdEkr4lKmXfxu5N_0HSa_sQil-3oJEQdO-VDqSmw/exec";

export default function Formulario() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    projectType: "", // string
    services: [],    // array de strings
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");
  // 🛡️ Honeypot
  const [hp, setHp] = useState("");

  const onChangeText = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // React-select (single)
  const onChangeProjectType = (opt) => {
    setForm((f) => ({ ...f, projectType: opt ? opt.value : "" }));
  };
  const selectedProjectOption =
    PROJECT_OPTIONS.find((o) => o.value === form.projectType) || null;

  // React-select (multi)
  const onChangeServices = (selected) => {
    const values = (selected || []).map((opt) => opt.value);
    setForm((f) => ({ ...f, services: values }));
  };
  const selectedServiceOptions = SERVICE_OPTIONS.filter((o) =>
    form.services.includes(o.value)
  );

  const validate = () => {
    if (!form.name.trim()) return "Por favor, ingresa tu nombre y apellido.";
    if (!form.phone.trim()) return "Por favor, ingresa tu número telefónico.";
    if (!/^[\d\s()+-]{6,}$/.test(form.phone.trim()))
      return "El número telefónico no parece válido.";
    if (!form.projectType.trim()) return "Selecciona el tipo de proyecto.";
    if (form.services.length === 0) return "Selecciona al menos un servicio.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setOk("");
    setErr("");

    // 🛡️ Si el honeypot tiene valor, abortamos (probable bot)
    if (hp) {
      setOk("¡Gracias! Hemos recibido tu mensaje.");
      setForm({ name: "", phone: "", location: "", projectType: "", services: [], message: "" });
      return;
    }

    const v = validate();
    if (v) { setErr(v); return; }

    const submissionId =
      (crypto?.randomUUID && crypto.randomUUID()) || String(Date.now());
    const payload = {
      submission_id: submissionId,
      name: form.name,
      phone: form.phone,
      location: form.location,
      projectType: form.projectType,
      services: form.services,
      message: form.message,
      source_url: window?.location?.href || "",
    };

    setLoading(true);
    try {
      // Vía rápida sin CORS (no podemos leer respuesta)
      await fetch(GAS_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
      });

      setOk("¡Gracias! Hemos recibido tu mensaje. Te contactaremos pronto.");
      setForm({
        name: "",
        phone: "",
        location: "",
        projectType: "",
        services: [],
        message: "",
      });
    } catch (error) {
      console.error(error);
      setErr("Ocurrió un error al enviar el formulario. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formulario-page-bg">
      <section className="contact">
        <motion.div
          className="contact__card"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h2 className="contact__title">Contáctanos</h2>
          <p className="contact__lead">
            ¡Rellena este formulario con tu información y en breve te contactaremos para hablar de tu proyecto!
          </p>

          <form className="contact__form" onSubmit={onSubmit} noValidate>
            {/* 🛡️ Honeypot (oculto) */}
            <label className="sr-only" htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              className="hp-field"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              autoComplete="off"
              tabIndex="-1"
              aria-hidden="true"
            />

            <input
              id="name"
              name="name"
              className="contact__input"
              type="text"
              placeholder="Nombre y Apellido"
              value={form.name}
              onChange={onChangeText}
            />

            <input
              id="phone"
              name="phone"
              className="contact__input"
              type="tel"
              placeholder="Número telefónico"
              value={form.phone}
              onChange={onChangeText}
            />

            <input
              id="location"
              name="location"
              className="contact__input"
              type="text"
              placeholder="Ubicación"
              value={form.location}
              onChange={onChangeText}
            />

            <div className="contact__selectores">
              {/* Áreas (multi) */}
              <div className="contact__selectWrap">
                <Select
                  inputId="services"
                  options={SERVICE_OPTIONS}
                  value={selectedServiceOptions}
                  onChange={onChangeServices}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  placeholder="Áreas"
                  classNamePrefix="rs"
                  components={{ Option: CheckboxOption }}
                  styles={selectStyles}
                  isSearchable={false}
                  menuPlacement="auto"
                />
              </div>

              {/* Tipo de Proyecto (single) */}
              <div className="contact__selectWrap">
                <Select
                  inputId="projectType"
                  options={PROJECT_OPTIONS}
                  value={selectedProjectOption}
                  onChange={onChangeProjectType}
                  isMulti={false}
                  placeholder="Tipo de Proyecto"
                  classNamePrefix="rs"
                  styles={selectStyles}
                  isSearchable={false}
                  menuPlacement="auto"
                />
              </div>
            </div>

            <textarea
              id="message"
              name="message"
              className="contact__textarea"
              rows="4"
              placeholder="Describe brevemente tu proyecto…"
              value={form.message}
              onChange={onChangeText}
            />

            {err && <p className="contact__error" role="alert">{err}</p>}
            {ok && <p className="contact__ok">{ok}</p>}

            <button className="contact__submit" type="submit" disabled={loading}>
              {loading ? "Enviando…" : "Enviar"}
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
