
-- AUTO INSURED ESCROW SYSTEM - NO MANUAL PAYMENT INSTRUCTION

create table if not exists orders (
  id text primary key,
  customer_email text,
  paystack_reference text unique,
  amount_total numeric,
  amount_paid numeric,
  payment_status text default 'paid_full',
  escrow_status text default 'holding_insured',
  escrow_balance numeric default 0,
  insurance_policy text,
  created_at timestamptz default now()
);

create table if not exists escrow_documents (
  id uuid primary key default gen_random_uuid(),
  order_id text references orders(id),
  type text, -- bill_of_lading, delivery_proof
  file_name text,
  file_url text,
  bol_number text,
  identifier_scanned text,
  customer_phone text,
  verified boolean default false,
  verified_at timestamptz,
  uploaded_by text,
  created_at timestamptz default now()
);

create table if not exists escrow_releases (
  id uuid primary key default gen_random_uuid(),
  order_id text references orders(id),
  milestone text, -- initial_20, bol_40, delivery_40
  amount numeric,
  recipient_code text,
  paystack_transfer_ref text,
  auto_triggered boolean default true,
  insurance_policy text,
  description text,
  created_at timestamptz default now()
);

create table if not exists paystack_events (
  id uuid primary key default gen_random_uuid(),
  reference text,
  amount numeric,
  email text,
  event_type text,
  raw jsonb,
  created_at timestamptz default now()
);

alter table orders enable row level security;
alter table escrow_documents enable row level security;
alter table escrow_releases enable row level security;
alter table paystack_events enable row level security;

create policy "Allow all" on orders for all using (true) with check (true);
create policy "Allow all" on escrow_documents for all using (true) with check (true);
create policy "Allow all" on escrow_releases for all using (true) with check (true);
create policy "Allow all" on paystack_events for all using (true) with check (true);
