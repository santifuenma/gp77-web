import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";

// Datos de ejemplo usados mientras Supabase no esté configurado (Fase A).
// En cuanto VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY existan, este hook
// empieza a leer/escribir la tabla real sin que haya que tocar los
// componentes que lo consumen (ProposalForm, TarifasEditor).
const MOCK_RATES = [
  { severity: "A", label: "Leve", price_per_m2: 25 },
  { severity: "B", label: "Moderada", price_per_m2: 45 },
  { severity: "C", label: "Grave", price_per_m2: 80 },
];

export function useCrackRates() {
  const [rates, setRates] = useState(isSupabaseConfigured ? [] : MOCK_RATES);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let active = true;
    supabase
      .from("crack_rates")
      .select("*")
      .order("severity")
      .then(({ data, error: fetchError }) => {
        if (!active) return;
        if (fetchError) setError(fetchError.message);
        else setRates(data);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const updateRate = async (severity, price_per_m2) => {
    if (!isSupabaseConfigured) {
      setRates((prev) =>
        prev.map((r) => (r.severity === severity ? { ...r, price_per_m2 } : r))
      );
      return { error: null };
    }

    const { error: updateError } = await supabase
      .from("crack_rates")
      .update({ price_per_m2 })
      .eq("severity", severity);

    if (!updateError) {
      setRates((prev) =>
        prev.map((r) => (r.severity === severity ? { ...r, price_per_m2 } : r))
      );
    }

    return { error: updateError };
  };

  return { rates, loading, error, updateRate };
}
