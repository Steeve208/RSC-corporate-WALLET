/**
 * Shell institucional: todos los módulos sin archivo propio.
 * Usa window.__INST_MOD__ (slug del data-module) y datos del API /admin/* si hay JWT.
 */

function esc(s) {
  if (s == null || s === '') return '—';
  const t = document.createElement('span');
  t.textContent = String(s);
  return t.innerHTML;
}

function modId() {
  return (window.__INST_MOD__ || 'unknown').replace(/-/g, '_');
}

const META = {
  analytics: { title: 'Analytics', lead: 'Resumen numérico desde el backend de minería.', kind: 'stats' },
  kanban: { title: 'Kanban Board', lead: 'Vista de columnas; datos de actividad abajo.', kind: 'stats_events' },
  calendar: { title: 'Calendar', lead: 'Calendario corporativo (UI); métricas reales debajo.', kind: 'stats' },
  time_tracking: { title: 'Time Tracking', lead: 'Seguimiento de tiempo; mismas fuentes de sistema.', kind: 'stats' },
  announcements: { title: 'Announcements', lead: 'Anuncios internos; métricas de red.', kind: 'stats' },
  social_media: { title: 'Social Media', lead: 'Redes y comunidad; datos agregados del API.', kind: 'stats' },
  community: { title: 'Community Management', lead: 'Usuarios activos y minería reciente.', kind: 'users_events' },
  influencers: { title: 'Influencers', lead: 'Partners; lista de usuarios con más balance minado.', kind: 'users' },
  brand_guidelines: { title: 'Brand Guidelines', lead: 'Documentación; estado del sistema.', kind: 'system' },
  media_library: { title: 'Media Library', lead: 'Assets; exportaciones disponibles.', kind: 'exports' },
  templates: { title: 'Templates', lead: 'Plantillas; enlaces de exportación CSV.', kind: 'exports' },
  transactions: { title: 'Transactions', lead: 'Eventos de minería (movimientos on-chain simulados / DB).', kind: 'events' },
  treasury: { title: 'Treasury', lead: 'Usuarios ordenados por balance minado.', kind: 'users' },
  payments: { title: 'Payments', lead: 'Resumen de actividad y usuarios.', kind: 'users_events' },
  invoices: { title: 'Invoices', lead: 'Listado de usuarios y totales de recompensas.', kind: 'users' },
  expenses: { title: 'Expenses', lead: 'Eventos de minería (salidas de reward).', kind: 'events' },
  budgets: { title: 'Budgets', lead: 'Capas de tokens minados (totales).', kind: 'stats' },
  hr_dashboard: { title: 'HR Dashboard', lead: 'Directorio desde tabla users del API.', kind: 'users' },
  departments: { title: 'Departments', lead: 'Vista única de equipos (datos de usuarios).', kind: 'users' },
  roles: { title: 'Roles & Permissions', lead: 'Usuarios y estado; roles reales en módulo Administrators.', kind: 'users' },
  attendance: { title: 'Attendance', lead: 'Actividad reciente (minados) como proxy.', kind: 'events' },
  leave: { title: 'Leave Management', lead: 'Misma tabla de eventos para auditoría.', kind: 'events' },
  performance: { title: 'Performance Reviews', lead: 'Top recompensas por usuario.', kind: 'users' },
  recruitment: { title: 'Recruitment', lead: 'Nuevos usuarios (24h) y totales.', kind: 'stats' },
  approvals: { title: 'Pending Approvals', lead: 'Usuarios pendientes / estados.', kind: 'users' },
  workflows: { title: 'Workflows', lead: 'Flujo de minería reciente.', kind: 'events' },
  requests: { title: 'Requests', lead: 'Cola basada en últimos eventos.', kind: 'events' },
  compliance: { title: 'Compliance Center', lead: 'Auditoría y totales.', kind: 'stats_events' },
  audit: { title: 'Audit Log', lead: 'Registro de eventos de minería.', kind: 'events' },
  risk: { title: 'Risk Management', lead: 'IPs y volúmenes de eventos.', kind: 'events' },
  legal: { title: 'Legal Documents', lead: 'Exportaciones y políticas de datos.', kind: 'exports' },
  reports: { title: 'Reports', lead: 'Export CSV y resumen.', kind: 'exports' },
  documents: { title: 'Documents', lead: 'Enlaces de descarga de datos.', kind: 'exports' },
  knowledge_base: { title: 'Knowledge Base', lead: 'Info del sistema Node.', kind: 'system' },
  settings: { title: 'Settings', lead: 'Configuración del proceso backend.', kind: 'system' },
  security: { title: 'Security', lead: 'Entorno y memoria del servidor.', kind: 'system' },
  integrations: { title: 'Integrations', lead: 'API mining conectada o no.', kind: 'stats' },
  automation: { title: 'Automation', lead: 'Jobs y caché (endpoint clear disponible en API).', kind: 'system' },
  _default: { title: 'Module', lead: 'Panel institucional RSC.', kind: 'stats' },
};

