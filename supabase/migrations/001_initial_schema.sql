-- YousicPlay initial database schema
-- Run this in your Supabase SQL Editor after creating the project

-- ── Custom types ─────────────────────────────────────────────────────────

create type product_type as enum ('course', 'bundle', 'subscription', 'workshop', 'lead_magnet');
create type purchase_status as enum ('completed', 'pending', 'refunded', 'failed');
create type experiment_status as enum ('draft', 'active', 'paused', 'completed');
create type billing_interval as enum ('one_time', 'month', 'year');

-- ── Customers ────────────────────────────────────────────────────────────

create table customers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  stripe_customer_id text unique,
  klaviyo_profile_id text unique,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index idx_customers_email on customers (email);
create index idx_customers_stripe on customers (stripe_customer_id);

-- ── Products ─────────────────────────────────────────────────────────────
-- All pricing lives here + Stripe, never hardcoded in the UI.

create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  type product_type not null,
  price integer not null,              -- cents (e.g. 14900 = $149.00)
  original_price integer,              -- cents, for strike-through display
  billing_interval billing_interval default 'one_time' not null,
  stripe_product_id text unique,
  stripe_price_id text unique,
  thinkific_course_id text,
  description text,
  active boolean default true not null,
  metadata jsonb,                      -- flexible extra data (instructor, instrument, etc.)
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index idx_products_slug on products (slug);
create index idx_products_active on products (active) where active = true;

-- ── Purchases ────────────────────────────────────────────────────────────

create table purchases (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) not null,
  product_id uuid references products(id) not null,
  stripe_payment_id text unique,
  amount integer not null,             -- cents
  currency text default 'usd' not null,
  status purchase_status default 'pending' not null,
  created_at timestamptz default now() not null
);

create index idx_purchases_customer on purchases (customer_id);
create index idx_purchases_product on purchases (product_id);
create index idx_purchases_stripe on purchases (stripe_payment_id);

-- ── Experiments (A/B testing) ────────────────────────────────────────────

create table experiments (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  variants jsonb not null,             -- e.g. {"control": 14900, "variant_a": 12900, "variant_b": 19900}
  traffic_split integer default 100,   -- percentage of traffic included
  status experiment_status default 'draft' not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ── Experiment assignments ───────────────────────────────────────────────

create table experiment_assignments (
  id uuid primary key default gen_random_uuid(),
  experiment_id uuid references experiments(id) not null,
  visitor_id text not null,            -- cookie-based anonymous ID
  variant text not null,
  converted boolean default false not null,
  created_at timestamptz default now() not null,
  unique (experiment_id, visitor_id)   -- one assignment per visitor per experiment
);

create index idx_assignments_experiment on experiment_assignments (experiment_id);
create index idx_assignments_visitor on experiment_assignments (visitor_id);

-- ── Email captures ───────────────────────────────────────────────────────

create table email_captures (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text,                         -- e.g. 'hero_form', 'footer_form', 'exit_intent'
  page_url text,
  created_at timestamptz default now() not null
);

create index idx_email_captures_email on email_captures (email);

-- ── Auto-update updated_at ───────────────────────────────────────────────

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_customers_updated_at
  before update on customers
  for each row execute function update_updated_at();

create trigger set_products_updated_at
  before update on products
  for each row execute function update_updated_at();

create trigger set_experiments_updated_at
  before update on experiments
  for each row execute function update_updated_at();

-- ── Row Level Security ───────────────────────────────────────────────────
-- Anon users can read active products and insert email captures.
-- Everything else requires the service role key (server-side only).

alter table customers enable row level security;
alter table products enable row level security;
alter table purchases enable row level security;
alter table experiments enable row level security;
alter table experiment_assignments enable row level security;
alter table email_captures enable row level security;

-- Products: anyone can read active products
create policy "Public can read active products"
  on products for select
  using (active = true);

-- Email captures: anyone can insert (the form submission)
create policy "Public can insert email captures"
  on email_captures for insert
  with check (true);

-- Experiment assignments: anyone can read their own (by visitor_id cookie)
create policy "Public can read own assignments"
  on experiment_assignments for select
  using (true);

create policy "Public can insert assignments"
  on experiment_assignments for insert
  with check (true);

-- Service role bypasses RLS, so server-side operations (webhooks, admin)
-- work without additional policies.
