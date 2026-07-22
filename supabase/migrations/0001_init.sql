-- GP77 Admin — esquema inicial
-- Aplicar a mano en el SQL Editor de Supabase (Project -> SQL Editor -> New query).
-- No requiere la CLI de Supabase ni Docker.

-- ============================================================
-- crack_rates: tarifas por m2 según severidad de la grieta.
-- Editable desde /admin/tarifas. Sembrada con las 3 severidades.
-- ============================================================
create table if not exists crack_rates (
  severity text primary key check (severity in ('A', 'B', 'C')),
  label text not null,
  price_per_m2 numeric(10, 2) not null check (price_per_m2 >= 0),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

insert into crack_rates (severity, label, price_per_m2)
values
  ('A', 'Leve', 25.00),
  ('B', 'Moderada', 45.00),
  ('C', 'Grave', 80.00)
on conflict (severity) do nothing;

-- ============================================================
-- proposals: una propuesta generada para un cliente.
-- ============================================================
create table if not exists proposals (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  client_address text not null,
  total numeric(12, 2) not null check (total >= 0),
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id)
);

-- ============================================================
-- proposal_items: líneas de una propuesta (tipo de grieta + m2).
-- rate_snapshot guarda el precio vigente al momento de crear la
-- propuesta, para que un cambio posterior en crack_rates no altere
-- el total de propuestas ya generadas.
-- ============================================================
create table if not exists proposal_items (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references proposals(id) on delete cascade,
  severity text not null references crack_rates(severity),
  area_m2 numeric(10, 2) not null check (area_m2 > 0),
  rate_snapshot numeric(10, 2) not null check (rate_snapshot >= 0),
  subtotal numeric(12, 2) not null check (subtotal >= 0)
);

create index if not exists proposal_items_proposal_id_idx
  on proposal_items (proposal_id);

-- ============================================================
-- RLS: herramienta interna de un solo rol (arquitectos).
-- Cualquier usuario autenticado puede leer/escribir todo.
-- Sin política para "anon" => acceso denegado por defecto.
-- ============================================================
alter table crack_rates enable row level security;
alter table proposals enable row level security;
alter table proposal_items enable row level security;

drop policy if exists "authenticated full access" on crack_rates;
create policy "authenticated full access" on crack_rates
  for all to authenticated using (true) with check (true);

drop policy if exists "authenticated full access" on proposals;
create policy "authenticated full access" on proposals
  for all to authenticated using (true) with check (true);

drop policy if exists "authenticated full access" on proposal_items;
create policy "authenticated full access" on proposal_items
  for all to authenticated using (true) with check (true);

-- ============================================================
-- create_proposal: inserta la propuesta + todas sus líneas en una
-- sola transacción, para que una conexión inestable desde el celular
-- no deje una propuesta guardada sin sus líneas.
--
-- p_items shape esperado (jsonb array):
--   [{ "severity": "A", "area_m2": 12.5 }, ...]
-- ============================================================
create or replace function create_proposal(
  p_client_name text,
  p_client_address text,
  p_items jsonb
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

  insert into proposals (client_name, client_address, total, created_by)
  values (p_client_name, p_client_address, v_total, auth.uid())
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