export async function render() {
  const raw = window.__INST_MOD__ || 'module';
  const id = modId();
  const m = META[id] || META._default;
  const title = m.title === 'Module' ? raw.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : m.title;

  return `
    <div class="ia-shell am-page" data-ia-shell="${esc(id)}">
      <header class="am-page__head">
        <div>
          <h1 class="am-page__title">${esc(title)}</h1>
          <p class="am-page__lead">${esc(m.lead)}</p>
        </div>
        <button type="button" class="am-btn am-btn--ghost" id="iaShellRefresh"><i class="fas fa-sync-alt"></i> Refresh</button>
      </header>
      <div id="iaShellBanner" class="am-banner am-banner--warn" style="display:none;margin-bottom:1rem;"></div>
      <div class="am-stats__grid" id="iaShellStats"></div>
      <div id="iaShellExtra" style="margin-top:1.5rem;"></div>
      <h2 class="am-section-title" style="margin-top:1.5rem;">Data</h2>
      <div class="am-table-wrap">
        <table class="am-table">
          <thead id="iaShellThead"><tr><th>—</th></tr></thead>
          <tbody id="iaShellTbody"><tr><td class="am-table__muted">Loading…</td></tr></tbody>
        </table>
      </div>
    </div>
  `;
}

function showBanner(msg, variant) {
  const el = document.getElementById('iaShellBanner');
  if (!el || !msg) {
    if (el) el.style.display = 'none';
    return;
  }
  el.style.display = 'flex';
  el.className = `am-banner am-banner--${variant || 'warn'}`;
  el.innerHTML = `<div class="am-banner__icon"><i class="fas fa-info-circle"></i></div><div class="am-banner__body"><p class="am-banner__text">${msg}</p></div>`;
}

async function fillStats(grid, d) {
  if (!grid || !d) return;
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
  grid.innerHTML = cards
    .map(
      (c) =>
        `<div class="am-stat"><div class="am-stat__k">${esc(c.k)}</div><div class="am-stat__v">${esc(c.v)}</div></div>`
    )
    .join('');
}

function setTable(thead, tbody, headers, rows) {
  if (thead) thead.innerHTML = `<tr>${headers.map((h) => `<th>${esc(h)}</th>`).join('')}</tr>`;
  if (!tbody) return;
  if (!rows || !rows.length) {
    tbody.innerHTML = `<tr><td colspan="${headers.length}" class="am-table__muted">No data (connect JWT in Mining & movements).</td></tr>`;
    return;
  }
  tbody.innerHTML = rows
    .map((cells) => `<tr>${cells.map((c) => `<td>${c}</td>`).join('')}</tr>`)
    .join('');
}

