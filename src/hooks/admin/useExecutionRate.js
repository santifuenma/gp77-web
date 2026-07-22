import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";

// Precio de ejemplo usado mientras Supabase no esté configurado (Fase A),
// mismo criterio que useCrackRates.
const MOCK_RATE = { price_per_week: 500 };

export function useExecutionRate() {
  const [rate, setRate] = useState(isSupabaseConfigured ? null : MOCK_RATE);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let active = true;
    supabase
      .from("execution_rate")
      .select("*")
      .single()
      .then(({ data, error: fetchError }) => {
        if (!active) return;
        if (fetchError) setError(fetchError.message);
        else setRate(data);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const updateRate = async (price_per_week) => {
    if (!isSupabaseConfigured) {
      setRate((prev) => ({ ...prev, price_per_week }));
      return { error: null };
    }

    const { error: updateError } = await supabase
      .from("execution_rate")
      .update({ price_per_week })
      .eq("id", true);

    if (!updateError) {
      setRate((prev) => ({ ...prev, price_per_week }));
    }

    return { error: updateError };
  };

  return { rate, loading, error, updateRate };
}
