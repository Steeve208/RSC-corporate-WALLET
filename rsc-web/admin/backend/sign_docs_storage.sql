-- Create Storage bucket for Sign Docs PDFs + signature PNGs
-- Run in Supabase SQL Editor (project upybmyvbpqfeozdsaz)

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'sign-docs',
  'sign-docs',
  false,
  20971520,
  ARRAY['application/pdf', 'image/png']
)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Storage policies for anon (browser uploads from Sign Docs portal)
DROP POLICY IF EXISTS "sign_docs_storage_select" ON storage.objects;
DROP POLICY IF EXISTS "sign_docs_storage_insert" ON storage.objects;
DROP POLICY IF EXISTS "sign_docs_storage_update" ON storage.objects;

CREATE POLICY "sign_docs_storage_select"
ON storage.objects FOR SELECT TO anon
USING (bucket_id = 'sign-docs');

CREATE POLICY "sign_docs_storage_insert"
ON storage.objects FOR INSERT TO anon
WITH CHECK (bucket_id = 'sign-docs');

CREATE POLICY "sign_docs_storage_update"
ON storage.objects FOR UPDATE TO anon
USING (bucket_id = 'sign-docs');
