# 📊 Sistema de Actualización de Métricas Sociales en Tiempo Real

## 🎯 Funcionalidad

Este sistema permite a los administradores actualizar las métricas de redes sociales (YouTube, X/Twitter, Telegram, Discord) desde el panel de administración, y esos cambios se reflejan **inmediatamente** en la página de minería para todos los usuarios.

## 🔄 Flujo de Funcionamiento

```
┌──────────────────┐
│  Admin Panel     │
│  (admin/index)   │
└────────┬─────────┘
         │
         │ 1. Admin actualiza métrica
         │    (ej: YouTube = 150 subscribers)
         ▼
┌──────────────────┐
│  LocalStorage    │
│  + Supabase      │
└────────┬─────────┘
         │
         │ 2. Se guarda en:
         │    - localStorage (inmediato)
         │    - Supabase (persistente)
         ▼
┌──────────────────┐
│ Mining Page      │
│ (pages/mine)     │
└────────┬─────────┘
         │
         │ 3. Script lee la métrica
         │    actualizada cada 5min
         ▼
┌──────────────────┐
│ Social Goals     │
│ Event Card       │
└──────────────────┘
         │
         │ 4. UI se actualiza
         │    automáticamente
         ▼
    👥 USUARIOS VEN
    CAMBIOS EN VIVO
```

## 📁 Archivos Involucrados

### 1. Panel de Admin

- **`admin/js/modules/social-metrics.js`** - Módulo de actualización de métricas
- **`admin/index.html`** - Panel principal (incluye nuevo menú)
- **`admin/js/admin.js`** - Gestión de módulos

### 2. Frontend (Minería)

- **`scripts/mining/social-goals-event.js`** - Script del evento modificado para leer métricas
- **`pages/mine.html`** - Página de minería

### 3. Backend

- **`backend/migrations/admin_panel_schema.sql`** - Tabla `metrics` en Supabase

## 🚀 Cómo Usar

### Paso 1: Acceder al Panel de Admin

1. Abre `admin/index.html` en tu navegador
2. En el sidebar, haz clic en **"📊 Métricas Sociales"**

### Paso 2: Actualizar una Métrica

1. Verás 4 tarjetas (YouTube, X, Telegram, Discord)
2. Cada tarjeta muestra:
   - **Valor actual**
   - **Objetivo**
   - **Progress bar**
   - **Vista previa en tiempo real**

3. Para actualizar:
   ```
   a) Ingresa el nuevo valor en el campo
   b) El preview se actualiza mientras escribes
   c) Haz clic en "💾 Guardar Cambios"
   d) ¡Listo! El cambio ya está aplicado
   ```

### Paso 3: Verificar en la Página de Minería

1. Abre `pages/mine.html`
2. Ve a la sección **"Social Media Goals Event"**
3. Verás las métricas actualizadas automáticamente
4. Los progress bars se ajustan según los nuevos valores

## 🔧 Modos de Funcionamiento

### Modo DEMO (Sin Supabase)

- **Estado actual**: ✅ FUNCIONANDO
- Usa `localStorage` para almacenar métricas
- Perfecto para testing y desarrollo
- Los cambios persisten en el navegador

### Modo Producción (Con Supabase)

- **Estado**: 🔄 Requiere configuración
- Las métricas se guardan en la base de datos
- Los cambios se sincronizan entre todos los usuarios
- Incluye historial de cambios

## 📊 Métricas Disponibles

| Plataforma | Metric Key | Valor Inicial | Objetivo |
|------------|-----------|---------------|----------|
| YouTube | `youtube_subscribers` | 0 | 10,000 |
| X (Twitter) | `x_followers` | 2,000 | 50,000 |
| Telegram | `telegram_members` | 2,017 | 50,000 |
| Discord | `discord_members` | 260 | 10,000 |

## 🎨 Características de la UI

✅ **Vista Previa en Tiempo Real**
- El número se actualiza mientras escribes
- Progress bar dinámico

✅ **Validación**
- Solo acepta números positivos
- Previene valores inválidos

✅ **Feedback Visual**
- Toast notifications de éxito/error
- Loading states

✅ **Links Directos**
- Cada tarjeta tiene un botón para ir a la red social
- Se abre en nueva pestaña

## 🔄 Actualización Automática

El sistema de minería verifica cambios cada **5 minutos**:

