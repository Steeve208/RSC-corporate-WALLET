# 🎯 **CATÁLOGO COMPLETO DE BOTONES - RSC CHAIN WEB**

## 📋 **RESUMEN EJECUTIVO**

Este documento cataloga **todos los botones** presentes en la plataforma web de RSC Chain, organizados por páginas y funcionalidades. Cada botón incluye su propósito, ubicación y comportamiento específico.

---

## 🏠 **PÁGINA PRINCIPAL (index.html)**

### **🔧 Botones de Navegación y Control**

| Botón | ID/Clase | Ubicación | Función |
|-------|----------|-----------|---------|
| **Selector de Idioma** | `language-selector` | Header | Cambiar idioma de la interfaz |
| **Toggle de Tema** | `theme-toggle` | Header | Alternar entre modo claro/oscuro |
| **Botón Wallet Móvil** | `mobile-wallet-btn` | Header móvil | Acceso rápido a wallet en móviles |
| **Conectar Wallet** | `btn-wallet-connect` | Header | Redirigir a página de wallet |
| **Menú Móvil** | `navbar-toggle` | Header móvil | Abrir/cerrar menú de navegación |

### **🚀 Botones de Acción Principal**

| Botón | Clase | Ubicación | Función |
|-------|-------|-----------|---------|
| **Ir a Wallet** | `btn-epic-primary` | Hero Section | Navegar a wallet.html |
| **Ir a Mining** | `btn-epic-secondary` | Hero Section | Navegar a mine.html |
| **Ir a P2P** | `btn-epic-tertiary` | Hero Section | Navegar a p2p.html |

### **🎮 Controles de Demo 3D**

| Botón | ID | Función |
|-------|----|---------|
| **Anterior** | `prevStage` | Navegar etapa anterior del demo |
| **Siguiente** | `nextStage` | Navegar etapa siguiente del demo |
| **Zoom** | `zoomToggle` | Activar/desactivar zoom en demo |

### **🗳️ Sistema de Votación**

| Botón | Clase | Función |
|-------|-------|---------|
| **Votar P2P** | `vote-btn` | Votar por funcionalidad P2P |
| **Votar Bank** | `vote-btn` | Votar por funcionalidad Bank |
| **Votar Mobile** | `vote-btn` | Votar por funcionalidad Mobile |

### **📊 Métricas y Newsletter**

| Botón | ID | Función |
|-------|----|---------|
| **Refresh Métricas** | `refreshMetrics` | Actualizar estadísticas en tiempo real |
| **Newsletter** | `newsletterBtn` | Suscribirse al newsletter |

### **💬 Chat System**

| Botón | ID | Función |
|-------|----|---------|
| **Minimizar Chat** | `minimizeChat` | Minimizar ventana de chat |
| **Cerrar Chat** | `closeChat` | Cerrar ventana de chat |
| **Adjuntar Archivo** | `attachFile` | Adjuntar archivo al chat |
| **Emojis** | `emojiBtn` | Abrir selector de emojis |
| **Enviar Mensaje** | `sendMessage` | Enviar mensaje (habilitado/deshabilitado) |

### **❌ Modales**

| Botón | Clase | Función |
|-------|-------|---------|
| **Cerrar Modal** | `modal-close` | Cerrar ventanas modales |

---

## 💰 **PÁGINA WALLET (wallet.html)**

### **🔧 Botones de Navegación**

| Botón | ID | Función |
|-------|----|---------|
| **Selector de Idioma** | `languageSelector` | Cambiar idioma |
| **Toggle de Tema** | `themeToggle` | Cambiar tema claro/oscuro |
| **Menú Móvil** | `navbarToggle` | Abrir menú en móviles |

### **📋 Acciones de Dirección**

| Botón | ID | Función |
|-------|----|---------|
| **Copiar Dirección** | `copyAddressBtn` | Copiar dirección al portapapeles |
| **Mostrar QR** | `showQRBtn` | Mostrar código QR de la dirección |
| **Copiar Dirección Wallet** | `copyWalletAddressBtn` | Copiar dirección de wallet |
| **Compartir Dirección** | `shareAddressBtn` | Compartir dirección |
| **Descargar QR** | `downloadQRBtn` | Descargar imagen QR |

### **⚡ Acciones Rápidas**

