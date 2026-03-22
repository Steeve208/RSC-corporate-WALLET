# Panel de Administración - Inicio Rápido

## 🚀 Acceso Rápido

1. **Abrir el panel**: `http://localhost/admin` o `https://tudominio.com/admin`
2. **Login**: `admin/login.html`
3. **Panel principal**: `admin/index.html`

## 📦 Archivos Creados

```
admin/
├── login.html                      ✅ Página de login completa
├── index.html                      ✅ Panel principal con sidebar
├── README.md                       ✅ Documentación completa
├── QUICK_START.md                  ✅ Este archivo
├── css/
│   └── admin.css                   ✅ Todos los estilos
├── js/
│   ├── admin.js                    ✅ Funciones principales
│   ├── config.js                   ✅ Configuración completa
│   ├── templates.js                ✅ TODOS los módulos con contenido HTML
│   └── modules/
│       └── dashboard.js            ✅ Módulo dashboard con Chart.js
backend/migrations/
└── admin_panel_schema.sql          ✅ Esquema SQL completo
```

## ✅ Módulos Implementados con Contenido

Todos estos módulos tienen HTML completo, estilos y datos de ejemplo:

1. ✅ **Dashboard** - Estadísticas, gráficas, actividad reciente
2. ✅ **Contenido** - Banners, anuncios, páginas (con tabs)
3. ✅ **Usuarios** - Lista de usuarios, búsqueda, paginación
4. ✅ **Métricas** - 6 métricas con progress bars y objetivos
5. ✅ **Campañas** - 3 campañas de ejemplo con progreso y milestones
6. ✅ **Recompensas** - Reglas, lotes, distribuciones (con tabs)
7. ✅ **Jobs** - 3 tareas automáticas con schedules
8. ✅ **Tesorería** - Overview, transacciones, aprobaciones
9. ✅ **Configuración** - Mantenimiento, redes sociales, bonos, seguridad
10. ✅ **Auditoría** - Log completo de acciones con filtros
11. ✅ **Admins** - Lista de admins y roles (con tabs)

## 🎨 Características UI

- ✅ Dark theme moderno
- ✅ Sidebar responsive con iconos
- ✅ Tablas con hover effects
- ✅ Badges de colores por estado
- ✅ Botones de acción inline
- ✅ Progress bars animadas
- ✅ Cards con gradientes
- ✅ Search boxes
- ✅ Toasts de notificaciones
- ✅ Loading states
- ✅ Tabs navegables
- ✅ Toggle switches
- ✅ Formularios estilizados

## 📊 Datos de Ejemplo

Cada módulo incluye datos realistas:

- **Users**: 3 usuarios con avatares, wallets, balances
- **Campaigns**: 3 campañas (Activas y programadas)
- **Metrics**: 6 métricas con progreso (YouTube, Twitter, Telegram, etc.)
- **Rewards**: Reglas, batches, distribuciones con estados
- **Jobs**: 3 jobs automatizados con schedules
- **Treasury**: Balance, límites, transacciones
- **Audit**: 5 entradas de log con detalles
- **Admins**: 2 admins con diferentes roles

## 🔧 Próximos Pasos

### 1. Configurar Supabase (IMPORTANTE)

```sql
-- 1. Crear proyecto en https://supabase.com
-- 2. Ir a SQL Editor
-- 3. Copiar y ejecutar: backend/migrations/admin_panel_schema.sql
-- 4. Guardar las credenciales
```

### 2. Configurar Credenciales

Editar `admin/js/admin.js` líneas 10-11:

```javascript
const SUPABASE_URL = 'TU_URL_DE_SUPABASE';
const SUPABASE_ANON_KEY = 'TU_ANON_KEY_DE_SUPABASE';
```

### 3. Crear Admin Inicial

Después de ejecutar el SQL, insertar manualmente el primer admin:

```sql
INSERT INTO admin_users (username, email, password_hash, full_name, role_id)
VALUES ('admin', 'admin@rscchain.com', 'HASH_AQUI', 'Super Admin', 1);
```

**⚠️ IMPORTANTE**: Hashear la contraseña antes de producción usando bcrypt.

### 4. Probar Localmente

```bash
# Opción 1: Usar VS Code Live Server
# Clic derecho en admin/login.html > Open with Live Server

# Opción 2: Usar Python
cd admin
python -m http.server 8000
# Abrir: http://localhost:8000/login.html

# Opción 3: Usar PHP
cd admin
php -S localhost:8000
# Abrir: http://localhost:8000/login.html
```

### 5. Configurar Chart.js (para gráficas en Dashboard)

Agregar antes del cierre de `</body>` en `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

## 🧪 Testing Rápido

1. **Abrir** `admin/login.html` en el navegador
2. **Ver** el diseño del login (funciona sin backend)
3. **Clic** en "Entrar" → Te lleva a `index.html`
4. **Navegar** entre módulos en el sidebar
5. **Ver** todos los datos de ejemplo
6. **Probar** tabs, búsquedas, botones

## 🔒 Seguridad (Antes de Producción)

- [ ] Implementar autenticación real con JWT
- [ ] Hashear contraseñas con bcrypt
- [ ] Configurar RLS en Supabase
- [ ] Implementar rate limiting
- [ ] Agregar 2FA para super admins
- [ ] HTTPS obligatorio
- [ ] Sanitizar inputs
- [ ] Validar permisos en backend

## 🐛 Debugging

Activar modo debug en consola:

```javascript
localStorage.setItem('admin_debug', 'true');
location.reload();
```

Ver logs en consola del navegador (F12).

## 📞 Soporte

- Telegram: [@RSCchain](https://t.me/RSCchain)
- Email: admin@rscchain.com

## 🎯 Casos de Uso Reales

### Ejemplo 1: Campaña 2K YouTube

1. Ve a **Métricas** → Actualiza "youtube_followers" a 2000
2. Ve a **Recompensas** → La regla se dispara automáticamente
3. Ve a **Recompensas > Lotes** → Aparece nuevo batch
4. Revisa lista de beneficiarios
5. Clic en "Aprobar"
6. Ve a **Tesorería** → Verifica transacción
7. Ve a **Auditoría** → Revisa el log

### Ejemplo 2: Nuevo Banner

1. Ve a **Contenido** → Tab "Banners"
2. Clic en "+ Nuevo Contenido"
3. Llena formulario (título, imagen, fechas)
4. Guarda
5. El banner aparece en la web automáticamente

### Ejemplo 3: Bloquear Usuario

1. Ve a **Usuarios**
2. Busca el usuario
3. Clic en botón "Bloquear"
4. Confirma acción
5. Usuario no puede acceder
6. Ve a **Auditoría** → Acción registrada

## ✨ Características Avanzadas (Futuro)

- [ ] Gráficas en tiempo real con WebSockets
- [ ] Exportar reportes a PDF/Excel
- [ ] Notificaciones push
- [ ] AI para recomendaciones
- [ ] Multi-idioma (i18n)
- [ ] Modo claro/oscuro toggle
- [ ] Búsqueda global
- [ ] Atajos de teclado
- [ ] Drag & drop para ordenar
- [ ] Preview de cambios antes de publicar

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024  
**Estado**: ✅ Listo para configurar Supabase

