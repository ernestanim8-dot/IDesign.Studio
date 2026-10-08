-- Supabase Database Schema (PostgreSQL) for iDESIGN Studio
-- Run this script in your Supabase Dashboard: SQL Editor > New query > Run.

-- 1. Client Inquiries
create table if not exists public.inquiries (
  id text primary key,
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text,
  interest text not null default 'General Inquiry',
  timeline text not null default 'Flexible',
  budget text,
  message text not null default 'General inquiry',
  status text not null default 'New'
);

create index if not exists inquiries_created_at_idx
  on public.inquiries (created_at desc);

alter table public.inquiries enable row level security;
revoke all on public.inquiries from anon;
revoke all on public.inquiries from authenticated;
grant all on public.inquiries to service_role;

drop policy if exists "service role can manage inquiries" on public.inquiries;
create policy "service role can manage inquiries"
  on public.inquiries
  for all
  to service_role
  using (true)
  with check (true);

-- 2. Client Testimonials & Reviews
create table if not exists public.testimonials (
  id text primary key,
  created_at timestamptz not null default now(),
  name text not null,
  role text default 'Client',
  company text default 'Verified Partner',
  avatar text default 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  quote text not null,
  rating numeric not null default 5,
  project text default 'Creative Studio Engagement',
  date text default 'Recently'
);

create index if not exists testimonials_created_at_idx
  on public.testimonials (created_at desc);

alter table public.testimonials enable row level security;

-- Testimonials can be read publicly by anyone, but only managed by service_role
grant select on public.testimonials to anon, authenticated;
grant all on public.testimonials to service_role;

drop policy if exists "public can read testimonials" on public.testimonials;
create policy "public can read testimonials"
  on public.testimonials
  for select
  to anon, authenticated
  using (true);

drop policy if exists "service role can manage testimonials" on public.testimonials;
create policy "service role can manage testimonials"
  on public.testimonials
  for all
  to service_role
  using (true)
  with check (true);

-- 3. Live Studio Performance Metrics
create table if not exists public.studio_stats (
  id text primary key default 'primary',
  updated_at timestamptz not null default now(),
  projects_completed integer not null default 340,
  happy_clients integer not null default 80,
  client_satisfaction text not null default '100%',
  years_experience integer not null default 4,
  services_offered integer not null default 4,
  active_inquiries_this_week integer not null default 0
);

alter table public.studio_stats enable row level security;

grant select on public.studio_stats to anon, authenticated;
grant all on public.studio_stats to service_role;

drop policy if exists "public can read stats" on public.studio_stats;
create policy "public can read stats"
  on public.studio_stats
  for select
  to anon, authenticated
  using (true);

drop policy if exists "service role can manage stats" on public.studio_stats;
create policy "service role can manage stats"
  on public.studio_stats
  for all
  to service_role
  using (true)
  with check (true);

-- Seed initial studio stats if not already present
insert into public.studio_stats (
  id,
  projects_completed,
  happy_clients,
  client_satisfaction,
  years_experience,
  services_offered,
  active_inquiries_this_week
) values (
  'primary',
  340,
  80,
  '100%',
  4,
  4,
  0
) on conflict (id) do nothing;

