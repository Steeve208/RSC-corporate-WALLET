# 🚀 Inicio Rápido - Sale Frontend

## ⚠️ IMPORTANTE: Directorio Correcto

**SIEMPRE ejecuta los comandos desde el directorio `frontend/sale`:**

```bash
cd frontend/sale
npm run dev
```

## 📋 Comandos Disponibles

Desde el directorio `frontend/sale`:

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🔧 Si el puerto está ocupado

El servidor está configurado para usar el puerto **3000**. Si está ocupado, Vite automáticamente usará el siguiente disponible (3001, 3002, etc.).

Revisa la consola para ver la URL exacta donde está corriendo.

## 🌐 URL del Servidor

Una vez iniciado, el servidor estará disponible en:

**http://localhost:3000** (o el puerto que Vite asigne)

## ✅ Verificar que estás en el directorio correcto

Ejecuta:
```bash
pwd  # En Linux/Mac
# o
cd   # En Windows PowerShell
```

Deberías estar en: `D:\wrsk\frontend\sale`

## 🐛 Solución de Problemas

### Error: "Missing script: dev"
- **Causa**: Estás en el directorio incorrecto
- **Solución**: `cd frontend/sale` y luego `npm run dev`

### Error: "Port already in use"
- **Causa**: El puerto 3000 está ocupado
- **Solución**: Vite automáticamente usará otro puerto. Revisa la consola.

### Error: "Cannot find module"
- **Causa**: Dependencias no instaladas
- **Solución**: `npm install` desde `frontend/sale`

---

**Recuerda: Siempre desde `frontend/sale`** 📁