| Botón | ID | Función |
|-------|----|---------|
| **Envío Rápido** | `quickSendBtn` | Acceso rápido a envío |
| **Recepción Rápida** | `quickReceiveBtn` | Acceso rápido a recepción |
| **Reclamar Mining** | `claimMiningBtn` | Reclamar recompensas de mining |
| **Backup Wallet** | `backupWalletBtn` | Hacer backup de wallet |

### **🔄 Controles de Vista**

| Botón | Clase | Función |
|-------|-------|---------|
| **Refresh Overview** | `refresh-btn` | Actualizar vista general |
| **Balance** | `control-btn` | Ver vista de balance |
| **Transacciones** | `control-btn` | Ver vista de transacciones |
| **Red** | `control-btn` | Ver vista de red |
| **Ver Todas** | `view-all-btn` | Ver todas las transacciones |

### **📤 Envío de Transacciones**

| Botón | ID | Función |
|-------|----|---------|
| **Escanear QR** | `scanQRBtn` | Escanear código QR |
| **Pegar Dirección** | `pasteAddressBtn` | Pegar dirección del portapapeles |
| **Enviar Transacción** | `sendTransactionBtn` | Enviar transacción |
| **Vista Previa** | `previewTransactionBtn` | Vista previa de transacción |

### **💰 Cantidades Predefinidas**

| Botón | Clase | Cantidad |
|-------|-------|----------|
| **0.1 RSC** | `amount-btn` | Enviar 0.1 RSC |
| **0.5 RSC** | `amount-btn` | Enviar 0.5 RSC |
| **1.0 RSC** | `amount-btn` | Enviar 1.0 RSC |
| **MAX** | `maxAmountBtn` | Enviar cantidad máxima |

### **⛽ Configuración de Gas**

| Botón | Clase | Velocidad |
|-------|-------|-----------|
| **Lento** | `gas-btn` | Gas lento (económico) |
| **Medio** | `gas-btn` | Gas medio (balanceado) |
| **Rápido** | `gas-btn` | Gas rápido (prioritario) |

### **⛏️ Funciones de Mining**

| Botón | ID | Función |
|-------|----|---------|
| **Reclamar Recompensas** | `claimMiningRewardsBtn` | Reclamar recompensas de mining |
| **Iniciar Mining** | `startMiningBtn` | Iniciar proceso de mining |
| **Ver Stats Mining** | `viewMiningStatsBtn` | Ver estadísticas de mining |

### **🔒 Funciones de Staking**

| Botón | ID | Función |
|-------|----|---------|
| **Stake RSC** | `stakeRSCBtn` | Hacer stake de RSC |
| **Unstake RSC** | `unstakeRSCBtn` | Retirar stake de RSC |
| **Reclamar Recompensas** | `claimStakingRewardsBtn` | Reclamar recompensas de staking |

### **⚙️ Configuración de Wallet**

| Botón | ID | Función |
|-------|----|---------|
| **Cambiar Contraseña** | `changePasswordBtn` | Cambiar contraseña |
| **Configurar 2FA** | `setup2FABtn` | Configurar autenticación 2FA |
| **Backup Wallet** | `backupWalletBtn` | Hacer backup |
| **Exportar Clave Privada** | `exportPrivateKeyBtn` | Exportar clave privada |
| **Importar Wallet** | `importWalletBtn` | Importar wallet existente |
| **Reset Wallet** | `resetWalletBtn` | Resetear wallet |

### **📊 Exportación**

| Botón | ID | Función |
|-------|----|---------|
| **Exportar Transacciones** | `exportTransactionsBtn` | Exportar historial de transacciones |

### **❌ Modales de Confirmación**

| Botón | ID | Función |
|-------|----|---------|
| **Cerrar Modal TX** | `transactionModalClose` | Cerrar modal de transacción |
| **Cancelar TX** | `cancelTransactionBtn` | Cancelar transacción |
| **Confirmar TX** | `confirmTransactionBtn` | Confirmar transacción |
| **Cerrar Modal QR** | `qrModalClose` | Cerrar modal de QR |

---

## ⛏️ **PÁGINA MINING (mine.html)**

### **🔧 Botones de Navegación**

