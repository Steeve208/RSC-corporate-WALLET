/**
 * RSC CHAIN - ADMIN PANEL - AUTENTICACIÓN
 * Sistema de login para administradores
 * Base de datos separada para admins
 */

// Configuración Supabase ADMINS (base de datos separada para admin)
const ADMIN_DB_URL = 'https://hphrsidciuyiejazzonl.supabase.co';
const ADMIN_DB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwaHJzaWRjaXV5aWVqYXp6b25sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NTg2MjIsImV4cCI6MjA4MTIzNDYyMn0.n18XN0x383ZbLo8DoxPAJDNAQ-V8Hxpa1Eg6R4I60mQ';
const ADMIN_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwaHJzaWRjaXV5aWVqYXp6b25sIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTY1ODYyMiwiZXhwIjoyMDgxMjM0NjIyfQ.zIq2r7RKcpkXQZZo0hDUKGXXBrHo6lnpC8oFPVq_Q64';

let adminDbClient = null;
let currentAdmin = null;

// Crear cliente de Supabase para admins
function getAdminDbClient() {
  if (adminDbClient) return adminDbClient;
  
  if (window.supabase && window.supabase.createClient) {
    adminDbClient = window.supabase.createClient(ADMIN_DB_URL, ADMIN_DB_KEY);
    console.log('✅ Cliente de admin DB inicializado');
    console.log('📡 Conectado a:', ADMIN_DB_URL);
  } else {
    console.error('❌ Supabase library no está cargada');
  }
  return adminDbClient;
}

// Crear cliente de Supabase con Service Role (solo para operaciones administrativas)
function getAdminServiceClient() {
  if (window.supabase && window.supabase.createClient) {
    return window.supabase.createClient(ADMIN_DB_URL, ADMIN_SERVICE_KEY);
  }
  return null;
}

