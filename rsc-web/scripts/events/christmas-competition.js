/* ================================
   CHRISTMAS COMPETITION SYSTEM
   Sistema principal de competencia navideña
   ================================ */

/**
 * 🎄 SISTEMA DE COMPETENCIA NAVIDEÑA
 * 
 * Características:
 * - Sistema de puntos (Christmas Points)
 * - Multiplicadores por período (Navidad x1.5, Año Nuevo x2.0)
 * - Streak system con bonificaciones
 * - Integración con minería, referidos y desafíos
 */

class ChristmasCompetition {
    constructor() {
        // Configuración del evento (Navidad + Año Nuevo)
        this.config = {
            name: 'Christmas Competition 2024',
            startDate: new Date('2024-12-25T00:00:00'), // 25 de diciembre
            endDate: new Date('2026-01-02T23:59:59'), // 2 de enero 2026
            duration: 14, // días
            
            // Sistema de puntos
            points: {
                mining: 10, // 1 RSC minado = 10 Christmas Points
                referral: 50, // 50 puntos por cada referido
                dailyLogin: 25, // 25 puntos por iniciar sesión
                challenge: {
                    daily: 100, // Desafíos diarios
                    weekly: 1000 // Desafíos semanales
                }
            },
            
            // Multiplicadores por período
            multipliers: {
                christmas: 1.5, // Día 1-7 (Navidad)
                newYear: 2.0    // Día 8-14 (Año Nuevo)
            },
            
            // Streak bonuses
            streakBonus: 0.10, // +10% por cada día consecutivo (máx 100%)
            maxStreakBonus: 1.0 // Máximo 100% de bonificación
        };
        
        // Estado del usuario
        this.userState = {
            userId: null,
            totalPoints: 0,
            currentStreak: 0,
            lastLoginDate: null,
            pointsHistory: [],
            multipliers: {
                period: 1.0,
                streak: 1.0,
                total: 1.0
            },
            stats: {
                pointsFromMining: 0,
                pointsFromReferrals: 0,
                pointsFromLogin: 0,
                pointsFromChallenges: 0
            }
        };
        
        // Referencias a sistemas externos
        this.supabase = null;
        
        // Timers
        this.updateTimer = null;
        
        this.init();
    }
    
    async init() {
        console.log('🎄 Inicializando Christmas Competition System...');
        
        try {
            // Configurar event listeners PRIMERO
            this.setupEventListeners();
            
            // Esperar a que Supabase esté listo
            await this.waitForSupabase();
            
            // Cargar estado del usuario
            await this.loadUserState();
            
            // Calcular multiplicadores actuales
            this.calculateMultipliers();
            
            // Verificar minería activa y agregar puntos si hay
            await this.checkActiveMining();
            
            // Iniciar timers
            this.startTimers();
            
            console.log('✅ Christmas Competition System inicializado');
        } catch (error) {
            console.error('❌ Error inicializando Christmas Competition:', error);
        }
    }
    
    async waitForSupabase() {
        return new Promise((resolve) => {
            if (window.supabaseIntegration) {
                this.supabase = window.supabaseIntegration;
                resolve();
            } else {
                const checkInterval = setInterval(() => {
                    if (window.supabaseIntegration) {
                        clearInterval(checkInterval);
                        this.supabase = window.supabaseIntegration;
                        resolve();
                    }
                }, 100);
            }
        });
    }
    
    async loadUserState() {
        // Esperar a que Supabase esté completamente inicializado
        let attempts = 0;
        const maxAttempts = 20;
        
        while (attempts < maxAttempts) {
            if (this.supabase?.user?.isAuthenticated && this.supabase?.user?.id) {
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 200));
            attempts++;
        }
        
        if (!this.supabase?.user?.isAuthenticated) {
            console.log('⚠️ Usuario no autenticado - el sistema seguirá esperando eventos');
            
            // Escuchar cuando el usuario inicie sesión
            const loginListener = () => {
                console.log('🎄 Usuario autenticado - cargando estado...');
                this.loadUserState();
                window.removeEventListener('userLoggedIn', loginListener);
            };
            window.addEventListener('userLoggedIn', loginListener);
            return;
        }
        
        this.userState.userId = this.supabase.user.id;
        
