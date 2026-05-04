import React, { useMemo, useState } from "react";
import "./Calculadora.css";
import { Link } from "react-router-dom";

/**
 * Calculadora de proyectos (UI según tu diseño)
 * Tarifas por tramos:
 *  1–60   => $15/m²
 *  61–150 => $14/m²
 * 151–200 => $13/m²
 * 201–300 => $12/m²
 * 301+    => $11/m²
 *
 * Props:
 *  - base: cargo fijo (opcional)
 *  - currency: símbolo para mostrar (solo display)
 */
export default function ProjectCalculator({
  base = 0,
  currency = "$",
}) {
  const [m2, setM2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const money = useMemo(
    () =>
      new Intl.NumberFormat("es-VE", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }),
    []
  );

  // Tarifa por tramos de mts
  const getRateFor = (metros) => {
    if (metros <= 15) return { type: "fixed", value: 300 };
    if (metros <= 25) return { type: "fixed", value: 500 };
    if (metros <= 40) return { type: "fixed", value: 800 };
    if (metros <= 50) return { type: "fixed", value: 1000 };
    if (metros <= 80) return { type: "perM2", value: 20 };
    if (metros <= 150) return { type: "perM2", value: 17 };
    if (metros <= 500) return { type: "perM2", value: 15 };
    if (metros <= 1000) return { type: "perM2", value: 14 };
    return { type: "perM2", value: 13 };
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    const value = Number(m2);
    if (!Number.isFinite(value) || value <= 0) {
      setError("Ingresa un número válido de metros cuadrados.");
      setResult(null);
      return;
    }

    const rateInfo = getRateFor(value);
    let estimate = 0;

    if (rateInfo.type === "fixed") {
      estimate = base + rateInfo.value;
    } else {
      estimate = base + value * rateInfo.value;
    }

    setResult(estimate);
  };


  return (
    <section className="pcalc" id="calculadora">
      {/* FONDO (opcional): pon aquí tu plano suave como background desde CSS */}

      <div className="pcalc__card">
        <h2 className="pcalc__title"><u>Cotiza</u> tu Proyecto</h2>

        {/*<p className="pcalc__lead">
          Te presentamos nuestra <strong>calculadora de proyectos</strong>.
        </p>*/}

        <p className="pcalc__text">
          Introduce los <strong>metros cuadrados</strong> de tu espacio a renovar para calcular tu proyecto de diseño.
        </p>

        <form className="pcalc__form" onSubmit={onSubmit}>
          <label htmlFor="metros" className="sr-only">
            Metros cuadrados
          </label>

          {/* Grupo en pastilla */}
          <div className="pcalc__pill">
            <input
              id="metros"
              name="metros"
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              placeholder="Metros cuadrados"
              value={m2}
              onChange={(e) => setM2(e.target.value)}
            />
            <button type="submit">Calcular</button>
          </div>
        </form>

        {error && <div className="pcalc__error">{error}</div>}

        <div className="pcalc__resultWrap">
          <p className="pcalc__resultLabel">
            El costo <strong>estimado</strong> de tu proyecto de diseño es:
          </p>
          <div className="pcalc__resultValue">
            {result !== null ? money.format(result) : `${currency} 0.00`}
          </div>
        </div>

        <p className="pcalc__note">
          <em>
            Recuerda que el costo obtenido es solo una aproximación,
            <br />
            el costo real está sujeto a cambios dependiendo de cada proyecto.
          </em>
        </p>
      </div>

      <p className="pcalc__bottomText">
        ¡<strong>Contáctanos</strong> y te brindaremos la asistencia que necesitas
        para hacer de tu proyecto una realidad!
      </p>


      <a href="/contacto" className="pcalc__cta">Contáctanos</a>
    </section>
  );
}
