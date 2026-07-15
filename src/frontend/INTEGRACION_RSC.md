# 📦 Guía de Integración en RSC Web

Esta carpeta contiene el frontend completo del Sale Contract, listo para integrar en la web de RSC.

## 🎯 ¿Qué contiene esta carpeta?

- ✅ **Aplicación React completa** con Vite
- ✅ **Todos los componentes** necesarios para el sale
- ✅ **Hooks personalizados** para Web3 y contratos
- ✅ **Configuración de contratos** ya lista (direcciones y ABI)
- ✅ **Estilos modernos** y responsive
- ✅ **Listo para producción**

## 🚀 Opciones de Integración

### Opción 1: Como página independiente (Recomendado)

1. **Copia esta carpeta** `frontend/sale` a tu proyecto RSC
2. **Instala dependencias:**
   ```bash
   cd frontend/sale
   npm install
   ```
3. **Ejecuta en desarrollo:**
   ```bash
   npm run dev
   ```
4. **Build para producción:**
   ```bash
   npm run build
   ```
5. **Integra en tu router:**
   - Crea una ruta `/sale` o `/presale`
   - Renderiza el componente `App` desde `src/App.jsx`

### Opción 2: Como componente en tu app existente

1. **Copia solo los archivos necesarios:**
   - `src/components/` → Tus componentes
   - `src/hooks/` → Tus hooks
   - `src/utils/` → Tus utilidades
   - `src/config/contracts.js` → Tu configuración

2. **Instala las dependencias:**
   ```bash
   npm install ethers
   ```

3. **Importa y usa los componentes:**
   ```jsx
   import { SaleCard } from './components/SaleCard';
   
   function SalePage() {
     return <SaleCard />;
   }
   ```

### Opción 3: Build estático (Para servidor web simple)

1. **Ejecuta el build:**
   ```bash
   cd frontend/sale
   npm install
   npm run build
   ```

2. **Copia la carpeta `dist`** a tu servidor web

3. **Sirve los archivos** desde tu servidor (Apache, Nginx, etc.)

## 📁 Estructura de Archivos

```
frontend/sale/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Header.jsx       # Header con conexión wallet
│   │   ├── SaleCard.jsx     # Card principal del sale
│   │   ├── BuyForm.jsx      # Formulario de compra
│   │   ├── ClaimSection.jsx # Sección de reclamación
│   │   └── InfoPanel.jsx    # Panel de información
│   ├── hooks/               # Hooks personalizados
│   │   ├── useWeb3.js       # Hook para conexión Web3
│   │   └── useSaleContract.js # Hook para interactuar con el contrato
│   ├── utils/               # Utilidades
│   │   └── web3.js          # Funciones helper para Web3
│   ├── config/              # Configuración
│   │   └── contracts.js     # Direcciones y ABI de contratos
│   ├── App.jsx              # Componente principal
│   ├── App.css              # Estilos globales
│   └── main.jsx             # Punto de entrada
├── public/                  # Archivos estáticos
├── index.html               # HTML principal
├── package.json             # Dependencias
├── vite.config.js           # Configuración de Vite
└── README.md                # Documentación completa
```

## ⚙️ Configuración

### Contratos (Ya configurados)

Los contratos están configurados en `src/config/contracts.js`:

- **RSKSale**: `0xc8D38246503e06Cf2a75114EaD4dA1cb7840F28A`
- **USDT (BSC)**: `0x55d398326f99059fF775485246999027B3197955`

### Red BSC

La aplicación está configurada para **BSC Mainnet** (Chain ID: 56). Si el usuario no está en la red correcta, se le pedirá cambiar automáticamente.

## 🎨 Personalización

### Colores

Puedes cambiar los colores en los archivos CSS:
- **Color principal**: `#667eea` (morado)
- **Color secundario**: `#764ba2` (morado oscuro)

### Estilos

Todos los estilos están en archivos CSS individuales. Puedes modificar:
- `src/components/Header.css`
- `src/components/SaleCard.css`
- `src/components/BuyForm.css`
- `src/components/ClaimSection.css`
- `src/components/InfoPanel.css`
- `src/App.css`

## 🔧 Dependencias

Las dependencias principales son:
- `react` y `react-dom` - Framework React
- `ethers` - Biblioteca para interactuar con blockchain
- `vite` - Build tool (desarrollo)

## 📱 Responsive

La aplicación es completamente responsive y funciona en:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

## 🔒 Seguridad

- ✅ Todas las transacciones requieren confirmación del usuario
- ✅ Validación de cantidades antes de comprar
- ✅ Verificación de balance de USDT
- ✅ Verificación de límites por usuario
- ✅ Manejo de errores en todas las operaciones

## 🐛 Solución de Problemas

### Error: "MetaMask no está instalado"
- El usuario debe instalar MetaMask en su navegador

### Error: "Red incorrecta"
- La aplicación pedirá automáticamente cambiar a BSC Mainnet

### Error: "No hay suficiente USDT"
- El usuario debe tener USDT en su wallet de BSC

### Los tokens no aparecen
- El 25% se transfiere inmediatamente
- El 75% queda en vesting y se puede reclamar gradualmente

## 📞 Soporte

Si tienes problemas con la integración, revisa:
1. La consola del navegador para errores
2. La consola de MetaMask
3. El README.md principal

## ✅ Checklist de Integración

- [ ] Copiar carpeta `frontend/sale` al proyecto RSC
- [ ] Instalar dependencias: `npm install`
- [ ] Verificar que los contratos estén configurados correctamente
- [ ] Probar conexión con MetaMask
- [ ] Probar compra de tokens (en testnet primero)
- [ ] Probar reclamación de tokens
- [ ] Ajustar estilos según diseño de RSC
- [ ] Hacer build de producción: `npm run build`
- [ ] Desplegar en producción

---

**¡Todo listo para integrar!** 🚀

Los desarrolladores de RSC solo necesitan copiar esta carpeta y seguir las instrucciones.

