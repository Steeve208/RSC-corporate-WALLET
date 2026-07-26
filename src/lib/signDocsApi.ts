import { supabase, SIGN_DOCS_BUCKET } from './supabaseClient';

export type SignDocSigner = {
  id: string;
  email: string;
  name: string;
  roleLabel: string;
  page: number;
  posX: number;
  posY: number;
  posW: number;
  posH: number;
  sortOrder: number;
  signed: boolean;
  signedAt: string | null;
};

export type SignDocument = {
  id: string;
  title: string;
  description: string | null;
  status: 'open' | 'completed';
  created_at: string;
  pdf_path: string;
  signers: SignDocSigner[];
  currentSignerId: string | null;
  hasSigned: boolean;
};

export type SignatureStamp = {
  signerId: string;
  name: string;
  roleLabel: string;
  page: number;
  posX: number;
  posY: number;
  posW: number;
  posH: number;
  imageBase64: string;
};

export type NewSignerInput = {
  email: string;
  name: string;
  roleLabel: string;
};

const DEFAULT_ADMIN_EMAILS = ['rochersteeve2@gmail.com'];

export function getAdminEmails(): string[] {
  const fromEnv = (import.meta.env.VITE_SIGN_DOCS_ADMIN_EMAILS as string | undefined)
    ?.split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return fromEnv?.length ? fromEnv : DEFAULT_ADMIN_EMAILS;
}

export function isSignDocsAdmin(email: string): boolean {
  return getAdminEmails().includes(normalizeEmail(email));
}