export async function init() {
  const id = modId();
  const m = META[id] || META._default;
  const kind = m.kind;

  const refresh = async () => {
    const grid = document.getElementById('iaShellStats');
    const thead = document.getElementById('iaShellThead');
    const tbody = document.getElementById('iaShellTbody');
    const extra = document.getElementById('iaShellExtra');
    showBanner('', 'ok');

    const token = typeof window.getMiningAdminJwt === 'function' ? window.getMiningAdminJwt() : '';
    if (!token) {
      if (grid) grid.innerHTML = '';
      showBanner('Sin JWT del API. Abre <strong>Mining & movements</strong> y conecta con un usuario de la tabla <code class="am-code">admins</code> del backend.', 'warn');
      setTable(thead, tbody, ['Info'], [['Connect mining API first']]);
      return;
    }

    try {
      if (kind === 'system') {
        const res = await window.adminApiFetch('/admin/system/info', { method: 'GET' });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json.success) throw new Error(json.error || res.statusText);
        const d = json.data || {};
        if (grid) {
          grid.innerHTML = [
            { k: 'Node', v: d.nodeVersion },
            { k: 'Platform', v: d.platform },
            { k: 'Env', v: d.environment },
            { k: 'Uptime s', v: Math.floor(d.uptime || 0) },
          ]
            .map(
              (c) =>
                `<div class="am-stat"><div class="am-stat__k">${esc(c.k)}</div><div class="am-stat__v">${esc(c.v)}</div></div>`
            )
            .join('');
        }
        if (extra) {
          extra.innerHTML = `<pre class="ia-shell-pre">${esc(JSON.stringify(d, null, 2))}</pre>`;
        }
        setTable(thead, tbody, ['Key', 'Value'], Object.entries(d).map(([k, v]) => [esc(k), esc(typeof v === 'object' ? JSON.stringify(v) : v)]));
        return;
      }

      if (kind === 'exports') {
        const root = typeof window.getMiningApiRoot === 'function' ? window.getMiningApiRoot() : '';
        const dRes = await window.adminApiFetch('/admin/dashboard', { method: 'GET' });
        const dJson = await dRes.json().catch(() => ({}));
        if (!dRes.ok || !dJson.success) throw new Error(dJson.error || 'dashboard');
        if (grid) await fillStats(grid, dJson.data);
        if (extra) {
          extra.innerHTML = `
            <div class="ia-shell-links">
              <a class="am-btn am-btn--primary" href="${esc(root)}/admin/export/users.csv" target="_blank" rel="noopener">Export users CSV</a>
              <a class="am-btn am-btn--ghost" href="${esc(root)}/admin/export/mining.csv" target="_blank" rel="noopener">Export mining CSV</a>
            </div>`;
        }
        setTable(thead, tbody, ['Export'], [['Use buttons above (same origin as API root).']]);
        return;
      }

      async function loadDashboardAndEvents() {
        const [dRes, eRes] = await Promise.all([
          window.adminApiFetch('/admin/dashboard', { method: 'GET' }),
          window.adminApiFetch('/admin/mining-events?page=1&pageSize=50', { method: 'GET' }),
        ]);
        const dJson = await dRes.json().catch(() => ({}));
        const eJson = await eRes.json().catch(() => ({}));
        if (!dRes.ok || !dJson.success) throw new Error(dJson.error || 'dashboard');
        if (grid) await fillStats(grid, dJson.data);
        const events = eJson.success ? eJson.data || [] : [];
        setTable(
          thead,
          tbody,
          ['Date', 'Email', 'Reward', 'IP'],
          events.map((r) => [
            esc(r.created_at ? new Date(r.created_at).toLocaleString() : '—'),
            esc(r.email),
            esc(r.reward != null ? Number(r.reward).toFixed(6) : '—'),
            esc(r.ip),
          ])
        );
      }

      if (kind === 'users_events') {
        const dRes = await window.adminApiFetch('/admin/dashboard', { method: 'GET' });
        const dJson = await dRes.json().catch(() => ({}));
        if (!dRes.ok || !dJson.success) throw new Error(dJson.error || 'dashboard');
        if (grid) await fillStats(grid, dJson.data);
        const uRes = await window.adminApiFetch('/admin/users?page=1&pageSize=40', { method: 'GET' });
        const uj = await uRes.json().catch(() => ({}));
        const users = uj.data || [];
        setTable(
          thead,
          tbody,
          ['Email', 'Status', 'Mined', 'Last mine'],
          users.map((u) => [
            esc(u.email),
            esc(u.status),
            esc(u.mined_balance != null ? Number(u.mined_balance).toFixed(4) : '—'),
            esc(u.last_mine ? new Date(u.last_mine).toLocaleString() : '—'),
          ])
        );
        const eRes = await window.adminApiFetch('/admin/mining-events?page=1&pageSize=15', { method: 'GET' });
        const ej = await eRes.json().catch(() => ({}));
        const ev = ej.data || [];
        if (extra) {
          extra.innerHTML = `<h3 class="am-section-title">Recent mining</h3><div class="am-table-wrap"><table class="am-table"><thead><tr><th>Date</th><th>Email</th><th>Reward</th></tr></thead><tbody>${ev
            .map(
              (r) =>
                `<tr><td>${esc(r.created_at ? new Date(r.created_at).toLocaleString() : '')}</td><td>${esc(r.email)}</td><td>${esc(r.reward)}</td></tr>`
            )
            .join('')}</tbody></table></div>`;
        }
        return;
      }

      if (kind === 'stats_events') {
        await loadDashboardAndEvents();
        if (extra) {
          const ures = await window.adminApiFetch('/admin/users?page=1&pageSize=8', { method: 'GET' });
          const uj = await ures.json().catch(() => ({}));
          const users = uj.data || [];
          const rows = users
            .map((u) => `<div class="am-stat"><div class="am-stat__k">${esc(u.email)}</div><div class="am-stat__v">${esc(u.mined_balance)}</div></div>`)
            .join('');
          extra.innerHTML = `<h3 class="am-section-title">Users (sample)</h3><div class="am-stats__grid">${rows}</div>`;
        }
        return;
      }

      if (kind === 'events') {
        await loadDashboardAndEvents();
        if (extra) extra.innerHTML = '';
        return;
      }

      if (kind === 'users') {
        const dRes = await window.adminApiFetch('/admin/dashboard', { method: 'GET' });
        const dJson = await dRes.json().catch(() => ({}));
        if (!dRes.ok || !dJson.success) throw new Error(dJson.error || 'dashboard');
        if (grid) await fillStats(grid, dJson.data);
        const uRes = await window.adminApiFetch('/admin/users?page=1&pageSize=40', { method: 'GET' });
        const uj = await uRes.json().catch(() => ({}));
        const users = uj.data || [];
        setTable(
          thead,
          tbody,
          ['Email', 'Status', 'Mined', 'Last mine'],
          users.map((u) => [
            esc(u.email),
            esc(u.status),
            esc(u.mined_balance != null ? Number(u.mined_balance).toFixed(4) : '—'),
            esc(u.last_mine ? new Date(u.last_mine).toLocaleString() : '—'),
          ])
        );
        if (extra) extra.innerHTML = '';
        return;
      }

      // stats
      const dRes = await window.adminApiFetch('/admin/dashboard', { method: 'GET' });
      const dJson = await dRes.json().catch(() => ({}));
      if (!dRes.ok || !dJson.success) throw new Error(dJson.error || 'dashboard');
      await fillStats(grid, dJson.data);
      const act = dJson.data?.recentActivity || [];
      setTable(
        thead,
        tbody,
        ['Date', 'User', 'Reward'],
        act.map((r) => [
          esc(r.created_at ? new Date(r.created_at).toLocaleString() : '—'),
          esc(r.email),
          esc(r.reward != null ? Number(r.reward).toFixed(6) : '—'),
        ])
      );
    } catch (e) {
      showBanner(esc(e.message || 'Error'), 'err');
      if (tbody) tbody.innerHTML = `<tr><td class="am-table__muted">${esc(e.message)}</td></tr>`;
    }
  };

  document.getElementById('iaShellRefresh')?.addEventListener('click', refresh);
  await refresh();
}
