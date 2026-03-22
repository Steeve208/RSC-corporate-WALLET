/* ================================
   ADVANCED REFERRAL SYSTEM
   Gamified and Scalable Referral System
================================ */

/**
 * 🎯 ADVANCED REFERRAL SYSTEM
 * 
 * Features:
 * - Multiple reward levels
 * - Bonuses for referral activity
 * - Ranks and achievements system
 * - Special events and multipliers
 * - Lifetime commissions
 * - Competitive leaderboard
 */

class AdvancedReferralSystem {
    constructor() {
        this.config = {
            // Base bonuses
            welcomeBonus: {
                referrer: 100,      // RSC for referrer
                referred: 50        // RSC for new user
            },
            
            // Mining commissions (percentages)
            miningCommissions: {
                direct: 0.10,       // 10% direct commission
                level2: 0.05,       // 5% from your referrals' referrals
                level3: 0.02        // 2% from third level
            },
            
            // Ranks system
            ranks: {
                bronze: { min: 0, max: 4, multiplier: 1.0, name: "Bronze Recruiter" },
                silver: { min: 5, max: 14, multiplier: 1.2, name: "Silver Ambassador" },
                gold: { min: 15, max: 29, multiplier: 1.5, name: "Gold Leader" },
                platinum: { min: 30, max: 49, multiplier: 2.0, name: "Platinum Elite" },
                diamond: { min: 50, max: 99, multiplier: 2.5, name: "Diamond Master" },
                legendary: { min: 100, max: Infinity, multiplier: 3.0, name: "Legendary Titan" }
            },
            
            // Special achievements
            achievements: {
                firstRefer: { reward: 25, name: "First Invitation", icon: "🎯" },
                streak5: { reward: 100, name: "Streak of 5", icon: "🔥" },
                powerUser: { reward: 200, name: "Powerful User", icon: "⚡" },
                teamBuilder: { reward: 500, name: "Team Builder", icon: "🏗️" },
                viral: { reward: 1000, name: "Viral Master", icon: "🌟" }
            },
            
            // Special events
            events: {
                doubleWeekend: { multiplier: 2.0, active: false },
                newUserBoost: { multiplier: 1.5, active: true },
                seasonBonus: { bonus: 25, active: false }
            }
        };
        
        this.userStats = {
            totalReferrals: 0,
            activeReferrals: 0,
            totalCommissions: 0,
            currentRank: 'bronze',
            achievements: [],
            referralTree: [],
            monthlyStats: {}
        };
        
        this.init();
    }

    async init() {
        console.log('🚀 Inicializando Advanced Referral System...');
        
        // Cargar datos del usuario si está autenticado
        if (window.supabaseIntegration?.user?.isAuthenticated) {
            await this.loadUserReferralData();
        }
        
        // Verificar código en URL
        this.checkURLReferral();
        
        // Configurar event listeners
        this.setupEventListeners();
        
        console.log('✅ Advanced Referral System inicializado');
    }

    // ===============================
    // GESTIÓN DE DATOS
    // ===============================

    async loadUserReferralData() {
        try {
            const user = window.supabaseIntegration.user;
            
            // Cargar estadísticas básicas
            await this.loadReferralStats(user.id);
            
            // Cargar árbol de referidos (multinivel)
            await this.loadReferralTree(user.id);
            
            // Calcular rango actual
            this.calculateCurrentRank();
            
            // Verificar logros
            await this.checkAchievements();
            
            console.log('📊 Datos de referidos cargados:', this.userStats);
            
        } catch (error) {
            console.error('❌ Error cargando datos de referidos:', error);
        }
    }

    async loadReferralStats(userId) {
        try {
            // Obtener referidos directos
            const directReferrals = await this.getDirectReferrals(userId);
            
            // Obtener comisiones totales
            const totalCommissions = await this.getTotalCommissions(userId);
            
            // Calcular referidos activos (que han minado en los últimos 7 días)
            const activeReferrals = await this.getActiveReferrals(userId);
            
            this.userStats.totalReferrals = directReferrals.length;
            this.userStats.activeReferrals = activeReferrals.length;
            this.userStats.totalCommissions = totalCommissions;
            
        } catch (error) {
            console.error('❌ Error cargando estadísticas:', error);
        }
    }

    async loadReferralTree(userId) {
        try {
            // Cargar hasta 3 niveles de referidos
            const level1 = await this.getDirectReferrals(userId);
            const tree = [];
            
            for (const referral of level1) {
                const level2 = await this.getDirectReferrals(referral.referred_id);
                const level2Data = [];
                
                for (const l2Referral of level2) {
                    const level3 = await this.getDirectReferrals(l2Referral.referred_id);
                    level2Data.push({
                        ...l2Referral,
                        children: level3
                    });
                }
                
                tree.push({
                    ...referral,
                    children: level2Data
                });
            }
            
            this.userStats.referralTree = tree;
            
        } catch (error) {
            console.error('❌ Error cargando árbol de referidos:', error);
        }
    }