        try {
            // Cargar desde localStorage primero
            const saved = localStorage.getItem('christmas_competition_state');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.userId === this.userState.userId) {
                    this.userState = { ...this.userState, ...parsed };
                }
            }
            
            // Cargar desde base de datos
            await this.loadFromDatabase();
            
            // Verificar y actualizar streak (esto agregará puntos de login si es necesario)
            this.updateStreak();
            
            console.log(`✅ Estado del usuario cargado: ${this.userState.totalPoints} puntos, streak: ${this.userState.currentStreak}`);
            
            // Disparar evento de inicialización completa
            window.dispatchEvent(new CustomEvent('christmasCompetitionReady', {
                detail: {
                    userId: this.userState.userId,
                    points: this.userState.totalPoints,
                    streak: this.userState.currentStreak
                }
            }));
        } catch (error) {
            console.error('❌ Error cargando estado:', error);
        }
    }
    
    async loadFromDatabase() {
        try {
            if (!this.userState.userId || !this.supabase?.config) return;
            
            // Intentar cargar desde tabla christmas_points
            const response = await this.makeRequest('GET', 
                `/rest/v1/christmas_points?user_id=eq.${this.userState.userId}&select=*`);
            
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    const userData = data[0];
                    this.userState.totalPoints = parseFloat(userData.total_points) || 0;
                    this.userState.currentStreak = parseInt(userData.current_streak) || 0;
                    this.userState.lastLoginDate = userData.last_login_date ? 
                        new Date(userData.last_login_date) : null;
                    
                    // Cargar estadísticas
                    if (userData.stats) {
                        this.userState.stats = { ...this.userState.stats, ...userData.stats };
                    }
                }
            }
        } catch (error) {
            console.warn('⚠️ Error cargando desde BD:', error);
        }
    }
    
    async makeRequest(method, endpoint, body = null) {
        if (!this.supabase?.config) {
            throw new Error('Supabase no configurado');
        }
        
        const url = `${this.supabase.config.url}${endpoint}`;
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'apikey': this.supabase.config.anonKey,
                'Authorization': `Bearer ${this.supabase.config.anonKey}`
            }
        };
        
        if (body && (method === 'POST' || method === 'PATCH')) {
            options.body = JSON.stringify(body);
        }
        
        return fetch(url, options);
    }
    
    calculateMultipliers() {
        const now = new Date();
        const startDate = this.config.startDate;
        const daysSinceStart = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
        
        // Multiplicador por período
        if (daysSinceStart < 7) {
            this.userState.multipliers.period = this.config.multipliers.christmas; // 1.5x
        } else {
            this.userState.multipliers.period = this.config.multipliers.newYear; // 2.0x
        }
        
        // Multiplicador por streak (máximo 100% bonus)
        const streakBonus = Math.min(
            this.userState.currentStreak * this.config.streakBonus,
            this.config.maxStreakBonus
        );
        this.userState.multipliers.streak = 1.0 + streakBonus;
        
        // Multiplicador total
        this.userState.multipliers.total = this.userState.multipliers.period * this.userState.multipliers.streak;
    }
    
    updateStreak() {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        if (!this.userState.lastLoginDate) {
            // Primera vez que inicia sesión
            this.userState.currentStreak = 1;
            this.userState.lastLoginDate = today;
            this.addDailyLoginPoints();
            console.log('🎄 Primera vez iniciando sesión - Streak iniciado');
            return;
        }
        
        const lastLogin = new Date(this.userState.lastLoginDate);
        const daysDiff = Math.floor((today - lastLogin) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 0) {
            // Ya inició sesión hoy - no agregar puntos de nuevo
            console.log('🎄 Ya se agregaron puntos de login hoy');
            return;
        } else if (daysDiff === 1) {
            // Streak continúa
            this.userState.currentStreak += 1;
            this.userState.lastLoginDate = today;
            this.addDailyLoginPoints();
            console.log(`🎄 Streak continúa: día ${this.userState.currentStreak}`);
        } else {
            // Streak roto
            this.userState.currentStreak = 1;
            this.userState.lastLoginDate = today;
            this.addDailyLoginPoints();
            console.log(`🎄 Streak reiniciado después de ${daysDiff} días`);
        }
        
        this.calculateMultipliers();
        this.saveState();
    }
    
    addDailyLoginPoints() {
        const basePoints = this.config.points.dailyLogin;
        const finalPoints = Math.floor(basePoints * this.userState.multipliers.total);
        
        this.addPoints(finalPoints, 'dailyLogin');
        console.log(`📅 Puntos de login diario: +${finalPoints} (base: ${basePoints}, mult: ${this.userState.multipliers.total.toFixed(2)}x)`);
    }
    
    /**
     * Agregar puntos por minería
     */
    addMiningPoints(rscMined) {
        if (!rscMined || rscMined <= 0) return;
        
        const basePoints = rscMined * this.config.points.mining;
        const finalPoints = Math.floor(basePoints * this.userState.multipliers.total);
        
        this.addPoints(finalPoints, 'mining', rscMined);
        
        console.log(`⛏️ Puntos de minería: +${finalPoints} (${rscMined} RSC × ${this.config.points.mining} × ${this.userState.multipliers.total.toFixed(2)})`);
    }
    
    /**
     * Agregar puntos por referido
     */
    addReferralPoints() {
        const basePoints = this.config.points.referral;
        const finalPoints = Math.floor(basePoints * this.userState.multipliers.total);
        
        this.addPoints(finalPoints, 'referral');
        console.log(`👥 Puntos de referido: +${finalPoints}`);
    }
    
    /**
     * Agregar puntos por desafío
     */
    addChallengePoints(points, type) {
        const basePoints = type === 'daily' ? 
            this.config.points.challenge.daily : 
            this.config.points.challenge.weekly;
        
        const finalPoints = Math.floor(points * this.userState.multipliers.total);
        
        this.addPoints(finalPoints, 'challenge');
        
        console.log(`🎯 Puntos de desafío: +${finalPoints} (${type})`);
    }
    
    /**
     * Agregar puntos al total
     */
    addPoints(amount, source, metadata = null) {
        if (!this.isEventActive()) {
            console.warn('⚠️ Evento no activo, puntos no agregados');
            return;
        }
        
        if (!this.userState.userId) {
            console.warn('⚠️ Usuario no inicializado, puntos no agregados');
            return;
        }
        
        if (!amount || amount <= 0) {
            console.warn('⚠️ Cantidad de puntos inválida:', amount);
            return;
        }
        
        const oldTotal = this.userState.totalPoints;
        this.userState.totalPoints += amount;
        
        console.log(`📊 Puntos actualizados: ${oldTotal} → ${this.userState.totalPoints} (+${amount} de ${source})`);
        
        // Actualizar estadísticas
        switch (source) {
            case 'mining':
                this.userState.stats.pointsFromMining += amount;
                break;
            case 'referral':
                this.userState.stats.pointsFromReferrals += amount;
                break;
            case 'dailyLogin':
                this.userState.stats.pointsFromLogin += amount;
                break;
            case 'challenge':
                this.userState.stats.pointsFromChallenges += amount;
                break;
        }
        
        // Guardar en historial
        this.userState.pointsHistory.push({
            amount,
            source,
            timestamp: new Date().toISOString(),
            multiplier: this.userState.multipliers.total,
            metadata
        });
        
        // Limitar historial a últimos 100 eventos
        if (this.userState.pointsHistory.length > 100) {
            this.userState.pointsHistory.shift();
        }
        
        // Guardar estado
        this.saveState();
        
        // Sincronizar con base de datos
        this.syncToDatabase().then(() => {
            console.log('✅ Puntos sincronizados con base de datos');
            
            // Disparar evento DESPUÉS de sincronizar
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('christmasPointsUpdated', {
                    detail: {
                        totalPoints: this.userState.totalPoints,
                        amount,
                        source,
                        metadata,
                        userId: this.userState.userId
                    }
                }));
                
                console.log(`🎉 Evento christmasPointsUpdated disparado: ${this.userState.totalPoints} puntos totales`);
            }, 1000);
        }).catch(error => {
            console.error('❌ Error sincronizando puntos:', error);
            
            // Disparar evento de todos modos para actualizar UI
            window.dispatchEvent(new CustomEvent('christmasPointsUpdated', {
                detail: {
                    totalPoints: this.userState.totalPoints,
                    amount,
                    source,
                    metadata,
                    userId: this.userState.userId
                }
            }));
        });
    }
    
    setupEventListeners() {
        console.log('🎄 Configurando event listeners del evento navideño...');
        
        // Escuchar eventos de login
        window.addEventListener('userLoggedIn', () => {
            console.log('🎄 Evento navideño: Usuario inició sesión');
            // Actualizar streak y agregar puntos de login
            setTimeout(() => {
                this.updateStreak();
            }, 1000);
        });
        
        // Escuchar eventos de minería
        const handleBalanceUpdate = (event) => {
            console.log('🎄 Evento balanceUpdated recibido:', event.detail);
            
            if (!event.detail) {
                console.warn('⚠️ Evento balanceUpdated sin detail');
                return;
            }
            
            // Detectar minería por source explícito
            if (event.detail.source === 'mining' && event.detail.change > 0) {
                const rscMined = event.detail.change;
                console.log(`🎄 Evento navideño: Detectada minería de ${rscMined} RSC`);
                
                // Verificar que el sistema esté listo
                if (!this.userState.userId) {
                    console.warn('⚠️ Sistema no inicializado, esperando...');
                    // Guardar en cola para procesar después
                    if (!this.pendingMining) {
                        this.pendingMining = [];
                    }
                    this.pendingMining.push(rscMined);
                    
                    // Intentar procesar después de un delay
                    setTimeout(() => {
                        if (this.userState.userId && this.pendingMining) {
                            console.log(`🎄 Procesando ${this.pendingMining.length} eventos de minería pendientes...`);
                            this.pendingMining.forEach(amount => {
                                this.addMiningPoints(amount);
                            });
                            this.pendingMining = [];
                        }
                    }, 2000);
                } else {
                    this.addMiningPoints(rscMined);
                }
            } else {
                console.log('ℹ️ Evento balanceUpdated ignorado (no es minería):', event.detail.source);
            }
        };
        
        // Agregar listener inmediatamente (incluso antes de autenticación)
        window.addEventListener('balanceUpdated', handleBalanceUpdate);
        console.log('✅ Listener de balanceUpdated configurado');
        
        // Inicializar cola de minería pendiente
        this.pendingMining = [];
        
        // Escuchar eventos de referidos
        window.addEventListener('rsc:referrer-commission-received', () => {
            console.log('🎄 Evento navideño: Detectado nuevo referido');
            this.addReferralPoints();
        });
        
        // Escuchar eventos de desafíos
        window.addEventListener('christmasChallengeCompleted', (event) => {
            if (event.detail) {
                const { points, type } = event.detail;
                this.addChallengePoints(points, type);
            }
        });
        
        // Actualizar multiplicadores cada hora
        setInterval(() => {
            this.calculateMultipliers();
        }, 60 * 60 * 1000); // Cada hora
        
        console.log('✅ Event listeners configurados');
    }
    
    async checkActiveMining() {
        if (!this.supabase?.miningSession?.isActive) return;
        
        try {
            // Obtener tokens minados en la sesión actual
            const tokensMined = parseFloat(this.supabase.miningSession.tokensMined) || 0;
            
            if (tokensMined > 0) {
                // Agregar puntos por minería acumulada
                this.addMiningPoints(tokensMined);
                console.log(`⛏️ Puntos agregados por minería acumulada: ${tokensMined} RSC`);
            }
        } catch (error) {
            console.warn('⚠️ Error verificando minería activa:', error);
        }
    }
    
    startTimers() {
        // Actualizar multiplicadores cada hora
        this.updateTimer = setInterval(() => {
            this.calculateMultipliers();
        }, 60 * 60 * 1000);
        
        // Sincronizar con base de datos cada 5 minutos
        setInterval(() => {
            this.syncToDatabase();
        }, 5 * 60 * 1000);
    }
    
    async syncToDatabase() {
        if (!this.userState.userId || !this.isEventActive()) {
            console.warn('⚠️ No se puede sincronizar: userId o evento no disponible');
            return;
        }
        
        if (!this.supabase?.config) {
            console.warn('⚠️ No se puede sincronizar: Supabase no configurado');
            return;
        }
        
        try {
            const data = {
                user_id: this.userState.userId,
                total_points: this.userState.totalPoints,
                current_streak: this.userState.currentStreak,
                last_login_date: this.userState.lastLoginDate?.toISOString(),
                stats: this.userState.stats,
                updated_at: new Date().toISOString()
            };
            
            console.log('💾 Sincronizando puntos con base de datos...', {
                userId: this.userState.userId,
                totalPoints: this.userState.totalPoints
            });
            
            // Intentar actualizar primero (más eficiente)
            const updateResponse = await this.makeRequest('PATCH',
                `/rest/v1/christmas_points?user_id=eq.${this.userState.userId}`, data);
            
            if (!updateResponse.ok) {
                const errorText = await updateResponse.text();
                console.log('⚠️ Update falló, intentando insertar...', errorText);
                
                // Si no existe, insertar
                const insertResponse = await this.makeRequest('POST', 
                    '/rest/v1/christmas_points', data);
                
                if (!insertResponse.ok) {
                    const insertError = await insertResponse.text();
                    console.error('❌ No se pudo insertar puntos:', insertError);
                    console.error('   Datos:', data);
                } else {
                    console.log('✅ Puntos insertados en base de datos');
                }
            } else {
                console.log('✅ Puntos actualizados en base de datos');
            }
        } catch (error) {
            console.error('❌ Error sincronizando con base de datos:', error);
            console.error('   Stack:', error.stack);
        }
    }
    
    saveState() {
        if (this.userState.userId) {
            localStorage.setItem('christmas_competition_state', JSON.stringify(this.userState));
        }
    }
    
    isEventActive() {
        const now = new Date();
        return now >= this.config.startDate && now <= this.config.endDate;
    }
    
    // Getters públicos
    getTotalPoints() {
        return this.userState.totalPoints;
    }
    
    getCurrentStreak() {
        return this.userState.currentStreak;
    }
    
    getMultipliers() {
        return { ...this.userState.multipliers };
    }
    
    getStats() {
        return { ...this.userState.stats };
    }
}

// Crear instancia global
window.christmasCompetition = new ChristmasCompetition();

console.log('🎄 Christmas Competition System cargado');

