# 🔧 Requerimientos del Backend - Nueva Plataforma de Minería RSC

## 📋 Resumen Ejecutivo

Este documento detalla **TODOS** los requerimientos del backend necesarios para la nueva plataforma de minería profesional. Incluye endpoints, tablas de base de datos, funcionalidades y especificaciones técnicas.

---

## 🗄️ TABLAS DE BASE DE DATOS REQUERIDAS

### 1. **users** (Ya existe, pero necesita campos adicionales)
```sql
- id (UUID, PK)
- email (VARCHAR, UNIQUE)
- username (VARCHAR, UNIQUE)
- password (VARCHAR) - Hasheado
- balance (DECIMAL) - Balance actual
- referral_code (VARCHAR, UNIQUE) - Código de referido del usuario
- referred_by (UUID, FK) - Usuario que lo refirió
- wallet_address (VARCHAR) - Dirección de wallet para retiros
- status (VARCHAR) - active, inactive, suspended
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- last_login (TIMESTAMP)
- settings (JSONB) - Configuraciones del usuario
  {
    "auto_start_mining": false,
    "mining_intensity": "medium",
    "default_pool": "pool1",
    "notifications": {
      "email": true,
      "push": false
    },
    "theme": "dark"
  }
```

### 2. **mining_sessions** (Ya existe, verificar campos)
```sql
- id (UUID, PK)
- user_id (UUID, FK → users.id)
- session_id (VARCHAR, UNIQUE)
- start_time (TIMESTAMP)
- end_time (TIMESTAMP, NULLABLE)
- duration_ms (BIGINT)
- tokens_mined (DECIMAL)
- hash_rate (DECIMAL) - Hashrate promedio
- peak_hash_rate (DECIMAL) - Hashrate máximo
- efficiency (DECIMAL) - Eficiencia %
- status (VARCHAR) - active, completed, stopped, error
- pool_url (VARCHAR) - URL del pool usado
- algorithm (VARCHAR) - Algoritmo usado
- cpu_threads (INTEGER) - Threads de CPU usados
- intensity (VARCHAR) - Intensidad de minería
- metadata (JSONB) - Datos adicionales
  {
    "temperature": 65,
    "power_consumption": 120,
    "shares_accepted": 100,
    "shares_rejected": 5
  }
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### 3. **transactions** (Ya existe, verificar campos)
```sql
- id (UUID, PK)
- user_id (UUID, FK → users.id)
- type (VARCHAR) - mining, withdrawal, deposit, referral_commission, bonus, fee
- amount (DECIMAL) - Positivo para ingresos, negativo para egresos
- balance_before (DECIMAL)
- balance_after (DECIMAL)
- reference_id (UUID, NULLABLE) - ID de referencia (session_id, withdrawal_id, etc.)
- reference_type (VARCHAR, NULLABLE) - mining_session, withdrawal, referral, etc.
- description (TEXT)
- status (VARCHAR) - pending, completed, failed, cancelled
- metadata (JSONB) - Datos adicionales
  {
    "address": "wallet_address",
    "tx_hash": "transaction_hash",
    "confirmations": 6,
    "fee": 0.001
  }
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### 4. **referrals** (Nueva tabla)
```sql
- id (UUID, PK)
- referrer_id (UUID, FK → users.id) - Usuario que refirió
- referred_id (UUID, FK → users.id) - Usuario referido
- referral_code (VARCHAR) - Código usado
- commission_rate (DECIMAL) - % de comisión (ej: 0.10 = 10%)
- total_commissions (DECIMAL) - Total ganado en comisiones
- status (VARCHAR) - active, inactive
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### 5. **pools** (Nueva tabla)
```sql
- id (UUID, PK)
- name (VARCHAR)
- url (VARCHAR, UNIQUE)
- port (INTEGER)
- algorithm (VARCHAR) - sha256, scrypt, etc.
- fee_percentage (DECIMAL) - % de fee
- status (VARCHAR) - active, inactive, maintenance
- priority (INTEGER) - Orden de prioridad
- is_default (BOOLEAN) - Pool por defecto
- stats (JSONB) - Estadísticas del pool
  {
    "hashrate": "1.23 TH/s",
    "miners": 1234,
    "latency": 12,
    "uptime": 99.9
  }
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### 6. **user_pools** (Nueva tabla - Pools configurados por usuario)
```sql
- id (UUID, PK)
- user_id (UUID, FK → users.id)
- pool_id (UUID, FK → pools.id)
- priority (INTEGER) - Orden de prioridad para este usuario
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
```

