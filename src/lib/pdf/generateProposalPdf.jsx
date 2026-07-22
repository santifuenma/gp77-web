import React from "react";
import { pdf } from "@react-pdf/renderer";
import ProposalPdfTemplate from "./proposalPdfTemplate";

function slugify(text) {
  return text
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .toLowerCase();
}

async function buildProposalPdfFile(proposal) {
  const blob = await pdf(<ProposalPdfTemplate proposal={proposal} />).toBlob();
  const filename = `propuesta-${slugify(proposal.client_name || "cliente")}.pdf`;
  return { blob, filename };
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function generateProposalPdf(proposal) {
  const { blob, filename } = await buildProposalPdfFile(proposal);
  downloadBlob(blob, filename);
}

// Comparte solo el archivo del PDF (sin URL ni texto) usando el share
// nativo del sistema, para que al reenviarlo por WhatsApp u otra app no
// vaya acompañado de un link — un blob: además no funciona fuera de esta
// pestaña, así que ese "link" nunca sirvió para el destinatario.
export async function shareProposalPdf(proposal) {
  const { blob, filename } = await buildProposalPdfFile(proposal);
  const file = new File([blob], filename, { type: "application/pdf" });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file] });
      return;
    } catch (shareError) {
      if (shareError?.name === "AbortError") return;
    }
  }

  downloadBlob(blob, filename);
}
