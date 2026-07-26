/**
 * Sign Docs — Admin module
 * Upload partnership PDFs and configure signer emails.
 */

const SIGN_DOCS_BUCKET = 'sign-docs';

let signDocsClient = null;
let documents = [];

function getSignDocsConfig() {
  return (typeof ADMIN_CONFIG !== 'undefined' && ADMIN_CONFIG.signDocs) || {
    url: 'https://upybmyvbpqfegeozdsaz.supabase.co',
    anonKey: 'sb_publishable_tIpBrz6EWqoJHnruX5h-jw_fr9PQNu2',
    serviceKey: ''
  };
}

function getSignDocsClient() {
  if (signDocsClient) return signDocsClient;
  const cfg = getSignDocsConfig();
  const key = cfg.serviceKey || cfg.anonKey;
  if (typeof AdminAPI !== 'undefined' && AdminAPI.getSignDocsServiceClient) {
    signDocsClient = AdminAPI.getSignDocsServiceClient();
  } else if (window.supabase?.createClient && cfg.url && key) {
    signDocsClient = window.supabase.createClient(cfg.url, key);
  }
  return signDocsClient;
}

function defaultSignerPosition(index) {
  return {
    page: -1,
    pos_x: 10,
    pos_y: 15 + index * 13,
    pos_w: 35,
    pos_h: 8,
    sort_order: index
  };
}

export async function render() {
  const canCreate = typeof hasPermission === 'function' && hasPermission('signdocs.create');
  return `
    <div class="sign-docs-module">
      <div class="module-header">
        <div class="header-left">
          <h1 class="module-title">Sign Docs</h1>
          <p class="module-subtitle">Partnership agreements — upload PDFs and assign signer emails</p>
        </div>
        <div class="header-right">
          ${canCreate ? `
            <button class="btn-primary" id="signDocsCreateBtn">
              <i class="fas fa-plus"></i>
              New document
            </button>
          ` : ''}
        </div>
      </div>

      <div class="sign-docs-stats" id="signDocsStats"></div>

      <div class="sign-docs-list" id="signDocsList">
        <div class="content-loading"><div class="loading-spinner"></div><p>Loading documents...</p></div>
      </div>
    </div>

    <div class="modal-overlay" id="signDocsModal" style="display:none;">
      <div class="modal-content sign-docs-modal">
        <div class="modal-header">
          <h2 id="signDocsModalTitle">New signing document</h2>
          <button type="button" class="modal-close" id="signDocsModalClose">&times;</button>
        </div>
        <div class="modal-body">
          <form id="signDocsForm">
            <div class="form-group">
              <label>Title *</label>
              <input type="text" id="sdTitle" required placeholder="Partnership Agreement — Acme Corp" />
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea id="sdDescription" rows="2" placeholder="Optional notes for signers"></textarea>
            </div>
            <div class="form-group">
              <label>PDF file *</label>
              <input type="file" id="sdPdf" accept="application/pdf" required />
            </div>

            <div class="sign-docs-signers-block">
              <div class="sign-docs-signers-head">
                <h3>Signers</h3>
                <button type="button" class="btn-secondary btn-sm" id="sdAddSignerBtn">
                  <i class="fas fa-user-plus"></i> Add signer
                </button>
              </div>
              <div id="sdSignersList"></div>
            </div>

            <div class="modal-actions">
              <button type="button" class="btn-secondary" id="signDocsCancelBtn">Cancel</button>
              <button type="submit" class="btn-primary" id="signDocsSubmitBtn">Create document</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

export async function init() {
  await loadDocuments();
  setupSignDocsEvents();
  renderSignerRows([{ email: '', name: '', role_label: 'RSC' }]);
}

async function loadDocuments() {
  const list = document.getElementById('signDocsList');
  const client = getSignDocsClient();

  if (!client) {
    list.innerHTML = '<p class="sign-docs-error">Supabase client unavailable</p>';
    return;
  }

  try {
    const { data, error } = await client
      .from('sign_documents')
      .select(`
        *,
        sign_signers (
          id, email, name, role_label, sort_order
        ),
        sign_signatures (
          id, signer_id, signed_at
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    documents = data || [];
    renderDocumentsList();
    renderStats();
  } catch (err) {
    console.error(err);
    list.innerHTML = `
      <div class="sign-docs-empty">
        <i class="fas fa-database"></i>
        <h3>Could not load documents</h3>
        <p>Run sign_docs_schema.sql in Supabase and create the sign-docs storage bucket.</p>
        <p class="sign-docs-error-detail">${err.message || err}</p>
      </div>`;
  }
}

function renderStats() {
  const el = document.getElementById('signDocsStats');
  if (!el) return;
  const open = documents.filter((d) => d.status === 'open').length;
  const done = documents.filter((d) => d.status === 'completed').length;
  el.innerHTML = `
    <div class="stat-card"><span class="stat-value">${documents.length}</span><span class="stat-label">Documents</span></div>
    <div class="stat-card"><span class="stat-value">${open}</span><span class="stat-label">Open</span></div>
    <div class="stat-card"><span class="stat-value">${done}</span><span class="stat-label">Completed</span></div>
  `;
}

