// 🎯 RSC REFERRAL SYSTEM - CONFIGURATION
// Configuración del sistema de referidos

module.exports = {
    // Configuración de códigos de referido
    referralCode: {
        // Formato del código: RSC_{userId}_{timestamp}_{randomSuffix}
        format: 'RSC_{userId}_{timestamp}_{randomSuffix}',
        
        // Longitud del sufijo aleatorio
        randomSuffixLength: 6,
        
        // Duración de validez del código (en días)
        validityDays: 365,
        
        // Límite máximo de usos por código
        maxUsage: 1000,
        
        // Plataformas permitidas
        allowedPlatforms: ['web_mining', 'mobile_app', 'api']
    },
    
    // Configuración de bonificaciones
    bonuses: {
        // Porcentaje de bonificación por referido (10%)
        referralBonusRate: 0.10,
        
        // Bonificaciones por hitos de referidos
        milestones: [
            { referrals: 10, bonusMultiplier: 1.2 },    // 20% extra por 10 referidos
            { referrals: 50, bonusMultiplier: 1.5 },    // 50% extra por 50 referidos
            { referrals: 100, bonusMultiplier: 2.0 },   // 100% extra por 100 referidos
            { referrals: 500, bonusMultiplier: 3.0 }    // 200% extra por 500 referidos
        ],
        
        // Bonificación por referido de nivel 2 (referido de referido)
        level2BonusRate: 0.05, // 5%
        
        // Bonificación por referido de nivel 3
        level3BonusRate: 0.02  // 2%
    },
    
    // Configuración de seguridad
    security: {
        // Validaciones de IP
        validateIP: true,
        
        // Límite de referidos por IP (por día)
        maxReferralsPerIP: 10,
        
        // Límite de códigos generados por usuario (por día)
        maxCodesPerUser: 5,
        
        // Tiempo de cooldown entre generación de códigos (en minutos)
        codeGenerationCooldown: 60,
        
        // Validación de User-Agent
        validateUserAgent: true,
        
        // Patrones de User-Agent sospechosos
        suspiciousUserAgents: [
            /bot/i,
            /crawler/i,
            /spider/i,
            /scraper/i
        ]
    },
    
    // Configuración de auditoría
    audit: {
        // Habilitar logs de auditoría
        enabled: true,
        
        // Retener logs por (en días)
        retentionDays: 365,
        
        // Eventos a auditar
        events: [
            'referral_code_generated',
            'referral_code_used',
            'referral_processed',
            'referral_cancelled',
            'bonus_calculated',
            'bonus_paid'
        ]
    },
    
    // Configuración de notificaciones
    notifications: {
        // Notificar al referidor cuando alguien usa su código
        notifyOnReferral: true,
        
        // Notificar al referido cuando se procesa su código
        notifyOnProcessing: true,
        
        // Notificar cuando se calculan ganancias
        notifyOnEarnings: true,
        
        // Canales de notificación
        channels: ['email', 'push', 'in_app']
    },
    
    // Configuración de pagos
    payments: {
        // Frecuencia de cálculo de ganancias (en horas)
        calculationFrequency: 24,
        
        // Frecuencia de pago (en días)
        paymentFrequency: 7,
        
        // Monto mínimo para pago (en RSC)
        minimumPayout: 0.01,
        
        // Métodos de pago disponibles
        paymentMethods: ['wallet', 'bank_transfer', 'crypto']
    },
    
    // Configuración de límites
    limits: {
        // Máximo de referidos por usuario
        maxReferralsPerUser: 10000,
        
        // Máximo de códigos activos por usuario
        maxActiveCodesPerUser: 3,
        
        // Tiempo de espera antes de poder usar un código (en minutos)
        codeUsageDelay: 5,
        
        // Límite de intentos de validación por IP (por hora)
        maxValidationAttemptsPerIP: 100
    },
    
    // Configuración de cache
    cache: {
        // TTL para códigos de referido (en segundos)
        referralCodeTTL: 3600,
        
        // TTL para estadísticas de usuario (en segundos)
        userStatsTTL: 300,
        
        // TTL para validaciones (en segundos)
        validationTTL: 60
    },
    
    // Configuración de desarrollo
    development: {
        // Modo de desarrollo
        devMode: process.env.NODE_ENV === 'development',
        
        // Códigos de prueba permitidos
        allowTestCodes: true,
        
        // Logs detallados
        verboseLogging: true,
        
        // Simular delays de red
        simulateNetworkDelay: false
    }
};
