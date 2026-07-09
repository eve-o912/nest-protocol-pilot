-- Add onboarding fields to profiles table
alter table public.profiles add column if not exists phone_number text;
alter table public.profiles add column if not exists onboarding_completed boolean default false;
-- Informal business fields
alter table public.profiles add column if not exists what_you_sell text;
alter table public.profiles add column if not exists how_you_get_paid text;
alter table public.profiles add column if not exists business_duration text;
alter table public.profiles add column if not exists record_keeping_method text;
-- Startup fields
alter table public.profiles add column if not exists startup_stage text;
alter table public.profiles add column if not exists has_existing_records boolean;
alter table public.profiles add column if not exists seeking_funding boolean;
-- SME fields
alter table public.profiles add column if not exists employee_count text;
alter table public.profiles add column if not exists uses_accounting_software boolean;
alter table public.profiles add column if not exists primary_revenue_source text;
-- Lender fields
alter table public.profiles add column if not exists institution_name text;
alter table public.profiles add column if not exists institution_type text;
alter table public.profiles add column if not exists loan_sizes_interest text;
alter table public.profiles add column if not exists regulatory_status text;