function client() {
  if (!supabase) {
    throw new Error('Supabase not configured (VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY)');
  }
  return supabase;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function mapSigner(
  row: Record<string, unknown>,
  sigBySigner: Map<string, { signed_at: string }>
): SignDocSigner {
  const id = String(row.id);
  const sig = sigBySigner.get(id);
  return {
    id,
    email: String(row.email),
    name: String(row.name),
    roleLabel: String(row.role_label),
    page: Number(row.page),
    posX: Number(row.pos_x),
    posY: Number(row.pos_y),
    posW: Number(row.pos_w),
    posH: Number(row.pos_h),
    sortOrder: Number(row.sort_order),
    signed: !!sig,
    signedAt: sig?.signed_at ?? null,
  };
}

async function buildDocument(
  doc: Record<string, unknown>,
  email: string
): Promise<SignDocument> {
  const db = client();
  const docId = String(doc.id);
  const normalized = normalizeEmail(email);

  const { data: signers, error: signersError } = await db
    .from('sign_signers')
    .select('*')
    .eq('document_id', docId)
    .order('sort_order', { ascending: true });

  if (signersError) throw signersError;

  const { data: signatures, error: sigError } = await db
    .from('sign_signatures')
    .select('*')
    .eq('document_id', docId);

  if (sigError) throw sigError;

  const sigBySigner = new Map(
    (signatures || []).map((s) => [String(s.signer_id), s as { signed_at: string }])
  );
  const mappedSigners = (signers || []).map((s) =>
    mapSigner(s as Record<string, unknown>, sigBySigner)
  );
  const current = mappedSigners.find((s) => normalizeEmail(s.email) === normalized);

  return {
    id: docId,
    title: String(doc.title),
    description: (doc.description as string | null) ?? null,
    status: doc.status as 'open' | 'completed',
    created_at: String(doc.created_at),
    pdf_path: String(doc.pdf_path),
    signers: mappedSigners,
    currentSignerId: current?.id ?? null,
    hasSigned: current ? sigBySigner.has(current.id) : false,
  };
}

export async function accessSignDocs(email: string): Promise<SignDocument[]> {
  const normalized = normalizeEmail(email);

  if (isSignDocsAdmin(normalized)) {
    return listAllDocuments(normalized);
  }

  const db = client();
  const { data: rows, error } = await db
    .from('sign_signers')
    .select('document_id, sign_documents(*)')
    .ilike('email', normalized);

  if (error) throw error;

  const seen = new Set<string>();
  const documents: SignDocument[] = [];

  for (const row of rows || []) {
    const doc = row.sign_documents as unknown as Record<string, unknown> | null;
    if (!doc || seen.has(String(doc.id))) continue;
    seen.add(String(doc.id));
    documents.push(await buildDocument(doc, normalized));
  }

  return documents.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function listAllDocuments(email: string): Promise<SignDocument[]> {
  const db = client();
  const normalized = normalizeEmail(email);

  const { data, error } = await db
    .from('sign_documents')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  const documents: SignDocument[] = [];
  for (const doc of data || []) {
    documents.push(await buildDocument(doc as Record<string, unknown>, normalized));
  }
  return documents;
}

export async function createSignDocument(input: {
  title: string;
  description?: string;
  pdfFile: File;
  adminEmail: string;
  adminName?: string;
  partners: NewSignerInput[];
}): Promise<SignDocument> {
  const db = client();
  const adminEmail = normalizeEmail(input.adminEmail);
  const docId = crypto.randomUUID();
  const pdfPath = `documents/${docId}/original.pdf`;

  const { error: uploadError } = await db.storage
    .from(SIGN_DOCS_BUCKET)
    .upload(pdfPath, input.pdfFile, { contentType: 'application/pdf', upsert: false });

  if (uploadError) throw uploadError;

  const { error: docError } = await db.from('sign_documents').insert({
    id: docId,
    title: input.title.trim(),
    description: input.description?.trim() || null,
    pdf_path: pdfPath,
    status: 'open',
  });

  if (docError) throw docError;

  const signers = [
    {
      document_id: docId,
      email: adminEmail,
      name: input.adminName || 'RSC Group',
      role_label: 'RSC Group',
      page: -1,
      pos_x: 10,
      pos_y: 15,
      pos_w: 35,
      pos_h: 8,
      sort_order: 0,
    },
    ...input.partners
      .filter((p) => p.email.trim())
      .map((p, i) => ({
        document_id: docId,
        email: normalizeEmail(p.email),
        name: p.name.trim() || p.email.trim(),
        role_label: p.roleLabel.trim() || 'Partner',
        page: -1,
        pos_x: 10,
        pos_y: 15 + (i + 1) * 13,
        pos_w: 35,
        pos_h: 8,
        sort_order: i + 1,
      })),
  ];

  const { error: signersError } = await db.from('sign_signers').insert(signers);
  if (signersError) throw signersError;

  return getSignDocument(docId, adminEmail);
}

export async function getSignDocument(id: string, email: string): Promise<SignDocument> {
  const db = client();
  const normalized = normalizeEmail(email);
  const admin = isSignDocsAdmin(normalized);

  if (!admin) {
    const { data: signer } = await db
      .from('sign_signers')
      .select('id')
      .eq('document_id', id)
      .ilike('email', normalized)
      .maybeSingle();

    if (!signer) throw new Error('Email not authorized for this document');
  }

  const { data: doc, error } = await db.from('sign_documents').select('*').eq('id', id).single();
  if (error || !doc) throw error || new Error('Document not found');

  return buildDocument(doc as Record<string, unknown>, normalized);
}

export async function getPdfUrl(id: string, email: string): Promise<string> {
  const doc = await getSignDocument(id, email);
  const db = client();

  const { data, error } = await db.storage
    .from(SIGN_DOCS_BUCKET)
    .createSignedUrl(doc.pdf_path, 3600);

  if (error || !data?.signedUrl) throw error || new Error('Could not load PDF');
  return data.signedUrl;
}

export async function submitSignature(
  id: string,
  email: string,
  signatureDataUrl: string
): Promise<SignDocument> {
  const db = client();
  const normalized = normalizeEmail(email);

  const { data: signer, error: signerError } = await db
    .from('sign_signers')
    .select('*')
    .eq('document_id', id)
    .ilike('email', normalized)
    .single();

  if (signerError || !signer) throw new Error('Email not authorized for this document');

  const { data: existing } = await db
    .from('sign_signatures')
    .select('id')
    .eq('signer_id', signer.id)
    .maybeSingle();

  if (existing) throw new Error('Already signed');

  const base64 = signatureDataUrl.replace(/^data:image\/png;base64,/, '');
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  const path = `documents/${id}/signatures/${signer.id}.png`;

  const { error: uploadError } = await db.storage
    .from(SIGN_DOCS_BUCKET)
    .upload(path, bytes, { contentType: 'image/png', upsert: true });

  if (uploadError) throw uploadError;

  const { error: insertError } = await db.from('sign_signatures').insert({
    document_id: id,
    signer_id: signer.id,
    signature_path: path,
  });

  if (insertError) throw insertError;

  const { data: allSigners } = await db.from('sign_signers').select('id').eq('document_id', id);
  const { data: allSigs } = await db.from('sign_signatures').select('id').eq('document_id', id);

  if (allSigners?.length && (allSigs?.length ?? 0) >= allSigners.length) {
    await db.from('sign_documents').update({ status: 'completed' }).eq('id', id);
  }

  return getSignDocument(id, normalized);
}

export async function getSignaturesForDownload(
  id: string,
  email: string
): Promise<{ document: SignDocument; signatures: SignatureStamp[] }> {
  const document = await getSignDocument(id, email);
  const db = client();
  const stamps: SignatureStamp[] = [];

  for (const signer of document.signers) {
    if (!signer.signed) continue;

    const { data: sig } = await db
      .from('sign_signatures')
      .select('signature_path')
      .eq('signer_id', signer.id)
      .single();

    if (!sig) continue;

    const { data: file, error } = await db.storage
      .from(SIGN_DOCS_BUCKET)
      .download(sig.signature_path);

    if (error || !file) continue;

    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    const imageBase64 = btoa(binary);

    stamps.push({
      signerId: signer.id,
      name: signer.name,
      roleLabel: signer.roleLabel,
      page: signer.page,
      posX: signer.posX,
      posY: signer.posY,
      posW: signer.posW,
      posH: signer.posH,
      imageBase64,
    });
  }

  return { document, signatures: stamps };
}

export async function fetchPdfBytes(id: string, email: string): Promise<ArrayBuffer> {
  const doc = await getSignDocument(id, email);
  const db = client();

  const { data, error } = await db.storage.from(SIGN_DOCS_BUCKET).download(doc.pdf_path);
  if (error || !data) throw error || new Error('Could not load PDF');
  return data.arrayBuffer();
}