    // ===============================
    // SISTEMA DE PROCESAMIENTO
    // ===============================

    async processReferral(referralCode) {
        try {
            console.log(`🔍 Procesando referido con código: ${referralCode}`);
            
            // Verificar que el usuario esté autenticado
            if (!window.supabaseIntegration?.user?.isAuthenticated) {
                localStorage.setItem('rsc_pending_referral', referralCode);
                return;
            }

            // Buscar usuario referidor
            const referrer = await this.findReferrer(referralCode);
            if (!referrer) {
                throw new Error('Código de referido no válido');
            }

            const userId = window.supabaseIntegration.user.id;
            
            // Verificar que no sea auto-referencia
            if (referrer.id === userId) {
                throw new Error('No puedes referirte a ti mismo');
            }

            // Crear relación de referido
            await this.createReferralRelation(referrer.id, userId);
            
            // Procesar bonificaciones
            await this.processReferralBonuses(referrer, userId);
            
            // Verificar logros
            await this.checkReferrerAchievements(referrer.id);
            
            this.showNotification(
                `🎉 ¡Referido exitoso! Has sido invitado por ${referrer.username}`,
                'success'
            );

            // Limpiar código pendiente
            localStorage.removeItem('rsc_pending_referral');

        } catch (error) {
            console.error('❌ Error procesando referido:', error);
            this.showNotification(`❌ Error: ${error.message}`, 'error');
        }
    }

    async processReferralBonuses(referrer, referredId) {
        try {
            const currentMultiplier = this.getCurrentEventMultiplier();
            
            // Bonus para el referidor
            const referrerBonus = this.config.welcomeBonus.referrer * currentMultiplier;
            await this.addBalance(referrer.id, referrerBonus, 'referral_bonus');
            
            // Bonus para el referido
            const referredBonus = this.config.welcomeBonus.referred * currentMultiplier;
            await this.addBalance(referredId, referredBonus, 'welcome_bonus');
            
            // Bonus adicional por rango
            const rankMultiplier = this.getRankMultiplier(referrer.id);
            if (rankMultiplier > 1.0) {
                const rankBonus = this.config.welcomeBonus.referrer * (rankMultiplier - 1.0);
                await this.addBalance(referrer.id, rankBonus, 'rank_bonus');
            }
            
            console.log(`💰 Bonificaciones procesadas: Referidor +${referrerBonus}, Referido +${referredBonus}`);
            
        } catch (error) {
            console.error('❌ Error procesando bonificaciones:', error);
        }
    }

    // ===============================
    // SISTEMA DE COMISIONES
    // ===============================

    async processMiningCommissions(minerId, tokensEarned) {
        try {
            // Obtener cadena de referidos (hasta 3 niveles)
            const referralChain = await this.getReferralChain(minerId);
            
            for (let level = 0; level < Math.min(referralChain.length, 3); level++) {
                const referrer = referralChain[level];
                let commissionRate = 0;
                
                // Determinar tasa de comisión por nivel
                switch (level) {
                    case 0: commissionRate = this.config.miningCommissions.direct; break;
                    case 1: commissionRate = this.config.miningCommissions.level2; break;
                    case 2: commissionRate = this.config.miningCommissions.level3; break;
                }
                
                // Aplicar multiplicadores
                const rankMultiplier = this.getRankMultiplier(referrer.id);
                const eventMultiplier = this.getCurrentEventMultiplier();
                
                const finalRate = commissionRate * rankMultiplier * eventMultiplier;
                const commission = tokensEarned * finalRate;
                
                // Agregar comisión
                await this.addBalance(referrer.id, commission, `mining_commission_l${level + 1}`);
                
                // Actualizar estadísticas de comisiones
                await this.updateCommissionStats(referrer.id, commission);
                
                console.log(`💎 Comisión L${level + 1}: ${commission.toFixed(6)} RSC para ${referrer.username}`);
            }
            
        } catch (error) {
            console.error('❌ Error procesando comisiones de minería:', error);
        }
    }

    // ===============================
    // SISTEMA DE RANGOS
    // ===============================

    calculateCurrentRank() {
        const totalReferrals = this.userStats.totalReferrals;
        
        for (const [rankKey, rankData] of Object.entries(this.config.ranks)) {
            if (totalReferrals >= rankData.min && totalReferrals <= rankData.max) {
                this.userStats.currentRank = rankKey;
                break;
            }
        }
        
        return this.userStats.currentRank;
    }

    getRankMultiplier(userId) {
        // En producción, esto vendría de la base de datos
        const userRank = this.userStats.currentRank;
        return this.config.ranks[userRank]?.multiplier || 1.0;
    }

