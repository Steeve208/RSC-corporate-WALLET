-- Sign Docs — partnership agreement signing
-- Run in Supabase project: upybmyvbpqfegeozdsaz (https://upybmyvbpqfegeozdsaz.supabase.co)
--
-- Storage bucket (create in Supabase Dashboard → Storage):
--   Name: sign-docs
--   Public: false (access via service role / signed URLs from API)
--   Allowed MIME: application/pdf, image/png

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS sign_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  pdf_path TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sign_signers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES sign_documents(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role_label TEXT NOT NULL DEFAULT 'Signer',
  page INTEGER NOT NULL DEFAULT -1,
  pos_x NUMERIC(5,2) NOT NULL DEFAULT 10,
  pos_y NUMERIC(5,2) NOT NULL DEFAULT 15,
  pos_w NUMERIC(5,2) NOT NULL DEFAULT 35,
  pos_h NUMERIC(5,2) NOT NULL DEFAULT 8,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (document_id, email)
);

CREATE TABLE IF NOT EXISTS sign_signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES sign_documents(id) ON DELETE CASCADE,
  signer_id UUID NOT NULL REFERENCES sign_signers(id) ON DELETE CASCADE,
  signature_path TEXT NOT NULL,
  signed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (signer_id)
);

CREATE INDEX IF NOT EXISTS idx_sign_signers_email ON sign_signers (LOWER(email));
CREATE INDEX IF NOT EXISTS idx_sign_signers_document ON sign_signers (document_id);
CREATE INDEX IF NOT EXISTS idx_sign_signatures_document ON sign_signatures (document_id);

CREATE OR REPLACE FUNCTION sign_documents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sign_documents_updated ON sign_documents;
CREATE TRIGGER trg_sign_documents_updated
  BEFORE UPDATE ON sign_documents
  FOR EACH ROW EXECUTE FUNCTION sign_documents_updated_at();
