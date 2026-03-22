/**
 * CONFIGURACIÓN DE MÓDULOS RSC
 * 
 * Configuración centralizada para importar módulos ES6
 * - Configuración de Supabase
 * - Store centralizado
 * - Sistema de autenticación
 * - Motor de minería
 * - Validación de datos
 * - Manejo de errores
 */

// Exportar configuración de Supabase
export { 
    supabase, 
    supabaseAdmin, 
    TABLES, 
    TRANSACTION_TYPES, 
    MINING_STATUS, 
    MINING_CONFIG, 
    REFERRAL_CONFIG, 
    SECURITY_CONFIG,
    checkSupabaseConnection,
    getCurrentUser,
    generateReferralCode,
    validateEmail,
    validatePassword,
    formatBalance,
    formatHashRate,
    formatTime
} from './config/supabase.js';

// Exportar store centralizado
export { default as rscStore } from './store/rscStore.js';

// Exportar sistema de autenticación
export { default as secureAuth } from './auth/secureAuth.js';

// Exportar motor de minería
export { default as miningEngine } from './mining/miningEngine.js';

// Exportar validador de datos
export { default as dataValidator } from './validation/dataValidator.js';

// Exportar manejador de errores
export { default as errorHandler } from './error/errorHandler.js';

// Exportar sistema unificado
export { default as rscSystem } from './rsc-system-unified.js';

// Función para inicializar todos los módulos
export async function initializeRSCModules() {
    try {
        console.log('🔧 Inicializando módulos RSC...');
        
        // Los módulos se inicializan automáticamente al importar
        // Solo verificamos que estén disponibles
        
        const modules = {
            supabase: typeof window !== 'undefined' && window.supabase,
            rscStore: typeof window !== 'undefined' && window.RSCStore,
            secureAuth: typeof window !== 'undefined' && window.SecureAuth,
            miningEngine: typeof window !== 'undefined' && window.MiningEngine,
            dataValidator: typeof window !== 'undefined' && window.DataValidator,
            errorHandler: typeof window !== 'undefined' && window.ErrorHandler,
            rscSystem: typeof window !== 'undefined' && window.RSCSystem
        };
        
        const availableModules = Object.entries(modules)
            .filter(([name, module]) => module)
            .map(([name]) => name);
        
        const missingModules = Object.entries(modules)
            .filter(([name, module]) => !module)
            .map(([name]) => name);
        
        console.log('✅ Módulos disponibles:', availableModules);
        
        if (missingModules.length > 0) {
            console.warn('⚠️ Módulos faltantes:', missingModules);
        }
        
        return {
            success: true,
            available: availableModules,
            missing: missingModules
        };
        
    } catch (error) {
        console.error('❌ Error inicializando módulos RSC:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Función para verificar estado del sistema
export function getSystemStatus() {
    if (typeof window === 'undefined' || !window.RSCSystem) {
        return {
            ready: false,
            error: 'RSCSystem no disponible'
        };
    }
    
    return window.RSCSystem.getSystemStatus();
}

// Función para obtener estadísticas del sistema
export function getSystemStats() {
    if (typeof window === 'undefined' || !window.RSCSystem) {
        return null;
    }
    
    return window.RSCSystem.getSystemStats();
}

// Función para limpiar todos los datos
export function clearAllData() {
    if (typeof window === 'undefined' || !window.RSCSystem) {
        console.error('❌ RSCSystem no disponible para limpiar datos');
        return false;
    }
    
    window.RSCSystem.clearAllData();
    return true;
}

// Función para exportar datos del usuario
export function exportUserData() {
    if (typeof window === 'undefined' || !window.RSCSystem) {
        console.error('❌ RSCSystem no disponible para exportar datos');
        return false;
    }
    
    window.RSCSystem.exportUserData();
    return true;
}

// Función para obtener información de debugging
export function getDebugInfo() {
    if (typeof window === 'undefined' || !window.RSCSystem) {
        return {
            error: 'RSCSystem no disponible'
        };
    }
    
    return window.RSCSystem.getDebugInfo();
}

// Hacer funciones disponibles globalmente
if (typeof window !== 'undefined') {
    window.initializeRSCModules = initializeRSCModules;
    window.getSystemStatus = getSystemStatus;
    window.getSystemStats = getSystemStats;
    window.clearAllData = clearAllData;
    window.exportUserData = exportUserData;
    window.getDebugInfo = getDebugInfo;
}
