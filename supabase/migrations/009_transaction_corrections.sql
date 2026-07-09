-- Transaction corrections table for few-shot learning
create table public.transaction_corrections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  transaction_id uuid not null references public.transactions(id) on delete cascade,
  original_category text not null,
  corrected_category text not null,
  transaction_data jsonb not null,
  explanation text,
  created_at timestamptz not null default now()
);

grant select, insert, update, delete on public.transaction_corrections to authenticated;
grant all on public.transaction_corrections to service_role;

alter table public.transaction_corrections enable row level security;

create policy "own corrections read" on public.transaction_corrections for select to authenticated using (auth.uid() = user_id);
create policy "own corrections write" on public.transaction_corrections for insert to authenticated with check (auth.uid() = user_id);
create policy "own corrections update" on public.transaction_corrections for update to authenticated using (auth.uid() = user_id);
create policy "own corrections delete" on public.transaction_corrections for delete to authenticated using (auth.uid() = user_id);

-- Index for faster queries
create index transaction_corrections_user_id_idx on public.transaction_corrections(user_id);
create index transaction_corrections_transaction_id_idx on public.transaction_corrections(transaction_id);
create index transaction_corrections_created_at_idx on public.transaction_corrections(created_at desc);

-- Add confidence column to transactions table
alter table public.transactions add column confidence text check (confidence in ('high', 'medium', 'low'));
