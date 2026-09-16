create table if not exists public.inquiries (
  id text primary key,
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text,
  interest text not null default 'General Inquiry',
  timeline text not null default 'Flexible',
  budget text,
  message text not null,
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
