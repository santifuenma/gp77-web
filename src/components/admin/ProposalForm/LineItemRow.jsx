import React from "react";

const currency = (value) =>
  `$${Number(value || 0).toLocaleString("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function LineItemRow({ item, rates, subtotal, onChange, onRemove, canRemove }) {
  return (
    <div className="line-item">
      <div className="line-item__field">
        <label className="line-item__label">Tipo de grieta</label>
        <select
          className="admin-input line-item__select"
          value={item.severity}
          onChange={(e) => onChange(item.id, { severity: e.target.value })}
        >
          {rates.map((rate) => (
            <option key={rate.severity} value={rate.severity}>
              {rate.severity} — {rate.label}
            </option>
          ))}
        </select>
      </div>

      <div className="line-item__field">
        <label className="line-item__label">m²</label>
        <input
          className="admin-input line-item__area"
          type="number"
          min="0"
          step="0.1"
          placeholder="0"
          value={item.area_m2}
          onChange={(e) => onChange(item.id, { area_m2: e.target.value })}
        />
      </div>

      <div className="line-item__subtotal">
        <span className="line-item__label">Subtotal</span>
        <span className="line-item__subtotal-value">{currency(subtotal)}</span>
      </div>

      <button
        type="button"
        className="admin-btn admin-btn--ghost line-item__remove"
        onClick={() => onRemove(item.id)}
        disabled={!canRemove}
        aria-label="Quitar línea"
      >
        ✕
      </button>
    </div>
  );
}
