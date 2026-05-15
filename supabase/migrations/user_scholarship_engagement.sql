-- User saved & applied scholarships

create table if not exists public.saved_scholarships (
  user_id uuid not null references auth.users(id) on delete cascade,
  scholarship_id uuid not null references public.scholarships(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, scholarship_id)
);

create index if not exists saved_scholarships_user_idx on public.saved_scholarships (user_id, created_at desc);

create table if not exists public.applied_scholarships (
  user_id uuid not null references auth.users(id) on delete cascade,
  scholarship_id uuid not null references public.scholarships(id) on delete cascade,
  applied_at timestamptz not null default now(),
  primary key (user_id, scholarship_id)
);

create index if not exists applied_scholarships_user_idx on public.applied_scholarships (user_id, applied_at desc);

alter table public.saved_scholarships enable row level security;
alter table public.applied_scholarships enable row level security;

drop policy if exists "Users read own saved scholarships" on public.saved_scholarships;
create policy "Users read own saved scholarships"
on public.saved_scholarships for select to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users save scholarships" on public.saved_scholarships;
create policy "Users save scholarships"
on public.saved_scholarships for insert to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users unsave scholarships" on public.saved_scholarships;
create policy "Users unsave scholarships"
on public.saved_scholarships for delete to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users read own applications" on public.applied_scholarships;
create policy "Users read own applications"
on public.applied_scholarships for select to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users record applications" on public.applied_scholarships;
create policy "Users record applications"
on public.applied_scholarships for insert to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Admins read all saved scholarships" on public.saved_scholarships;
create policy "Admins read all saved scholarships"
on public.saved_scholarships for select to authenticated
using (public.is_admin());

drop policy if exists "Admins read all applications" on public.applied_scholarships;
create policy "Admins read all applications"
on public.applied_scholarships for select to authenticated
using (public.is_admin());
