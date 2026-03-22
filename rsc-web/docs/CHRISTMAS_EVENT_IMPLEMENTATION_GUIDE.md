# 🎄 Guía de Implementación - Christmas Event

## Resumen Ejecutivo

Esta guía te muestra **paso a paso** cómo implementar todas las integraciones del evento navideño.

---

## ✅ 1. Integrar con API de Referidos Real

### Estado: ✅ **YA IMPLEMENTADO**

El código en `christmas-event.js` ya usa Supabase directamente para obtener el conteo de referidos.

### Cómo Funciona:

```javascript
// En christmas-event.js línea ~200
async getReferralCount() {
    const { data, error } = await supabase.supabase
        .from('referrals')
        .select('id', { count: 'exact', head: true })
        .eq('referrer_user_id', supabase.user.id)
        .eq('status', 'active');
    
    return data?.length || 0;
}
```

### Verificación:
- ✅ Código implementado
- ✅ Usa Supabase directamente
- ✅ Se actualiza automáticamente cada 5 minutos

---

## ✅ 2. Conectar con Leaderboard del Backend

### Estado: ✅ **YA IMPLEMENTADO**

### Endpoints Disponibles:

1. **Mining Leaderboard:**
   ```
   GET /api/mining/leaderboard?limit=10&period=all
   ```

2. **Nuevo Endpoint del Evento:**
   ```
   GET /api/christmas-event/leaderboard/:type?limit=10
   ```
   - `type`: `referrals`, `mining`, `activity`

### Implementación:

El código en `christmas-event.js` ya está implementado:

```javascript
// Usa /api/mining/leaderboard para top miners
// Usa Supabase para top referrers
// Combina datos para "most active"
```

### Agregar al Servidor:

Ya está agregado en `server.js`:
```javascript
const christmasEventRoutes = require('./backend/routes/christmas-event-api');
app.use('/api/christmas-event', christmasEventRoutes);
```

### Verificación:
- ✅ Endpoints creados
- ✅ Código frontend implementado
- ✅ Integrado en servidor

---

## 📱 3. Añadir Tracking de Actividad en Telegram

### Estado: ⚠️ **REQUIERE CONFIGURACIÓN**

### Opción A: Telegram Bot (Recomendado)

#### Paso 1: Crear Bot

