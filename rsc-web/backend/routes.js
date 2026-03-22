const express = require('express');
const axios = require('axios');
const router = express.Router();

const BLOCKCHAIN_API = 'https://rsc-chain-production.up.railway.app/';

// Importar rutas de minería mainnet-ready
const miningMainnetRoutes = require('./routes-mining-mainnet');

// --- SESIONES DE MINERÍA EN MEMORIA ---
const miningSessions = {};

// --- DATOS REALES DE LA BLOCKCHAIN ---
// Los datos mock han sido removidos para producción
// La aplicación ahora depende completamente de la conexión real a RSC Chain

// Wallet - Usando endpoints reales de RSC Chain
router.post('/wallet/create', async (req, res) => {
  try {
    console.log('🔄 Intentando crear wallet en RSC Chain...');
    
    // Usar el endpoint real de RSC Chain para crear wallet
    const response = await axios.post(`${BLOCKCHAIN_API}/wallet/create`, {}, {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Respuesta de RSC Chain:', response.data);
    const walletData = {
      ...response.data,
      blockchainCreated: true,
      endpoint: '/wallet/create'
    };
    
    res.json(walletData);
    
  } catch (err) {
    console.error('❌ Error creando wallet en RSC Chain:', err.message);
    
    // Si la blockchain no está disponible, crear wallet localmente como fallback
    console.log('🔄 Creando wallet local como fallback...');
    
    // Generar wallet local
    const crypto = require('crypto');
    const privateKey = '0x' + crypto.randomBytes(32).toString('hex');
    const address = '0x' + crypto.randomBytes(20).toString('hex');
    
    const walletData = {
      privateKey,
      address,
      message: 'Wallet creada localmente (RSC Chain no disponible)',
      blockchainCreated: false,
      fallback: true,
      note: 'RSC Chain no está disponible actualmente'
    };
    
    console.log('✅ Wallet local creada:', { address, privateKey: privateKey.substring(0, 10) + '...' });
    res.json(walletData);
  }
});

// Obtener balance real - usando endpoint real de RSC Chain
router.post('/wallet/balance', async (req, res) => {
  const { address } = req.body;
  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Dirección inválida' });
  }
  try {
    // Usar el endpoint real de RSC Chain para obtener balance
    const response = await axios.get(`${BLOCKCHAIN_API}/wallet/${address}`);
    
    res.json({ 
      balance: response.data.balance || 0,
      staking_balance: response.data.staking_balance || 0,
      pending_rewards: response.data.pending_rewards || 0
    });
  } catch (err) {
    res.status(500).json({ error: 'Error consultando balance', details: err.message });
  }
});

// Obtener historial de transacciones real - usando endpoint real de RSC Chain
router.post('/wallet/transactions', async (req, res) => {
  const { address } = req.body;
  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Dirección inválida' });
  }
  try {
    // Usar el endpoint real de RSC Chain para obtener transacciones
    const response = await axios.get(`${BLOCKCHAIN_API}/wallet/${address}/transactions`);
    
    res.json({ transactions: response.data.transactions || [] });
  } catch (err) {
    res.status(500).json({ error: 'Error consultando transacciones', details: err.message });
  }
});