### 7. **withdrawals** (Nueva tabla)
```sql
- id (UUID, PK)
- user_id (UUID, FK → users.id)
- amount (DECIMAL)
- address (VARCHAR) - Dirección de destino
- fee (DECIMAL) - Fee de transacción
- status (VARCHAR) - pending, processing, completed, failed, cancelled
- tx_hash (VARCHAR, NULLABLE) - Hash de transacción blockchain
- confirmations (INTEGER) - Confirmaciones de blockchain
- metadata (JSONB)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- completed_at (TIMESTAMP, NULLABLE)
```

### 8. **api_keys** (Nueva tabla)
```sql
- id (UUID, PK)
- user_id (UUID, FK → users.id)
- key_name (VARCHAR) - Nombre descriptivo
- api_key (VARCHAR, UNIQUE) - Key generada
- api_secret (VARCHAR) - Secret (hasheado)
- permissions (JSONB) - Permisos del key
  {
    "read": true,
    "write": false,
    "withdraw": false
  }
- last_used (TIMESTAMP, NULLABLE)
- expires_at (TIMESTAMP, NULLABLE)
- status (VARCHAR) - active, revoked, expired
- created_at (TIMESTAMP)
```

### 9. **webhooks** (Nueva tabla)
```sql
- id (UUID, PK)
- user_id (UUID, FK → users.id)
- url (VARCHAR) - URL del webhook
- events (JSONB) - Eventos a escuchar
  ["mining.started", "mining.stopped", "transaction.completed", "withdrawal.completed"]
- secret (VARCHAR) - Secret para validar webhooks
- status (VARCHAR) - active, inactive
- last_triggered (TIMESTAMP, NULLABLE)
- failure_count (INTEGER) - Contador de fallos
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### 10. **support_tickets** (Nueva tabla)
```sql
- id (UUID, PK)
- user_id (UUID, FK → users.id)
- subject (VARCHAR)
- message (TEXT)
- category (VARCHAR) - technical, billing, general, bug
- status (VARCHAR) - open, in_progress, resolved, closed
- priority (VARCHAR) - low, medium, high, urgent
- assigned_to (UUID, FK → users.id, NULLABLE) - Admin asignado
- responses (JSONB) - Array de respuestas
  [
    {
      "user_id": "uuid",
      "message": "text",
      "created_at": "timestamp"
    }
  ]
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- resolved_at (TIMESTAMP, NULLABLE)
```

### 11. **notifications** (Nueva tabla)
```sql
- id (UUID, PK)
- user_id (UUID, FK → users.id)
- type (VARCHAR) - info, success, warning, error
- title (VARCHAR)
- message (TEXT)
- action_url (VARCHAR, NULLABLE) - URL de acción
- read (BOOLEAN) - Si fue leída
- created_at (TIMESTAMP)
```

### 12. **mining_stats** (Nueva tabla - Estadísticas agregadas)
```sql
- id (UUID, PK)
- user_id (UUID, FK → users.id)
- date (DATE) - Fecha del día
- total_hashrate (DECIMAL) - Hashrate total del día
- avg_hashrate (DECIMAL) - Hashrate promedio
- tokens_mined (DECIMAL) - Tokens minados
- sessions_count (INTEGER) - Número de sesiones
- total_duration_ms (BIGINT) - Duración total
- efficiency_avg (DECIMAL) - Eficiencia promedio
- created_at (TIMESTAMP)
- UNIQUE(user_id, date)
```

---

## 🔌 ENDPOINTS DEL BACKEND REQUERIDOS

### 🔐 **AUTENTICACIÓN** (`/api/auth`)

#### `POST /api/auth/register`
Registrar nuevo usuario
```json
Request:
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "referral_code": "RSC-ABC123" // Opcional
}

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "username",
      "referral_code": "RSC-XYZ789"
    },
    "token": "jwt_token"
  }
}
```

#### `POST /api/auth/login`
Iniciar sesión
```json
Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "jwt_token"
  }
}
```

#### `GET /api/auth/profile`
Obtener perfil del usuario autenticado
```json
Headers:
{
  "Authorization": "Bearer jwt_token"
}

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username",
    "balance": 1234.56,
    "referral_code": "RSC-XYZ789",
    "wallet_address": "0x...",
    "settings": { ... },
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

#### `PUT /api/auth/profile`
Actualizar perfil
```json
Request:
{
  "username": "new_username",
  "wallet_address": "0x...",
  "settings": { ... }
}
```

