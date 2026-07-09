-- Add business context columns to profiles table
alter table public.profiles add column if not exists business_segment text;
alter table public.profiles add column if not exists industry text;
