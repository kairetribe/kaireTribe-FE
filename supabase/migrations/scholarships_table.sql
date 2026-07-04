-- Scholarships table + storage policies for kaire-tribe/scholarship-image

create table if not exists public.scholarships (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  sponsor_name text not null,
  opening_date date not null,
  closing_date date not null,
  scholarship_type text not null,
  open_to text not null,
  link text not null,
  details text not null,
  image_path text not null,
  image_url text not null,
  status text not null default 'active' check (status in ('active', 'closed')),
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint scholarships_closing_after_opening check (closing_date >= opening_date)
);

create index if not exists scholarships_created_at_idx on public.scholarships (created_at desc);
create index if not exists scholarships_status_idx on public.scholarships (status);
create index if not exists scholarships_slug_idx on public.scholarships (slug);

drop trigger if exists scholarships_set_updated_at on public.scholarships;
create trigger scholarships_set_updated_at
before update on public.scholarships
for each row execute function public.set_updated_at();

alter table public.scholarships enable row level security;

drop policy if exists "Anyone can read active scholarships" on public.scholarships;
create policy "Anyone can read active scholarships"
on public.scholarships
for select
using (status = 'active');

drop policy if exists "Admins can manage scholarships" on public.scholarships;
create policy "Admins can manage scholarships"
on public.scholarships
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create table if not exists public.viewed_scholarships (
  user_id uuid not null references auth.users(id) on delete cascade,
  scholarship_id uuid not null references public.scholarships(id) on delete cascade,
  viewed_at timestamptz not null default now(),
  primary key (user_id, scholarship_id)
);

create index if not exists viewed_scholarships_user_idx on public.viewed_scholarships (user_id, viewed_at desc);

alter table public.viewed_scholarships enable row level security;

drop policy if exists "Users read own viewed scholarships" on public.viewed_scholarships;
create policy "Users read own viewed scholarships"
on public.viewed_scholarships for select to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users record viewed scholarships" on public.viewed_scholarships;
create policy "Users record viewed scholarships"
on public.viewed_scholarships for insert to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users update own viewed scholarships" on public.viewed_scholarships;
create policy "Users update own viewed scholarships"
on public.viewed_scholarships for update to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Admins read all viewed scholarships" on public.viewed_scholarships;
create policy "Admins read all viewed scholarships"
on public.viewed_scholarships for select to authenticated
using (public.is_admin());

-- Storage bucket (public read for scholarship images on the site)
insert into storage.buckets (id, name, public)
values ('kaire-tribe', 'kaire-tribe', true)
on conflict (id) do update set public = true;

drop policy if exists "Public read scholarship images" on storage.objects;
create policy "Public read scholarship images"
on storage.objects
for select
to public
using (
  bucket_id = 'kaire-tribe'
  and name like 'scholarship-image/%'
);

drop policy if exists "Admins upload scholarship images" on storage.objects;
create policy "Admins upload scholarship images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'kaire-tribe'
  and name like 'scholarship-image/%'
  and public.is_admin()
);

drop policy if exists "Admins update scholarship images" on storage.objects;
create policy "Admins update scholarship images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'kaire-tribe'
  and name like 'scholarship-image/%'
  and public.is_admin()
)
with check (
  bucket_id = 'kaire-tribe'
  and name like 'scholarship-image/%'
  and public.is_admin()
);

drop policy if exists "Admins delete scholarship images" on storage.objects;
create policy "Admins delete scholarship images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'kaire-tribe'
  and name like 'scholarship-image/%'
  and public.is_admin()
);
