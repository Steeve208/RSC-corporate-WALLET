-- Re-runnable RLS for Sign Docs (drops existing policies first)

ALTER TABLE sign_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE sign_signers ENABLE ROW LEVEL SECURITY;
ALTER TABLE sign_signatures ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "sign_documents_anon_select" ON sign_documents;
DROP POLICY IF EXISTS "sign_documents_anon_insert" ON sign_documents;
DROP POLICY IF EXISTS "sign_documents_anon_update" ON sign_documents;

DROP POLICY IF EXISTS "sign_signers_anon_select" ON sign_signers;
DROP POLICY IF EXISTS "sign_signers_anon_insert" ON sign_signers;

DROP POLICY IF EXISTS "sign_signatures_anon_select" ON sign_signatures;
DROP POLICY IF EXISTS "sign_signatures_anon_insert" ON sign_signatures;

CREATE POLICY "sign_documents_anon_select" ON sign_documents FOR SELECT TO anon USING (true);
CREATE POLICY "sign_documents_anon_insert" ON sign_documents FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "sign_documents_anon_update" ON sign_documents FOR UPDATE TO anon USING (true);

CREATE POLICY "sign_signers_anon_select" ON sign_signers FOR SELECT TO anon USING (true);
CREATE POLICY "sign_signers_anon_insert" ON sign_signers FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "sign_signatures_anon_select" ON sign_signatures FOR SELECT TO anon USING (true);
CREATE POLICY "sign_signatures_anon_insert" ON sign_signatures FOR INSERT TO anon WITH CHECK (true);