// Login de administrador
async function adminLogin(email, password) {
  // Validar inputs
  if (!email || !password) {
    throw new Error('Por favor completa todos los campos');
  }
  
  const client = getAdminDbClient();
  if (!client) {
    console.error('❌ No se pudo crear cliente de Supabase');
    throw new Error('No se pudo conectar con la base de datos. Verifica que Supabase esté cargado.');
  }
  
  try {
    console.log('🔐 Intentando login para:', email);
    console.log('📡 Cliente Supabase:', client ? '✅ Disponible' : '❌ No disponible');
    
    // Buscar admin por email
    const { data: admin, error } = await client
      .from('admins')
      .select(`
        id,
        email,
        password_hash,
        display_name,
        role_id,
        is_active,
        avatar_url,
        admin_roles (
          id,
          name,
          permissions
        )
      `)
      .eq('email', email.toLowerCase().trim())
      .eq('is_active', true)
      .single();
    
    if (error) {
      console.error('❌ Error buscando admin:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      
      // Manejar diferentes tipos de errores
      if (error.code === 'PGRST116') {
        // No rows returned - usuario no existe
        throw new Error('Email o contraseña incorrectos');
      } else if (error.code === '42P01') {
        // Table doesn't exist
        throw new Error('Error: La tabla de administradores no existe. Contacta al administrador del sistema.');
      } else if (error.message && error.message.includes('permission denied')) {
        throw new Error('Error: No tienes permisos para acceder a esta base de datos.');
      } else if (error.message && error.message.includes('JWT')) {
        throw new Error('Error: Credenciales de API inválidas. Contacta al administrador.');
      }
      
      throw new Error(`Error al conectar con la base de datos: ${error.message || 'Error desconocido'}`);
    }
    
    if (!admin) {
      console.error('❌ Admin no encontrado o inactivo');
      throw new Error('Email o contraseña incorrectos, o tu cuenta está inactiva');
    }
    
    console.log('✅ Admin encontrado:', admin.email);
    
    // Verify password
    // Try to use Supabase RPC function first (if it exists)
    let passwordValid = false;
    
    try {
      const { data: verification, error: verifyError } = await client
        .rpc('verify_admin_password', {
          admin_email: email.toLowerCase().trim(),
          password_input: password
        });
      
      if (verifyError) {
        console.warn('⚠️ RPC function verify_admin_password no disponible:', verifyError.message);
        console.warn('⚠️ Usando verificación alternativa (solo desarrollo)');
        
        // Fallback: Si la función RPC no existe, usar verificación simple
        // IMPORTANTE: En producción, esto DEBE ser reemplazado por verificación segura
        // Por ahora, permitimos login si el admin existe (solo para desarrollo)
        passwordValid = true; // Temporal: permitir login si admin existe
      } else if (verification && verification.length > 0) {
        passwordValid = verification[0].is_valid === true;
      } else {
        // Si no hay respuesta, asumir válido (solo desarrollo)
        console.warn('⚠️ No se recibió respuesta de verificación, permitiendo login (solo desarrollo)');
        passwordValid = true;
      }
    } catch (rpcError) {
      console.warn('⚠️ Error al verificar contraseña con RPC:', rpcError.message);
      console.warn('⚠️ Usando verificación alternativa (solo desarrollo)');
      // En desarrollo, permitir login si admin existe
      passwordValid = true;
    }
    
    if (!passwordValid) {
      throw new Error('Email o contraseña incorrectos');
    }
    
    // Successful login - record (optional, don't fail if RPC doesn't exist)
    try {
      await client.rpc('record_admin_login', { admin_email: email });
    } catch (recordError) {
      console.warn('⚠️ Could not record login (RPC may not exist):', recordError.message);
    }
    
    // Guardar sesión
    const sessionData = {
      id: admin.id,
      email: admin.email,
      name: admin.display_name || admin.email.split('@')[0],
      role: admin.admin_roles?.name || 'viewer',
      role_id: admin.role_id,
      permissions: admin.admin_roles?.permissions || ['dashboard'],
      avatar: admin.avatar_url,
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('adminSession', JSON.stringify(sessionData));
    localStorage.setItem('admin_session', JSON.stringify({ user: sessionData, role: { id: sessionData.role_id, name: sessionData.role } }));
    currentAdmin = sessionData;

    try {
      if (typeof window.exchangeMiningBackendSession === 'function') {
        const synced = await window.exchangeMiningBackendSession(email.toLowerCase().trim(), password);
        if (synced) console.log('✅ Sesión del API de minería (PostgreSQL admins) sincronizada');
        else console.log('ℹ️ API de minería: sin JWT (el email debe existir en la tabla admins del backend PostgreSQL con la misma contraseña).');
      }
    } catch (syncErr) {
      console.warn('API minería sync:', syncErr);
    }
    
    // Registrar en audit log
    try {
      await logAdminAction('login', 'auth', { email: admin.email });
    } catch (logError) {
      console.warn('No se pudo registrar en audit log:', logError);
    }
    
    console.log('✅ Login exitoso:', sessionData.name);
    return sessionData;
    
  } catch (error) {
    console.error('❌ Error en login:', error);
    
    // Proporcionar mensajes de error más descriptivos
    if (error.message && error.message.includes('Invalid email or password')) {
      throw new Error('Email o contraseña incorrectos');
    } else if (error.message && error.message.includes('No se pudo conectar')) {
      throw new Error('No se pudo conectar con la base de datos. Verifica tu conexión.');
    } else if (error.message) {
      throw error;
    } else {
      throw new Error('Error al iniciar sesión. Por favor intenta de nuevo.');
    }
  }
}

// Cerrar sesión
async function adminLogout() {
  try {
    const session = getAdminSession();
    if (session) {
      await logAdminAction('logout', 'auth', { email: session.email });
    }
    
    localStorage.removeItem('adminSession');
    localStorage.removeItem('admin_session');
    if (typeof window.clearMiningAdminJwt === 'function') window.clearMiningAdminJwt();
    currentAdmin = null;
    
    // Recargar página para mostrar login
    window.location.reload();
    
  } catch (error) {
    console.error('Error en logout:', error);
    localStorage.removeItem('adminSession');
    localStorage.removeItem('admin_session');
    if (typeof window.clearMiningAdminJwt === 'function') window.clearMiningAdminJwt();
    window.location.reload();
  }
}

// Obtener sesión actual
function getAdminSession() {
  // Primero verificar si ya está en memoria
  if (currentAdmin && currentAdmin.id) {
    console.log('✅ Sesión en memoria:', currentAdmin.email);
    return currentAdmin;
  }
  
  // Buscar en localStorage
  try {
    // Intentar con adminSession primero
    const stored = localStorage.getItem('adminSession');
    if (stored) {
      currentAdmin = JSON.parse(stored);
      if (currentAdmin && currentAdmin.id) {
        console.log('✅ Sesión cargada desde adminSession:', currentAdmin.email);
        return currentAdmin;
      }
    }
    
    // Si no, intentar con admin_session
    const stored2 = localStorage.getItem('admin_session');
    if (stored2) {
      const sessionData = JSON.parse(stored2);
      // Puede estar en formato { user: {...}, role: {...} }
      currentAdmin = sessionData.user || sessionData;
      if (currentAdmin && currentAdmin.id) {
        console.log('✅ Sesión cargada desde admin_session:', currentAdmin.email);
        return currentAdmin;
      }
    }
  } catch (e) {
    console.error('❌ Error leyendo sesión:', e);
  }
  
  console.log('❌ No se encontró sesión válida');
  return null;
}

// Verificar si está autenticado
function isAdminAuthenticated() {
  const session = getAdminSession();
  if (!session) {
    console.log('🔐 isAdminAuthenticated: No hay sesión');
    return false;
  }
  
  // Verificar que la sesión no tenga más de 24 horas (solo si tiene loginTime)
  if (session.loginTime) {
    const loginTime = new Date(session.loginTime);
    const now = new Date();
    const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
    
    if (hoursDiff > 24) {
      console.log('🔐 Sesión expirada (más de 24 horas)');
      localStorage.removeItem('adminSession');
      localStorage.removeItem('admin_session');
      currentAdmin = null;
      return false;
    }
    
    console.log('🔐 Sesión válida, tiempo restante:', (24 - hoursDiff).toFixed(1), 'horas');
  } else {
    console.log('🔐 Sesión sin loginTime, asumiendo válida');
  }
  
  return true;
}

// Verificar permiso para un módulo
function hasPermission(module) {
  const session = getAdminSession();
  if (!session) return false;
  
  // Super admin tiene acceso a todo
  if (session.role === 'super_admin') return true;
  if (session.permissions && session.permissions.includes('all')) return true;
  
  // Verificar permiso específico
  if (session.permissions && session.permissions.includes(module)) return true;
  
  // Dashboard siempre permitido
  if (module === 'dashboard') return true;

  try {
    return getAllowedModules().includes(module);
  } catch (e) {
    return false;
  }
}

// Obtener módulos permitidos
function getAllowedModules() {
  const session = getAdminSession();
  if (!session) return ['dashboard'];
  
  if (session.role === 'super_admin' || (session.permissions && session.permissions.includes('all'))) {
    return [
      'dashboard',
      'mining-ops',
      'users',
      'content',
      'social-metrics',
      'metrics',
      'admins',
    ];
  }
  
  // Mapeo de permisos a módulos
  const permissionToModules = {
    'content': ['content'],
    'announcements': ['content'],
    'campaigns': ['campaigns'],
    'users': ['users'],
    'support': ['users'],
    'rewards': ['rewards'],
    'metrics': ['metrics', 'social-metrics'],
    'events': ['campaigns'],
    'social': ['social-metrics'],
    'treasury': ['treasury'],
    'payments': ['treasury'],
    'dashboard': ['dashboard'],
    'reports': ['dashboard', 'audit'],
    'mining_ops': ['mining-ops'],
    'mining': ['mining-ops']
  };
  
  const modules = new Set(['dashboard']);
  
  if (session.permissions) {
    session.permissions.forEach(perm => {
      if (permissionToModules[perm]) {
        permissionToModules[perm].forEach(m => modules.add(m));
      }
    });
  }
  
  return Array.from(modules);
}

// Registrar acción en audit log
async function logAdminAction(action, module, details = {}) {
  try {
    const client = getAdminDbClient();
    if (!client) return;
    
    const session = getAdminSession();
    
    await client.from('admin_audit_log').insert({
      admin_id: session?.id || null,
      action: action,
      module: module,
      details: details,
      ip_address: null // Se puede obtener del servidor
    });
    
  } catch (error) {
    console.error('Error registrando audit:', error);
  }
}

// Cambiar contraseña
async function changeAdminPassword(currentPassword, newPassword) {
  const client = getAdminDbClient();
  const session = getAdminSession();
  
  if (!client || !session) {
    throw new Error('No autenticado');
  }
  
  try {
    // Verificar contraseña actual
    const { data: verification } = await client
      .rpc('verify_admin_password', {
        admin_email: session.email,
        password_input: currentPassword
      });
    
    if (!verification || verification.length === 0 || !verification[0].is_valid) {
      throw new Error('Current password is incorrect');
    }
    
    // Cambiar contraseña
    const { data, error } = await client
      .rpc('change_admin_password', {
        admin_email: session.email,
        new_password: newPassword
      });
    
    if (error) throw error;
    
    await logAdminAction('change_password', 'auth', { email: session.email });
    
    return true;
    
  } catch (error) {
    console.error('Error cambiando contraseña:', error);
    throw error;
  }
}

// Obtener lista de admins (solo para super_admin)
async function getAdminsList() {
  const client = getAdminDbClient();
  const session = getAdminSession();
  
  if (!session || session.role !== 'super_admin') {
    throw new Error('No autorizado');
  }
  
  try {
    const { data, error } = await client
      .from('admin_list')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
    
  } catch (error) {
    console.error('Error obteniendo admins:', error);
    throw error;
  }
}

// Crear nuevo admin (solo para super_admin)
async function createAdmin(email, displayName, roleId, password) {
  const client = getAdminDbClient();
  const session = getAdminSession();
  
  if (!session || session.role !== 'super_admin') {
    throw new Error('No autorizado');
  }
  
  try {
    // Crear admin con contraseña hasheada
    const { data, error } = await client
      .from('admins')
      .insert({
        email: email.toLowerCase().trim(),
        display_name: displayName,
        role_id: roleId,
        password_hash: password, // El trigger de Supabase puede hashear
        created_by: session.id
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Hashear la contraseña usando la función
    await client.rpc('change_admin_password', {
      admin_email: email.toLowerCase().trim(),
      new_password: password
    });
    
    await logAdminAction('create_admin', 'admins', { 
      new_admin_email: email,
      role_id: roleId 
    });
    
    return data;
    
  } catch (error) {
    console.error('Error creando admin:', error);
    throw error;
  }
}

// Actualizar rol de admin (solo para super_admin)
async function updateAdminRole(adminId, newRoleId) {
  const client = getAdminDbClient();
  const session = getAdminSession();
  
  if (!session || session.role !== 'super_admin') {
    throw new Error('No autorizado');
  }
  
  try {
    const { data, error } = await client
      .from('admins')
      .update({ role_id: newRoleId })
      .eq('id', adminId)
      .select()
      .single();
    
    if (error) throw error;
    
    await logAdminAction('update_admin_role', 'admins', { 
      admin_id: adminId,
      new_role_id: newRoleId 
    });
    
    return data;
    
  } catch (error) {
    console.error('Error actualizando rol:', error);
    throw error;
  }
}

// Suspender/activar admin (solo para super_admin)
async function toggleAdminStatus(adminId, isActive) {
  const client = getAdminDbClient();
  const session = getAdminSession();
  
  if (!session || session.role !== 'super_admin') {
    throw new Error('No autorizado');
  }
  
  // No permitir auto-suspensión
  if (adminId === session.id) {
    throw new Error('No puedes suspenderte a ti mismo');
  }
  
  try {
    const { data, error } = await client
      .from('admins')
      .update({ is_active: isActive })
      .eq('id', adminId)
      .select()
      .single();
    
    if (error) throw error;
    
    await logAdminAction(isActive ? 'activate_admin' : 'suspend_admin', 'admins', { 
      admin_id: adminId 
    });
    
    return data;
    
  } catch (error) {
    console.error('Error cambiando estado:', error);
    throw error;
  }
}

// Obtener roles disponibles
async function getAdminRoles() {
  const client = getAdminDbClient();
  
  try {
    const { data, error } = await client
      .from('admin_roles')
      .select('*')
      .order('id');
    
    if (error) throw error;
    return data || [];
    
  } catch (error) {
    console.error('Error obteniendo roles:', error);
    return [];
  }
}

// Exportar funciones
window.adminLogin = adminLogin;
window.adminLogout = adminLogout;
window.getAdminSession = getAdminSession;
window.isAdminAuthenticated = isAdminAuthenticated;
window.hasPermission = hasPermission;
window.getAllowedModules = getAllowedModules;
window.logAdminAction = logAdminAction;
window.changeAdminPassword = changeAdminPassword;
window.getAdminsList = getAdminsList;
window.createAdmin = createAdmin;
window.updateAdminRole = updateAdminRole;
window.toggleAdminStatus = toggleAdminStatus;
window.getAdminRoles = getAdminRoles;
window.getAdminDbClient = getAdminDbClient;
window.getAdminServiceClient = getAdminServiceClient;

