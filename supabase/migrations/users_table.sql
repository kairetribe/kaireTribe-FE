create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  email text not null unique,
  gender text,
  education_level text,
  field_of_study text,
  interest text,
  scholarship_type text,
  countries text[] not null default '{}'::text[],
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists users_email_lower_idx on public.users (lower(email));

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists users_set_updated_at on public.users;
create trigger users_set_updated_at
before update on public.users
for each row execute function public.set_updated_at();

alter table public.users enable row level security;

drop policy if exists "Users can read own profile" on public.users;
create policy "Users can read own profile"
on public.users
for select
using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.users;
create policy "Users can insert own profile"
on public.users
for insert
with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.users;
create policy "Users can update own profile"
on public.users
for update
using (auth.uid() = id)
with check (auth.uid() = id);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.users
    where id = auth.uid()
      and role = 'admin'
  );
$$;

drop policy if exists "Admins can read all profiles" on public.users;
create policy "Admins can read all profiles"
on public.users
for select
using (public.is_admin());

create or replace function public.sync_auth_user_to_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  full_name text;
  first_name_value text;
  last_name_value text;
  countries_value text[];
begin
  full_name := coalesce(new.raw_user_meta_data->>'full_name', '');
  first_name_value := coalesce(
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'given_name',
    split_part(full_name, ' ', 1),
    'Kaire'
  );
  last_name_value := coalesce(
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'family_name',
    nullif(trim(substring(full_name from length(first_name_value) + 1)), ''),
    'User'
  );
  countries_value := array(
    select jsonb_array_elements_text(coalesce(new.raw_user_meta_data->'countries', '[]'::jsonb))
  );

  insert into public.users (
    id, email, first_name, last_name, gender, education_level, field_of_study, interest, scholarship_type, countries
  )
  values (
    new.id,
    new.email,
    first_name_value,
    last_name_value,
    new.raw_user_meta_data->>'gender',
    new.raw_user_meta_data->>'education_level',
    new.raw_user_meta_data->>'field_of_study',
    new.raw_user_meta_data->>'interest',
    new.raw_user_meta_data->>'scholarship_type',
    coalesce(countries_value, '{}'::text[])
  )
  on conflict (id) do update set
    email = excluded.email,
    first_name = excluded.first_name,
    last_name = excluded.last_name,
    gender = excluded.gender,
    education_level = excluded.education_level,
    field_of_study = excluded.field_of_study,
    interest = excluded.interest,
    scholarship_type = excluded.scholarship_type,
    countries = excluded.countries,
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.sync_auth_user_to_profile();

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
after update of email, raw_user_meta_data on auth.users
for each row execute procedure public.sync_auth_user_to_profile();

insert into public.users (
  id, email, first_name, last_name, gender, education_level, field_of_study, interest, scholarship_type, countries
)
select
  au.id,
  au.email,
  coalesce(
    au.raw_user_meta_data->>'first_name',
    au.raw_user_meta_data->>'given_name',
    split_part(coalesce(au.raw_user_meta_data->>'full_name', ''), ' ', 1),
    'Kaire'
  ) as first_name,
  coalesce(
    au.raw_user_meta_data->>'last_name',
    au.raw_user_meta_data->>'family_name',
    nullif(
      trim(
        substring(
          coalesce(au.raw_user_meta_data->>'full_name', '')
          from length(
            coalesce(
              au.raw_user_meta_data->>'first_name',
              au.raw_user_meta_data->>'given_name',
              split_part(coalesce(au.raw_user_meta_data->>'full_name', ''), ' ', 1),
              'Kaire'
            )
          ) + 1
        )
      ),
      ''
    ),
    'User'
  ) as last_name,
  au.raw_user_meta_data->>'gender' as gender,
  au.raw_user_meta_data->>'education_level' as education_level,
  au.raw_user_meta_data->>'field_of_study' as field_of_study,
  au.raw_user_meta_data->>'interest' as interest,
  au.raw_user_meta_data->>'scholarship_type' as scholarship_type,
  coalesce(
    array(select jsonb_array_elements_text(coalesce(au.raw_user_meta_data->'countries', '[]'::jsonb))),
    '{}'::text[]
  ) as countries
from auth.users au
on conflict (id) do update set
  email = excluded.email,
  first_name = excluded.first_name,
  last_name = excluded.last_name,
  gender = excluded.gender,
  education_level = excluded.education_level,
  field_of_study = excluded.field_of_study,
  interest = excluded.interest,
  scholarship_type = excluded.scholarship_type,
  countries = excluded.countries,
  updated_at = now();
