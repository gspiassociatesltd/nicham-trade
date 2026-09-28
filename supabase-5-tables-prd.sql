-- NiChAm Trade PRD MVP - 5 Tables
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text default 'china',
  landed_cost_ngn numeric not null,
  is_new_invention boolean default false,
  icon text default '⚡',
  badge text,
  created_at timestamptz default now()
);
create table if not exists africanies_quotes (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id),
  product_title text,
  customer_name text not null,
  phone text not null,
  quantity integer default 1,
  location text,
  self_clear boolean default false,
  delivery_type text generated always as (case when self_clear then 'SELF-CLEAR' else 'FULL' end) stored,
  platform_fee_ngn integer generated always as (case when self_clear then 35000 else 85000 end) stored,
  status text default 'new',
  created_at timestamptz default now()
);
create table if not exists whatsapp_logs (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid references africanies_quotes(id),
  phone text,
  message text,
  wa_url text,
  created_at timestamptz default now()
);
create table if not exists scout_requests (
  id uuid primary key default gen_random_uuid(),
  request_code text unique not null,
  title text not null,
  description text,
  status text default 'scouting',
  waitlist_count integer default 0,
  target_price_ngn numeric,
  rejection_reason text,
  icon text default '🔭',
  created_at timestamptz default now()
);
create table if not exists waitlists (
  id uuid primary key default gen_random_uuid(),
  scout_request_id uuid references scout_requests(id) on delete cascade,
  customer_name text not null,
  phone text not null,
  location text,
  created_at timestamptz default now()
);
alter table products enable row level security;
alter table africanies_quotes enable row level security;
alter table whatsapp_logs enable row level security;
alter table scout_requests enable row level security;
alter table waitlists enable row level security;
drop policy if exists "Public read products" on products; create policy "Public read products" on products for select using (true);
drop policy if exists "Public read scouting" on scout_requests; create policy "Public read scouting" on scout_requests for select using (status in ('scouting','quoted','available'));
drop policy if exists "Public insert quotes" on africanies_quotes; create policy "Public insert quotes" on africanies_quotes for insert with check (true);
drop policy if exists "Public insert waitlists" on waitlists; create policy "Public insert waitlists" on waitlists for insert with check (true);
drop policy if exists "Public insert whatsapp_logs" on whatsapp_logs; create policy "Public insert whatsapp_logs" on whatsapp_logs for insert with check (true);
drop policy if exists "Allow all select quotes admin" on africanies_quotes; create policy "Allow all select quotes admin" on africanies_quotes for select using (true);
drop policy if exists "Allow all select waitlists admin" on waitlists; create policy "Allow all select waitlists admin" on waitlists for select using (true);
drop policy if exists "Allow all select whatsapp_logs" on whatsapp_logs; create policy "Allow all select whatsapp_logs" on whatsapp_logs for select using (true);
drop policy if exists "Admin read all scouting" on scout_requests; create policy "Admin read all scouting" on scout_requests for select using (true);
insert into products (title, description, category, landed_cost_ngn, icon, badge) values
('3KVA Hybrid Inverter - Pure Sine Wave', '24V, 80A MPPT', 'china', 280000, '⚡', 'Best Seller'),
('5KVA Must Hybrid Inverter', '48V, 100A MPPT', 'china', 450000, '⚡', 'Hot'),
('200Ah Lithium Battery - 48V', 'LiFePO4, 10 Year Warranty', 'china', 650000, '🔋', 'New'),
('450W Monocrystalline Solar Panel', 'Grade A, 25 Year Warranty', 'usa', 95000, '☀️', 'Save 15%'),
('Canoe Solar Outboard Engine - 5HP', 'New invention, waitlist only', 'china', 850000, '🛶', 'NEW INVENTION')
on conflict do nothing;
insert into scout_requests (request_code, title, description, status, waitlist_count, target_price_ngn, icon) values
('SR-001', 'Canoe Solar Outboard Engine 5HP', 'Solar powered outboard for fishing boats', 'scouting', 12, 850000, '🛶'),
('SR-002', 'Agric Spraying Drone 10L', '10L pesticide spraying drone for rice farms', 'quoted', 8, 1200000, '🚁'),
('SR-003', 'Solar Cold Room 3 Ton', '3 ton solar cold room for fish storage', 'available', 24, 2500000, '❄️')
on conflict (request_code) do nothing;
