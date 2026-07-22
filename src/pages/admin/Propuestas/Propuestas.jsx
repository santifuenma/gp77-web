import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { listProposals, getProposalWithItems } from "../../../lib/proposals";
import { generateProposalPdf, shareProposalPdf } from "../../../lib/pdf/generateProposalPdf";
import Modal from "../../../components/admin/Modal/Modal";
import TarifasEditor from "../../../components/admin/TarifasEditor/TarifasEditor";
import "./Propuestas.css";

const currency = (value) =>
  `$${Number(value || 0).toLocaleString("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function Propuestas() {
  const location = useLocation();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  const [sharingId, setSharingId] = useState(null);
  const canShareFiles = typeof navigator !== "undefined" && Boolean(navigator.canShare);
  const [showTarifas, setShowTarifas] = useState(false);
  const [successClient, setSuccessClient] = useState(
    () => location.state?.successClient || null
  );
  const successAction = location.state?.successAction || "generada";

  useEffect(() => {
    listProposals().then(({ data }) => {
      setProposals(data || []);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!successClient) return;
    const timer = setTimeout(() => setSuccessClient(null), 6000);
    return () => clearTimeout(timer);
  }, [successClient]);

  const handleDownload = async (proposal) => {
    setDownloadingId(proposal.id);
    const { data } = await getProposalWithItems(proposal.id);
    await generateProposalPdf(data || proposal);
    setDownloadingId(null);
  };

  const handleShare = async (proposal) => {
    setSharingId(proposal.id);
    const { data } = await getProposalWithItems(proposal.id);
    await shareProposalPdf(data || proposal);
    setSharingId(null);
  };

  return (
    <div className="propuestas-page">
      <Helmet>
        <title>Propuestas | Admin GP77</title>
      </Helmet>

      <div className="propuestas-page__header">
        <div>
          <h1 className="admin-title">Generador de Propuestas</h1>
          {!loading && (
            <p className="admin-lead propuestas-page__count">
              {proposals.length === 0
                ? "Ninguna propuesta generada todavía"
                : proposals.length === 1
                ? "1 propuesta generada"
                : `${proposals.length} propuestas generadas`}
            </p>
          )}
        </div>
        <div className="propuestas-page__actions">
          <button
            type="button"
            className="admin-btn admin-btn--secondary"
            onClick={() => setShowTarifas(true)}
          >
            Tarifas
          </button>
          <Link
            to="/admin/propuestas/nueva"
            className="admin-btn admin-btn--primary propuestas-page__new"
          >
            + Nueva propuesta
          </Link>
        </div>
      </div>

      {successClient && (
        <p className="alert-success propuestas-page__banner">
          Propuesta para <strong>{successClient}</strong> {successAction} correctamente. El PDF se descargó a tu carpeta de descargas.
          <button
            type="button"
            className="propuestas-page__banner-close"
            onClick={() => setSuccessClient(null)}
            aria-label="Cerrar aviso"
          >
            ✕
          </button>
        </p>
      )}

      {showTarifas && (
        <Modal title="Tarifas" onClose={() => setShowTarifas(false)}>
          <TarifasEditor />
        </Modal>
      )}

      <div className="admin-panel admin-panel--flush propuestas-list">
        {loading && <p className="propuestas-page__empty">Cargando…</p>}

        {!loading && proposals.length === 0 && (
          <div className="propuestas-page__empty">
            <p className="propuestas-page__empty-title">Aún no hay propuestas</p>
            <p className="propuestas-page__empty-desc">
              Usa "+ Nueva propuesta" para calcular el presupuesto de tu
              primer cliente y generar el PDF.
            </p>
          </div>
        )}

        {!loading &&
          proposals.length > 0 &&
          proposals.map((proposal) => (
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
                <div className="propuesta-row__buttons">
                  <Link
                    to={`/admin/propuestas/${proposal.id}/editar`}
                    className="admin-btn admin-btn--secondary propuesta-row__download"
                  >
                    Editar
                  </Link>
                  {canShareFiles && (
                    <button
                      type="button"
                      className="admin-btn admin-btn--secondary propuesta-row__download"
                      onClick={() => handleShare(proposal)}
                      disabled={sharingId === proposal.id}
                    >
                      {sharingId === proposal.id ? "…" : "Compartir"}
                    </button>
                  )}
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
            </div>
          ))}
      </div>
    </div>
  );
}
