import React from "react";
import { pdf } from "@react-pdf/renderer";
import ProposalPdfTemplate from "./proposalPdfTemplate";

function slugify(text) {
  return text
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .toLowerCase();
}

export async function generateProposalPdf(proposal) {
  const blob = await pdf(<ProposalPdfTemplate proposal={proposal} />).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `propuesta-${slugify(proposal.client_name || "cliente")}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
