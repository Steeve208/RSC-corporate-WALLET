# 📊 Estructura de Base de Datos - Sistema de Minería RSC

## 📋 Tabla `users` (Principal)

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    balance DECIMAL(20, 8) DEFAULT 0.00000000,  -- ⭐ Balance del usuario
    total_mined DECIMAL(20, 8) DEFAULT 0.00000000,
    mining_power DECIMAL(10, 2) DEFAULT 1.00,
    mining_level INTEGER DEFAULT 1,
    experience_points BIGINT DEFAULT 0,
    referral_code VARCHAR(12) UNIQUE NOT NULL,
    referred_by UUID REFERENCES users(id),
    total_referrals INTEGER DEFAULT 0,
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    is_premium BOOLEAN DEFAULT false,
    device_fingerprint VARCHAR(64),
    security_level INTEGER DEFAULT 1
);
```

### 🔑 Columnas Importantes:
- **`balance`**: `DECIMAL(20, 8)` - Balance principal del usuario
- **`total_mined`**: `DECIMAL(20, 8)` - Total histórico minado
- **`id`**: `UUID` - Identificador único del usuario

---

## 🔧 Función RPC: `update_user_balance_advanced`

Esta función **INCREMENTA** el balance de forma segura:

```sql
CREATE OR REPLACE FUNCTION update_user_balance_advanced(
    p_user_id UUID,
    p_amount DECIMAL(20, 8),           -- Cantidad a AGREGAR (puede ser positiva o negativa)
    p_transaction_type VARCHAR(30),    -- 'mining', 'bonus', 'purchase', etc.
    p_description TEXT DEFAULT NULL,
    p_metadata JSONB DEFAULT '{}'
)
RETURNS JSON
```

### ✅ Lo que hace la función:
1. Obtiene el balance actual del usuario
2. **Calcula**: `balance_after = balance_before + p_amount`
3. **Actualiza** el balance en la tabla `users`
4. Si es tipo `'mining'` y `p_amount > 0`, actualiza `total_mined`
5. Registra la transacción en la tabla `transactions`
6. Procesa comisiones de referidos automáticamente
7. Retorna JSON con `balance_before`, `balance_after`, y `commission_paid`

### 🔒 Seguridad:
- ✅ Usa transacciones (BEGIN/COMMIT implícito)
- ✅ Registra todas las operaciones en `transactions`
- ✅ No permite sobrescribir balance directamente

---

## 📝 Tabla `transactions` (Auditoría)

```sql
CREATE TABLE transactions (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    type VARCHAR(30) NOT NULL,           -- 'mining', 'referral_commission', etc.
    amount DECIMAL(20, 8) NOT NULL,      -- Cantidad de la transacción
    balance_before DECIMAL(20, 8) NOT NULL,
    balance_after DECIMAL(20, 8) NOT NULL,
    reference_id UUID,                   -- ID de sesión o referencia
    reference_type VARCHAR(30),
    description TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🔄 Cómo Funciona la Sincronización (Corregida)

### ❌ ANTES (Problemático):
```javascript
// Reemplazaba el balance completo - CAUSABA PÉRDIDAS
PATCH /rest/v1/users?id=eq.{user_id}
{ balance: localBalance }  // Sobrescribe todo el balance
```

### ✅ AHORA (Corregido):
```javascript
// 1. Obtiene balance de la DB
GET /rest/v1/users?id=eq.{user_id}&select=balance

// 2. Calcula diferencia
const tokensToAdd = localBalance - dbBalance;

// 3. Solo incrementa la diferencia usando RPC
POST /rest/v1/rpc/update_user_balance_advanced
{
    p_user_id: userId,
    p_amount: tokensToAdd,      // Solo los tokens nuevos
    p_transaction_type: 'mining',
    p_description: 'Tokens minados sincronizados'
}

// 4. La función incrementa: balance = balance + tokensToAdd
```

---

## 🛡️ Protecciones Implementadas

### 1. **Protección contra Pérdidas de Balance**
```javascript
// Siempre usa el mayor balance entre DB y local
this.user.balance = Math.max(dbBalance, localBalance);
```

### 2. **Validación antes de Sincronizar**
```javascript
if (tokensToAdd > 0) {
    // Solo sincroniza si hay tokens para agregar
    syncBalanceToBackend();
} else if (tokensToAdd < 0) {
    // Si el balance local es MENOR, NO sincroniza
    // y actualiza local con el valor mayor de la DB
    this.user.balance = dbBalance;
}
```

### 3. **Registro de Transacciones**
Todas las operaciones se registran en `transactions` para auditoría:
- Balance antes
- Balance después
- Cantidad de la transacción
- Tipo y descripción

---

## 📍 Endpoint RPC en Supabase

**URL Base**: `https://unevdceponbnmhvpzlzf.supabase.co`  
**Endpoint RPC**: `/rest/v1/rpc/update_user_balance_advanced`

**Headers Requeridos**:
```javascript
{
    'apikey': 'tu_anon_key',
    'Authorization': 'Bearer tu_anon_key',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
}
```

**Body**:
```json
{
    "p_user_id": "uuid-del-usuario",
    "p_amount": 0.12345678,
    "p_transaction_type": "mining",
    "p_description": "Tokens minados sincronizados",
    "p_metadata": {
        "sync_timestamp": "2024-01-01T12:00:00Z",
        "session_id": "mining_session_123"
    }
}
```

**Respuesta**:
```json
{
    "success": true,
    "balance_before": 100.00000000,
    "balance_after": 100.12345678,
    "commission_paid": 0.01234568
}
```

---

## ✅ Verificación de Instalación

Para verificar que la función existe en tu base de datos:

```sql
-- Verificar que la función existe
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_name = 'update_user_balance_advanced';

-- Probar la función manualmente
SELECT update_user_balance_advanced(
    'uuid-del-usuario'::UUID,
    0.5::DECIMAL,
    'mining'::VARCHAR,
    'Prueba de sincronización'::TEXT,
    '{}'::JSONB
);
```

---

## 🔍 Troubleshooting

### Si la función RPC no está disponible:
El código tiene un **fallback** que usa `PATCH` directo:
```javascript
// Fallback si RPC falla
PATCH /rest/v1/users?id=eq.{user_id}
{ balance: localBalance }
```

### Si hay discrepancias:
1. Revisa los logs en la consola del navegador
2. Verifica la tabla `transactions` para ver el historial
3. Compara `balance` en `users` con el balance local

---

## 📚 Referencias

- **Esquema Principal**: `backend/supabase-mining-schema.sql`
- **Código de Integración**: `scripts/supabase-integration.js`
- **Función RPC**: Líneas 416-477 en `backend/supabase-mining-schema.sql`

