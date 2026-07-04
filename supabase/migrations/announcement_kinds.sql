-- Allow users to read announcements and distinguish events from newsletters.

alter table public.announcements
add column if not exists kind text not null default 'newsletter'
check (kind in ('event', 'newsletter'));

create index if not exists announcements_kind_idx on public.announcements (kind, created_at desc);

drop policy if exists "Authenticated users can read announcements" on public.announcements;
create policy "Authenticated users can read announcements"
on public.announcements
for select
to authenticated
using (true);
