# wRSK Sale Frontend

Frontend completo y listo para producción para el Sale Contract de wRSK en BSC Mainnet.

## 🚀 Características

- ✅ Conexión con MetaMask
- ✅ Compra de tokens wRSK con USDT
- ✅ Visualización de tokens claimables
- ✅ Reclamación de tokens en vesting
- ✅ Información en tiempo real del sale
- ✅ Diseño moderno y responsive
- ✅ Listo para producción

## 📋 Requisitos Previos

- Node.js 18+ y npm
- MetaMask instalado en el navegador
- USDT en BSC Mainnet para comprar

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📁 Estructura del Proyecto

```
frontend/sale/
├── src/
│   ├── components/       # Componentes React
│   │   ├── Header.jsx
│   │   ├── SaleCard.jsx
│   │   ├── BuyForm.jsx
│   │   ├── ClaimSection.jsx
│   │   └── InfoPanel.jsx
│   ├── hooks/           # Hooks personalizados
│   │   ├── useWeb3.js
│   │   └── useSaleContract.js
│   ├── utils/           # Utilidades
│   │   └── web3.js
│   ├── config/          # Configuración
│   │   └── contracts.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Configuración

### Contratos

Los contratos están configurados en `src/config/contracts.js`:

- **RSKSale**: `0xc8D38246503e06Cf2a75114EaD4dA1cb7840F28A`
- **USDT (BSC)**: `0x55d398326f99059fF775485246999027B3197955`

### Red BSC

La aplicación está configurada para BSC Mainnet (Chain ID: 56). Si el usuario no está en la red correcta, se le pedirá cambiar automáticamente.

## 🎨 Personalización

### Colores

Los colores principales se pueden cambiar en los archivos CSS:
- Color principal: `#667eea`
- Color secundario: `#764ba2`

### Estilos

Todos los estilos están en archivos CSS individuales para cada componente. Puedes modificar los estilos según tus necesidades.

## 📱 Integración en RSC Web

### Opción 1: Como componente independiente

1. Copia la carpeta `frontend/sale` a tu proyecto RSC
2. Instala las dependencias: `npm install`
3. Importa el componente `App` en tu aplicación
4. Ajusta los estilos según tu diseño

### Opción 2: Como página completa

1. Copia la carpeta `frontend/sale` a tu proyecto RSC
2. Instala las dependencias: `npm install`
3. Crea una ruta en tu router que renderice el componente `App`
4. Ajusta los estilos según tu diseño

### Opción 3: Build estático

1. Ejecuta `npm run build` en la carpeta `frontend/sale`
2. Copia la carpeta `dist` generada a tu servidor web
3. Sirve los archivos estáticos desde tu servidor

## 🔒 Seguridad

- ✅ Todas las transacciones requieren confirmación del usuario
- ✅ Validación de cantidades antes de comprar
- ✅ Verificación de balance de USDT
- ✅ Verificación de límites por usuario
- ✅ Manejo de errores en todas las operaciones

## 📝 Funcionalidades

### Compra de Tokens

- El usuario ingresa la cantidad de USDT que desea pagar
- Se calcula automáticamente la cantidad de wRSK que recibirá
- Se muestra el desglose: 25% inmediato, 75% en vesting
- Se valida el balance y los límites antes de comprar

### Reclamación de Tokens

- Muestra el total comprado y el desglose de vesting
- Calcula automáticamente los tokens disponibles para reclamar
- Permite reclamar tokens en cualquier momento
- Muestra el progreso del vesting

### Información del Sale

- Estado del sale (activo, finalizado, pausado)
- Progreso de la venta con barra visual
- Fechas de inicio y fin
- Contador regresivo
- Estadísticas del sale

## 🐛 Solución de Problemas

### MetaMask no se conecta

- Verifica que MetaMask esté instalado
- Asegúrate de estar en BSC Mainnet
- Revisa la consola del navegador para errores

### Error al comprar

- Verifica que tengas suficiente USDT
- Asegúrate de haber aprobado el gasto del contrato
- Verifica que el sale esté activo
- Revisa que no excedas el límite por usuario

### Tokens no aparecen

- Los tokens se distribuyen automáticamente
- El 25% se transfiere inmediatamente
- El 75% queda en vesting y se puede reclamar gradualmente

## 📞 Soporte

Para problemas o preguntas, contacta al equipo de desarrollo de RSC Finance.

## 📄 Licencia

Este proyecto es propiedad de RSC Finance.

---

**¡Listo para producción!** 🚀

