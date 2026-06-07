import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface WaitlistSignup {
  id?: string;
  created_at?: string;
  full_name: string;
  work_email: string;
  agency_name: string;
  bond_types: string[];
  monthly_volume: string;
  workflow_pain?: string;
}

/*
  SQL to create the waitlist_signups table in Supabase:

  create table waitlist_signups (
    id uuid default gen_random_uuid() primary key,
    created_at timestamptz default now(),
    full_name text not null,
    work_email text not null,
    agency_name text not null,
    bond_types text[] not null,
    monthly_volume text not null,
    workflow_pain text
  );

  -- Row-level security: allow inserts from anon key
  alter table waitlist_signups enable row level security;
  create policy "Allow inserts" on waitlist_signups
    for insert to anon with check (true);
*/
