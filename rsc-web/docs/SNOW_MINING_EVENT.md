# ❄️ Snow Mining Event - Documentación Completa

## 🎯 Resumen

El **Snow Mining Event** es un evento interactivo de minería donde los usuarios pueden multiplicar sus ganancias atrapando items especiales que caen mientras minan.

---

## 🎮 Cómo Funciona

### 1. Inicio del Evento

El evento se activa automáticamente cuando:
- El usuario abre la página de minería
- La fecha actual está dentro del período del evento (13 Dic 2024 - 15 Ene 2025)
- El canvas de animación se carga correctamente

### 2. Mecánica del Juego

#### Paso 1: Iniciar Minería
- El usuario hace clic en "Start Mining"
- El evento detecta automáticamente que la minería está activa
- Comienzan a caer items especiales en el canvas

#### Paso 2: Atrapar Items
- Los items caen desde la parte superior del canvas
- El usuario hace clic en los items para atraparlos
- Cada item otorga un multiplicador de minería temporal

#### Paso 3: Multiplicadores Activos
Cuando un item es atrapado:
- Se activa un multiplicador de minería por **30 segundos**
- Las ganancias de minería se multiplican automáticamente
- Se muestra una notificación visual del bonus activo

---

## 🎁 Items Especiales

### ❄️ Copo de Nieve
- **Multiplicador:** 1.5x (+50% minería)
- **Duración:** 30 segundos
- **Frecuencia:** Común

### 🔔 Campana
- **Multiplicador:** 2.0x (+100% minería)
- **Duración:** 30 segundos
- **Frecuencia:** Medio

### 🎁 Regalo
- **Multiplicador:** 2.5x (+150% minería)
- **Duración:** 30 segundos
- **Frecuencia:** Raro

### ⭐ Estrella
- **Multiplicador:** 3.0x (+200% minería)
- **Duración:** 30 segundos
- **Frecuencia:** Muy Raro

---

## 🏆 Sistema de Colección

### Recompensas por Colección Total

Los usuarios ganan RSK adicional al alcanzar ciertos hitos de colección:

| Items Colectados | Recompensa |
|------------------|------------|
| 10 items         | 25 RSK     |
| 25 items         | 50 RSK     |
| 50 items         | 100 RSK    |
| 100 items        | 250 RSK    |

**Total Posible:** 425 RSK en recompensas de colección

---

## 💻 Interfaz Visual

### Canvas Interactivo
- **Tamaño:** 100% del ancho del contenedor, 400px de alto (300px en móvil)
- **Animaciones:** 
  - Nieve de fondo constante
  - Items especiales que caen con rotación
  - Efectos de partículas al colectar
  - Texto flotante con puntos

### Estadísticas en Tiempo Real
Se muestran:
- Multiplicador actual activo
- Tiempo restante del bonus
- Total de items colectados
- Desglose por tipo de item
- Total de RSK ganado

---

## 🎯 Estrategias para Maximizar Ganancias

### 1. Minería Continua
- Mantén la minería activa para que aparezcan más items
- Los items solo caen cuando estás minando

### 2. Priorizar Items Raros
- Las estrellas ⭐ dan 3x multiplicador
- Los regalos 🎁 dan 2.5x multiplicador
- Enfócate en estos primero

### 3. Encadenar Multiplicadores
- Intenta mantener siempre un multiplicador activo
- Los bonuses no se acumulan, pero puedes encadenarlos

### 4. Colectar para Hitos
- Apunta a los hitos de colección para RSK extra
- 100 items = 250 RSK adicionales

---

## 🔧 Integración Técnica

### Arquitectura

```
┌─────────────────────────────────────┐
│     Sistema de Minería Principal     │
│  (supabase-integration.js)          │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│     Snow Mining Adapter              │
│  (snow-mining-adapter.js)           │
│  - Intercepta ganancias de minería  │
│  - Aplica multiplicadores           │
│  - Sincroniza eventos               │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│     Snow Mining Event                │
│  (snow-mining-event.js)             │
│  - Canvas y animaciones             │
│  - Lógica de items                  │
│  - Sistema de recompensas           │
└─────────────────────────────────────┘
```

### Flujo de Eventos

1. **Usuario inicia minería**
   ```javascript
   startMiningBtn.click()
     ↓
   snowMiningAdapter.onMiningStarted()
     ↓
   dispatch('miningStateChanged', { isMining: true })
     ↓
   snowMiningEvent.onMiningStart()
     ↓
   Comienzan a caer items
   ```