| Botón | ID | Función |
|-------|----|---------|
| **Selector de Idioma** | `languageSelector` | Cambiar idioma |
| **Toggle de Tema** | `themeToggle` | Cambiar tema |
| **Menú Móvil** | `navbarToggle` | Abrir menú móvil |

### **🔄 Controles de Vista**

| Botón | ID | Función |
|-------|----|---------|
| **Refresh** | `refreshBtn` | Actualizar datos |
| **Bloques** | `control-btn` | Ver vista de bloques |
| **Minería** | `control-btn` | Ver vista de minería |
| **Red** | `control-btn` | Ver vista de red |

### **⛏️ Controles de Mining**

| Botón | ID | Función |
|-------|----|---------|
| **Iniciar Mining** | `startMiningBtn` | Iniciar proceso de mining |
| **Detener Mining** | `stopMiningBtn` | Detener proceso de mining |
| **Reclamar** | `claimBtn` | Reclamar recompensas |
| **Reclamar Todo** | `claimAllBtn` | Reclamar todas las recompensas |
| **Reclamar Parcial** | `claimPartialBtn` | Reclamar recompensas parciales |

### **⏰ Filtros de Tiempo**

| Botón | Clase | Período |
|-------|-------|---------|
| **1H** | `time-btn` | Última hora |
| **24H** | `time-btn` | Últimas 24 horas |
| **7D** | `time-btn` | Últimos 7 días |

### **❌ Modales**

| Botón | ID | Función |
|-------|----|---------|
| **Cerrar Modal Recompensa** | `rewardModalClose` | Cerrar modal de recompensas |

---

## 🔒 **PÁGINA STAKING (staking.html)**

### **🔧 Botones de Navegación**

| Botón | ID | Función |
|-------|----|---------|
| **Selector de Idioma** | `languageSelector` | Cambiar idioma |
| **Toggle de Tema** | `themeToggle` | Cambiar tema |
| **Menú Móvil** | `navbarToggle` | Abrir menú móvil |

### **🔄 Controles de Vista**

| Botón | ID | Función |
|-------|----|---------|
| **Refresh** | `refreshBtn` | Actualizar datos |
| **Pools** | `control-btn` | Ver pools de staking |
| **Stakes** | `control-btn` | Ver stakes activos |
| **Recompensas** | `control-btn` | Ver recompensas |

### **⏰ Filtros de Tiempo**

| Botón | Clase | Período |
|-------|-------|---------|
| **7D** | `time-btn` | Últimos 7 días |
| **30D** | `time-btn` | Últimos 30 días |
| **1A** | `time-btn` | Último año |

### **💰 Acciones de Staking**

| Botón | ID | Función |
|-------|----|---------|
| **Reclamar Todo** | `claimAllBtn` | Reclamar todas las recompensas |

### **❌ Modales**

| Botón | ID | Función |
|-------|----|---------|
| **Cerrar Modal** | `modalClose` | Cerrar modal principal |
| **Cerrar Modal Recompensas** | `rewardsModalClose` | Cerrar modal de recompensas |

---

## 🤝 **PÁGINA P2P (p2p.html)**

### **🔧 Botones de Navegación**

| Botón | ID | Función |
|-------|----|---------|
| **Selector de Idioma** | `languageSelector` | Cambiar idioma |
| **Toggle de Tema** | `themeToggle` | Cambiar tema |
| **Menú Móvil** | `navbarToggle` | Abrir menú móvil |

### **🔄 Controles de Vista**

| Botón | ID | Función |
|-------|----|---------|
| **Refresh** | `refreshBtn` | Actualizar datos |
| **Trades** | `control-btn` | Ver trades |
| **Volumen** | `control-btn` | Ver volumen |
| **Usuarios** | `control-btn` | Ver usuarios |

### **⏰ Filtros de Tiempo**

| Botón | Clase | Período |
|-------|-------|---------|
| **24H** | `time-btn` | Últimas 24 horas |
| **7D** | `time-btn` | Últimos 7 días |
| **30D** | `time-btn` | Últimos 30 días |

### **🔍 Filtros**

| Botón | ID | Función |
|-------|----|---------|
| **Limpiar** | `clearFilters` | Limpiar filtros |
| **Aplicar** | `applyFilters` | Aplicar filtros |

### **📊 Tipo de Anuncio**