// Enviar transacción - usando endpoint real de RSC Chain
router.post('/wallet/send', async (req, res) => {
  const { from, to, amount, privateKey } = req.body;
  if (!from || !to || !amount || !privateKey) {
    return res.status(400).json({ error: 'Parámetros inválidos' });
  }
  try {
    // Usar el endpoint real de RSC Chain para enviar transacción
    const response = await axios.post(`${BLOCKCHAIN_API}/tx/send`, { 
      from, 
      to, 
      amount, 
      fee: 50, // Fee por defecto
      private_key: privateKey 
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Error enviando transacción', details: err.message });
  }
});

// ===== MINERÍA SIMULADA - RSC CHAIN =====
const SimulatedMiningManager = require('./mining/miningManager');

// Inicializar gestor de minería simulada
let miningManager = null;

// Inicializar minería simulada
async function initMiningManager() {
  try {
    miningManager = new SimulatedMiningManager();
    await miningManager.init();
    console.log('✅ Gestor de minería simulada inicializado en routes.js');
  } catch (error) {
    console.error('❌ Error inicializando gestor de minería en routes.js:', error);
  }
}

// Inicializar al cargar el módulo
initMiningManager();

// ===== RUTAS DE MINERÍA SIMULADA =====

// Iniciar minería
router.post('/api/mining/start', async (req, res) => {
    try {
        const { walletAddress, hashPower, userId, sessionDuration, sessionId } = req.body;
        
        console.log('🚀 Iniciando minería simulada:', { walletAddress, hashPower, userId, sessionId });
        
        // Crear o actualizar usuario si no existe
        let user = await miningManager.db.getUserByWallet(walletAddress);
        if (!user) {
            user = await miningManager.db.createUser({
                username: `user_${Date.now()}`,
                email: `${walletAddress}@rsc.local`,
                walletAddress: walletAddress,
                createdAt: new Date().toISOString()
            });
        }
        
        // Crear sesión de minería
        const miningSession = {
            id: sessionId,
            userId: user.id,
            walletAddress: walletAddress,
            hashPower: hashPower,
            startTime: new Date().toISOString(),
            endTime: new Date(Date.now() + sessionDuration).toISOString(),
            isActive: true,
            totalTokens: 0,
            lastUpdate: new Date().toISOString(),
            createdAt: new Date().toISOString()
        };
        
        // Guardar en base de datos
        await miningManager.db.createMiningSession(miningSession);
        
        // Actualizar estadísticas del sistema
        await miningManager.db.updateSystemStats({
            activeMiners: 1,
            totalHashPower: hashPower,
            lastUpdate: new Date().toISOString()
        });
        
        console.log('✅ Minería iniciada exitosamente:', miningSession.id);
        
        res.json({
            success: true,
            message: 'Minería iniciada',
            sessionId: sessionId,
            user: {
                id: user.id,
                username: user.username,
                walletAddress: user.walletAddress
            }
        });
        
    } catch (error) {
        console.error('❌ Error iniciando minería:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Detener minería
router.post('/api/mining/stop', async (req, res) => {
    try {
        const { sessionId } = req.body;
        
        console.log('⏹️ Deteniendo minería:', sessionId);
        
        if (sessionId) {
            // Actualizar sesión en base de datos
            await miningManager.db.updateMiningSession(sessionId, {
                isActive: false,
                endTime: new Date().toISOString(),
                lastUpdate: new Date().toISOString()
            });
            
            // Actualizar estadísticas del sistema
            await miningManager.db.updateSystemStats({
                activeMiners: -1,
                lastUpdate: new Date().toISOString()
            });
        }
        
        console.log('✅ Minería detenida exitosamente');
        
        res.json({
            success: true,
            message: 'Minería detenida'
        });
        
    } catch (error) {
        console.error('❌ Error deteniendo minería:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Obtener estado de minería
router.get('/api/mining/status/:walletAddress', async (req, res) => {
    try {
        const { walletAddress } = req.params;
        
        console.log('🔍 Verificando estado de minería para:', walletAddress);
        
        // Obtener sesión activa
        const activeSession = await miningManager.db.getActiveMiningSession(walletAddress);
        
        if (activeSession) {
            // Calcular tokens actuales basado en tiempo transcurrido
            const now = new Date();
            const startTime = new Date(activeSession.startTime);
            const elapsed = (now - startTime) / 1000; // segundos
            
            // Calcular tokens basado en tiempo transcurrido y hash power
            const baseRate = 0.001; // tokens por segundo base
            const hashMultiplier = activeSession.hashPower / 5; // multiplicador por intensidad
            const timeMultiplier = Math.min(elapsed / 3600, 24); // máximo 24 horas
            
            const currentTokens = baseRate * hashMultiplier * timeMultiplier;
            
            // Actualizar tokens en la base de datos
            await miningManager.db.updateMiningSession(activeSession.id, {
                totalTokens: currentTokens,
                lastUpdate: now.toISOString()
            });
            
            res.json({
                success: true,
                isMining: true,
                session: {
                    ...activeSession,
                    totalTokens: currentTokens,
                    elapsed: elapsed,
                    timeRemaining: Math.max(0, new Date(activeSession.endTime) - now)
                }
            });
        } else {
            res.json({
                success: true,
                isMining: false,
                session: null
            });
        }
        
    } catch (error) {
        console.error('❌ Error obteniendo estado de minería:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Actualizar progreso de minería
router.post('/api/mining/update-progress', async (req, res) => {
    try {
        const { sessionId, totalTokens, elapsed } = req.body;
        
        console.log('📊 Actualizando progreso de minería:', { sessionId, totalTokens, elapsed });
        
        if (sessionId) {
            // Actualizar sesión en base de datos
            await miningManager.db.updateMiningSession(sessionId, {
                totalTokens: totalTokens,
                lastUpdate: new Date().toISOString()
            });
            
            // Actualizar estadísticas del sistema
            await miningManager.db.updateSystemStats({
                totalTokensMined: totalTokens,
                lastUpdate: new Date().toISOString()
            });
        }
        
        res.json({
            success: true,
            message: 'Progreso actualizado'
        });
        
    } catch (error) {
        console.error('❌ Error actualizando progreso:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Reclamar tokens
router.post('/api/mining/claim', async (req, res) => {
    try {
        const { sessionId, tokens, userId } = req.body;
        
        console.log('💰 Reclamando tokens:', { sessionId, tokens, userId });
        
        if (sessionId) {
            // Marcar sesión como completada y tokens reclamados
            await miningManager.db.updateMiningSession(sessionId, {
                isActive: false,
                endTime: new Date().toISOString(),
                tokensClaimed: tokens,
                claimedAt: new Date().toISOString(),
                lastUpdate: new Date().toISOString()
            });
            
            // Crear registro de reclamación
            await miningManager.db.createMiningHistory({
                sessionId: sessionId,
                userId: userId,
                tokensMined: tokens,
                claimedAt: new Date().toISOString(),
                status: 'claimed'
            });
            
            // Actualizar estadísticas del sistema
            await miningManager.db.updateSystemStats({
                totalTokensClaimed: tokens,
                lastUpdate: new Date().toISOString()
            });
        }
        
        res.json({
            success: true,
            message: 'Tokens reclamados exitosamente',
            tokensClaimed: tokens
        });
        
    } catch (error) {
        console.error('❌ Error reclamando tokens:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Obtener estadísticas del sistema
router.get('/api/mining/system-stats', async (req, res) => {
    try {
        console.log('📊 Obteniendo estadísticas del sistema');
        
        const stats = await miningManager.db.getSystemStats();
        
        res.json({
            success: true,
            stats: stats
        });
        
    } catch (error) {
        console.error('❌ Error obteniendo estadísticas:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Obtener historial de minería
router.get('/api/mining/history/:walletAddress', async (req, res) => {
    try {
        const { walletAddress } = req.params;
        
        console.log('📜 Obteniendo historial de minería para:', walletAddress);
        
        const history = await miningManager.db.getMiningHistory(walletAddress);
        
        res.json({
            success: true,
            history: history
        });
        
    } catch (error) {
        console.error('❌ Error obteniendo historial:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Staking - APIs con datos mock para desarrollo
router.get('/staking/pools', async (req, res) => {
  try {
    res.status(501).json({ 
      error: 'Staking no implementado en la blockchain actual',
      message: 'Esta funcionalidad estará disponible próximamente'
    });
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo pools de staking', details: err.message });
  }
});

router.get('/staking/validators', async (req, res) => {
  try {
    res.status(501).json({ 
      error: 'Staking no implementado en la blockchain actual',
      message: 'Esta funcionalidad estará disponible próximamente'
    });
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo validadores', details: err.message });
  }
});

router.post('/staking/delegate', async (req, res) => {
  const { address, amount, validator } = req.body;
  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address) || !amount || isNaN(amount) || !validator) {
    return res.status(400).json({ error: 'Parámetros inválidos' });
  }
  try {
    res.status(501).json({ 
      error: 'Staking no implementado en la blockchain actual',
      message: 'Esta funcionalidad estará disponible próximamente',
      address, amount, validator
    });
  } catch (err) {
    res.status(500).json({ error: 'Error delegando tokens', details: err.message });
  }
});

router.post('/staking/undelegate', async (req, res) => {
  const { address, amount, validator } = req.body;
  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address) || !amount || isNaN(amount) || !validator) {
    return res.status(400).json({ error: 'Parámetros inválidos' });
  }
  try {
    res.status(501).json({ 
      error: 'Staking no implementado en la blockchain actual',
      message: 'Esta funcionalidad estará disponible próximamente',
      address, amount, validator
    });
  } catch (err) {
    res.status(500).json({ error: 'Error retirando delegación', details: err.message });
  }
});

router.post('/staking/delegations', async (req, res) => {
  const { address } = req.body;
  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Dirección inválida' });
  }
  try {
    res.status(501).json({ 
      error: 'Staking no implementado en la blockchain actual',
      message: 'Esta funcionalidad estará disponible próximamente',
      address,
      delegations: []
    });
  } catch (err) {
    res.status(500).json({ error: 'Error consultando delegaciones', details: err.message });
  }
});

// P2P Trading - APIs con datos mock para desarrollo
router.get('/p2p/orders', async (req, res) => {
  try {
    res.status(501).json({ 
      error: 'P2P no implementado en la blockchain actual',
      message: 'Esta funcionalidad estará disponible próximamente'
    });
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo órdenes P2P', details: err.message });
  }
});

router.post('/p2p/orders', async (req, res) => {
  const { type, price, amount, paymentMethods, description } = req.body;
  if (!type || !price || !amount || !paymentMethods) {
    return res.status(400).json({ error: 'Parámetros inválidos' });
  }
  try {
    const newOrder = {
      id: 'order_' + Date.now(),
      type,
      price: parseFloat(price),
      amount: parseFloat(amount),
      paymentMethods,
      description,
      user: 'User_' + Math.random().toString(36).substr(2, 6),
      rating: 4.5,
      createdAt: new Date().toISOString()
    };
    
    mockData.p2pOrders.unshift(newOrder);
    
    res.json({ 
      success: true, 
      order: newOrder,
      message: 'Orden creada (datos de desarrollo)'
    });
  } catch (err) {
    res.status(500).json({ error: 'Error creando orden P2P', details: err.message });
  }
});

// Blockchain Explorer - APIs con datos mock para desarrollo
router.get('/blockchain/stats', async (req, res) => {
  try {
    // Intentar obtener estadísticas reales de la blockchain
    const response = await axios.get(`${BLOCKCHAIN_API}/stats`);
    res.json({ 
      success: true, 
      stats: response.data.stats || mockData.networkStats,
      message: 'Datos obtenidos de RSC Chain'
    });
  } catch (err) {
    // Si no hay datos reales, devolver valores en 0
    res.json({ 
      success: true, 
      stats: mockData.networkStats,
      message: 'No hay estadísticas disponibles en este momento'
    });
  }
});

router.get('/blockchain/blocks', async (req, res) => {
  try {
    // Intentar obtener bloques reales de la blockchain
    const response = await axios.get(`${BLOCKCHAIN_API}/blocks`);
    res.json({ 
      success: true, 
      blocks: response.data.blocks || [],
      message: 'Datos obtenidos de RSC Chain'
    });
  } catch (err) {
    // Si no hay datos reales, devolver array vacío
    res.json({ 
      success: true, 
      blocks: [],
      message: 'No hay bloques disponibles en este momento'
    });
  }
});

router.get('/blockchain/transactions', async (req, res) => {
  try {
    // Intentar obtener transacciones reales de la blockchain
    const response = await axios.get(`${BLOCKCHAIN_API}/transactions`);
    res.json({ 
      success: true, 
      transactions: response.data.transactions || [],
      message: 'Datos obtenidos de RSC Chain'
    });
  } catch (err) {
    // Si no hay datos reales, devolver array vacío
    res.json({ 
      success: true, 
      transactions: [],
      message: 'No hay transacciones disponibles en este momento'
    });
  }
});

// Banking - APIs con datos mock para desarrollo
router.get('/bank/balance', async (req, res) => {
  const { address } = req.query;
  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Dirección inválida' });
  }
  try {
    // Intentar obtener balance real de la blockchain
    const response = await axios.get(`${BLOCKCHAIN_API}/wallet/${address}`);
    res.json({ 
      success: true, 
      balance: response.data.balance || 0,
      currency: 'USD',
      message: 'Balance obtenido de RSC Chain'
    });
  } catch (err) {
    res.json({ 
      success: true, 
      balance: 0,
      currency: 'USD',
      message: 'Balance no disponible'
    });
  }
});

router.get('/bank/transactions', async (req, res) => {
  const { address } = req.query;
  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Dirección inválida' });
  }
  try {
    // Intentar obtener transacciones reales de la blockchain
    const response = await axios.get(`${BLOCKCHAIN_API}/wallet/${address}/transactions`);
    res.json({ 
      success: true, 
      transactions: response.data.transactions || [],
      message: 'Transacciones obtenidas de RSC Chain'
    });
  } catch (err) {
    res.json({ 
      success: true, 
      transactions: [],
      message: 'No hay transacciones disponibles'
    });
  }
});

// Endpoint de autenticación
router.post('/api/auth/authenticate', async (req, res) => {
    try {
        const { walletAddress, walletType, timestamp } = req.body;
        
        if (!walletAddress) {
            return res.status(400).json({
                success: false,
                error: 'Dirección de wallet requerida'
            });
        }

        console.log('🔐 Autenticando usuario:', walletAddress);

        // Buscar usuario existente
        let user = await miningManager.db.getUserByWallet(walletAddress);
        
        if (!user) {
            // Crear nuevo usuario
            const userId = await miningManager.db.createUser({
                walletAddress: walletAddress,
                walletType: walletType || 'unknown',
                email: null,
                username: `User_${walletAddress.substr(-6)}`,
                registrationDate: new Date().toISOString(),
                totalSimulatedTokens: 0,
                lastMiningActivity: null,
                isMigrated: false,
                status: 'active'
            });
            
            user = await miningManager.db.getUserById(userId);
            console.log('👤 Nuevo usuario creado:', user);
        } else {
            // Actualizar última actividad
            await miningManager.db.updateLastMiningActivity(walletAddress);
            console.log('✅ Usuario existente autenticado:', user);
        }

        res.json({
            success: true,
            user: user,
            message: 'Usuario autenticado exitosamente'
        });

    } catch (error) {
        console.error('❌ Error de autenticación:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
});

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    blockchain_api: BLOCKCHAIN_API
  });
});

// ========================================
// INTEGRAR RUTAS DE MINERÍA MAINNET-READY
// ========================================

// Usar las rutas de minería mainnet-ready
router.use('/', miningMainnetRoutes);

module.exports = router; 