2. **Usuario atrapa item**
   ```javascript
   canvas.click(x, y)
     ↓
   snowMiningEvent.handleCanvasClick()
     ↓
   snowMiningEvent.collectItem(item)
     ↓
   dispatch('snowBonusActive', { multiplier: 2.5 })
     ↓
   snowMiningAdapter.applyMultiplier()
   ```

3. **Minería genera ganancias**
   ```javascript
   Mining generates 10 RSK
     ↓
   supabaseIntegration.addBalance(10)
     ↓
   snowMiningAdapter.addBalance(10 * 2.5) // Interceptado
     ↓
   User receives 25 RSK (10 base + 15 bonus)
   ```

---

## 📊 Persistencia de Datos

### LocalStorage
Se guarda automáticamente:
- Colección de items por tipo
- Total de items colectados
- Total de RSK ganado
- Recompensas reclamadas

### Base de Datos (Opcional)
Para implementación futura:
```sql
CREATE TABLE snow_mining_event (
    user_id UUID PRIMARY KEY,
    snowflakes INT DEFAULT 0,
    bells INT DEFAULT 0,
    gifts INT DEFAULT 0,
    stars INT DEFAULT 0,
    total_collected INT DEFAULT 0,
    total_earned DECIMAL DEFAULT 0,
    claimed_rewards JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎨 Personalización

### Colores Principales
```css
--snow-blue: #89CFF0;      /* Azul nieve */
--snow-gold: #FFD700;      /* Dorado */
--snow-orange: #FF4500;    /* Naranja */
--snow-yellow: #FFFF00;    /* Amarillo */
```

### Animaciones
- **Snowfall:** Nieve de fondo continua
- **Item Spawn:** Items aparecen con rotación
- **Collection Effect:** Explosión de partículas
- **Glow Effect:** Resplandor en multiplicador activo

---

## 🐛 Solución de Problemas

### El evento no aparece
✅ **Solución:**
- Verifica que las fechas del evento sean correctas
- Abre la consola y busca mensajes de error
- Asegúrate de que el canvas se esté renderizando

### Los items no caen
✅ **Solución:**
- Verifica que la minería esté activa
- Revisa que el evento de `miningStateChanged` se esté disparando
- Comprueba la consola por errores de JavaScript

### El multiplicador no se aplica
✅ **Solución:**
- Verifica que `supabaseIntegration` esté disponible
- Comprueba que el adapter se haya inicializado correctamente
- Revisa la consola del navegador

### Canvas no se muestra
✅ **Solución:**
- Verifica que el elemento `#snowCanvas` exista en el HTML
- Comprueba que el CSS esté cargado correctamente
- Asegúrate de que no haya conflictos con otros estilos

---

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Dispositivos
- ✅ Desktop (Windows, Mac, Linux)
- ✅ Tablet (iPad, Android)
- ✅ Móvil (iPhone, Android)

---

## 🚀 Rendimiento

### Optimizaciones Implementadas

1. **Límite de Partículas**
   - Máximo 150 partículas de nieve
   - Limpieza automática de partículas viejas

2. **RequestAnimationFrame**
   - Animaciones sincronizadas con el refresh rate
   - No uso de setInterval para animaciones visuales

3. **Event Delegation**
   - Un solo listener de click en el canvas
   - No listeners individuales por item

4. **Canvas Rendering**
   - Clear y redraw optimizado
   - No redibujo innecesario de elementos estáticos

---

## 📈 Métricas del Evento

### KPIs a Monitorear
- Número de usuarios que participan
- Promedio de items colectados por usuario
- Total de RSK distribuido
- Tiempo promedio de sesión
- Tasa de conversión (visitantes → participantes)

---

## 🎉 Conclusión

El Snow Mining Event es un evento completamente funcional, visual y atractivo que:

✅ **Aumenta el engagement** de los usuarios
✅ **Recompensa la actividad** con multiplicadores y RSK
✅ **Es visualmente atractivo** con animaciones fluidas
✅ **Funciona en todos los dispositivos** (responsive)
✅ **Es fácil de entender** y divertido de jugar

---

## 📞 Soporte

Para problemas o preguntas:
- Revisa la consola del navegador
- Verifica la documentación técnica
- Contacta al equipo de desarrollo

**¡Feliz minería navideña! ❄️**

