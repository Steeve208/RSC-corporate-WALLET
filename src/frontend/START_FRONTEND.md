# 🚀 Cómo Ejecutar el Frontend del Sale

El frontend del sale es un proyecto Vite independiente que debe ejecutarse por separado.

## 📋 Pasos para Ejecutar

### 1. Instalar dependencias (solo la primera vez)
```bash
cd src/frontend
npm install
```

### 2. Ejecutar en desarrollo
```bash
cd src/frontend
npm run dev
```

El frontend se ejecutará en: **http://localhost:3000**

### 3. El botón "Join the Token Sale" en la página principal redirigirá automáticamente a esta URL

## 🔧 Para Producción

### Opción 1: Build y servir estáticamente
```bash
cd src/frontend
npm run build
```

Los archivos compilados estarán en `src/frontend/dist/`. Puedes servir estos archivos desde tu servidor web.

### Opción 2: Ejecutar en un puerto diferente en producción
Mantener el frontend corriendo en su propio servidor (puerto 3000 o el que prefieras).

## ✅ Verificación

1. Ejecuta el proyecto principal: `npm run dev` (puerto 5173)
2. Ejecuta el frontend del sale: `cd src/frontend && npm run dev` (puerto 3000)
3. Abre http://localhost:5173
4. Haz clic en "Join the Token Sale"
5. Deberías ser redirigido a http://localhost:3000

