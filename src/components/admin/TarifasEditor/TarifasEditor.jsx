import React, { useEffect, useState } from "react";
import { useCrackRates } from "../../../hooks/admin/useCrackRates";
import "./TarifasEditor.css";

export default function TarifasEditor() {
  const { rates, loading, error, updateRate } = useCrackRates();
  const [drafts, setDrafts] = useState({});
  const [savingSeverity, setSavingSeverity] = useState(null);
  const [savedSeverity, setSavedSeverity] = useState(null);

  useEffect(() => {
    const next = {};
    rates.forEach((rate) => {
      next[rate.severity] = rate.price_per_m2;
    });
    setDrafts(next);
  }, [rates]);

  const handleChange = (severity, value) => {
    setDrafts((prev) => ({ ...prev, [severity]: value }));
    setSavedSeverity(null);
  };

  const handleSave = async (severity) => {
    const value = parseFloat(drafts[severity]);
    if (Number.isNaN(value) || value < 0) return;

    setSavingSeverity(severity);
    const { error: saveError } = await updateRate(severity, value);
    setSavingSeverity(null);

    if (!saveError) {
      setSavedSeverity(severity);
      setTimeout(() => setSavedSeverity(null), 2000);
    }
  };

  if (loading) {
    return <p className="tarifas-editor__status">Cargando tarifas…</p>;
  }

  if (error) {
    return <p className="alert-error">No se pudieron cargar las tarifas.</p>;
  }

  return (
    <div className="tarifas-editor">
      {rates.map((rate) => (
        <div key={rate.severity} className="card tarifas-editor__row">
          <div className="tarifas-editor__info">
            <span className="tarifas-editor__severity">{rate.severity}</span>
            <span className="tarifas-editor__label">{rate.label}</span>
          </div>

          <div className="tarifas-editor__price">
            <span className="tarifas-editor__prefix">$/m²</span>
            <input
              className="form-input tarifas-editor__input"
              type="number"
              min="0"
              step="0.01"
              value={drafts[rate.severity] ?? ""}
              onChange={(e) => handleChange(rate.severity, e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn-pill tarifas-editor__save"
            onClick={() => handleSave(rate.severity)}
            disabled={savingSeverity === rate.severity}
          >
            {savingSeverity === rate.severity
              ? "…"
              : savedSeverity === rate.severity
              ? "Guardado ✓"
              : "Guardar"}
          </button>
        </div>
      ))}
    </div>
  );
}
