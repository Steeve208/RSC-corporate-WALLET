# 📦 Cómo Integrar el Sale Frontend en RSC Web

## 🎯 Opciones de Integración

Tienes **3 opciones** dependiendo de cómo esté estructurado tu proyecto RSC:

---

## Opción 1: Copiar Carpeta Completa (Si RSC no tiene React configurado)

Si tu proyecto RSC **no tiene React/Vite configurado**, puedes copiar toda la carpeta `frontend/`:

### Pasos:

1. **Copia la carpeta `frontend/` completa** a tu proyecto RSC
2. **En tu proyecto RSC, instala dependencias:**
   ```bash
   cd frontend
   npm install
   ```
3. **Ejecuta en desarrollo:**
   ```bash
   npm run dev
   ```
4. **Para producción, haz build:**
   ```bash
   npm run build
   ```
5. **Los archivos compilados estarán en `frontend/dist/`** - sirve estos archivos desde tu servidor

---

## Opción 2: Integrar Componentes (Si RSC ya tiene React/Next.js)

Si tu proyecto RSC **ya tiene React o Next.js configurado**, integra solo los componentes:

### Pasos:

1. **Copia estos archivos a tu proyecto RSC:**
   ```
   frontend/src/components/     →  tu-proyecto/src/components/sale/
   frontend/src/hooks/           →  tu-proyecto/src/hooks/sale/
   frontend/src/utils/web3.js    →  tu-proyecto/src/utils/web3.js (o merge con el existente)
   frontend/src/config/          →  tu-proyecto/src/config/sale/
   ```

2. **Instala dependencias en tu proyecto RSC:**
   ```bash
   npm install ethers
   ```

3. **Crea una página/ruta en tu proyecto:**
   ```jsx
   // Ejemplo: pages/sale.js o app/sale/page.jsx
   import { SaleCard } from '@/components/sale/SaleCard';
   import { Header } from '@/components/sale/Header';
   
   export default function SalePage() {
     return (
       <>
         <Header />
         <SaleCard />
       </>
     );
   }
   ```

4. **Ajusta los imports según tu estructura de carpetas**

---

## Opción 3: Build Estático (Para servidor web simple)

Si tu proyecto RSC es **HTML/CSS/JS puro** o usa un servidor web simple:

### Pasos:

1. **Haz build del frontend:**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Copia la carpeta `frontend/dist/`** a tu servidor web RSC

3. **Sirve los archivos** desde tu servidor (Apache, Nginx, etc.)

4. **Accede a la página** desde: `https://tu-dominio.com/sale/` (o la ruta que configures)

---

## 📋 Checklist de Integración

### Antes de Copiar:

- [ ] Verificar que tu proyecto RSC tiene Node.js instalado
- [ ] Decidir qué opción usar (1, 2 o 3)
- [ ] Hacer backup de tu proyecto RSC

### Después de Copiar:

- [ ] Instalar dependencias: `npm install`
- [ ] Verificar que los contratos están configurados en `src/config/contracts.js`
- [ ] Probar en desarrollo: `npm run dev`
- [ ] Verificar conexión con MetaMask
- [ ] Probar compra (en testnet primero si es posible)
- [ ] Ajustar estilos según diseño de RSC
- [ ] Hacer build de producción: `npm run build`

---

## ⚙️ Configuración Necesaria

### Contratos (Ya configurados)

Los contratos están en `src/config/contracts.js`:
- **RSKSale**: `0xc8D38246503e06Cf2a75114EaD4dA1cb7840F28A`
- **USDT (BSC)**: `0x55d398326f99059fF775485246999027B3197955`

**No necesitas cambiar nada** a menos que despliegues nuevos contratos.

---

## 🎨 Personalización de Estilos

Si quieres ajustar los estilos para que coincidan con RSC:

1. **Colores principales**: Modifica en los archivos CSS:
   - `src/components/Header.css`
   - `src/components/SaleCard.css`
   - `src/components/BuyForm.css`
   - etc.

2. **Fuentes**: Ya está usando Inter, puedes cambiarla en `index.html`

3. **Layout**: Ajusta los componentes según tu diseño

---

## 🔧 Si Tienes Problemas

### Error: "Module not found"
- Verifica que copiaste todos los archivos necesarios
- Verifica que las rutas de import son correctas

### Error: "MetaMask not found"
- El usuario debe tener MetaMask instalado
- Verifica que estás en un navegador compatible

### Error: "Network error"
- Verifica que estás en BSC Mainnet
- Verifica que los contratos están desplegados

---

## 📞 Soporte

Si tienes problemas con la integración, revisa:
1. La consola del navegador (F12)
2. Los logs del servidor
3. La configuración de contratos

---

## ✅ Resumen Rápido

**Opción más simple:**
1. Copia la carpeta `frontend/` a tu proyecto RSC
2. `cd frontend && npm install`
3. `npm run dev` para probar
4. `npm run build` para producción
5. Sirve los archivos de `dist/`

**¡Listo!** 🚀