function renderDocumentsList() {
  const list = document.getElementById('signDocsList');
  if (!list) return;

  if (!documents.length) {
    list.innerHTML = `
      <div class="sign-docs-empty">
        <i class="fas fa-file-signature"></i>
        <h3>No documents yet</h3>
        <p>Upload a partnership PDF and assign signer emails. Partners access via Company → Sign Docs.</p>
      </div>`;
    return;
  }

  list.innerHTML = documents.map((doc) => {
    const signers = doc.sign_signers || [];
    const sigs = doc.sign_signatures || [];
    const sigSet = new Set(sigs.map((s) => s.signer_id));
    const signedCount = signers.filter((s) => sigSet.has(s.id)).length;

    const signersHtml = signers.map((s) => {
      const signed = sigSet.has(s.id);
      return `
        <li class="sign-docs-signer-row ${signed ? 'signed' : 'pending'}">
          <span class="signer-name">${escapeHtml(s.name)}</span>
          <span class="signer-email">${escapeHtml(s.email)}</span>
          <span class="signer-role">${escapeHtml(s.role_label)}</span>
          <span class="signer-status">${signed ? '<i class="fas fa-check-circle"></i> Signed' : '<i class="fas fa-clock"></i> Pending'}</span>
        </li>`;
    }).join('');

    return `
      <article class="sign-docs-card" data-doc-id="${doc.id}">
        <div class="sign-docs-card-head">
          <div>
            <h3>${escapeHtml(doc.title)}</h3>
            ${doc.description ? `<p>${escapeHtml(doc.description)}</p>` : ''}
          </div>
          <span class="sign-docs-badge sign-docs-badge--${doc.status}">${doc.status}</span>
        </div>
        <div class="sign-docs-progress">${signedCount} / ${signers.length} signatures</div>
        <ul class="sign-docs-signers">${signersHtml}</ul>
        <div class="sign-docs-card-meta">Created ${formatDate(doc.created_at)}</div>
      </article>`;
  }).join('');
}

function setupSignDocsEvents() {
  document.getElementById('signDocsCreateBtn')?.addEventListener('click', openModal);
  document.getElementById('signDocsModalClose')?.addEventListener('click', closeModal);
  document.getElementById('signDocsCancelBtn')?.addEventListener('click', closeModal);
  document.getElementById('sdAddSignerBtn')?.addEventListener('click', () => {
    const rows = collectSignerRows();
    rows.push({ email: '', name: '', role_label: 'Partner' });
    renderSignerRows(rows);
  });
  document.getElementById('signDocsForm')?.addEventListener('submit', handleCreate);
}

function openModal() {
  document.getElementById('signDocsForm')?.reset();
  renderSignerRows([
    { email: '', name: '', role_label: 'RSC' },
    { email: '', name: '', role_label: 'Partner' }
  ]);
  document.getElementById('signDocsModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('signDocsModal').style.display = 'none';
}

function renderSignerRows(rows) {
  const container = document.getElementById('sdSignersList');
  if (!container) return;

  container.innerHTML = rows.map((row, i) => `
    <div class="sign-docs-signer-fields" data-index="${i}">
      <input type="email" placeholder="email@company.com" value="${escapeAttr(row.email)}" class="sd-signer-email" required />
      <input type="text" placeholder="Full name" value="${escapeAttr(row.name)}" class="sd-signer-name" required />
      <input type="text" placeholder="Role" value="${escapeAttr(row.role_label || 'Signer')}" class="sd-signer-role" />
      ${rows.length > 1 ? `<button type="button" class="btn-icon sd-remove-signer" data-index="${i}" title="Remove"><i class="fas fa-times"></i></button>` : ''}
    </div>
  `).join('');

  container.querySelectorAll('.sd-remove-signer').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.index);
      const next = collectSignerRows().filter((_, j) => j !== idx);
      renderSignerRows(next.length ? next : [{ email: '', name: '', role_label: 'Signer' }]);
    });
  });
}

function collectSignerRows() {
  return Array.from(document.querySelectorAll('.sign-docs-signer-fields')).map((el) => ({
    email: el.querySelector('.sd-signer-email')?.value?.trim() || '',
    name: el.querySelector('.sd-signer-name')?.value?.trim() || '',
    role_label: el.querySelector('.sd-signer-role')?.value?.trim() || 'Signer'
  }));
}

async function handleCreate(e) {
  e.preventDefault();
  const client = getSignDocsClient();
  const submitBtn = document.getElementById('signDocsSubmitBtn');
  const pdfInput = document.getElementById('sdPdf');
  const title = document.getElementById('sdTitle')?.value?.trim();
  const description = document.getElementById('sdDescription')?.value?.trim() || null;
  const signers = collectSignerRows().filter((s) => s.email && s.name);

  if (!client || !title || !pdfInput?.files?.[0] || !signers.length) {
    showToast('Title, PDF, and at least one signer are required', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Uploading...';

  try {
    const docId = crypto.randomUUID();
    const pdfPath = `documents/${docId}/original.pdf`;
    const file = pdfInput.files[0];

    const { error: uploadError } = await client.storage
      .from(SIGN_DOCS_BUCKET)
      .upload(pdfPath, file, { contentType: 'application/pdf', upsert: false });

    if (uploadError) throw uploadError;

    const { error: docError } = await client.from('sign_documents').insert({
      id: docId,
      title,
      description,
      pdf_path: pdfPath,
      status: 'open'
    });

    if (docError) throw docError;

    const signerRows = signers.map((s, i) => ({
      document_id: docId,
      email: s.email.toLowerCase(),
      name: s.name,
      role_label: s.role_label,
      ...defaultSignerPosition(i)
    }));

    const { error: signersError } = await client.from('sign_signers').insert(signerRows);
    if (signersError) throw signersError;

    if (typeof AdminAPI !== 'undefined') {
      await AdminAPI.logAction('create', 'sign-docs', { documentId: docId, title, signers: signers.length });
    }

    showToast('Document created — partners can sign via Company → Sign Docs', 'success');
    closeModal();
    await loadDocuments();
  } catch (err) {
    console.error(err);
    showToast(err.message || 'Failed to create document', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Create document';
  }
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  return escapeHtml(str).replace(/'/g, '&#39;');
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}
