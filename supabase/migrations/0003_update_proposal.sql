-- GP77 Admin — editar propuestas ya generadas
-- Aplicar a mano en el SQL Editor de Supabase, igual que las anteriores.

-- ============================================================
-- update_proposal: recalcula el total de una propuesta existente
-- contra las tarifas vigentes y reemplaza sus líneas. Mismo criterio
-- de cálculo que create_proposal, pero sobre un id ya existente.
-- ============================================================
create or replace function update_proposal(
  p_proposal_id uuid,
  p_client_name text,
  p_client_address text,
  p_items jsonb,
  p_execution_weeks numeric default 0
)
returns proposals
language plpgsql
security invoker
as $$
declare
  v_proposal proposals;
  v_total numeric(12, 2) := 0;
  v_item jsonb;
  v_rate numeric(10, 2);
  v_subtotal numeric(12, 2);
  v_week_rate numeric(10, 2);
  v_execution_subtotal numeric(12, 2);
begin
  if jsonb_array_length(p_items) = 0 then
    raise exception 'La propuesta debe tener al menos una línea';
  end if;

  for v_item in select * from jsonb_array_elements(p_items)
  loop
    select price_per_m2 into v_rate
    from crack_rates
    where severity = (v_item->>'severity');

    if v_rate is null then
      raise exception 'Tipo de grieta inválido: %', (v_item->>'severity');
    end if;

    v_subtotal := v_rate * (v_item->>'area_m2')::numeric;
    v_total := v_total + v_subtotal;
  end loop;

  select price_per_week into v_week_rate from execution_rate where id = true;
  v_week_rate := coalesce(v_week_rate, 0);
  v_execution_subtotal := v_week_rate * coalesce(p_execution_weeks, 0);
  v_total := v_total + v_execution_subtotal;

  update proposals
  set client_name = p_client_name,
      client_address = p_client_address,
      total = v_total,
      execution_weeks = coalesce(p_execution_weeks, 0),
      execution_rate_snapshot = v_week_rate,
      execution_subtotal = v_execution_subtotal
  where id = p_proposal_id
  returning * into v_proposal;

  if not found then
    raise exception 'Propuesta no encontrada: %', p_proposal_id;
  end if;

  delete from proposal_items where proposal_id = p_proposal_id;

  for v_item in select * from jsonb_array_elements(p_items)
  loop
    select price_per_m2 into v_rate
    from crack_rates
    where severity = (v_item->>'severity');

    v_subtotal := v_rate * (v_item->>'area_m2')::numeric;

    insert into proposal_items (proposal_id, severity, area_m2, rate_snapshot, subtotal)
    values (p_proposal_id, (v_item->>'severity'), (v_item->>'area_m2')::numeric, v_rate, v_subtotal);
  end loop;

  return v_proposal;
end;
$$;