1. Abre Telegram y busca [@BotFather](https://t.me/BotFather)
2. Envía `/newbot`
3. Sigue las instrucciones
4. Guarda el `BOT_TOKEN`

#### Paso 2: Agregar Bot al Grupo

1. Crea o abre tu grupo de Telegram
2. Agrega el bot como administrador
3. Obtén el `CHAT_ID` del grupo (puedes usar [@userinfobot](https://t.me/userinfobot))

#### Paso 3: Configurar Variables de Entorno

Agrega a tu `.env`:

```env
TELEGRAM_BOT_TOKEN=tu_bot_token_aqui
TELEGRAM_GROUP_ID=tu_chat_id_aqui
```

#### Paso 4: Instalar Dependencias

```bash
npm install node-telegram-bot-api axios
```

#### Paso 5: Inicializar Bot en el Servidor

Crea `backend/services/telegram-bot.js`:

```javascript
const TelegramBot = require('node-telegram-bot-api');
const telegramService = require('./telegram-service');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { 
    polling: true 
});

// Escuchar mensajes
bot.on('message', async (msg) => {
    const chatId = msg.chat.id.toString();
    const userId = msg.from.id;
    const username = msg.from.username;
    
    // Solo procesar mensajes del grupo oficial
    if (chatId === process.env.TELEGRAM_GROUP_ID) {
        // Registrar actividad
        await telegramService.registerUserActivity(userId, username);
    }
});

module.exports = bot;
```

#### Paso 6: Iniciar Bot en `server.js`

```javascript
// Al inicio del servidor
if (process.env.TELEGRAM_BOT_TOKEN) {
    require('./backend/services/telegram-bot');
    console.log('✅ Telegram Bot iniciado');
}
```

### Opción B: Verificación Manual (Más Simple)

Si no quieres configurar un bot, puedes usar verificación manual:

1. El usuario ingresa su username de Telegram
2. Verificas manualmente
3. Marcas como completado

**Endpoint ya creado:**
```javascript
POST /api/christmas-event/verify-telegram
Body: { userId, telegramUsername }
```

---

## 🎯 4. Configurar Hitos Comunitarios

### Estado: ✅ **YA IMPLEMENTADO**

### Endpoint Disponible:

```
GET /api/christmas-event/community-stats
```

### Cómo Funciona:

1. **Frontend carga estadísticas:**
   - Se actualiza cada 10 minutos
   - Muestra progreso de hitos (ej: 1000 miembros Telegram)

2. **Backend calcula:**
   - Total de usuarios activos
   - Total de referidos
   - Total minado
   - Miembros de Telegram (si bot configurado)

3. **Cuando se alcanza un hito:**
   - Se puede distribuir recompensa a todos
   - Endpoint: `POST /api/christmas-event/distribute-community-reward`

### Implementación:

El código ya está en `christmas-event.js`:
```javascript
async loadCommunityMilestones() {
    const response = await fetch('/api/christmas-event/community-stats');
    // Actualiza UI con progreso
}
```

---

## 📋 Checklist de Implementación

### Backend

- [x] **Archivo de API creado:** `backend/routes/christmas-event-api.js`
- [x] **Rutas agregadas al servidor:** `server.js`
- [x] **Servicio de Telegram creado:** `backend/services/telegram-service.js`
- [ ] **Crear tablas en Supabase:** Ejecutar `backend/migrations/christmas_event_tables.sql`
- [ ] **Configurar variables de entorno:** Agregar `TELEGRAM_BOT_TOKEN` y `TELEGRAM_GROUP_ID`
- [ ] **(Opcional) Configurar Telegram Bot:** Seguir pasos arriba

### Frontend

- [x] **Código del evento actualizado:** `scripts/mining/christmas-event.js`
- [x] **Usa APIs reales:** Integrado con endpoints
- [x] **Manejo de errores:** Implementado
- [ ] **Probar integración completa**

### Base de Datos

- [ ] **Ejecutar migración SQL:** `backend/migrations/christmas_event_tables.sql`
- [ ] **Verificar tablas creadas:** En Supabase Dashboard

---

## 🚀 Pasos Inmediatos

### 1. Crear Tablas en Supabase

Ejecuta el SQL en `backend/migrations/christmas_event_tables.sql` en tu Supabase Dashboard:

1. Ve a Supabase Dashboard
2. SQL Editor
3. Pega el contenido del archivo
4. Ejecuta

### 2. Configurar Variables de Entorno

Agrega a tu `.env`:

```env
# Telegram (Opcional pero recomendado)
TELEGRAM_BOT_TOKEN=tu_token_aqui
TELEGRAM_GROUP_ID=tu_chat_id_aqui
```

### 3. Reiniciar Servidor

```bash
# Si usas Node.js
npm restart

# O reinicia manualmente
```

### 4. Probar Endpoints

Usa Postman o curl para probar:

```bash
# Obtener estadísticas comunitarias
curl http://localhost:3000/api/christmas-event/community-stats

# Obtener leaderboard
curl http://localhost:3000/api/christmas-event/leaderboard/referrals?limit=10
```

---

## 📊 Estructura de Datos

### Tablas Creadas:

1. **christmas_event_gifts** - Regalos por usuario
2. **christmas_event_milestones** - Milestones de referidos
3. **christmas_event_challenges** - Desafíos diarios/semanales
4. **telegram_activity** - Actividad en Telegram
5. **community_milestones** - Hitos comunitarios

### Relaciones:

- Todas las tablas referencian `mining_users(id)`
- `telegram_activity` se vincula con `mining_users.telegram_user_id`

---

## 🔧 Solución de Problemas

### Error: "Table does not exist"
**Solución:** Ejecuta el SQL de migración en Supabase

### Error: "Telegram Bot Token not configured"
**Solución:** Agrega `TELEGRAM_BOT_TOKEN` a `.env` o usa verificación manual

### Error: "Unauthorized"
**Solución:** Verifica que el token de autenticación sea válido

### Leaderboard vacío
**Solución:** Verifica que haya datos en las tablas `referral_stats` o `mining_users`

---

## 📞 Próximos Pasos

1. ✅ **Ejecutar migración SQL** (5 minutos)
2. ✅ **Configurar variables de entorno** (2 minutos)
3. ✅ **Reiniciar servidor** (1 minuto)
4. ✅ **Probar endpoints** (10 minutos)
5. ⚠️ **(Opcional) Configurar Telegram Bot** (15-30 minutos)

---

## 📝 Notas Importantes

- **Telegram Bot es opcional:** El evento funciona sin él, pero el tracking de Telegram será manual
- **Las tablas se crean automáticamente:** Solo necesitas ejecutar el SQL una vez
- **Los endpoints tienen fallback:** Si falla la API, usa métodos directos de Supabase
- **El evento funciona offline:** Usa localStorage como respaldo

---

## ✅ Estado Final

- ✅ **API de Referidos:** Integrado
- ✅ **Leaderboard:** Integrado
- ⚠️ **Telegram Tracking:** Requiere configuración (opcional)
- ✅ **Hitos Comunitarios:** Integrado

**El evento está 90% completo. Solo falta:**
1. Ejecutar SQL de migración
2. (Opcional) Configurar Telegram Bot