#### `POST /api/auth/change-password`
Cambiar contraseña
```json
Request:
{
  "current_password": "old_password",
  "new_password": "new_password"
}
```

---

### ⛏️ **MINERÍA** (`/api/mining`)

#### `POST /api/mining/start`
Iniciar sesión de minería
```json
Request:
{
  "hash_rate": 1000,
  "pool_url": "pool.example.com:3333",
  "algorithm": "sha256",
  "cpu_threads": 4,
  "intensity": "medium"
}

Response:
{
  "success": true,
  "data": {
    "session_id": "session_123456",
    "start_time": "2024-01-01T00:00:00Z",
    "status": "active"
  }
}
```

#### `PUT /api/mining/update/:sessionId`
Actualizar sesión de minería (tiempo real)
```json
Request:
{
  "tokens_mined": 1.234567,
  "hash_rate": 1200,
  "efficiency": 110,
  "metadata": {
    "temperature": 65,
    "shares_accepted": 100,
    "shares_rejected": 5
  }
}
```

#### `POST /api/mining/stop/:sessionId`
Detener sesión de minería
```json
Response:
{
  "success": true,
  "data": {
    "session_id": "session_123456",
    "end_time": "2024-01-01T01:00:00Z",
    "duration_ms": 3600000,
    "tokens_mined": 1.234567,
    "final_balance": 1235.794567
  }
}
```

#### `GET /api/mining/active`
Obtener sesión activa del usuario
```json
Response:
{
  "success": true,
  "data": {
    "session": {
      "id": "uuid",
      "session_id": "session_123456",
      "start_time": "2024-01-01T00:00:00Z",
      "hash_rate": 1200,
      "tokens_mined": 1.234567,
      "status": "active"
    }
  }
}
```

#### `GET /api/mining/history`
Obtener historial de sesiones
```json
Query Params:
?limit=50&offset=0&start_date=2024-01-01&end_date=2024-01-31

Response:
{
  "success": true,
  "data": {
    "sessions": [ ... ],
    "total": 100,
    "limit": 50,
    "offset": 0
  }
}
```

#### `GET /api/mining/stats`
Obtener estadísticas de minería
```json
Query Params:
?period=today|week|month|year|all

Response:
{
  "success": true,
  "data": {
    "total_tokens_mined": 1234.56,
    "total_sessions": 100,
    "total_duration_ms": 3600000000,
    "avg_hashrate": 1200,
    "peak_hashrate": 1500,
    "avg_efficiency": 105,
    "total_earnings": 1234.56
  }
}
```

#### `GET /api/mining/hashrate-history`
Obtener historial de hashrate
```json
Query Params:
?range=24h|7d|30d|90d

Response:
{
  "success": true,
  "data": {
    "history": [
      {
        "time": "2024-01-01T00:00:00Z",
        "hashrate": 1200,
        "tokens_mined": 0.123456
      }
    ]
  }
}
```

---

### 💰 **GANANCIAS Y RETIROS** (`/api/earnings`)

#### `GET /api/earnings/summary`
Obtener resumen de ganancias
```json
Query Params:
?period=today|week|month|year|all

Response:
{
  "success": true,
  "data": {
    "total_earned": 1234.56,
    "available_balance": 1000.00,
    "pending_balance": 234.56,
    "withdrawn_total": 500.00,
    "breakdown": {
      "today": 10.50,
      "week": 75.30,
      "month": 300.20,
      "year": 1234.56
    }
  }
}
```

#### `GET /api/earnings/history`
Obtener historial de ganancias
```json
Query Params:
?limit=50&offset=0&start_date=2024-01-01&end_date=2024-01-31

Response:
{
  "success": true,
  "data": {
    "earnings": [ ... ],
    "total": 100
  }
}
```

#### `POST /api/earnings/withdraw`
Solicitar retiro
```json
Request:
{
  "amount": 100.00,
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "password": "user_password" // Para confirmación
}

Response:
{
  "success": true,
  "data": {
    "withdrawal_id": "uuid",
    "amount": 100.00,
    "fee": 0.50,
    "net_amount": 99.50,
    "address": "0x...",
    "status": "pending",
    "estimated_time": "2024-01-01T01:00:00Z"
  }
}
```

#### `GET /api/earnings/withdrawals`
Obtener historial de retiros
```json
Query Params:
?limit=50&offset=0&status=pending|processing|completed|failed

Response:
{
  "success": true,
  "data": {
    "withdrawals": [ ... ],
    "total": 20
  }
}
```

