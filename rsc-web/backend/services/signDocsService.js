const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_ADMIN_URL;
const SUPABASE_SERVICE_KEY =
  process.env.SUPABASE_ADMIN_SERVICE_KEY ||
  process.env.SUPABASE_ADMIN_ANON_KEY;

const STORAGE_BUCKET = 'sign-docs';

let supabase = null;

function getClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    throw new Error(
      'Sign Docs Supabase not configured. Set SUPABASE_ADMIN_URL and SUPABASE_ADMIN_SERVICE_KEY in rsc-web/backend/.env'
    );
  }
  if (!supabase) {
    supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false }
    });
  }
  return supabase;
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

async function assertSignerAccess(documentId, email) {
  const client = getClient();
  const normalized = normalizeEmail(email);
  const { data, error } = await client
    .from('sign_signers')
    .select('id, email, name, role_label, page, pos_x, pos_y, pos_w, pos_h, sort_order')
    .eq('document_id', documentId)
    .ilike('email', normalized)
    .maybeSingle();

  if (error) throw error;
  if (!data) {
    const err = new Error('Email not authorized for this document');
    err.code = 'UNAUTHORIZED_EMAIL';
    throw err;
  }
  return data;
}

async function listDocumentsForEmail(email) {
  const client = getClient();
  const normalized = normalizeEmail(email);

  const { data: signers, error } = await client
    .from('sign_signers')
    .select(`
      id,
      document_id,
      sign_documents (
        id,
        title,
        description,
        status,
        created_at
      )
    `)
    .ilike('email', normalized);

  if (error) throw error;

  const docsMap = new Map();
  for (const row of signers || []) {
    const doc = row.sign_documents;
    if (!doc) continue;
    if (!docsMap.has(doc.id)) {
      docsMap.set(doc.id, { ...doc, signerId: row.id });
    }
  }

  const documents = [];
  for (const doc of docsMap.values()) {
    const detail = await getDocumentDetail(doc.id, normalized);
    documents.push(detail);
  }

  return documents.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

async function getDocumentDetail(documentId, email) {
  const client = getClient();
  const normalized = normalizeEmail(email);

  await assertSignerAccess(documentId, normalized);

  const { data: document, error: docError } = await client
    .from('sign_documents')
    .select('*')
    .eq('id', documentId)
    .single();

  if (docError) throw docError;

  const { data: signers, error: signersError } = await client
    .from('sign_signers')
    .select('*')
    .eq('document_id', documentId)
    .order('sort_order', { ascending: true });

  if (signersError) throw signersError;

  const { data: signatures, error: sigError } = await client
    .from('sign_signatures')
    .select('*')
    .eq('document_id', documentId);

  if (sigError) throw sigError;

  const sigBySigner = new Map((signatures || []).map((s) => [s.signer_id, s]));
  const currentSigner = (signers || []).find((s) => normalizeEmail(s.email) === normalized);

  return {
    ...document,
    signers: (signers || []).map((s) => ({
      id: s.id,
      email: s.email,
      name: s.name,
      roleLabel: s.role_label,
      page: s.page,
      posX: Number(s.pos_x),
      posY: Number(s.pos_y),
      posW: Number(s.pos_w),
      posH: Number(s.pos_h),
      sortOrder: s.sort_order,
      signed: sigBySigner.has(s.id),
      signedAt: sigBySigner.get(s.id)?.signed_at || null
    })),
    currentSignerId: currentSigner?.id || null,
    hasSigned: currentSigner ? sigBySigner.has(currentSigner.id) : false
  };
}

async function downloadPdfBuffer(documentId, email) {
  await assertSignerAccess(documentId, email);
  const client = getClient();

  const { data: document, error } = await client
    .from('sign_documents')
    .select('pdf_path')
    .eq('id', documentId)
    .single();

  if (error) throw error;

  const { data, error: dlError } = await client.storage
    .from(STORAGE_BUCKET)
    .download(document.pdf_path);

  if (dlError) throw dlError;
  return Buffer.from(await data.arrayBuffer());
}

async function getSignaturesForMerge(documentId, email) {
  const detail = await getDocumentDetail(documentId, email);
  const client = getClient();

  const results = [];
  for (const signer of detail.signers) {
    if (!signer.signed) continue;

    const { data: sig } = await client
      .from('sign_signatures')
      .select('signature_path')
      .eq('signer_id', signer.id)
      .single();

    if (!sig) continue;

    const { data: file, error } = await client.storage
      .from(STORAGE_BUCKET)
      .download(sig.signature_path);

    if (error) continue;

    const buffer = Buffer.from(await file.arrayBuffer());
    results.push({
      signerId: signer.id,
      name: signer.name,
      roleLabel: signer.roleLabel,
      page: signer.page,
      posX: signer.posX,
      posY: signer.posY,
      posW: signer.posW,
      posH: signer.posH,
      imageBase64: buffer.toString('base64')
    });
  }

  return { document: detail, signatures: results };
}

async function saveSignature(documentId, email, signatureDataUrl) {
  const signer = await assertSignerAccess(documentId, email);
  const client = getClient();

  const { data: existing } = await client
    .from('sign_signatures')
    .select('id')
    .eq('signer_id', signer.id)
    .maybeSingle();

  if (existing) {
    const err = new Error('Already signed');
    err.code = 'ALREADY_SIGNED';
    throw err;
  }

  const base64 = signatureDataUrl.replace(/^data:image\/png;base64,/, '');
  const buffer = Buffer.from(base64, 'base64');
  const path = `documents/${documentId}/signatures/${signer.id}.png`;

  const { error: uploadError } = await client.storage
    .from(STORAGE_BUCKET)
    .upload(path, buffer, { contentType: 'image/png', upsert: true });

  if (uploadError) throw uploadError;

  const { data: signature, error: insertError } = await client
    .from('sign_signatures')
    .insert({
      document_id: documentId,
      signer_id: signer.id,
      signature_path: path
    })
    .select()
    .single();

  if (insertError) throw insertError;

  const { data: allSigners } = await client
    .from('sign_signers')
    .select('id')
    .eq('document_id', documentId);

  const { data: allSigs } = await client
    .from('sign_signatures')
    .select('id')
    .eq('document_id', documentId);

  if (allSigners?.length && allSigs?.length >= allSigners.length) {
    await client
      .from('sign_documents')
      .update({ status: 'completed' })
      .eq('id', documentId);
  }

  return signature;
}

module.exports = {
  normalizeEmail,
  listDocumentsForEmail,
  getDocumentDetail,
  downloadPdfBuffer,
  getSignaturesForMerge,
  saveSignature,
  STORAGE_BUCKET
};
