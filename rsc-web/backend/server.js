/**
 * RSC MINING BACKEND SERVER
 * 
 * Servidor principal para el sistema de minería con referidos
 * - API REST completa
 * - Integración con Supabase
 * - Sistema de referidos con comisiones
 * - Gestión de usuarios y minería
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import routes from './api/routes.js';
import { validateConfig } from './supabase-config.js';

// Cargar variables de entorno
dotenv.config();

// Obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE DE SEGURIDAD =====

// Helmet para headers de seguridad
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://*.supabase.co"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },
}));

// CORS configurado para desarrollo y producción
const corsOptions = {
    origin: function (origin, callback) {
        // Permitir requests sin origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:8080',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:8080',
            'https://your-domain.com', // Reemplazar con tu dominio
            'https://www.your-domain.com'
        ];
        
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-User-ID']
};

app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requests por IP por ventana
    message: {
        success: false,
        error: 'Demasiadas requests, intenta de nuevo más tarde'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/', limiter);

// Rate limiting específico para minería
const miningLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 60, // máximo 60 requests por minuto para minería
    message: {
        success: false,
        error: 'Demasiadas actualizaciones de minería'
    }
});

app.use('/api/mining/', miningLimiter);

// ===== MIDDLEWARE DE PARSING =====

// Parsear JSON
app.use(express.json({ limit: '10mb' }));

// Parsear URL encoded
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ===== MIDDLEWARE DE LOGGING =====

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path} - IP: ${req.ip}`);
    next();
});

// ===== RUTAS =====

// Health check
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'RSC Mining Backend está funcionando',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// API routes
app.use('/api', routes);

// Servir archivos estáticos
app.use(express.static(join(__dirname, '../')));

// ===== MIDDLEWARE DE MANEJO DE ERRORES =====

// Error handler para CORS
app.use((error, req, res, next) => {
    if (error.message === 'No permitido por CORS') {
        res.status(403).json({
            success: false,
            error: 'Origen no permitido por CORS'
        });
    } else {
        next(error);
    }
});

// Error handler global
app.use((error, req, res, next) => {
    console.error('❌ Error no manejado:', error);
    
    res.status(error.status || 500).json({
        success: false,
        error: process.env.NODE_ENV === 'production' 
            ? 'Error interno del servidor' 
            : error.message
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint no encontrado'
    });
});

// ===== INICIALIZACIÓN DEL SERVIDOR =====

async function startServer() {
    try {
        // Validar configuración
        validateConfig();
        console.log('✅ Configuración validada');

        // Iniciar servidor
        app.listen(PORT, () => {
            console.log('🚀 RSC Mining Backend iniciado');
            console.log(`📡 Servidor corriendo en puerto ${PORT}`);
            console.log(`🌐 Health check: http://localhost:${PORT}/health`);
            console.log(`📊 API Base: http://localhost:${PORT}/api`);
            console.log('🔗 Endpoints disponibles:');
            console.log('   POST /api/users/register - Registrar usuario');
            console.log('   GET  /api/users/profile - Obtener perfil');
            console.log('   GET  /api/users/balance - Obtener balance');
            console.log('   GET  /api/users/referrals - Obtener referidos');
            console.log('   POST /api/mining/start - Iniciar minería');
            console.log('   PUT  /api/mining/update - Actualizar minería');
            console.log('   POST /api/mining/end - Finalizar minería');
            console.log('   GET  /api/ranking - Ranking de usuarios');
            console.log('   GET  /api/stats - Estadísticas generales');
        });

    } catch (error) {
        console.error('❌ Error iniciando servidor:', error);
        process.exit(1);
    }
}

// ===== MANEJO DE SEÑALES =====

process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM recibido, cerrando servidor...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 SIGINT recibido, cerrando servidor...');
    process.exit(0);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Excepción no capturada:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Promesa rechazada no manejada:', reason);
    process.exit(1);
});

// ===== INICIAR SERVIDOR =====

startServer();

export default app;