#### `GET /api/earnings/withdrawals/:id`
Obtener detalles de un retiro
```json
Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "amount": 100.00,
    "fee": 0.50,
    "address": "0x...",
    "status": "completed",
    "tx_hash": "0x...",
    "confirmations": 6,
    "created_at": "2024-01-01T00:00:00Z",
    "completed_at": "2024-01-01T00:30:00Z"
  }
}
```

---

### 📊 **ANALYTICS** (`/api/analytics`)

#### `GET /api/analytics/dashboard`
Obtener datos del dashboard
```json
Response:
{
  "success": true,
  "data": {
    "stats": {
      "current_hashrate": 1200,
      "balance": 1234.56,
      "today_earnings": 10.50,
      "uptime_percentage": 99.5
    },
    "hashrate_history": [ ... ],
    "earnings_history": [ ... ],
    "recent_activity": [ ... ]
  }
}
```

#### `GET /api/analytics/performance`
Obtener métricas de rendimiento
```json
Query Params:
?range=24h|7d|30d|90d

Response:
{
  "success": true,
  "data": {
    "hashrate_data": [ ... ],
    "earnings_data": [ ... ],
    "efficiency_data": [ ... ],
    "comparison": {
      "previous_period": { ... },
      "change_percentage": 15.5
    }
  }
}
```

#### `GET /api/analytics/distribution`
Obtener distribución de minería
```json
Query Params:
?period=week|month|year

Response:
{
  "success": true,
  "data": {
    "by_pool": [ ... ],
    "by_algorithm": [ ... ],
    "by_time_of_day": [ ... ]
  }
}
```

---

### 📜 **TRANSACCIONES** (`/api/transactions`)

#### `GET /api/transactions`
Obtener transacciones
```json
Query Params:
?limit=50&offset=0&type=mining|withdrawal|deposit|referral_commission
&start_date=2024-01-01&end_date=2024-01-31&status=completed

Response:
{
  "success": true,
  "data": {
    "transactions": [ ... ],
    "total": 200,
    "limit": 50,
    "offset": 0
  }
}
```

#### `GET /api/transactions/:id`
Obtener detalles de transacción
```json
Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "type": "mining",
    "amount": 10.50,
    "balance_before": 1224.06,
    "balance_after": 1234.56,
    "description": "Mining reward",
    "status": "completed",
    "created_at": "2024-01-01T00:00:00Z",
    "metadata": { ... }
  }
}
```

#### `GET /api/transactions/export`
Exportar transacciones
```json
Query Params:
?format=csv|json|pdf&start_date=2024-01-01&end_date=2024-01-31

Response: File download
```

---

### 👥 **REFERRALS** (`/api/referrals`)

#### `GET /api/referrals`
Obtener lista de referidos
```json
Response:
{
  "success": true,
  "data": {
    "referrals": [ ... ],
    "total_referrals": 10,
    "active_referrals": 8,
    "total_commissions": 123.45
  }
}
```

#### `GET /api/referrals/commissions`
Obtener comisiones de referidos
```json
Query Params:
?period=today|week|month|year

Response:
{
  "success": true,
  "data": {
    "commissions": [ ... ],
    "total": 123.45,
    "period_total": 25.30
  }
}
```

#### `GET /api/referrals/stats`
Obtener estadísticas de referidos
```json
Response:
{
  "success": true,
  "data": {
    "total_referrals": 10,
    "active_referrals": 8,
    "total_commissions_earned": 123.45,
    "commission_rate": 0.10,
    "referral_code": "RSC-XYZ789"
  }
}
```

#### `POST /api/referrals/validate-code`
Validar código de referido
```json
Request:
{
  "referral_code": "RSC-ABC123"
}

Response:
{
  "success": true,
  "data": {
    "valid": true,
    "referrer": {
      "username": "referrer_user"
    }
  }
}
```

---

### 🏊 **POOLS** (`/api/pools`)

#### `GET /api/pools`
Obtener lista de pools disponibles
```json
Response:
{
  "success": true,
  "data": {
    "pools": [ ... ],
    "default_pool": { ... }
  }
}
```

#### `GET /api/pools/:id`
Obtener detalles de un pool
```json
Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Main Pool",
    "url": "pool.example.com",
    "port": 3333,
    "algorithm": "sha256",
    "fee_percentage": 1.0,
    "stats": {
      "hashrate": "1.23 TH/s",
      "miners": 1234,
      "latency": 12,
      "uptime": 99.9
    }
  }
}
```

