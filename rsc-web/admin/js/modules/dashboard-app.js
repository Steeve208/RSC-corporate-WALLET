/**
 * Dashboard operativo — sin ES modules (window.loadDashboard).
 * Usa GET /admin/dashboard si hay JWT de minería; siempre muestra sesión Supabase del panel.
 */
(function () {
  function esc(s) {
    if (s == null || s === '') return '—';
    const t = document.createElement('span');
    t.textContent = String(s);
    return t.innerHTML;
  }

  async function loadDashboard() {
    const root = document.getElementById('adminContent');
    if (!root) return;

    const session = typeof getAdminSession === 'function' ? getAdminSession() : null;
    const hasJwt = typeof window.getMiningAdminJwt === 'function' && !!window.getMiningAdminJwt();
    const apiRoot = typeof window.getMiningApiRoot === 'function' ? window.getMiningApiRoot() : '';

    root.innerHTML = `
      <div class="am-page">
        <header class="am-page__head">
          <div>
            <h1 class="am-page__title">Resumen</h1>
            <p class="am-page__lead">Estado del sistema de minería y tu sesión de equipo.</p>
          </div>
          <div class="am-page__actions">
            <button type="button" class="am-btn am-btn--ghost" id="amDashRefresh" title="Actualizar datos del API">
              <i class="fas fa-sync-alt"></i> Actualizar
            </button>
            <a href="#" class="am-btn am-btn--primary" data-module-link="mining-ops">
              <i class="fas fa-server"></i> Mining API
            </a>
          </div>
        </header>

        <div class="am-banner ${hasJwt ? 'am-banner--ok' : 'am-banner--warn'}" id="amApiBanner">
          <div class="am-banner__icon" id="amBannerIconWrap"><i class="fas ${hasJwt ? 'fa-link' : 'fa-unlink'}" id="amBannerIcon"></i></div>
          <div class="am-banner__body">
            <strong id="amBannerTitle">${hasJwt ? 'API de minería conectada' : 'API de minería sin token'}</strong>
            <p class="am-banner__text" id="amBannerText">${hasJwt
              ? 'Los números de abajo vienen de PostgreSQL vía el backend Express.'
              : `Configura <code class="am-code">ADMIN_CONFIG.api.miningBackendUrl</code> (${esc(apiRoot) || 'sin URL'}) y un usuario en la tabla <code class="am-code">admins</code> del backend, o abre <strong>Mining API</strong> para conectar.`}
            </p>
          </div>
        </div>

        <section class="am-session" aria-label="Tu sesión">
          <h2 class="am-section-title">Tu cuenta</h2>
          <div class="am-session__grid">
            <div class="am-kv"><span class="am-kv__k">Nombre</span><span class="am-kv__v" id="amSessName">—</span></div>
            <div class="am-kv"><span class="am-kv__k">Email</span><span class="am-kv__v" id="amSessEmail">—</span></div>
            <div class="am-kv"><span class="am-kv__k">Rol</span><span class="am-kv__v" id="amSessRole">—</span></div>
          </div>
        </section>

        <section class="am-stats" aria-label="Métricas del API">
          <h2 class="am-section-title">Métricas (backend)</h2>
          <div class="am-stats__grid" id="amStatsGrid">
            ${[1, 2, 3, 4, 5, 6].map(() => '<div class="am-skel am-skel--card"></div>').join('')}
          </div>
        </section>

        <section class="am-activity" aria-label="Actividad reciente">
          <h2 class="am-section-title">Actividad reciente</h2>
          <div class="am-table-wrap">
            <table class="am-table">
              <thead><tr><th>Fecha</th><th>Usuario</th><th>Reward</th><th>IP</th></tr></thead>
              <tbody id="amActivityBody"><tr><td colspan="4" class="am-table__muted">Cargando…</td></tr></tbody>
            </table>
          </div>
        </section>
      </div>
    `;

    const nameEl = document.getElementById('amSessName');
    const emailEl = document.getElementById('amSessEmail');
    const roleEl = document.getElementById('amSessRole');
    if (nameEl) nameEl.textContent = session && session.name ? session.name : '—';
    if (emailEl) emailEl.textContent = session && session.email ? session.email : '—';
    if (roleEl) roleEl.textContent = session && session.role ? session.role : '—';

    const linkMining = root.querySelector('[data-module-link="mining-ops"]');
    if (linkMining) {
      linkMining.addEventListener('click', (e) => {
        e.preventDefault();
        const nav = document.querySelector('.nav-item[data-module="mining-ops"]');
        if (nav) nav.click();
        else if (typeof window.loadModule === 'function') window.loadModule('mining-ops');
      });
    }

    document.getElementById('amDashRefresh')?.addEventListener('click', () => hydrateFromApi());

    await hydrateFromApi();
  }

  async function hydrateFromApi() {
    const grid = document.getElementById('amStatsGrid');
    const tbody = document.getElementById('amActivityBody');
    const banner = document.getElementById('amApiBanner');
    const iconEl = document.getElementById('amBannerIcon');
    const titleEl = document.getElementById('amBannerTitle');
    const textEl = document.getElementById('amBannerText');
    const hasJwt = typeof window.getMiningAdminJwt === 'function' && !!window.getMiningAdminJwt();

    if (!hasJwt) {
      if (grid) {
        grid.innerHTML = `
          <div class="am-empty am-empty--wide">
            <i class="fas fa-plug"></i>
            <p>Sin JWT: conecta desde el menú <strong>Mining API</strong> o inicia sesión de nuevo con un usuario presente en <code class="am-code">admins</code> del backend.</p>
          </div>
        `;
      }
      if (tbody) tbody.innerHTML = '<tr><td colspan="4" class="am-table__muted">Sin datos del API.</td></tr>';
      if (banner) {
        banner.className = 'am-banner am-banner--warn';
        if (iconEl) iconEl.className = 'fas fa-unlink';
        if (titleEl) titleEl.textContent = 'API de minería sin token';
        if (textEl) textEl.innerHTML = 'Usa el menú <strong>Mining API</strong> o vuelve a entrar con credenciales de <code class="am-code">admins</code> en el backend.';
      }
      return;
    }

    if (grid) {
      grid.innerHTML = [1, 2, 3, 4, 5, 6].map(() => '<div class="am-skel am-skel--card"></div>').join('');
    }

    try {
      const res = await window.adminApiFetch('/admin/dashboard', { method: 'GET' });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        if (res.status === 401 || res.status === 403) {
          if (typeof window.clearMiningAdminJwt === 'function') window.clearMiningAdminJwt();
          if (banner) banner.className = 'am-banner am-banner--err';
          if (iconEl) iconEl.className = 'fas fa-exclamation-triangle';
          if (titleEl) titleEl.textContent = 'Sesión API caducada o inválida';
          if (textEl) textEl.innerHTML = 'Vuelve a conectar en <strong>Mining API</strong>.';
        }
        throw new Error((json && json.error) || res.statusText || 'Error');
      }

      const d = json.data || {};
      const u = d.users || {};
      const m = d.mining || {};
      const t = d.today || {};
      const cards = [
        { k: 'Usuarios', v: u.total, sub: 'registrados' },
        { k: 'Activos', v: u.active, sub: 'cuenta activa' },
        { k: 'Nuevos 24h', v: u.new24h, sub: 'altas' },
        { k: 'Mineros 24h', v: u.activeMiners24h, sub: 'minaron' },
        { k: 'Eventos minería', v: m.totalEvents, sub: 'total' },
        { k: 'Tokens minados', v: m.totalTokens != null ? Number(m.totalTokens).toFixed(4) : '—', sub: 'histórico' },
        { k: 'Eventos hoy', v: t.events, sub: 'hoy' },
        { k: 'Tokens hoy', v: t.tokens != null ? Number(t.tokens).toFixed(4) : '—', sub: 'hoy' },
      ];
      if (grid) {
        grid.innerHTML = cards
          .map(
            (c) => `
          <div class="am-stat">
            <div class="am-stat__k">${esc(c.k)}</div>
            <div class="am-stat__v">${esc(c.v)}</div>
            <div class="am-stat__s">${esc(c.sub)}</div>
          </div>
        `
          )
          .join('');
      }

      const rows = Array.isArray(d.recentActivity) ? d.recentActivity : [];
      if (tbody) {
        if (!rows.length) {
          tbody.innerHTML = '<tr><td colspan="4" class="am-table__muted">Sin actividad reciente.</td></tr>';
        } else {
          tbody.innerHTML = rows
            .map((r) => {
              const when = r.created_at ? new Date(r.created_at).toLocaleString() : '—';
              return `<tr>
              <td>${esc(when)}</td>
              <td>${esc(r.email)}</td>
              <td class="am-num">${r.reward != null ? esc(Number(r.reward).toFixed(6)) : '—'}</td>
              <td>${esc(r.ip)}</td>
            </tr>`;
            })
            .join('');
        }
      }

      if (banner) banner.className = 'am-banner am-banner--ok';
      if (iconEl) iconEl.className = 'fas fa-link';
      if (titleEl) titleEl.textContent = 'API de minería conectada';
      if (textEl) textEl.textContent = 'Datos actualizados desde el backend.';
    } catch (e) {
      if (grid) {
        grid.innerHTML = `<div class="am-empty am-empty--wide am-empty--err"><i class="fas fa-exclamation-triangle"></i><p>${esc(e.message || 'Error al cargar')}</p></div>`;
      }
      if (tbody) tbody.innerHTML = '<tr><td colspan="4" class="am-table__muted">—</td></tr>';
    }
  }

  window.loadDashboard = loadDashboard;
})();
