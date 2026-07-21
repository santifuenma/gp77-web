import { supabase, isSupabaseConfigured } from "./supabaseClient";

// Guardado en memoria mientras Supabase no esté configurado (Fase A).
// Se pierde al recargar la página — es solo para poder construir y
// probar la UI antes de tener un proyecto de Supabase real.
let mockProposals = [];

export async function createProposal({ clientName, clientAddress, items }) {
  if (!isSupabaseConfigured) {
    const total = items.reduce((sum, item) => sum + item.subtotal, 0);
    const proposal = {
      id: `mock-${Date.now()}`,
      client_name: clientName,
      client_address: clientAddress,
      total,
      created_at: new Date().toISOString(),
      items,
    };
    mockProposals = [proposal, ...mockProposals];
    return { data: proposal, error: null };
  }

  const { data, error } = await supabase.rpc("create_proposal", {
    p_client_name: clientName,
    p_client_address: clientAddress,
    p_items: items.map((item) => ({
      severity: item.severity,
      area_m2: item.area_m2,
    })),
  });

  return { data, error };
}

export async function listProposals() {
  if (!isSupabaseConfigured) {
    return { data: mockProposals, error: null };
  }

  const { data, error } = await supabase
    .from("proposals")
    .select("*")
    .order("created_at", { ascending: false });

  return { data, error };
}

export async function getProposalWithItems(id) {
  if (!isSupabaseConfigured) {
    const found = mockProposals.find((proposal) => proposal.id === id);
    return {
      data: found ?? null,
      error: found ? null : new Error("Propuesta no encontrada"),
    };
  }

  const { data: proposal, error: proposalError } = await supabase
    .from("proposals")
    .select("*")
    .eq("id", id)
    .single();

  if (proposalError) return { data: null, error: proposalError };

  const { data: items, error: itemsError } = await supabase
    .from("proposal_items")
    .select("*")
    .eq("proposal_id", id);

  if (itemsError) return { data: null, error: itemsError };

  return { data: { ...proposal, items }, error: null };
}