#### `POST /api/pools/user/add`
Agregar pool personalizado del usuario
```json
Request:
{
  "name": "My Custom Pool",
  "url": "custom.pool.com",
  "port": 3333,
  "priority": 1
}
```

#### `PUT /api/pools/user/:id`
Actualizar configuración de pool del usuario
```json
Request:
{
  "priority": 2,
  "is_active": true
}
```

#### `DELETE /api/pools/user/:id`
Eliminar pool personalizado del usuario

---

### ⚙️ **CONFIGURACIÓN** (`/api/settings`)

#### `GET /api/settings`
Obtener configuración del usuario
```json
Response:
{
  "success": true,
  "data": {
    "mining": {
      "auto_start": false,
      "intensity": "medium",
      "cpu_threads": 4
    },
    "pool": {
      "default_pool": "uuid",
      "failover_enabled": true
    },
    "notifications": {
      "email": true,
      "push": false
    }
  }
}
```

#### `PUT /api/settings`
Actualizar configuración
```json
Request:
{
  "mining": {
    "auto_start": true,
    "intensity": "high"
  },
  "notifications": {
    "email": true
  }
}
```

---

### 🔌 **API KEYS** (`/api/api-keys`)

#### `GET /api/api-keys`
Obtener API keys del usuario
```json
Response:
{
  "success": true,
  "data": {
    "keys": [ ... ]
  }
}
```

#### `POST /api/api-keys`
Crear nueva API key
```json
Request:
{
  "key_name": "My API Key",
  "permissions": {
    "read": true,
    "write": false,
    "withdraw": false
  },
  "expires_at": "2025-01-01T00:00:00Z" // Opcional
}

Response:
{
  "success": true,
  "data": {
    "api_key": "rsc_live_abc123...",
    "api_secret": "rsc_secret_xyz789...",
    "key_name": "My API Key",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

#### `DELETE /api/api-keys/:id`
Revocar API key

#### `POST /api/api-keys/:id/test`
Probar API key
```json
Request:
{
  "endpoint": "/api/mining/active",
  "method": "GET"
}
```

---

### 🪝 **WEBHOOKS** (`/api/webhooks`)

#### `GET /api/webhooks`
Obtener webhooks del usuario
```json
Response:
{
  "success": true,
  "data": {
    "webhooks": [ ... ]
  }
}
```

#### `POST /api/webhooks`
Crear webhook
```json
Request:
{
  "url": "https://example.com/webhook",
  "events": [
    "mining.started",
    "mining.stopped",
    "transaction.completed"
  ],
  "secret": "webhook_secret"
}

Response:
{
  "success": true,
  "data": {
    "webhook_id": "uuid",
    "url": "https://example.com/webhook",
    "status": "active"
  }
}
```

#### `PUT /api/webhooks/:id`
Actualizar webhook

#### `DELETE /api/webhooks/:id`
Eliminar webhook

#### `POST /api/webhooks/:id/test`
Probar webhook
```json
Request:
{
  "event": "test",
  "data": { ... }
}
```

---

### 🎫 **SUPPORT** (`/api/support`)

#### `GET /api/support/tickets`
Obtener tickets de soporte
```json
Query Params:
?status=open|in_progress|resolved|closed

Response:
{
  "success": true,
  "data": {
    "tickets": [ ... ],
    "total": 10
  }
}
```

#### `POST /api/support/tickets`
Crear ticket de soporte
```json
Request:
{
  "subject": "Problem with mining",
  "message": "Description...",
  "category": "technical",
  "priority": "medium"
}

