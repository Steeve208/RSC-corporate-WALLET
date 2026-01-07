# 🚀 Instrucciones para Probar el Sale Frontend

## ✅ Servidor de Desarrollo Iniciado

El servidor de desarrollo está corriendo. Deberías ver una URL en la consola, típicamente:

**http://localhost:5173**

## 📋 Pasos para Probar

### 1. Abrir en el Navegador

Abre tu navegador y ve a: **http://localhost:5173**

### 2. Conectar MetaMask

1. Asegúrate de tener **MetaMask instalado** en tu navegador
2. Haz clic en **"Conectar Wallet"**
3. Acepta la conexión en MetaMask
4. Si no estás en BSC Mainnet, MetaMask te pedirá cambiar de red automáticamente

### 3. Verificar la Información del Sale

- Deberías ver:
  - Estado del sale (Activo, Próximamente, Finalizado)
  - Precio: 0.009 USDT por wRSK
  - Total vendido y disponible
  - Fechas de inicio y fin
  - Contador regresivo (si aplica)

### 4. Probar la Compra (Solo si el sale está activo)

1. Asegúrate de tener **USDT en BSC Mainnet** en tu wallet
2. Ingresa la cantidad de USDT que deseas pagar
3. Verás automáticamente cuántos wRSK recibirás
4. Haz clic en **"Comprar wRSK"**
5. Aprobar el gasto de USDT (si es la primera vez)
6. Confirmar la transacción

### 5. Probar la Reclamación (Si ya compraste)

1. Si ya compraste tokens, verás la sección **"Mis Tokens"**
2. Verás cuántos tokens puedes reclamar
3. Haz clic en **"Reclamar"** para obtener los tokens disponibles del vesting

## 🔍 Verificar Funcionalidades

### ✅ Conexión de Wallet
- [ ] Conectar MetaMask
- [ ] Ver dirección conectada
- [ ] Desconectar wallet

### ✅ Información del Sale
- [ ] Ver estado del sale
- [ ] Ver precio y estadísticas
- [ ] Ver fechas de inicio y fin
- [ ] Ver contador regresivo (si aplica)

### ✅ Compra de Tokens
- [ ] Ingresar cantidad de USDT
- [ ] Ver cálculo de wRSK a recibir
- [ ] Ver desglose de vesting (25% inmediato, 75% en vesting)
- [ ] Aprobar USDT (si es necesario)
- [ ] Completar compra

### ✅ Reclamación de Tokens
- [ ] Ver tokens comprados
- [ ] Ver tokens disponibles para reclamar
- [ ] Reclamar tokens del vesting

## ⚠️ Notas Importantes

1. **Red Correcta**: Debes estar en **BSC Mainnet** (Chain ID: 56)
2. **USDT Necesario**: Necesitas USDT en BSC Mainnet para comprar
3. **Gas Fees**: Cada transacción requiere BNB para gas
4. **Vesting**: El 25% se recibe inmediatamente, el 75% queda en vesting

## 🐛 Solución de Problemas

### Error: "MetaMask no está instalado"
- Instala MetaMask desde: https://metamask.io/

### Error: "Red incorrecta"
- La app debería pedirte cambiar automáticamente
- Si no, cambia manualmente a BSC Mainnet en MetaMask

### Error: "No hay suficiente USDT"
- Asegúrate de tener USDT en BSC Mainnet
- Puedes obtener USDT en exchanges como Binance

### Los tokens no aparecen
- El 25% se transfiere inmediatamente después de comprar
- El 75% queda en vesting y se puede reclamar gradualmente

## 📱 Probar en Móvil

Si quieres probar en móvil:

1. Encuentra tu IP local (ej: `ipconfig` en Windows)
2. Accede desde el móvil a: `http://TU_IP:5173`
3. Asegúrate de que el móvil esté en la misma red WiFi

## 🛑 Detener el Servidor

Para detener el servidor de desarrollo:
- Presiona `Ctrl + C` en la terminal donde está corriendo

---

**¡Listo para probar!** 🎉

Abre http://localhost:5173 en tu navegador y comienza a probar.

