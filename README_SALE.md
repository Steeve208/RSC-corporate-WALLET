# 🚀 Cómo Ejecutar el Proyecto con el Sale Frontend

Este proyecto tiene dos aplicaciones que deben ejecutarse por separado:

1. **Proyecto Principal (RSC Wallet)**: Puerto 5173
2. **Frontend del Sale**: Puerto 3000

## 📋 Pasos para Ejecutar

### Opción 1: Ejecutar Manualmente (Recomendado para desarrollo)

#### Terminal 1 - Proyecto Principal
```bash
npm run dev
```
Esto iniciará el proyecto principal en **http://localhost:5173**

#### Terminal 2 - Frontend del Sale
```bash
cd src/frontend
npm install  # Solo la primera vez
npm run dev
```
Esto iniciará el frontend del sale en **http://localhost:3000**

### Opción 2: Usar Scripts NPM (Próximamente)

Puedes crear scripts en el `package.json` principal para ejecutar ambos proyectos simultáneamente.

## ✅ Verificación

1. Abre **http://localhost:5173** - Deberías ver la página principal
2. Haz clic en el botón **"Join the Token Sale"**
3. Deberías ser redirigido a **http://localhost:3000** - La página del sale
4. En la página del sale, haz clic en **"Connect Wallet"** para conectar MetaMask

## 🔧 Configuración

- **Proyecto Principal**: Puerto 5173 (configurado en `vite.config.ts`)
- **Frontend Sale**: Puerto 3000 (configurado en `src/frontend/vite.config.js`)
- El botón "Join the Token Sale" redirige automáticamente a `http://localhost:3000` en desarrollo

## 📦 Para Producción

### Opción 1: Build del Frontend y Servir Estáticamente
```bash
cd src/frontend
npm run build
```
Los archivos compilados estarán en `src/frontend/dist/`. Puedes servir estos archivos desde tu servidor web en la ruta `/sale`.

### Opción 2: Mantener Frontend Separado
Mantener el frontend corriendo en su propio servidor (puerto 3000 o el que prefieras) y actualizar la URL en el botón para producción.

## 🐛 Solución de Problemas

### El botón no redirige
- Verifica que el frontend esté corriendo en el puerto 3000
- Abre la consola del navegador (F12) para ver errores

### MetaMask no se conecta
- Asegúrate de tener MetaMask instalado
- Verifica que estés en BSC Mainnet (Chain ID: 56)
- Revisa la consola del navegador para errores

### Error "Cannot find module"
- Ejecuta `npm install` en `src/frontend/`
- Verifica que todas las dependencias estén instaladas

