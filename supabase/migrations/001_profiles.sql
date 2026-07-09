-- Profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  monthly_revenue_kes numeric,
  business_name text,
  business_segment text,
  industry text,
  phone_number text,
  onboarding_completed boolean default false,
  -- Informal business fields
  what_you_sell text,
  how_you_get_paid text,
  business_duration text,
  record_keeping_method text,
  -- Startup fields
  startup_stage text,
  has_existing_records boolean,
  seeking_funding boolean,
  -- SME fields
  employee_count text,
  uses_accounting_software boolean,
  primary_revenue_source text,
  -- Lender fields
  institution_name text,
  institution_type text,
  loan_sizes_interest text,
  regulatory_status text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;

alter table public.profiles enable row level security;

create policy "own profile read" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "own profile write" on public.profiles for update to authenticated using (auth.uid() = id);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at_column();
