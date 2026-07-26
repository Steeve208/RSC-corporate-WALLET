import { createClient } from '@supabase/supabase-js';

const url =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  'https://upybmyvbpqfegeozdsaz.supabase.co';

const key =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
  'sb_publishable_tIpBrz6EWqoJHnruX5h-jw_fr9PQNu2';

export const supabase = createClient(url, key);

export const SIGN_DOCS_BUCKET = 'sign-docs';