```javascript
// En social-goals-event.js
setInterval(() => {
    this.checkForUpdates();
}, 5 * 60 * 1000); // 5 minutos
```

Para forzar actualización inmediata:
```javascript
window.socialGoalsEvent.loadMetricsFromAdmin();
window.socialGoalsEvent.renderPlatforms();
```

## 🗄️ Estructura de Datos

### localStorage (Modo DEMO)

```json
{
  "social_metrics_admin": {
    "youtube": 150,
    "x": 2500,
    "telegram": 3000,
    "discord": 500,
    "last_updated": "2024-12-13T10:30:00.000Z"
  }
}
```

### Supabase (Modo Producción)

Tabla `metrics`:
```sql
id          | metric_key           | current_value | target_value
------------|----------------------|---------------|-------------
1           | youtube_subscribers  | 150           | 10000
2           | x_followers          | 2500          | 50000
3           | telegram_members     | 3000          | 50000
4           | discord_members      | 500           | 10000
```

## 🛠️ Configuración de Producción

### 1. Configurar Supabase

```bash
# 1. Ejecutar el schema SQL
cd backend/migrations
# Copiar admin_panel_schema.sql a Supabase SQL Editor

# 2. Configurar credenciales en admin/js/admin.js
const SUPABASE_URL = 'https://tu-proyecto.supabase.co';
const SUPABASE_ANON_KEY = 'tu-anon-key';
```

### 2. Habilitar Row Level Security (RLS)

```sql
-- Solo admins pueden modificar métricas
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can update metrics"
ON metrics FOR UPDATE
TO authenticated
USING (auth.uid() IN (SELECT id FROM admin_users));

-- Todos pueden leer métricas (para la página de minería)
CREATE POLICY "Public can read metrics"
ON metrics FOR SELECT
TO anon, authenticated
USING (true);
```

### 3. Crear API Endpoint (Opcional)

Para sincronización en tiempo real con WebSockets:

```javascript
// En admin/js/modules/social-metrics.js
const channel = supabase
  .channel('metrics_changes')
  .on('postgres_changes', 
    { event: 'UPDATE', schema: 'public', table: 'metrics' },
    (payload) => {
      console.log('Métrica actualizada:', payload);
      // Actualizar UI automáticamente
    }
  )
  .subscribe();
```

## 📈 Milestones y Recompensas

Los milestones se definen en `social-goals-event.js`:

```javascript
milestones: [
    { target: 100, reward: 25, claimed: false },
    { target: 500, reward: 50, claimed: false },
    { target: 1000, reward: 100, claimed: false },
    { target: 5000, reward: 250, claimed: false },
    { target: 10000, reward: 500, claimed: false }
]
```

Cuando una métrica alcanza un target:
1. El botón "Claim Reward" se activa
2. Usuario reclama la recompensa
3. Se agrega al balance del usuario
4. El milestone se marca como "Claimed"

## 🎯 Casos de Uso Reales

### Ejemplo 1: Llegaste a 100 suscriptores en YouTube

```
1. Ve al admin panel → Métricas Sociales
2. Encuentra "YouTube Subscribers"
3. Ingresa: 100
4. Clic en "Guardar Cambios"
5. ✅ Todos los usuarios verán: "100 / 100 (100%)"
6. ✅ Botón "Claim Reward" se activa
7. ✅ Usuarios pueden reclamar 25 RSK
```

### Ejemplo 2: Actualización Masiva

```
1. Abre el panel admin
2. Actualiza todas las métricas:
   - YouTube: 150
   - X: 2,500
   - Telegram: 3,000
   - Discord: 500
3. Haz clic en "🔄 Actualizar Todo" (botón superior)
4. ✅ Todas las métricas se actualizan a la vez
```

## 🐛 Debug

Para ver logs en consola:

```javascript
// En la consola del navegador (F12)
localStorage.setItem('admin_debug', 'true');
location.reload();

// Ver métricas actuales
console.log(localStorage.getItem('social_metrics_admin'));

// Ver estado del evento
console.log(window.socialGoalsEvent.platforms);
```

## 📞 Soporte

Si tienes dudas:
- Telegram: [@RSCchain](https://t.me/RSCchain)
- Email: admin@rscchain.com

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024  
**Estado**: ✅ Funcionando en modo DEMO