    async checkRankUpgrade(userId) {
        const oldRank = this.userStats.currentRank;
        const newRank = this.calculateCurrentRank();
        
        if (oldRank !== newRank) {
            // Rank up!
            const rankData = this.config.ranks[newRank];
            
            // Dar bonus por rank up
            const rankUpBonus = 100 * rankData.multiplier;
            await this.addBalance(userId, rankUpBonus, 'rank_upgrade');
            
            this.showNotification(
                `🎖️ ¡RANK UP! Ahora eres ${rankData.name}! Bonus: ${rankUpBonus} RSC`,
                'success'
            );
            
            // Guardar nuevo rango en BD
            await this.updateUserRank(userId, newRank);
        }
    }

    // ===============================
    // ACHIEVEMENTS SYSTEM
    // ===============================

    async checkAchievements() {
        const achievements = [];
        
        // First referral
        if (this.userStats.totalReferrals >= 1 && !this.hasAchievement('firstRefer')) {
            achievements.push('firstRefer');
        }
        
        // Streak of 5 referrals
        if (this.userStats.totalReferrals >= 5 && !this.hasAchievement('streak5')) {
            achievements.push('streak5');
        }
        
        // Powerful user (10 active referrals)
        if (this.userStats.activeReferrals >= 10 && !this.hasAchievement('powerUser')) {
            achievements.push('powerUser');
        }
        
        // Team builder (25 referrals)
        if (this.userStats.totalReferrals >= 25 && !this.hasAchievement('teamBuilder')) {
            achievements.push('teamBuilder');
        }
        
        // Viral master (100 referrals)
        if (this.userStats.totalReferrals >= 100 && !this.hasAchievement('viral')) {
            achievements.push('viral');
        }
        
        // Process new achievements
        for (const achievementId of achievements) {
            await this.unlockAchievement(achievementId);
        }
    }

    async unlockAchievement(achievementId) {
        const achievement = this.config.achievements[achievementId];
        if (!achievement) return;
        
        // Agregar a logros del usuario
        this.userStats.achievements.push(achievementId);
        
        // Dar recompensa
        const userId = window.supabaseIntegration.user.id;
        await this.addBalance(userId, achievement.reward, 'achievement_reward');
        
        // Mostrar notificación
        this.showNotification(
            `🏆 ¡Logro desbloqueado! ${achievement.icon} ${achievement.name} - Recompensa: ${achievement.reward} RSC`,
            'success'
        );
        
        // Guardar en BD
        await this.saveAchievement(userId, achievementId);
    }

    hasAchievement(achievementId) {
        return this.userStats.achievements.includes(achievementId);
    }

    // ===============================
    // EVENTOS ESPECIALES
    // ===============================

    getCurrentEventMultiplier() {
        let multiplier = 1.0;
        
        // Fin de semana doble
        if (this.config.events.doubleWeekend.active && this.isWeekend()) {
            multiplier *= this.config.events.doubleWeekend.multiplier;
        }
        
        // Boost para nuevos usuarios
        if (this.config.events.newUserBoost.active) {
            multiplier *= this.config.events.newUserBoost.multiplier;
        }
        
        return multiplier;
    }

    isWeekend() {
        const day = new Date().getDay();
        return day === 0 || day === 6; // Domingo o Sábado
    }

    // ===============================
    // LEADERBOARD Y COMPETENCIA
    // ===============================

    async getLeaderboard(period = 'monthly') {
        try {
            // Obtener top referidores del período
            const leaderboard = await this.makeRequest(
                'GET',
                `/rest/v1/referral_stats?period=eq.${period}&order=total_referrals.desc&limit=100`
            );
            
            return leaderboard.ok ? await leaderboard.json() : [];
            
        } catch (error) {
            console.error('❌ Error obteniendo leaderboard:', error);
            return [];
        }
    }

    async getUserRanking(userId, period = 'monthly') {
        try {
            const response = await this.makeRequest(
                'GET',
                `/rest/v1/referral_ranking?user_id=eq.${userId}&period=eq.${period}`
            );
            
            return response.ok ? await response.json() : null;
            
        } catch (error) {
            console.error('❌ Error obteniendo ranking:', error);
            return null;
        }
    }

    // ===============================
    // UTILIDADES Y HELPERS
    // ===============================

    checkURLReferral() {
        const urlParams = new URLSearchParams(window.location.search);
        const refCode = urlParams.get('ref');
        
        if (refCode) {
            console.log(`🔗 Código de referido detectado: ${refCode}`);
            localStorage.setItem('rsc_pending_referral', refCode);
            this.showNotification('🎁 Código de referido detectado! Regístrate para obtener tu bonus.', 'info');
        }
    }