Response:
{
  "success": true,
  "data": {
    "ticket_id": "uuid",
    "status": "open",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

#### `GET /api/support/tickets/:id`
Obtener detalles de ticket

#### `POST /api/support/tickets/:id/respond`
Responder a ticket
```json
Request:
{
  "message": "Response message..."
}
```

---

### 🔔 **NOTIFICACIONES** (`/api/notifications`)

#### `GET /api/notifications`
Obtener notificaciones
```json
Query Params:
?read=false&limit=50&offset=0

Response:
{
  "success": true,
  "data": {
    "notifications": [ ... ],
    "unread_count": 5
  }
}
```

#### `PUT /api/notifications/:id/read`
Marcar notificación como leída

#### `PUT /api/notifications/read-all`
Marcar todas como leídas

#### `DELETE /api/notifications/:id`
Eliminar notificación

---

## 🔄 FUNCIONALIDADES ESPECIALES REQUERIDAS

### 1. **Actualizaciones en Tiempo Real**
- WebSockets o Server-Sent Events (SSE) para:
  - Hashrate en tiempo real
  - Balance actualizado
  - Estado de sesión de minería
  - Notificaciones push

### 2. **Cálculo Automático de Ganancias**
- Proceso en background que:
  - Calcula tokens minados basado en hashrate y tiempo
  - Actualiza balance del usuario
  - Crea transacciones automáticamente
  - Calcula comisiones de referidos

### 3. **Sistema de Comisiones de Referidos**
- Cuando un usuario referido mina tokens:
  - Calcular comisión (ej: 10%)
  - Crear transacción de comisión para el referidor
  - Actualizar balance del referidor

### 4. **Procesamiento de Retiros**
- Proceso en background que:
  - Valida retiros pendientes
  - Procesa transacciones blockchain
  - Actualiza estado de retiros
  - Envía notificaciones

### 5. **Validación de Pool**
- Verificar que los pools sean válidos y accesibles
- Monitorear latencia y uptime
- Actualizar estadísticas de pools

### 6. **Rate Limiting**
- Límites por endpoint:
  - `/api/mining/start`: 10 por hora
  - `/api/earnings/withdraw`: 5 por día
  - `/api/auth/login`: 5 por minuto
  - API Keys: Basado en plan del usuario

### 7. **Logging y Auditoría**
- Registrar todas las acciones importantes:
  - Inicio/detención de minería
  - Retiros
  - Cambios de configuración
  - Uso de API keys

---

## 📊 MÉTRICAS Y ESTADÍSTICAS

### Endpoints de Estadísticas Globales

#### `GET /api/stats/global`
Estadísticas globales del sistema
```json
Response:
{
  "success": true,
  "data": {
    "total_users": 10000,
    "active_miners": 5000,
    "total_hashrate": "1.23 PH/s",
    "total_tokens_mined": 1000000,
    "network_stats": { ... }
  }
}
```

#### `GET /api/leaderboard`
Leaderboard de mineros
```json
Query Params:
?period=today|week|month|all&limit=100

Response:
{
  "success": true,
  "data": {
    "leaderboard": [
      {
        "rank": 1,
        "username": "top_miner",
        "tokens_mined": 1234.56,
        "hashrate": 5000
      }
    ]
  }
}
```

---

## 🔒 SEGURIDAD Y VALIDACIÓN

### Validaciones Requeridas:
1. **Autenticación JWT** en todos los endpoints protegidos
2. **Validación de entrada** en todos los requests
3. **Sanitización** de datos de usuario
4. **Rate limiting** por usuario/IP
5. **CORS** configurado correctamente
6. **HTTPS** en producción
7. **Validación de wallet addresses**
8. **Confirmación de contraseña** para acciones críticas (retiros)

---

## 📝 NOTAS IMPORTANTES

1. **Todos los endpoints deben retornar**:
   - `success`: boolean
   - `data`: objeto con los datos
   - `error`: objeto con error (si aplica)
   - `message`: mensaje descriptivo

2. **Manejo de errores consistente**:
   ```json
   {
     "success": false,
     "error": {
       "code": "INSUFFICIENT_BALANCE",
       "message": "Balance insuficiente para realizar el retiro"
     }
   }
   ```

3. **Paginación estándar**:
   - `limit`: número de resultados (default: 50)
   - `offset`: offset para paginación (default: 0)
   - `total`: total de resultados

4. **Timestamps en ISO 8601**:
   - Formato: `2024-01-01T00:00:00Z`

5. **Decimales para montos**:
   - Usar `DECIMAL(18, 8)` en base de datos
   - Retornar como strings en JSON para precisión

---

## 🚀 PRIORIDADES DE IMPLEMENTACIÓN

### **Fase 1 - Core (Crítico)**
1. Autenticación (register, login, profile)
2. Sesiones de minería (start, stop, update, active)
3. Transacciones básicas
4. Balance y ganancias básicas

### **Fase 2 - Funcionalidades Principales**
1. Retiros
2. Referrals y comisiones
3. Analytics y estadísticas
4. Pools management

### **Fase 3 - Avanzado**
1. API Keys
2. Webhooks
3. Support tickets
4. Notificaciones

### **Fase 4 - Optimización**
1. Tiempo real (WebSockets)
2. Caché y optimización
3. Exportación de datos
4. Reportes avanzados

---

Este documento cubre **TODOS** los requerimientos del backend para la nueva plataforma de minería profesional. 🎯

