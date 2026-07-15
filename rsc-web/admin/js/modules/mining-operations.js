/**
 * Módulo Mining & movements: control vía API Express (/admin/*).
 * JWT: localStorage rscMiningAdminJwt (sincronizado al login si existe fila en PostgreSQL admins).
 * Permisos del menú: Supabase admin_roles (p. ej. super_admin, permiso mining_ops).
 */

function getMiningOpsShell() {
  const session = typeof getAdminSession === 'function' ? getAdminSession() : null;
  const role = session && session.role ? session.role : '';
  const readOnly = role === 'viewer';

  return `
    <div class="mining-ops" style="padding:1.5rem;max-width:1200px;margin:0 auto;">
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:1rem;margin-bottom:1.5rem;">
        <div>
          <h2 style="margin:0 0 0.35rem;color:var(--text-primary);font-size:1.35rem;">Mining & movements</h2>
          <p style="margin:0;color:var(--text-secondary);font-size:0.9rem;">
            Datos en vivo desde el backend (<code style="color:var(--primary);">GET /admin/dashboard</code>, <code style="color:var(--primary);">GET /admin/mining-events</code>).
          </p>
        </div>
        <div style="text-align:right;font-size:0.8rem;color:var(--text-muted);">
          <div><strong style="color:var(--text-secondary);">Sesión panel</strong> · <span id="miningOpsSessionEmail"></span></div>
          <div>Rol UI: <span id="miningOpsSessionRole" style="color:var(--primary);"></span>${readOnly ? ' · solo lectura' : ''}</div>
        </div>
      </div>

      <div id="miningApiBanner" style="display:none;margin-bottom:1rem;padding:1rem;border-radius:12px;border:1px solid rgba(245,158,11,0.35);background:rgba(245,158,11,0.08);color:#fbbf24;font-size:0.875rem;"></div>

      <div id="miningApiConnect" style="display:none;margin-bottom:1.5rem;padding:1.25rem;border-radius:12px;border:1px solid var(--border-color);background:var(--card-bg);">
        <h3 style="margin:0 0 0.75rem;color:var(--text-primary);font-size:1rem;">Conectar API de minería</h3>
        <p style="margin:0 0 1rem;color:var(--text-secondary);font-size:0.85rem;line-height:1.5;">
          El panel usa Supabase para tu usuario; el API de estadísticas usa la tabla <code>admins</code> del PostgreSQL del backend.
          Introduce las credenciales de un admin registrado ahí (p. ej. <code>admin@rsc.local</code> en desarrollo).
        </p>
        <form id="miningApiConnectForm" style="display:grid;gap:0.75rem;max-width:420px;">
          <input type="email" id="miningConnectEmail" required placeholder="Email"
            style="padding:0.65rem 0.85rem;border-radius:8px;border:1px solid var(--border-color);background:#0f1115;color:#fff;">
          <input type="password" id="miningConnectPassword" required placeholder="Contraseña"
            style="padding:0.65rem 0.85rem;border-radius:8px;border:1px solid var(--border-color);background:#0f1115;color:#fff;">
          <button type="submit" class="login-btn" style="width:fit-content;padding:0.6rem 1.2rem;border-radius:8px;border:none;background:linear-gradient(135deg,#00ff88,#00d673);color:#0a0a0f;font-weight:600;cursor:pointer;">
            Guardar JWT y cargar datos
          </button>
        </form>
      </div>

      <div id="miningStatsRow" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1rem;margin-bottom:1.5rem;"></div>

      <div style="background:var(--card-bg);border:1px solid var(--border-color);border-radius:12px;padding:1rem 1.25rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
          <h3 style="margin:0;color:var(--text-primary);font-size:1rem;">Últimos movimientos (mining_events)</h3>
          <button type="button" id="miningRefreshBtn" style="padding:0.45rem 0.9rem;border-radius:8px;border:1px solid var(--border-color);background:transparent;color:var(--text-secondary);cursor:pointer;font-size:0.8rem;">
            <i class="fas fa-sync-alt"></i> Actualizar
          </button>
        </div>
        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;font-size:0.8rem;">
            <thead>
              <tr style="text-align:left;color:var(--text-muted);border-bottom:1px solid var(--border-color);">
                <th style="padding:0.5rem 0.35rem;">Fecha</th>
                <th style="padding:0.5rem 0.35rem;">Usuario</th>
                <th style="padding:0.5rem 0.35rem;">Reward</th>
                <th style="padding:0.5rem 0.35rem;">IP</th>
              </tr>
            </thead>
            <tbody id="miningEventsBody"></tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function setBanner(message, isError) {
  const el = document.getElementById('miningApiBanner');
  if (!el) return;
  if (!message) {
    el.style.display = 'none';
    el.textContent = '';
    return;
  }
  el.style.display = 'block';
  el.textContent = message;
  el.style.borderColor = isError ? 'rgba(239,68,68,0.45)' : 'rgba(245,158,11,0.35)';
  el.style.background = isError ? 'rgba(239,68,68,0.08)' : 'rgba(245,158,11,0.08)';
  el.style.color = isError ? '#fca5a5' : '#fbbf24';
}

function renderStats(d) {
  const row = document.getElementById('miningStatsRow');
  if (!row || !d) return;
  const u = d.users || {};
  const m = d.mining || {};
  const t = d.today || {};
  const cards = [
    { label: 'Usuarios totales', value: u.total },
    { label: 'Activos', value: u.active },
    { label: 'Nuevos (24h)', value: u.new24h },
    { label: 'Mineros activos (24h)', value: u.activeMiners24h },
    { label: 'Eventos minería', value: m.totalEvents },
    { label: 'Tokens minados', value: Number(m.totalTokens || 0).toFixed(4) },
    { label: 'Eventos hoy', value: t.events },
    { label: 'Tokens hoy', value: Number(t.tokens || 0).toFixed(4) },
  ];
  row.innerHTML = cards
    .map(
      (c) => `
    <div style="padding:1rem;border-radius:12px;border:1px solid var(--border-color);background:rgba(0,0,0,0.15);">
      <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:0.35rem;">${c.label}</div>
      <div style="font-size:1.35rem;font-weight:600;color:var(--text-primary);">${c.value != null ? c.value : '—'}</div>
    </div>
  `
    )
    .join('');
}

function renderEvents(rows) {
  const body = document.getElementById('miningEventsBody');
  if (!body) return;
  if (!rows || !rows.length) {
    body.innerHTML = `<tr><td colspan="4" style="padding:1rem;color:var(--text-muted);">Sin eventos.</td></tr>`;
    return;
  }
  body.innerHTML = rows
    .map((r) => {
      const when = r.created_at ? new Date(r.created_at).toLocaleString() : '—';
      const mail = r.email || r.user_id || '—';
      const rw = r.reward != null ? Number(r.reward).toFixed(6) : '—';
      const ip = r.ip || '—';
      return `<tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
        <td style="padding:0.5rem 0.35rem;color:var(--text-secondary);">${when}</td>
        <td style="padding:0.5rem 0.35rem;color:var(--text-primary);">${mail}</td>
        <td style="padding:0.5rem 0.35rem;color:var(--primary);">${rw}</td>
        <td style="padding:0.5rem 0.35rem;color:var(--text-muted);font-size:0.75rem;">${ip}</td>
      </tr>`;
    })
    .join('');
}

async function refreshMiningOpsData() {
  const token = typeof window.getMiningAdminJwt === 'function' ? window.getMiningAdminJwt() : '';
  const connect = document.getElementById('miningApiConnect');
  const banner = document.getElementById('miningApiBanner');

  if (!token) {
    if (connect) connect.style.display = 'block';
    setBanner('Sin JWT del API de minería. Conecta abajo o vuelve a iniciar sesión si tu usuario existe en PostgreSQL admins.', false);
    renderStats({});
    renderEvents([]);
    return;
  }

  if (connect) connect.style.display = 'none';

  try {
    const dashRes = await window.adminApiFetch('/admin/dashboard', { method: 'GET' });
    const dashJson = await dashRes.json().catch(() => ({}));
    if (!dashRes.ok || !dashJson.success) {
      const msg = (dashJson && dashJson.error) || dashRes.statusText || 'Error dashboard';
      if (dashRes.status === 401 || dashRes.status === 403) {
        if (typeof window.clearMiningAdminJwt === 'function') window.clearMiningAdminJwt();
        if (connect) connect.style.display = 'block';
      }
      throw new Error(msg);
    }
    renderStats(dashJson.data || {});
    setBanner('', false);
  } catch (e) {
    setBanner(e.message || 'Error cargando dashboard', true);
    renderStats({});
  }

  try {
    const evRes = await window.adminApiFetch('/admin/mining-events?page=1&pageSize=40', { method: 'GET' });
    const evJson = await evRes.json().catch(() => ({}));
    if (!evRes.ok || !evJson.success) {
      renderEvents([]);
      return;
    }
    renderEvents(evJson.data || []);
  } catch (_) {
    renderEvents([]);
  }
}

async function loadMiningOps() {
  const container = document.getElementById('adminContent');
  if (!container) return;

  container.innerHTML = getMiningOpsShell();
  const sessionAfter = typeof getAdminSession === 'function' ? getAdminSession() : null;
  const em = sessionAfter && sessionAfter.email ? sessionAfter.email : '';
  const rl = sessionAfter && sessionAfter.role ? sessionAfter.role : '';
  const elEm = document.getElementById('miningOpsSessionEmail');
  const elRl = document.getElementById('miningOpsSessionRole');
  if (elEm) elEm.textContent = em || '—';
  if (elRl) elRl.textContent = rl || '—';

  const emailInput = document.getElementById('miningConnectEmail');
  if (emailInput && em) emailInput.value = em;

  const form = document.getElementById('miningApiConnectForm');
  if (form) {
    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const email = document.getElementById('miningConnectEmail').value.trim();
      const password = document.getElementById('miningConnectPassword').value;
      const ok = await window.exchangeMiningBackendSession(email, password);
      if (ok) {
        const showToast = window.showToast || (() => {});
        showToast('API de minería conectada', 'success');
        document.getElementById('miningConnectPassword').value = '';
        await refreshMiningOpsData();
      } else {
        const showToast = window.showToast || (() => {});
        showToast('Credenciales no válidas en el backend PostgreSQL', 'error');
      }
    });
  }

  const btn = document.getElementById('miningRefreshBtn');
  if (btn) {
    btn.addEventListener('click', async () => {
      btn.querySelector('i') && btn.querySelector('i').classList.add('fa-spin');
      await refreshMiningOpsData();
      setTimeout(() => {
        btn.querySelector('i') && btn.querySelector('i').classList.remove('fa-spin');
      }, 600);
    });
  }

  await refreshMiningOpsData();
}

window.loadMiningOps = loadMiningOps;