| Botón | Clase | Tipo |
|-------|-------|------|
| **Comprar** | `type-btn` | Anuncio de compra |
| **Vender** | `type-btn` | Anuncio de venta |

### **📝 Creación de Anuncios**

| Botón | ID | Función |
|-------|----|---------|
| **Vista Previa** | `previewBtn` | Vista previa del anuncio |
| **Crear Anuncio** | `createBtn` | Crear anuncio |
| **Crear Anuncio** | `createAdBtn` | Botón flotante para crear |

### **💬 Chat**

| Botón | ID | Función |
|-------|----|---------|
| **Enviar Mensaje** | `sendMessageBtn` | Enviar mensaje en chat |

### **❌ Modales**

| Botón | ID | Función |
|-------|----|---------|
| **Cerrar Modal Chat** | `chatModalClose` | Cerrar modal de chat |
| **Cerrar Modal Trade** | `tradeModalClose` | Cerrar modal de trade |

---

## 🏦 **PÁGINA BANK (bank.html)**

### **🔧 Botones de Navegación**

| Botón | ID | Función |
|-------|----|---------|
| **Selector de Idioma** | `languageSelector` | Cambiar idioma |
| **Toggle de Tema** | `themeToggle` | Cambiar tema |
| **Menú Móvil** | `navbarToggle` | Abrir menú móvil |

### **📱 Escáner QR**

| Botón | ID | Función |
|-------|----|---------|
| **Iniciar Escáner** | `startScanner` | Iniciar escáner de QR |
| **Detener** | `stopScanner` | Detener escáner |
| **Subir QR** | `uploadQR` | Subir imagen QR |

### **💳 Procesamiento de Pagos**

| Botón | ID | Función |
|-------|----|---------|
| **Confirmar Pago** | `confirmPayment` | Confirmar pago (habilitado/deshabilitado) |
| **Cancelar** | `cancelPayment` | Cancelar pago |

### **💱 Conversión de Divisas**

| Botón | ID | Función |
|-------|----|---------|
| **Swap Divisas** | `swapCurrencies` | Intercambiar divisas |
| **Ejecutar Conversión** | `executeConversion` | Ejecutar conversión |
| **Guardar para Después** | `saveConversion` | Guardar conversión |

### **📱 Pagos Sin Contacto**

| Botón | ID | Función |
|-------|----|---------|
| **Iniciar Pago** | `startContactless` | Iniciar pago sin contacto |
| **Detener** | `stopContactless` | Detener pago sin contacto |

### **💳 Métodos de Pago**

| Botón | Clase | Función |
|-------|-------|---------|
| **Editar** | `btn-secondary` | Editar método de pago |
| **Eliminar** | `btn-danger` | Eliminar método de pago |
| **Agregar Método** | `addPaymentMethod` | Agregar nuevo método |

### **⚙️ Configuración**

| Botón | ID | Función |
|-------|----|---------|
| **Restablecer** | `resetConfig` | Restablecer configuración |
| **Guardar Cambios** | `saveConfig` | Guardar cambios de configuración |

### **❌ Modales**

| Botón | ID | Función |
|-------|----|---------|
| **Cerrar Modal Pago** | `paymentModalClose` | Cerrar modal de pago |
| **Cancelar Pago** | `cancelPaymentModal` | Cancelar pago en modal |
| **Confirmar Pago** | `confirmPaymentModal` | Confirmar pago en modal |

---

## 🔍 **PÁGINA EXPLORER (explorer.html)**

### **🔧 Botones de Navegación**

| Botón | ID | Función |
|-------|----|---------|
| **Selector de Idioma** | `languageSelector` | Cambiar idioma |
| **Toggle de Tema** | `themeToggle` | Cambiar tema |
| **Menú Móvil** | `navbarToggle` | Abrir menú móvil |

### **🔍 Búsqueda**

| Botón | ID | Función |
|-------|----|---------|
| **Buscar** | `searchBtn` | Realizar búsqueda |

### **🔄 Controles de Vista**

| Botón | ID | Función |
|-------|----|---------|
| **Refresh** | `refreshBtn` | Actualizar datos |
| **Red** | `control-btn` | Ver vista de red |
| **Bloques** | `control-btn` | Ver vista de bloques |
| **TXs** | `control-btn` | Ver vista de transacciones |

### **⏰ Filtros de Tiempo**

