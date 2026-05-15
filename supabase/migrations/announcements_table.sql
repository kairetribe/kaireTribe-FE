create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  body text not null,
  audience jsonb not null default '{}'::jsonb,
  send_to_everyone boolean not null default false,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists announcements_created_at_idx on public.announcements (created_at desc);

drop trigger if exists announcements_set_updated_at on public.announcements;
create trigger announcements_set_updated_at
before update on public.announcements
for each row execute function public.set_updated_at();

alter table public.announcements enable row level security;

drop policy if exists "Admins can manage announcements" on public.announcements;
create policy "Admins can manage announcements"
on public.announcements
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());