    setupEventListeners() {
        // Escuchar cuando el usuario se autentique
        window.addEventListener('userAuthenticated', async () => {
            await this.loadUserReferralData();
            
            // Procesar referido pendiente
            const pendingReferral = localStorage.getItem('rsc_pending_referral');
            if (pendingReferral) {
                await this.processReferral(pendingReferral);
            }
        });
        
        // Escuchar cuando el usuario mine (para comisiones)
        window.addEventListener('miningEarned', async (event) => {
            const { userId, tokensEarned } = event.detail;
            await this.processMiningCommissions(userId, tokensEarned);
        });
    }

    // ===============================
    // API HELPERS
    // ===============================

    async makeRequest(method, endpoint, data = null) {
        return window.supabaseIntegration.makeRequest(method, endpoint, data);
    }

    async findReferrer(referralCode) {
        const response = await this.makeRequest(
            'GET',
            `/rest/v1/users?referral_code=eq.${referralCode}&select=id,username`
        );
        
        if (response.ok) {
            const users = await response.json();
            return users.length > 0 ? users[0] : null;
        }
        
        return null;
    }

    async createReferralRelation(referrerId, referredId) {
        const data = {
            referrer_id: referrerId,
            referred_id: referredId,
            commission_rate: this.config.miningCommissions.direct,
            total_commission: 0,
            created_at: new Date().toISOString()
        };
        
        return this.makeRequest('POST', '/rest/v1/referrals', data);
    }

    async addBalance(userId, amount, type) {
        // Agregar al balance del usuario
        if (window.supabaseIntegration && userId === window.supabaseIntegration.user.id) {
            window.supabaseIntegration.user.balance += amount;
            await window.supabaseIntegration.syncBalanceToBackend();
        }
        
        // Registrar transacción
        const transaction = {
            user_id: userId,
            amount: amount,
            type: type,
            created_at: new Date().toISOString()
        };
        
        return this.makeRequest('POST', '/rest/v1/transactions', transaction);
    }

    // ===============================
    // UI HELPERS
    // ===============================

    showNotification(message, type = 'info') {
        if (window.showNotification) {
            window.showNotification(message, type);
        } else {
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }

    // ===============================
    // GETTERS PÚBLICOS
    // ===============================

    getReferralCode() {
        return window.supabaseIntegration?.user?.referralCode || null;
    }

    getReferralLink() {
        const code = this.getReferralCode();
        if (!code) return null;
        
        const baseUrl = window.location.origin + window.location.pathname;
        return `${baseUrl}?ref=${code}`;
    }

    async getTotalReferrals() {
        try {
            if (!window.supabaseIntegration?.user?.isAuthenticated) return 0;
            
            const userId = window.supabaseIntegration.user.id;
            const response = await this.makeRequest('GET', `/rest/v1/users?id=eq.${userId}&select=referral_count`);
            
            if (response.ok) {
                const userData = await response.json();
                if (userData.length > 0) {
                    return userData[0].referral_count || 0;
                }
            }
            
            return 0;
        } catch (error) {
            console.error('❌ Error obteniendo total de referidos:', error);
            return 0;
        }
    }

    async getActiveReferrals() {
        try {
            if (!window.supabaseIntegration?.user?.isAuthenticated) return 0;
            
            const userId = window.supabaseIntegration.user.id;
            const response = await this.makeRequest('GET', `/rest/v1/users?referred_by=eq.${userId}&select=id,last_sign_in_at`);
            
            if (response.ok) {
                const referrals = await response.json();
                // Considerar activos a los que se conectaron en los últimos 30 días
                const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                
                return referrals.filter(user => {
                    const lastSignIn = new Date(user.last_sign_in_at);
                    return lastSignIn >= thirtyDaysAgo;
                }).length;
            }
            
            return 0;
        } catch (error) {
            console.error('❌ Error obteniendo referidos activos:', error);
            return 0;
        }
    }

    async getTotalCommissions() {
        try {
            if (!window.supabaseIntegration?.user?.isAuthenticated) return 0;
            
            const userId = window.supabaseIntegration.user.id;
            const response = await this.makeRequest('GET', `/rest/v1/transactions?user_id=eq.${userId}&type=like.%referral%&select=amount`);
            
            if (response.ok) {
                const transactions = await response.json();
                return transactions.reduce((total, tx) => total + (tx.amount || 0), 0);
            }
            
            return 0;
        } catch (error) {
            console.error('❌ Error obteniendo comisiones totales:', error);
            return 0;
        }
    }

    getCurrentRank() {
        return this.config.ranks[this.userStats.currentRank];
    }

    getAchievements() {
        return this.userStats.achievements.map(id => ({
            id,
            ...this.config.achievements[id]
        }));
    }

    getReferralTree() {
        return this.userStats.referralTree;
    }
}

// Crear instancia global
window.advancedReferralSystem = new AdvancedReferralSystem();

console.log('🚀 Advanced Referral System cargado');