| Botón | Clase | Período |
|-------|-------|---------|
| **24H** | `time-btn` | Últimas 24 horas |
| **7D** | `time-btn` | Últimos 7 días |
| **30D** | `time-btn` | Últimos 30 días |

### **🔄 Auto-Refresh**

| Botón | ID | Función |
|-------|----|---------|
| **Auto Refresh** | `autoRefreshBtn` | Activar/desactivar auto-refresh |

### **📄 Paginación**

| Botón | Clase | Función |
|-------|-------|---------|
| **Anterior** | `pagination-btn` | Página anterior |
| **Siguiente** | `pagination-btn` | Página siguiente |

### **❌ Modales**

| Botón | ID | Función |
|-------|----|---------|
| **Cerrar Modal** | `modalClose` | Cerrar modal |

---

## 📚 **PÁGINA DOCS (docs.html)**

### **🔧 Botones de Navegación**

| Botón | ID | Función |
|-------|----|---------|
| **Selector de Idioma** | `languageSelector` | Cambiar idioma |
| **Toggle de Tema** | `themeToggle` | Cambiar tema |
| **Menú Móvil** | `navbarToggle` | Abrir menú móvil |

### **📄 Acciones de Documentación**

| Botón | ID | Función |
|-------|----|---------|
| **Imprimir** | `printDocs` | Imprimir documentación |
| **Exportar PDF** | `exportDocs` | Exportar a PDF |
| **Compartir** | `shareDocs` | Compartir documentación |

### **📖 Whitepaper**

| Botón | ID | Función |
|-------|----|---------|
| **Descargar Whitepaper** | `downloadWhitepaper` | Descargar whitepaper |
| **Ver Online** | `viewOnline` | Ver whitepaper online |

### **🔧 API Tester**

| Botón | ID | Función |
|-------|----|---------|
| **Probar API** | `testAPI` | Probar endpoint de API |
| **Descargar SDK** | `downloadSDK` | Descargar SDK |

### **📋 Tabs del Tester**

| Botón | Clase | Función |
|-------|-------|---------|
| **Parámetros** | `tab-btn` | Ver parámetros |
| **Headers** | `tab-btn` | Ver headers |
| **Body** | `tab-btn` | Ver body |

### **📤 Requests**

| Botón | ID | Función |
|-------|----|---------|
| **Enviar Request** | `sendRequest` | Enviar request HTTP |
| **Copiar cURL** | `copyCurl` | Copiar comando cURL |

### **🧪 Probar Endpoints**

| Botón | Clase | Endpoint |
|-------|-------|----------|
| **Probar** | `try-endpoint` | wallet/balance |
| **Probar** | `try-endpoint` | wallet/create |
| **Probar** | `try-endpoint` | mining/start |
| **Probar** | `try-endpoint` | mining/status |

### **📋 Copiar Código**

| Botón | Clase | Función |
|-------|-------|---------|
| **Copiar** | `copy-btn` | Copiar código al portapapeles |

### **🎮 Demo Interactivo**

| Botón | ID | Función |
|-------|----|---------|
| **Crear Wallet Demo** | `createWalletDemo` | Crear wallet en demo |

### **🧭 Navegación**

| Botón | ID | Función |
|-------|----|---------|
| **Página Anterior** | `prevPage` | Navegar página anterior |
| **Página Siguiente** | `nextPage` | Navegar página siguiente |
| **Volver Arriba** | `backToTop` | Volver al inicio de la página |

### **📑 Table of Contents**

| Botón | ID | Función |
|-------|----|---------|
| **Toggle TOC** | `tocToggle` | Mostrar/ocultar tabla de contenidos |

---

## ℹ️ **PÁGINA ABOUT (about.html)**

### **🔧 Botones de Navegación**

| Botón | ID | Función |
|-------|----|---------|
| **Selector de Idioma** | `languageSelector` | Cambiar idioma |
| **Toggle de Tema** | `themeToggle` | Cambiar tema |
| **Menú Móvil** | `navbarToggle` | Abrir menú móvil |

### **📄 Acciones de Página**

| Botón | ID | Función |
|-------|----|---------|
| **Press Kit** | `downloadPressKit` | Descargar press kit |
| **Compartir** | `shareAbout` | Compartir página |
| **Imprimir** | `printAbout` | Imprimir página |

