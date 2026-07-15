/**
 * Dashboard institucional (ES module) — datos reales del API /admin/dashboard cuando hay JWT.
 */

function esc(s) {
  if (s == null || s === '') return '—';
  const t = document.createElement('span');
  t.textContent = String(s);
  return t.innerHTML;
}

export async function render() {
  const AdminState = window.AdminState || {};
  const user = AdminState.currentUser || { name: 'User', email: 'user@rscchain.com' };
  const hasJwt = typeof window.getMiningAdminJwt === 'function' && !!window.getMiningAdminJwt();

  return `
    <div class="ia-dash am-page">
      <header class="ia-dash__head am-page__head">
        <div>
          <h1 class="am-page__title">Corporate Dashboard</h1>
          <p class="am-page__lead">Welcome back, <strong>${esc(user.name || 'User')}</strong> · ${esc(user.email || '')}</p>
        </div>
        <div class="am-page__actions">
          <button type="button" class="am-btn am-btn--ghost" id="iaDashRefresh">
            <i class="fas fa-sync-alt"></i> Refresh
          </button>
          <button type="button" class="am-btn am-btn--primary" id="iaDashMiningNav">
            <i class="fas fa-server"></i> Mining & movements
          </button>
        </div>
      </header>

      <div class="am-banner ${hasJwt ? 'am-banner--ok' : 'am-banner--warn'}" id="iaDashApiBanner">
        <div class="am-banner__icon"><i class="fas ${hasJwt ? 'fa-link' : 'fa-unlink'}" id="iaDashApiIcon"></i></div>
        <div class="am-banner__body">
          <strong id="iaDashApiTitle">${hasJwt ? 'Mining API connected' : 'Mining API not connected'}</strong>
          <p class="am-banner__text" id="iaDashApiText">${hasJwt
            ? 'Stats below are from your Express backend (PostgreSQL).'
            : 'Set <code class="am-code">ADMIN_CONFIG.api.miningBackendUrl</code> and sign in with a user from backend table <code class="am-code">admins</code>, or open Mining & movements to connect.'}
          </p>
        </div>
      </div>

      <h2 class="am-section-title">Key metrics</h2>
      <div class="am-stats__grid" id="iaDashStats">
        ${[1, 2, 3, 4, 5, 6, 7, 8].map(() => '<div class="am-skel am-skel--card"></div>').join('')}
      </div>

      <h2 class="am-section-title" style="margin-top:2rem;">Recent mining activity</h2>
      <div class="am-table-wrap">
        <table class="am-table">
          <thead><tr><th>Date</th><th>User</th><th>Reward</th><th>IP</th></tr></thead>
          <tbody id="iaDashActivity"><tr><td colspan="4" class="am-table__muted">Loading…</td></tr></tbody>
        </table>
      </div>

      <p class="ia-dash__foot">RSC Mission Control · v2</p>
    </div>
  `;
}

async function hydrateDashboard() {
  const grid = document.getElementById('iaDashStats');
  const tbody = document.getElementById('iaDashActivity');
  const iconEl = document.getElementById('iaDashApiIcon');
  const titleEl = document.getElementById('iaDashApiTitle');
  const textEl = document.getElementById('iaDashApiText');
  const banner = document.getElementById('iaDashApiBanner');
  const hasJwt = typeof window.getMiningAdminJwt === 'function' && !!window.getMiningAdminJwt();

  if (!hasJwt) {
    if (grid) {
      grid.innerHTML = `
        <div class="am-empty am-empty--wide">
          <i class="fas fa-plug"></i>
          <p>Connect the mining API from <strong>Mining & movements</strong> in the sidebar, or log in again with backend <code class="am-code">admins</code> credentials so the JWT syncs.</p>
        </div>`;
    }
    if (tbody) tbody.innerHTML = '<tr><td colspan="4" class="am-table__muted">No API data.</td></tr>';
    if (banner) banner.className = 'am-banner am-banner--warn';
    if (iconEl) iconEl.className = 'fas fa-unlink';
    if (titleEl) titleEl.textContent = 'Mining API not connected';
    if (textEl) textEl.innerHTML = 'Use sidebar → <strong>Mining & movements</strong> to connect.';
    return;
  }

  if (grid) {
    grid.innerHTML = [1, 2, 3, 4, 5, 6, 7, 8].map(() => '<div class="am-skel am-skel--card"></div>').join('');
  }

  try {
    const res = await window.adminApiFetch('/admin/dashboard', { method: 'GET' });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) {
      if (res.status === 401 || res.status === 403) {
        if (typeof window.clearMiningAdminJwt === 'function') window.clearMiningAdminJwt();
        if (banner) banner.className = 'am-banner am-banner--err';
        if (iconEl) iconEl.className = 'fas fa-exclamation-triangle';
        if (titleEl) titleEl.textContent = 'API session expired';
        if (textEl) textEl.innerHTML = 'Reconnect from <strong>Mining & movements</strong>.';
      }
      throw new Error((json && json.error) || res.statusText || 'Error');
    }

    const d = json.data || {};
    const u = d.users || {};
    const m = d.mining || {};
    const t = d.today || {};
    const cards = [
      { k: 'Total users', v: u.total },
      { k: 'Active', v: u.active },
      { k: 'New (24h)', v: u.new24h },
      { k: 'Active miners 24h', v: u.activeMiners24h },
      { k: 'Mining events', v: m.totalEvents },
      { k: 'Tokens mined', v: m.totalTokens != null ? Number(m.totalTokens).toFixed(4) : '—' },
      { k: 'Events today', v: t.events },
      { k: 'Tokens today', v: t.tokens != null ? Number(t.tokens).toFixed(4) : '—' },
    ];
    if (grid) {
      grid.innerHTML = cards
        .map(
          (c) => `
        <div class="am-stat">
          <div class="am-stat__k">${esc(c.k)}</div>
          <div class="am-stat__v">${esc(c.v)}</div>
        </div>`
        )
        .join('');
    }

    const rows = Array.isArray(d.recentActivity) ? d.recentActivity : [];
    if (tbody) {
      tbody.innerHTML = rows.length
        ? rows
            .map((r) => {
              const when = r.created_at ? new Date(r.created_at).toLocaleString() : '—';
              return `<tr><td>${esc(when)}</td><td>${esc(r.email)}</td><td class="am-num">${r.reward != null ? esc(Number(r.reward).toFixed(6)) : '—'}</td><td>${esc(r.ip)}</td></tr>`;
            })
            .join('')
        : '<tr><td colspan="4" class="am-table__muted">No recent activity.</td></tr>';
    }

    if (banner) banner.className = 'am-banner am-banner--ok';
    if (iconEl) iconEl.className = 'fas fa-link';
    if (titleEl) titleEl.textContent = 'Mining API connected';
    if (textEl) textEl.textContent = 'Stats loaded from backend.';
  } catch (e) {
    if (grid) {
      grid.innerHTML = `<div class="am-empty am-empty--wide am-empty--err"><i class="fas fa-exclamation-triangle"></i><p>${esc(e.message)}</p></div>`;
    }
    if (tbody) tbody.innerHTML = '<tr><td colspan="4" class="am-table__muted">—</td></tr>';
  }
}

export async function init() {
  document.getElementById('iaDashRefresh')?.addEventListener('click', () => hydrateDashboard());
  document.getElementById('iaDashMiningNav')?.addEventListener('click', (e) => {
    e.preventDefault();
    const link = document.querySelector('.nav-item[data-module="mining-api"]');
    if (link) link.click();
  });
  await hydrateDashboard();
}
