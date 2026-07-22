import React, { useEffect, useState } from "react";
import { useCrackRates } from "../../../hooks/admin/useCrackRates";
import { useExecutionRate } from "../../../hooks/admin/useExecutionRate";
import "./TarifasEditor.css";

export default function TarifasEditor() {
  const { rates, loading, error, updateRate } = useCrackRates();
  const {
    rate: executionRate,
    loading: executionLoading,
    error: executionError,
    updateRate: updateExecutionRate,
  } = useExecutionRate();
  const [drafts, setDrafts] = useState({});
  const [savingSeverity, setSavingSeverity] = useState(null);
  const [savedSeverity, setSavedSeverity] = useState(null);
  const [weekDraft, setWeekDraft] = useState("");
  const [savingWeek, setSavingWeek] = useState(false);
  const [savedWeek, setSavedWeek] = useState(false);

  useEffect(() => {
    const next = {};
    rates.forEach((rate) => {
      next[rate.severity] = rate.price_per_m2;
    });
    setDrafts(next);
  }, [rates]);

  useEffect(() => {
    if (executionRate) setWeekDraft(executionRate.price_per_week);
  }, [executionRate]);

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

  const handleWeekChange = (value) => {
    setWeekDraft(value);
    setSavedWeek(false);
  };

  const handleSaveWeek = async () => {
    const value = parseFloat(weekDraft);
    if (Number.isNaN(value) || value < 0) return;

    setSavingWeek(true);
    const { error: saveError } = await updateExecutionRate(value);
    setSavingWeek(false);

    if (!saveError) {
      setSavedWeek(true);
      setTimeout(() => setSavedWeek(false), 2000);
    }
  };

  if (loading || executionLoading) {
    return <p className="tarifas-editor__status">Cargando tarifas…</p>;
  }

  if (error || executionError) {
    return <p className="alert-error">No se pudieron cargar las tarifas.</p>;
  }

  return (
    <div className="tarifas-editor">
      <p className="tarifas-editor__intro">
        Este precio por m² se usa para calcular el total de las próximas
        propuestas. Cambiar una tarifa aquí <strong>no afecta</strong> el
        total de propuestas que ya generaste antes.
      </p>

      <div className="tarifas-editor__row">
        <div className="tarifas-editor__info">
          <span className="tarifas-editor__severity">S</span>
          <span className="tarifas-editor__label">Semana de ejecución</span>
        </div>

        <div className="tarifas-editor__price">
          <span className="tarifas-editor__prefix">$/semana</span>
          <input
            className="admin-input tarifas-editor__input"
            type="number"
            min="0"
            step="0.01"
            value={weekDraft}
            onChange={(e) => handleWeekChange(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="admin-btn admin-btn--secondary tarifas-editor__save"
          onClick={handleSaveWeek}
          disabled={savingWeek}
        >
          {savingWeek ? "…" : savedWeek ? "Guardado ✓" : "Guardar"}
        </button>
      </div>

      {rates.map((rate) => (
        <div key={rate.severity} className="tarifas-editor__row">
          <div className="tarifas-editor__info">
            <span className="tarifas-editor__severity">{rate.severity}</span>
            <span className="tarifas-editor__label">{rate.label}</span>
          </div>

          <div className="tarifas-editor__price">
            <span className="tarifas-editor__prefix">$/m²</span>
            <input
              className="admin-input tarifas-editor__input"
              type="number"
              min="0"
              step="0.01"
              value={drafts[rate.severity] ?? ""}
              onChange={(e) => handleChange(rate.severity, e.target.value)}
            />
          </div>

          <button
            type="button"
            className="admin-btn admin-btn--secondary tarifas-editor__save"
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