### **📖 Story**

| Botón | ID | Función |
|-------|----|---------|
| **Descargar Story** | `downloadStory` | Descargar historia |
| **Compartir Story** | `shareStory` | Compartir historia |

### **📅 Timeline**

| Botón | Clase | Año |
|-------|-------|-----|
| **2023** | `timeline-btn` | Ver eventos 2023 |
| **2024** | `timeline-btn` | Ver eventos 2024 |
| **2025** | `timeline-btn` | Ver eventos 2025 |

### **📧 Formulario de Contacto**

| Botón | Tipo | Función |
|-------|------|---------|
| **Enviar Mensaje** | `submit` | Enviar formulario |
| **Limpiar** | `reset` | Limpiar formulario |

---

## ❓ **PÁGINA FAQ (faq.html)**

### **🔧 Botones de Navegación**

| Botón | ID | Función |
|-------|----|---------|
| **Selector de Idioma** | `languageSelector` | Cambiar idioma |
| **Toggle de Tema** | `themeToggle` | Cambiar tema |
| **Menú Móvil** | `navbarToggle` | Abrir menú móvil |

### **❓ Preguntas FAQ**

| Botón | Clase | Función |
|-------|-------|---------|
| **Pregunta 1** | `faq-question` | Expandir/contraer respuesta |
| **Pregunta 2** | `faq-question` | Expandir/contraer respuesta |
| **Pregunta 3** | `faq-question` | Expandir/contraer respuesta |

---

## 🎨 **CLASIFICACIÓN POR TIPOS DE BOTONES**

### **🔴 Botones Primarios (btn-primary, btn-epic-primary)**
- Acciones principales y críticas
- Envío de transacciones
- Confirmaciones importantes
- Navegación principal

### **🔵 Botones Secundarios (btn-secondary, btn-epic-secondary)**
- Acciones complementarias
- Cancelaciones
- Navegación secundaria
- Configuraciones

### **🟡 Botones Terciarios (btn-tertiary, btn-epic-tertiary)**
- Acciones informativas
- Vistas adicionales
- Enlaces externos

### **⚪ Botones Pequeños (btn-epic-small)**
- Acciones rápidas
- Copiar/pegar
- Controles auxiliares

### **🔄 Botones de Control (control-btn)**
- Cambio de vistas
- Filtros
- Navegación entre secciones

### **⏰ Botones de Tiempo (time-btn)**
- Filtros temporales
- Períodos de tiempo

### **❌ Botones de Cierre (modal-close)**
- Cerrar modales
- Cerrar ventanas emergentes

---

## 📊 **ESTADÍSTICAS DE BOTONES**

### **📈 Distribución por Página:**
- **index.html**: 25+ botones
- **wallet.html**: 35+ botones
- **mine.html**: 15+ botones
- **staking.html**: 12+ botones
- **p2p.html**: 18+ botones
- **bank.html**: 20+ botones
- **explorer.html**: 12+ botones
- **docs.html**: 25+ botones
- **about.html**: 12+ botones
- **faq.html**: 6+ botones

### **🎯 Total Estimado: 180+ Botones**

### **🔧 Funcionalidades Principales:**
- **Navegación**: 40+ botones
- **Transacciones**: 30+ botones
- **Mining/Staking**: 25+ botones
- **P2P Trading**: 20+ botones
- **Banking**: 20+ botones
- **Explorer**: 15+ botones
- **Documentación**: 25+ botones
- **Configuración**: 15+ botones

---

## 🚀 **MEJORAS SUGERIDAS**

### **🎯 Optimizaciones de UX:**
1. **Consistencia visual** en todos los botones
2. **Estados de carga** para acciones asíncronas
3. **Feedback visual** inmediato en todas las acciones
4. **Atajos de teclado** para acciones frecuentes

### **📱 Responsive Design:**
1. **Botones adaptativos** para móviles
2. **Touch targets** optimizados
3. **Gestos táctiles** para acciones rápidas

### **♿ Accesibilidad:**
1. **ARIA labels** en todos los botones
2. **Navegación por teclado** completa
3. **Contraste mejorado** para legibilidad

---

**📋 Este catálogo completo documenta todos los botones de la plataforma RSC Chain, facilitando el mantenimiento, desarrollo y mejora continua de la experiencia de usuario.** 