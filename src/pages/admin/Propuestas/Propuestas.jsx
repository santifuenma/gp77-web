import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { listProposals, getProposalWithItems } from "../../../lib/proposals";
import { generateProposalPdf } from "../../../lib/pdf/generateProposalPdf";
import "./Propuestas.css";

const currency = (value) =>
  `$${Number(value || 0).toLocaleString("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function Propuestas() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    listProposals().then(({ data }) => {
      setProposals(data || []);
      setLoading(false);
    });
  }, []);

  const handleDownload = async (proposal) => {
    setDownloadingId(proposal.id);
    const { data } = await getProposalWithItems(proposal.id);
    await generateProposalPdf(data || proposal);
    setDownloadingId(null);
  };

  return (
    <div className="propuestas-page">
      <Helmet>
        <title>Propuestas | Admin GP77</title>
      </Helmet>

      <div className="propuestas-page__header">
        <h1 className="admin-title">Generador de Propuestas</h1>
        <Link
          to="/admin/propuestas/nueva"
          className="admin-btn admin-btn--primary propuestas-page__new"
        >
          + Nueva propuesta
        </Link>
      </div>

      {loading && <p className="propuestas-page__empty">Cargando…</p>}

      {!loading && proposals.length === 0 && (
        <p className="propuestas-page__empty">
          Aún no has generado ninguna propuesta.
        </p>
      )}

      {!loading && proposals.length > 0 && (
        <div className="propuestas-list">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="propuesta-row">
              <div className="propuesta-row__info">
                <p className="propuesta-row__client">{proposal.client_name}</p>
                <p className="propuesta-row__meta">
                  {proposal.client_address} ·{" "}
                  {new Date(proposal.created_at).toLocaleDateString("es-VE")}
                </p>
              </div>
              <div className="propuesta-row__right">
                <span className="propuesta-row__total">{currency(proposal.total)}</span>
                <button
                  type="button"
                  className="admin-btn admin-btn--secondary propuesta-row__download"
                  onClick={() => handleDownload(proposal)}
                  disabled={downloadingId === proposal.id}
                >
                  {downloadingId === proposal.id ? "…" : "PDF"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
