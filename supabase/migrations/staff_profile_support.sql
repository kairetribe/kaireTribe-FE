-- Support verifier role and staff creation from admin panel

alter table public.users drop constraint if exists users_role_check;
alter table public.users add constraint users_role_check
  check (role in ('user', 'admin', 'verifier'));

drop policy if exists "Admins can update all profiles" on public.users;
create policy "Admins can update all profiles"
on public.users
for update
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can insert profiles" on public.users;
create policy "Admins can insert profiles"
on public.users
for insert
with check (public.is_admin());

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
  role_value text;
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
  role_value := coalesce(new.raw_user_meta_data->>'role', 'user');
  if role_value not in ('user', 'admin', 'verifier') then
    role_value := 'user';
  end if;

  insert into public.users (
    id, email, first_name, last_name, gender, education_level,
    field_of_study, interest, scholarship_type, countries, role
  )
  values (
    new.id,
    new.email,
    first_name_value,
    last_name_value,
    nullif(trim(coalesce(new.raw_user_meta_data->>'gender', '')), ''),
    nullif(trim(coalesce(new.raw_user_meta_data->>'education_level', '')), ''),
    nullif(trim(coalesce(new.raw_user_meta_data->>'field_of_study', '')), ''),
    nullif(trim(coalesce(new.raw_user_meta_data->>'interest', '')), ''),
    nullif(trim(coalesce(new.raw_user_meta_data->>'scholarship_type', '')), ''),
    coalesce(countries_value, '{}'::text[]),
    role_value
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
    role = excluded.role,
    updated_at = now();

  return new;
end;
$$;
