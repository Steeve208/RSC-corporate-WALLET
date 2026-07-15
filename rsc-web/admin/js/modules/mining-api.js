/**
 * Mining & movements (ES module) — panel institucional.
 */

function esc(s) {
  if (s == null || s === '') return '—';
  const t = document.createElement('span');
  t.textContent = String(s);
  return t.innerHTML;
}

export async function render() {
  const AdminState = window.AdminState || {};
  const user = AdminState.currentUser || {};

  return `
    <div class="ia-mining am-page">
      <header class="am-page__head">
        <div>
          <h1 class="am-page__title">Mining & movements</h1>
          <p class="am-page__lead">Control via Express API · signed in as <strong>${esc(user.name || 'User')}</strong></p>
        </div>
        <button type="button" class="am-btn am-btn--ghost" id="iaMiningRefresh">
          <i class="fas fa-sync-alt"></i> Refresh
        </button>
      </header>

      <div id="iaMiningBanner" class="am-banner am-banner--warn" style="display:none;"></div>

      <div class="ia-mining__connect am-banner am-banner--warn" id="iaMiningConnectWrap">
        <div class="am-banner__icon"><i class="fas fa-key"></i></div>
        <div class="am-banner__body" style="flex:1;">
          <strong>Connect backend JWT</strong>
          <p class="am-banner__text">Use the same email/password as row in PostgreSQL <code class="am-code">admins</code> (see backend migrations).</p>
          <form id="iaMiningForm" style="display:grid;gap:0.5rem;max-width:420px;margin-top:0.75rem;">
            <input type="email" id="iaMiningEmail" class="ia-mining__input" placeholder="Email" autocomplete="username">
            <input type="password" id="iaMiningPass" class="ia-mining__input" placeholder="Password" autocomplete="current-password">
            <button type="submit" class="am-btn am-btn--primary" style="width:fit-content;">Connect</button>
          </form>
        </div>
      </div>

      <h2 class="am-section-title">Dashboard</h2>
      <div class="am-stats__grid" id="iaMiningStats"></div>

      <h2 class="am-section-title" style="margin-top:1.5rem;">Mining events</h2>
      <div class="am-table-wrap">
        <table class="am-table">
          <thead><tr><th>Date</th><th>Email</th><th>Reward</th><th>IP</th></tr></thead>
          <tbody id="iaMiningRows"></tbody>
        </table>
      </div>
    </div>
  `;
}

function setBanner(html, variant) {
  const el = document.getElementById('iaMiningBanner');
  if (!el) return;
  if (!html) {
    el.style.display = 'none';
    el.innerHTML = '';
    return;
  }
  el.style.display = 'flex';
  el.className = `am-banner am-banner--${variant || 'warn'}`;
  el.innerHTML = `<div class="am-banner__icon"><i class="fas fa-info-circle"></i></div><div class="am-banner__body">${html}</div>`;
}

async function loadAll() {
  const wrap = document.getElementById('iaMiningConnectWrap');
  const token = typeof window.getMiningAdminJwt === 'function' ? window.getMiningAdminJwt() : '';
  if (wrap) wrap.style.display = token ? 'none' : 'flex';

  setBanner('', 'ok');

  const statsEl = document.getElementById('iaMiningStats');
  const rowsEl = document.getElementById('iaMiningRows');

  if (!token) {
    if (statsEl) statsEl.innerHTML = '';
    if (rowsEl) rowsEl.innerHTML = '<tr><td colspan="4" class="am-table__muted">Not connected.</td></tr>';
    return;
  }

  try {
    const dRes = await window.adminApiFetch('/admin/dashboard', { method: 'GET' });
    const dJson = await dRes.json().catch(() => ({}));
    if (!dRes.ok || !dJson.success) throw new Error(dJson.error || dRes.statusText);
    const d = dJson.data || {};
    const u = d.users || {};
    const m = d.mining || {};
    const t = d.today || {};
    const cards = [
      { k: 'Users', v: u.total },
      { k: 'Active', v: u.active },
      { k: 'Mining events', v: m.totalEvents },
      { k: 'Tokens mined', v: m.totalTokens != null ? Number(m.totalTokens).toFixed(4) : '—' },
      { k: 'Today events', v: t.events },
      { k: 'Today tokens', v: t.tokens != null ? Number(t.tokens).toFixed(4) : '—' },
    ];
    if (statsEl) {
      statsEl.innerHTML = cards
        .map(
          (c) =>
            `<div class="am-stat"><div class="am-stat__k">${esc(c.k)}</div><div class="am-stat__v">${esc(c.v)}</div></div>`
        )
        .join('');
    }
  } catch (e) {
    if (statsEl) statsEl.innerHTML = '';
    setBanner(`<strong>Dashboard error</strong><p class="am-banner__text">${esc(e.message)}</p>`, 'err');
  }

  try {
    const eRes = await window.adminApiFetch('/admin/mining-events?page=1&pageSize=50', { method: 'GET' });
    const eJson = await eRes.json().catch(() => ({}));
    if (!eRes.ok || !eJson.success) throw new Error(eJson.error || eRes.statusText);
    const rows = eJson.data || [];
    if (rowsEl) {
      rowsEl.innerHTML = rows.length
        ? rows
            .map((r) => {
              const when = r.created_at ? new Date(r.created_at).toLocaleString() : '—';
              return `<tr><td>${esc(when)}</td><td>${esc(r.email)}</td><td class="am-num">${r.reward != null ? esc(Number(r.reward).toFixed(6)) : '—'}</td><td>${esc(r.ip)}</td></tr>`;
            })
            .join('')
        : '<tr><td colspan="4" class="am-table__muted">No events.</td></tr>';
    }
  } catch (e) {
    if (rowsEl) rowsEl.innerHTML = '<tr><td colspan="4" class="am-table__muted">Failed to load events.</td></tr>';
  }
}

export async function init() {
  const emailInput = document.getElementById('iaMiningEmail');
  const AdminState = window.AdminState || {};
  if (emailInput && AdminState.currentUser?.email) emailInput.value = AdminState.currentUser.email;

  document.getElementById('iaMiningForm')?.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const email = document.getElementById('iaMiningEmail')?.value?.trim() || '';
    const password = document.getElementById('iaMiningPass')?.value || '';
    const ok = await window.exchangeMiningBackendSession(email, password);
    if (window.showToast) {
      window.showToast(ok ? 'Connected to mining API' : 'Invalid backend credentials', ok ? 'success' : 'error');
    }
    document.getElementById('iaMiningPass').value = '';
    await loadAll();
  });

  document.getElementById('iaMiningRefresh')?.addEventListener('click', () => loadAll());
  await loadAll();
}
