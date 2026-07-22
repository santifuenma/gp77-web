-- GP77 Admin — semanas de ejecución
-- Aplicar a mano en el SQL Editor de Supabase, igual que 0001_init.sql.

-- ============================================================
-- execution_rate: monto fijo por semana de ejecución del proyecto.
-- Tabla singleton (una sola fila) editable desde /admin/tarifas.
-- ============================================================
create table if not exists execution_rate (
  id boolean primary key default true check (id),
  price_per_week numeric(10, 2) not null check (price_per_week >= 0),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

insert into execution_rate (id, price_per_week)
values (true, 500.00)
on conflict (id) do nothing;

alter table execution_rate enable row level security;

drop policy if exists "authenticated full access" on execution_rate;
create policy "authenticated full access" on execution_rate
  for all to authenticated using (true) with check (true);

-- ============================================================
-- proposals: guarda las semanas de ejecución cotizadas y el precio
-- vigente al momento de crear la propuesta (mismo criterio que
-- rate_snapshot en proposal_items).
-- ============================================================
alter table proposals
  add column if not exists execution_weeks numeric(10, 2) not null default 0,
  add column if not exists execution_rate_snapshot numeric(10, 2) not null default 0,
  add column if not exists execution_subtotal numeric(12, 2) not null default 0;

-- ============================================================
-- create_proposal: se reemplaza para sumar semanas de ejecución al
-- total. Se elimina la versión anterior porque agregar un parámetro
-- cambia la firma de la función.
-- ============================================================
drop function if exists create_proposal(text, text, jsonb);

create or replace function create_proposal(
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

  -- Calcula el total sumando cada línea contra la tarifa vigente.
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

  insert into proposals (
    client_name, client_address, total,
    execution_weeks, execution_rate_snapshot, execution_subtotal,
    created_by
  )
  values (
    p_client_name, p_client_address, v_total,
    coalesce(p_execution_weeks, 0), v_week_rate, v_execution_subtotal,
    auth.uid()
  )
  returning * into v_proposal;

  for v_item in select * from jsonb_array_elements(p_items)
  loop
    select price_per_m2 into v_rate
    from crack_rates
    where severity = (v_item->>'severity');

    v_subtotal := v_rate * (v_item->>'area_m2')::numeric;

    insert into proposal_items (proposal_id, severity, area_m2, rate_snapshot, subtotal)
    values (v_proposal.id, (v_item->>'severity'), (v_item->>'area_m2')::numeric, v_rate, v_subtotal);
  end loop;

  return v_proposal;
end;
$$;
