# 🔐 RSC Login Troubleshooting Guide

## 🚨 Problema: "No me deja iniciar sesión"

### ✅ SOLUCIÓN RÁPIDA

1. **Usa las credenciales de prueba:**
   - Email: `test@rsc.com`
   - Password: `123456`

2. **Abre la herramienta de debug:**
   - Ve a: `test-login-debug.html`
   - Haz clic en "Create Test User (test@rsc.com)"
   - Luego haz clic en "Test Login"

### 🔍 DIAGNÓSTICO COMPLETO

#### **Paso 1: Verificar Conexión**
```javascript
// En la consola del navegador:
window.supabaseIntegration.checkConnection()
```

#### **Paso 2: Crear Usuario de Prueba**
```javascript
// En la consola del navegador:
window.supabaseIntegration.createTestUser()
```

#### **Paso 3: Probar Login**
```javascript
// En la consola del navegador:
window.supabaseIntegration.loginUser('test@rsc.com', '123456')
```

### 📋 ERRORES COMUNES Y SOLUCIONES

#### **Error: "Email no válido"**
- **Causa:** Email sin formato correcto
- **Solución:** Usar email con @ (ej: `test@rsc.com`)

#### **Error: "Email no registrado"**
- **Causa:** Usuario no existe en la base de datos
- **Solución:** 
  1. Crear usuario de prueba con `createTestUser()`
  2. O registrarse primero

#### **Error: "Contraseña incorrecta"**
- **Causa:** Password no coincide con el hash almacenado
- **Solución:** 
  1. Usar password correcto: `123456` para usuario de prueba
  2. Verificar que el usuario existe

#### **Error: "Error del servidor"**
- **Causa:** Problema de conexión con Supabase
- **Solución:**
  1. Verificar conexión a internet
  2. Verificar que Supabase esté funcionando
  3. Revisar configuración en `supabase-integration.js`

#### **Error: "Supabase Integration not loaded"**
- **Causa:** Script no cargado correctamente
- **Solución:**
  1. Verificar que `supabase-integration.js` esté incluido
  2. Verificar que no hay errores de JavaScript en consola
  3. Recargar la página

### 🛠️ HERRAMIENTAS DE DEBUG

#### **Debug Tool (`test-login-debug.html`)**
- **Test Connection:** Verifica conexión con Supabase
- **List Users:** Muestra usuarios registrados
- **Create Test User:** Crea usuario de prueba automáticamente
- **Test Login:** Prueba login con logs detallados

#### **Consola del Navegador**
Los logs muestran el proceso completo:
```
🔐 Iniciando sesión: test@rsc.com
🔧 Configuración Supabase: {url: "https://...", anonKey: "..."}
🌐 Haciendo request: GET https://...
📡 Respuesta de Supabase: 200 OK
👥 Usuarios encontrados: 1
👤 Datos del usuario: {...}
🔑 Verificando contraseña...
✅ Sesión iniciada correctamente
```

### 🔧 CONFIGURACIÓN TÉCNICA

#### **Configuración de Supabase**
```javascript
this.config = {
    url: 'https://unevdceponbnmhvpzlzf.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
};
```

#### **Estructura de Usuario**
```javascript
{
    id: "uuid",
    email: "test@rsc.com",
    username: "testuser",
    password: "MTIzNDU2", // Base64 de "123456"
    balance: 0,
    referral_code: "RSC123ABC",
    created_at: "2024-..."
}
```

### 🎯 PASOS PARA RESOLVER

1. **Abre `test-login-debug.html`**
2. **Haz clic en "Create Test User"**
3. **Haz clic en "Test Login"**
4. **Si funciona, usa las mismas credenciales en la página principal**
5. **Si no funciona, revisa los logs en la consola**

### 📞 SOPORTE ADICIONAL

Si el problema persiste:
1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Console"
3. Copia todos los mensajes de error
4. Reporta el problema con los logs completos

### ✅ CREDENCIALES VÁLIDAS

**Usuario de Prueba:**
- Email: `test@rsc.com`
- Password: `123456`
- Username: `testuser`

**Este usuario se crea automáticamente y siempre debería funcionar.**
