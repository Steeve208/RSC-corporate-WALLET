# 🚀 Configuración del Backend - Nueva Plataforma de Minería

## ⚠️ Error "Failed to fetch" al iniciar sesión

Este error generalmente significa que el backend no está corriendo o no es accesible.

## 🔧 Solución Rápida

### 1. Verificar que el backend esté corriendo

```bash
cd backend
npm install
npm start
```

O en modo desarrollo:
```bash
npm run dev
```

El backend debería iniciar en el puerto **4000** por defecto.

### 2. Verificar la URL del backend

El frontend intenta conectarse a:
- **Desarrollo**: `http://localhost:4000`
- **Producción**: Mismo dominio del frontend

Puedes configurar la URL manualmente agregando esto antes de cargar `backend-api.js`:

```html
<script>
    window.BACKEND_API_URL = 'http://localhost:4000'; // Cambiar si es necesario
</script>
<script src="../../scripts/mining/backend-api.js"></script>
```

### 3. Verificar CORS

El backend está configurado para aceptar peticiones desde cualquier origen (`*`). Si necesitas restringirlo, edita `backend/config/env.js`:

```javascript
security: {
    corsOrigin: process.env.CORS_ORIGIN || '*' // Cambiar a tu dominio
}
```

### 4. Verificar la base de datos

Asegúrate de que PostgreSQL esté corriendo y que las tablas estén creadas:

```bash
# Ejecutar migraciones
cd backend
npm run migrate
```

O ejecutar manualmente los SQL:
- `backend/migrations/alter_existing_tables_mining_platform.sql`
- `backend/migrations/create_mining_platform_tables.sql`

## 📋 Checklist de Verificación

- [ ] Backend corriendo en puerto 4000
- [ ] Base de datos PostgreSQL conectada
- [ ] Tablas creadas (migraciones ejecutadas)
- [ ] Variables de entorno configuradas (opcional)
- [ ] CORS configurado correctamente
- [ ] Frontend apuntando a la URL correcta del backend

## 🔍 Debug

Abre la consola del navegador (F12) y verifica:

1. **Mensaje de inicialización**:
   ```
   🔌 Backend API URL: http://localhost:4000
   ✅ Mining Backend API Client inicializado
   ```

2. **Errores de conexión**:
   ```
   ❌ Error de conexión: No se pudo conectar al backend en http://localhost:4000
   ```

3. **Peticiones HTTP**:
   - Abre la pestaña "Network" en las DevTools
   - Intenta iniciar sesión
   - Verifica si la petición a `/auth/login` aparece y qué status code tiene

## 🐛 Problemas Comunes

### Backend no inicia
- Verifica que el puerto 4000 no esté en uso
- Revisa los logs del backend para errores
- Verifica que todas las dependencias estén instaladas (`npm install`)

### Error de base de datos
- Verifica que PostgreSQL esté corriendo
- Verifica la conexión en `backend/config/database.js`
- Asegúrate de que las credenciales sean correctas

### Error 401/403
- Verifica que el token JWT se esté guardando correctamente
- Revisa la configuración de JWT en `backend/config/env.js`
- Verifica que el usuario exista en la base de datos

## 📞 Soporte

Si el problema persiste, revisa:
1. Logs del backend en la terminal
2. Consola del navegador (F12)
3. Pestaña Network en DevTools

