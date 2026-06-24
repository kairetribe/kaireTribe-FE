-- Scholarship verification: admins publish verified listings; verifiers submit for review.

alter table public.scholarships
add column if not exists is_verified boolean not null default false;

create index if not exists scholarships_is_verified_idx on public.scholarships (is_verified);

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

create or replace function public.enforce_scholarship_verification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    if public.is_verifier() then
      new.is_verified := false;
    elsif public.is_admin() then
      new.is_verified := coalesce(new.is_verified, true);
    end if;
  elsif tg_op = 'UPDATE' then
    if public.is_verifier() and not public.is_admin() then
      if new.is_verified is distinct from old.is_verified then
        raise exception 'Only admins can change verification status';
      end if;
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists scholarships_enforce_verification on public.scholarships;
create trigger scholarships_enforce_verification
before insert or update on public.scholarships
for each row execute function public.enforce_scholarship_verification();

drop policy if exists "Anyone can read active scholarships" on public.scholarships;
create policy "Anyone can read active verified scholarships"
on public.scholarships
for select
using (status = 'active' and is_verified = true);

drop policy if exists "Admins can manage scholarships" on public.scholarships;
create policy "Admins can manage scholarships"
on public.scholarships
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Verifiers can create scholarships" on public.scholarships;
create policy "Verifiers can create scholarships"
on public.scholarships
for insert
to authenticated
with check (public.is_verifier() and is_verified = false);

drop policy if exists "Staff can read all scholarships" on public.scholarships;
create policy "Staff can read all scholarships"
on public.scholarships
for select
to authenticated
using (public.is_staff());

drop policy if exists "Verifiers upload scholarship images" on storage.objects;
create policy "Verifiers upload scholarship images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'kaire-tribe'
  and name like 'scholarship-image/%'
  and public.is_verifier()
);
