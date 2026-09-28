create table if not exists orders (id text primary key, amount_total numeric, escrow_status text default 'holding_insured', created_at timestamptz default now());
create table if not exists escrow_documents (id uuid primary key default gen_random_uuid(), order_id text, type text, bol_number text, identifier_scanned text, verified boolean default true, verified_at timestamptz default now(), created_at timestamptz default now());
create table if not exists escrow_releases (id uuid primary key default gen_random_uuid(), order_id text, milestone text, amount numeric, recipient_code text, paystack_transfer_ref text, auto_triggered boolean default true, insurance_policy text, description text, created_at timestamptz default now());
alter table orders enable row level security; alter table escrow_documents enable row level security; alter table escrow_releases enable row level security;
create policy "Allow all" on orders for all using (true) with check (true);
create policy "Allow all" on escrow_documents for all using (true) with check (true);
create policy "Allow all" on escrow_releases for all using (true) with check (true);
