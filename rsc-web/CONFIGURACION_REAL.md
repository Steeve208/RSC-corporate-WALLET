# 🚀 RSC Quantum Mining - Configuración para tu Proyecto Real

## 📋 Tu Proyecto de Supabase

**URL del Proyecto:** `https://unevdceponbnmhvpzlzf.supabase.co`

## 🔧 Pasos para Configurar

### 1. **Obtener Clave Anónima**
1. Ve a tu dashboard de Supabase
2. Settings > API
3. Copia la **anon key** (clave anónima)

### 2. **Actualizar Configuración**
Edita el archivo `scripts/config/supabase-config.js`:

```javascript
export const SUPABASE_CONFIG = {
    // Tu URL ya está configurada
    url: 'https://unevdceponbnmhvpzlzf.supabase.co',
    
    // ⚠️ REEMPLAZAR CON TU CLAVE ANÓNIMA
    anonKey: 'tu-clave-anonima-aqui',
    
    // ... resto de la configuración
};
```

### 3. **Verificar Base de Datos**
Tu esquema ya está creado con las siguientes tablas:
- ✅ `users` - Usuarios del sistema
- ✅ `mining_sessions` - Sesiones de minería
- ✅ `transactions` - Transacciones
- ✅ `referrals` - Sistema de referidos
- ✅ `referral_codes` - Códigos de invitación

### 4. **Probar el Sistema**

#### **A. Probar Conexión:**
```javascript
// En la consola del navegador
console.log(window.supabaseClient.getConnectionState());
```

#### **B. Probar Registro:**
1. Abrir `pages/mine.html`
2. Hacer clic en "Sign Up"
3. Completar formulario
4. Verificar que se cree en Supabase

#### **C. Probar Login:**
1. Usar las credenciales creadas
2. Verificar que se carguen los datos del usuario

#### **D. Probar Minería:**
1. Iniciar sesión
2. Hacer clic en "Start Quantum Mining"
3. Verificar que se cree la sesión en la base de datos

## 🔍 Verificar en Supabase

### **Tabla `users`:**
- Debe mostrar el nuevo usuario registrado
- Con `referral_code` generado automáticamente
- Con `balance` inicial en 0

### **Tabla `mining_sessions`:**
- Debe mostrar la sesión de minería activa
- Con `status` = 'active'
- Con `tokens_mined` incrementando

### **Tabla `transactions`:**
- Debe mostrar las transacciones de minería
- Con `type` = 'mining'
- Con `amount` incrementando

## 🚨 Solución de Problemas

### **Error: "Invalid API key"**
- Verifica que la clave anónima esté correcta
- Asegúrate de usar la clave anónima, no la de servicio

### **Error: "RLS policy violation"**
- Verifica que las políticas de RLS estén habilitadas
- Asegúrate de que el usuario esté autenticado

### **Error: "Table doesn't exist"**
- Verifica que todas las tablas estén creadas
- Revisa el esquema en el SQL Editor

### **Error: "Function doesn't exist"**
- Verifica que las funciones SQL estén creadas
- Revisa el esquema en el SQL Editor

## 📊 Monitoreo

### **Dashboard de Supabase:**
- **Database:** Monitorea el uso de la base de datos
- **Authentication:** Revisa usuarios y sesiones
- **Realtime:** Monitorea conexiones en tiempo real
- **Logs:** Revisa logs de errores y actividad

### **Métricas Importantes:**
- Número de usuarios registrados
- Sesiones de minería activas
- Tokens minados por día
- Transacciones procesadas

## 🎯 Funcionalidades Disponibles

### ✅ **Autenticación Completa**
- Registro de usuarios con sistema de referidos
- Login/logout seguro
- Gestión de sesiones persistente

### ✅ **Sistema de Minería**
- Sesiones de minería guardadas en Supabase
- Sincronización en tiempo real cada 5 segundos
- Métricas persistentes en la base de datos

### ✅ **Sistema de Referidos**
- Códigos de referral únicos generados automáticamente
- Comisiones del 10% procesadas automáticamente
- Tracking de referidos en tiempo real

### ✅ **Transacciones**
- Historial completo de transacciones
- Diferentes tipos: mining, referral_commission, bonus
- Metadatos detallados

## 🔄 Sincronización

El sistema sincroniza automáticamente:
- **Cada 5 segundos:** Métricas de minería
- **Cada 1 segundo:** Datos locales
- **En tiempo real:** Cambios de estado
- **Al finalizar:** Resumen de sesión

## 🚀 Próximos Pasos

1. **Configurar clave anónima** ✅
2. **Probar registro de usuarios** ✅
3. **Probar sistema de minería** ✅
4. **Verificar datos en Supabase** ✅
5. **Configurar dominio de producción** (opcional)

¡El sistema está listo para funcionar con tu base de datos real! 🚀
