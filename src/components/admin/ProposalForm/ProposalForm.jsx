import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCrackRates } from "../../../hooks/admin/useCrackRates";
import { createProposal } from "../../../lib/proposals";
import { generateProposalPdf } from "../../../lib/pdf/generateProposalPdf";
import LineItemRow from "./LineItemRow";
import "./ProposalForm.css";

let nextId = 1;
const newItem = (severity) => ({ id: nextId++, severity: severity || "", area_m2: "" });

export default function ProposalForm() {
  const { rates, loading: ratesLoading } = useCrackRates();
  const navigate = useNavigate();

  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [items, setItems] = useState([newItem()]);
  const [err, setErr] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  const total = itemsWithCalc.reduce((sum, item) => sum + item.subtotal, 0);

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

    const { data, error } = await createProposal({
      clientName,
      clientAddress,
      items: payloadItems,
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
    });

    navigate("/admin/propuestas", { state: { successClient: clientName } });
  };

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

      <div className="proposal-form__total">
        <span>Total</span>
        <strong>
          {`$${total.toLocaleString("es-VE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
        </strong>
      </div>

      {err && <p className="alert-error">{err}</p>}

      <button
        className="admin-btn admin-btn--primary proposal-form__submit"
        type="submit"
        disabled={submitting || ratesLoading}
      >
        {submitting ? "Generando…" : "Generar propuesta y PDF"}
      </button>
    </form>
  );
}
