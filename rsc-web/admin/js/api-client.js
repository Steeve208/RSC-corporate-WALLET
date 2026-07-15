/**
 * Cliente del backend de minería / admin (Express).
 * JWT separado del login Supabase del panel: POST /auth/admin/login (tabla admins en PostgreSQL).
 */
(function () {
  const TOKEN_KEY = 'rscMiningAdminJwt';

  function getConfig() {
    return typeof window !== 'undefined' && window.ADMIN_CONFIG ? window.ADMIN_CONFIG : {};
  }

  function getMiningApiRoot() {
    const c = getConfig();
    const raw = (c.api && c.api.miningBackendUrl) || '';
    const base = String(raw).trim().replace(/\/$/, '');
    return base;
  }

  function getMiningAdminJwt() {
    try {
      return localStorage.getItem(TOKEN_KEY) || '';
    } catch {
      return '';
    }
  }

  function setMiningAdminJwt(token) {
    try {
      if (token) localStorage.setItem(TOKEN_KEY, token);
      else localStorage.removeItem(TOKEN_KEY);
    } catch (_) {}
  }

  function clearMiningAdminJwt() {
    setMiningAdminJwt('');
  }

  /**
   * Obtiene JWT de administrador del API Node (mismo email/contraseña que fila en `admins` de PostgreSQL).
   */
  async function exchangeMiningBackendSession(email, password) {
    const root = getMiningApiRoot();
    if (!root) {
      console.warn('[Mining API] miningBackendUrl vacío en ADMIN_CONFIG.api');
      return false;
    }
    try {
      const res = await fetch(`${root}/auth/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success || !json.data || !json.data.token) {
        clearMiningAdminJwt();
        return false;
      }
      setMiningAdminJwt(json.data.token);
      return true;
    } catch (e) {
      console.warn('[Mining API] No se pudo conectar:', e && e.message);
      clearMiningAdminJwt();
      return false;
    }
  }

  /**
   * fetch al API admin (prefijo /admin/... o /auth/...).
   */
  async function adminApiFetch(path, options) {
    const root = getMiningApiRoot();
    const token = getMiningAdminJwt();
    const p = path.startsWith('/') ? path : `/${path}`;
    const headers = Object.assign({ 'Content-Type': 'application/json' }, (options && options.headers) || {});
    if (token) headers.Authorization = `Bearer ${token}`;
    return fetch(`${root}${p}`, Object.assign({}, options, { headers }));
  }

  window.getMiningApiRoot = getMiningApiRoot;
  window.getMiningAdminJwt = getMiningAdminJwt;
  window.setMiningAdminJwt = setMiningAdminJwt;
  window.clearMiningAdminJwt = clearMiningAdminJwt;
  window.exchangeMiningBackendSession = exchangeMiningBackendSession;
  window.adminApiFetch = adminApiFetch;
})();
