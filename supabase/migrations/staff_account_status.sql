-- Staff account activation status for admin-managed verifiers.

alter table public.users
add column if not exists is_active boolean not null default true;

create index if not exists users_staff_active_idx on public.users (role, is_active);

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
      and is_active = true
  );
$$;

create or replace function public.is_verifier()
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
      and role = 'verifier'
      and is_active = true
  );
$$;

create or replace function public.is_staff()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.is_admin() or public.is_verifier();
$$;
