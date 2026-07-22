import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCrackRates } from "../../../hooks/admin/useCrackRates";
import { useExecutionRate } from "../../../hooks/admin/useExecutionRate";
import { createProposal, updateProposal, getProposalWithItems } from "../../../lib/proposals";
import { generateProposalPdf } from "../../../lib/pdf/generateProposalPdf";
import LineItemRow from "./LineItemRow";
import "./ProposalForm.css";

let nextId = 1;
const newItem = (severity) => ({ id: nextId++, severity: severity || "", area_m2: "" });

const currency = (value) =>
  `$${Number(value || 0).toLocaleString("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function ProposalForm({ proposalId }) {
  const isEditing = Boolean(proposalId);
  const { rates, loading: ratesLoading } = useCrackRates();
  const { rate: executionRate, loading: executionRateLoading } = useExecutionRate();
  const navigate = useNavigate();

  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [items, setItems] = useState([newItem()]);
  const [executionWeeks, setExecutionWeeks] = useState("");
  const [err, setErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loadingProposal, setLoadingProposal] = useState(isEditing);

  // Al editar, precarga los datos de la propuesta ya guardada.
  useEffect(() => {
    if (!isEditing) return;

    let active = true;
    getProposalWithItems(proposalId).then(({ data, error: fetchError }) => {
      if (!active) return;
      if (fetchError || !data) {
        setErr("No se pudo cargar la propuesta.");
        setLoadingProposal(false);
        return;
      }

      setClientName(data.client_name || "");
      setClientAddress(data.client_address || "");
      setItems(
        (data.items && data.items.length > 0 ? data.items : [{}]).map((item) => ({
          id: nextId++,
          severity: item.severity || "",
          area_m2: item.area_m2 != null ? String(item.area_m2) : "",
        }))
      );
      setExecutionWeeks(data.execution_weeks != null ? String(data.execution_weeks) : "");
      setLoadingProposal(false);
    });

    return () => {
      active = false;
    };
  }, [isEditing, proposalId]);

  // Una vez llegan las tarifas (pueden tardar si vienen de Supabase),
  // asigna la primera severidad por defecto a las líneas que aún no tienen.
  useEffect(() => {
    if (rates.length === 0) return;
    setItems((prev) =>
      prev.map((item) => (item.severity ? item : { ...item, severity: rates[0].severity }))
    );
  }, [rates]);

  const itemsWithCalc = useMemo(
    () =>
      items.map((item) => {
        const rate = rates.find((r) => r.severity === item.severity);
        const area = parseFloat(item.area_m2) || 0;
        const subtotal = rate ? rate.price_per_m2 * area : 0;
        return { ...item, subtotal, rate };
      }),
    [items, rates]
  );

  const itemsTotal = itemsWithCalc.reduce((sum, item) => sum + item.subtotal, 0);
  const weekRatePrice = executionRate?.price_per_week ?? 0;
  const executionSubtotal = (parseFloat(executionWeeks) || 0) * weekRatePrice;
  const total = itemsTotal + executionSubtotal;

  const handleItemChange = (id, patch) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const handleAddItem = () => {
    setItems((prev) => [...prev, newItem(rates[0]?.severity)]);
  };

  const handleRemoveItem = (id) => {
    setItems((prev) => (prev.length > 1 ? prev.filter((item) => item.id !== id) : prev));
  };

  const validate = () => {
    if (!clientName.trim()) return "Ingresa el nombre del cliente.";
    if (!clientAddress.trim()) return "Ingresa la dirección.";
    if (itemsWithCalc.some((item) => !item.area_m2 || parseFloat(item.area_m2) <= 0)) {
      return "Cada línea necesita un área en m² mayor a 0.";
    }
    if (!executionWeeks || parseFloat(executionWeeks) <= 0) {
      return "Ingresa las semanas de ejecución del proyecto.";
    }
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    const validationError = validate();
    if (validationError) {
      setErr(validationError);
      return;
    }

    setSubmitting(true);

    const payloadItems = itemsWithCalc.map((item) => ({
      severity: item.severity,
      area_m2: parseFloat(item.area_m2),
      rate_snapshot: item.rate?.price_per_m2 ?? 0,
      subtotal: item.subtotal,
      label: item.rate?.label,
    }));

    const submitFn = isEditing ? updateProposal : createProposal;
    const { data, error } = await submitFn({
      id: proposalId,
      clientName,
      clientAddress,
      items: payloadItems,
      executionWeeks: parseFloat(executionWeeks),
      executionRate: weekRatePrice,
      executionSubtotal,
    });

    setSubmitting(false);

    if (error) {
      setErr("No se pudo guardar la propuesta. Intenta de nuevo.");
      return;
    }

    await generateProposalPdf({
      client_name: clientName,
      client_address: clientAddress,
      total: data.total,
      created_at: data.created_at,
      items: data.items ?? payloadItems,
      execution_weeks: data.execution_weeks ?? parseFloat(executionWeeks),
      execution_rate_snapshot: data.execution_rate_snapshot ?? weekRatePrice,
      execution_subtotal: data.execution_subtotal ?? executionSubtotal,
    });

    navigate("/admin/propuestas", {
      state: { successClient: clientName, successAction: isEditing ? "actualizada" : "generada" },
    });
  };

  if (loadingProposal) {
    return <p className="admin-panel proposal-form__status">Cargando propuesta…</p>;
  }

  return (
    <form className="admin-panel proposal-form" onSubmit={onSubmit}>
      <div className="proposal-form__client">
        <input
          className="admin-input"
          placeholder="Nombre del cliente"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <input
          className="admin-input"
          placeholder="Dirección"
          value={clientAddress}
          onChange={(e) => setClientAddress(e.target.value)}
        />
      </div>

      <div className="proposal-form__items">
        {itemsWithCalc.map((item) => (
          <LineItemRow
            key={item.id}
            item={item}
            rates={rates}
            subtotal={item.subtotal}
            onChange={handleItemChange}
            onRemove={handleRemoveItem}
            canRemove={items.length > 1}
          />
        ))}
      </div>

      <button
        type="button"
        className="admin-btn admin-btn--secondary proposal-form__add"
        onClick={handleAddItem}
        disabled={ratesLoading}
      >
        + Agregar línea
      </button>

      <div className="proposal-form__execution">
        <div className="proposal-form__execution-field">
          <label className="line-item__label">Semanas de ejecución</label>
          <input
            className="admin-input proposal-form__weeks"
            type="number"
            min="0"
            step="1"
            placeholder="0"
            value={executionWeeks}
            onChange={(e) => setExecutionWeeks(e.target.value)}
          />
        </div>

        <div className="proposal-form__execution-subtotal">
          <span className="line-item__label">
            {`Subtotal (${currency(weekRatePrice)}/semana)`}
          </span>
          <span className="line-item__subtotal-value">{currency(executionSubtotal)}</span>
        </div>
      </div>

      <div className="proposal-form__total">
        <span>Total</span>
        <strong>{currency(total)}</strong>
      </div>

      {err && <p className="alert-error">{err}</p>}

      <button
        className="admin-btn admin-btn--primary proposal-form__submit"
        type="submit"
        disabled={submitting || ratesLoading || executionRateLoading}
      >
        {submitting
          ? isEditing
            ? "Guardando…"
            : "Generando…"
          : isEditing
          ? "Guardar cambios y PDF"
          : "Generar propuesta y PDF"}
      </button>
    </form>
  );
}
