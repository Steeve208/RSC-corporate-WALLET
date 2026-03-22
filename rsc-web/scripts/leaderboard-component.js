/* ================================
   LEADERBOARD-COMPONENT.JS — COMPONENTE DE LEADERBOARD EN TIEMPO REAL
================================ */

/**
 * 🏆 COMPONENTE DE LEADERBOARD CONECTADO AL BACKEND RSC MINING
 * 
 * Muestra el ranking en tiempo real con datos del backend
 * Incluye filtros por período y paginación
 */

class LeaderboardComponent {
    constructor(containerId = 'leaderboard-container') {
        this.containerId = containerId;
        this.container = null;
        this.currentPeriod = 'all';
        this.currentPage = 1;
        this.pageSize = 20;
        this.leaderboardData = [];
        this.isLoading = false;
        this.autoRefreshInterval = null;
        
        this.init();
    }
    
    init() {
        console.log('🏆 Inicializando componente de Leaderboard...');
        
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupComponent());
        } else {
            this.setupComponent();
        }
    }
    
    setupComponent() {
        this.container = document.getElementById(this.containerId);
        if (!this.container) {
            console.warn(`⚠️ Contenedor con ID '${this.containerId}' no encontrado`);
            return;
        }
        
        this.render();
        this.loadLeaderboard();
        this.startAutoRefresh();
        
        console.log('✅ Componente de Leaderboard configurado');
    }
    
    render() {
        this.container.innerHTML = `
            <div class="leaderboard-wrapper">
                <!-- Header del Leaderboard -->
                <div class="leaderboard-header">
                    <h2 class="leaderboard-title">
                        <span class="title-icon">🏆</span>
                        RSC Mining Leaderboard
                    </h2>
                    <div class="leaderboard-controls">
                        <!-- Selector de período -->
                        <div class="period-selector">
                            <label for="period-select">Período:</label>
                            <select id="period-select" class="period-select">
                                <option value="day">Hoy</option>
                                <option value="week">Esta Semana</option>
                                <option value="month">Este Mes</option>
                                <option value="all" selected>Todos los Tiempos</option>
                            </select>
                        </div>
                        
                        <!-- Botón de refresh -->
                        <button class="refresh-btn" onclick="leaderboardComponent.refreshLeaderboard()">
                            <span class="refresh-icon">🔄</span>
                            Actualizar
                        </button>
                    </div>
                </div>
                
                <!-- Estado de carga -->
                <div class="loading-state" id="leaderboard-loading" style="display: none;">
                    <div class="loading-spinner"></div>
                    <p>Cargando leaderboard...</p>
                </div>
                
                <!-- Contenido del leaderboard -->
                <div class="leaderboard-content" id="leaderboard-content">
                    <div class="leaderboard-placeholder">
                        <p>🏆 El leaderboard se cargará automáticamente...</p>
                    </div>
                </div>
                
                <!-- Paginación -->
                <div class="leaderboard-pagination" id="leaderboard-pagination" style="display: none;">
                    <div class="pagination-info">
                        <span id="pagination-info">Página 1 de 1</span>
                    </div>
                    <div class="pagination-controls">
                        <button class="pagination-btn" id="prev-page" onclick="leaderboardComponent.previousPage()">
                            ← Anterior
                        </button>
                        <button class="pagination-btn" id="next-page" onclick="leaderboardComponent.nextPage()">
                            Siguiente →
                        </button>
                    </div>
                </div>
                
                <!-- Estadísticas rápidas -->
                <div class="quick-stats" id="quick-stats">
                    <div class="stat-item">
                        <span class="stat-icon">👥</span>
                        <span class="stat-label">Total Mineros:</span>
                        <span class="stat-value" id="total-miners">-</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-icon">💰</span>
                        <span class="stat-label">Total Minado:</span>
                        <span class="stat-value" id="total-mined">-</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-icon">⭐</span>
                        <span class="stat-label">Mejor Minero:</span>
                        <span class="stat-value" id="best-miner">-</span>
                    </div>
                </div>
            </div>
        `;
        
        // Configurar event listeners
        this.setupEventListeners();
        
        // Aplicar estilos
        this.applyStyles();
    }
    
    setupEventListeners() {
        // Selector de período
        const periodSelect = document.getElementById('period-select');
        if (periodSelect) {
            periodSelect.addEventListener('change', (e) => {
                this.currentPeriod = e.target.value;
                this.currentPage = 1;
                this.loadLeaderboard();
            });
        }
    }
    
    async loadLeaderboard() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoading(true);
        
        try {
            // Verificar que el backend esté disponible
            if (!window.rscBackend) {
                throw new Error('Backend RSC Mining no está disponible');
            }
            
            console.log(`🏆 Cargando leaderboard para período: ${this.currentPeriod}, página: ${this.currentPage}`);
            
            // Cargar leaderboard desde el backend
            const data = await window.rscBackend.getLeaderboard(
                this.currentPeriod,
                this.currentPage,
                this.pageSize
            );
            
            this.leaderboardData = data.data || [];
            this.renderLeaderboard();
            
            // Cargar estadísticas rápidas
            await this.loadQuickStats();
            
            console.log(`✅ Leaderboard cargado: ${this.leaderboardData.length} mineros`);
            
        } catch (error) {
            console.error('❌ Error cargando leaderboard:', error);
            this.showError(`Error cargando leaderboard: ${error.message}`);
        } finally {
            this.isLoading = false;
            this.showLoading(false);
        }
    }
    
    renderLeaderboard() {
        const content = document.getElementById('leaderboard-content');
        if (!content) return;
        
        if (this.leaderboardData.length === 0) {
            content.innerHTML = `
                <div class="leaderboard-empty">
                    <div class="empty-icon">🏆</div>
                    <h3>No hay datos disponibles</h3>
                    <p>No se encontraron mineros para el período seleccionado.</p>
                </div>
            `;
            return;
        }
        
        let html = '<div class="leaderboard-table">';
        
        // Header de la tabla
        html += `
            <div class="leaderboard-row header">
                <div class="rank-col">#</div>
                <div class="miner-col">Minero</div>
                <div class="balance-col">Balance RSC</div>
                <div class="period-col">Período</div>
            </div>
        `;
        
        // Filas de datos
        this.leaderboardData.forEach((miner, index) => {
            const rank = (this.currentPage - 1) * this.pageSize + index + 1;
            const rankClass = rank <= 3 ? `rank-${rank}` : '';
            
            html += `
                <div class="leaderboard-row ${rankClass}">
                    <div class="rank-col">
                        <span class="rank-number">${rank}</span>
                        ${rank <= 3 ? this.getRankIcon(rank) : ''}
                    </div>
                    <div class="miner-col">
                        <div class="miner-info">
                            <span class="miner-email">${this.maskEmail(miner.email)}</span>
                            <span class="miner-id">ID: ${miner.id.substring(0, 8)}...</span>
                        </div>
                    </div>
                    <div class="balance-col">
                        <span class="balance-amount">${parseFloat(miner.total).toFixed(6)}</span>
                        <span class="balance-currency">RSC</span>
                    </div>
                    <div class="period-col">
                        <span class="period-label">${this.getPeriodLabel(this.currentPeriod)}</span>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        content.innerHTML = html;
        
        // Actualizar paginación
        this.updatePagination();
    }
    
    async loadQuickStats() {
        try {
            const stats = await window.rscBackend.getSystemStats();
            
            if (stats) {
                document.getElementById('total-miners').textContent = stats.users || 0;
                document.getElementById('total-mined').textContent = `${parseFloat(stats.mined || 0).toFixed(6)} RSC`;
                
                // Obtener mejor minero
                const topMiners = await window.rscBackend.getTop10Miners(this.currentPeriod);
                if (topMiners && topMiners.length > 0) {
                    const bestMiner = topMiners[0];
                    document.getElementById('best-miner').textContent = this.maskEmail(bestMiner.email);
                }
            }
        } catch (error) {
            console.error('Error cargando estadísticas rápidas:', error);
        }
    }
    
    updatePagination() {
        const pagination = document.getElementById('leaderboard-pagination');
        if (!pagination) return;
        
        // Por ahora, mostrar paginación básica
        // En el futuro, esto se puede expandir con datos reales del backend
        pagination.style.display = 'block';
        
        // Actualizar información de paginación
        const info = document.getElementById('pagination-info');
        if (info) {
            info.textContent = `Página ${this.currentPage}`;
        }
        
        // Habilitar/deshabilitar botones
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        
        if (prevBtn) prevBtn.disabled = this.currentPage <= 1;
        if (nextBtn) nextBtn.disabled = this.leaderboardData.length < this.pageSize;
    }
    
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.loadLeaderboard();
        }
    }
    
    nextPage() {
        this.currentPage++;
        this.loadLeaderboard();
    }
    
    refreshLeaderboard() {
        this.currentPage = 1;
        this.loadLeaderboard();
    }
    
    startAutoRefresh() {
        // Actualizar cada 2 minutos
        this.autoRefreshInterval = setInterval(() => {
            this.loadLeaderboard();
        }, 2 * 60 * 1000);
    }
    
    stopAutoRefresh() {
        if (this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval);
            this.autoRefreshInterval = null;
        }
    }
    
    // ===== UTILIDADES =====
    
    showLoading(show) {
        const loading = document.getElementById('leaderboard-loading');
        const content = document.getElementById('leaderboard-content');
        
        if (loading) loading.style.display = show ? 'block' : 'none';
        if (content) content.style.display = show ? 'none' : 'block';
    }
    
    showError(message) {
        const content = document.getElementById('leaderboard-content');
        if (content) {
            content.innerHTML = `
                <div class="leaderboard-error">
                    <div class="error-icon">❌</div>
                    <h3>Error</h3>
                    <p>${message}</p>
                    <button onclick="leaderboardComponent.loadLeaderboard()" class="retry-btn">
                        Reintentar
                    </button>
                </div>
            `;
        }
    }
    
    getRankIcon(rank) {
        const icons = {
            1: '🥇',
            2: '🥈',
            3: '🥉'
        };
        return icons[rank] || '';
    }
    
    maskEmail(email) {
        if (!email) return 'N/A';
        const [username, domain] = email.split('@');
        if (username.length <= 2) return email;
        return `${username.substring(0, 2)}***@${domain}`;
    }
    
    getPeriodLabel(period) {
        const labels = {
            day: 'Hoy',
            week: 'Esta Semana',
            month: 'Este Mes',
            all: 'Todos los Tiempos'
        };
        return labels[period] || period;
    }
    
    // ===== ESTILOS =====
    
    applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .leaderboard-wrapper {
                background: linear-gradient(135deg, #1a1a2e, #16213e);
                border-radius: 16px;
                padding: 24px;
                margin: 20px 0;
                box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                border: 1px solid rgba(255,255,255,0.1);
            }
            
            .leaderboard-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 24px;
                flex-wrap: wrap;
                gap: 16px;
            }
            
            .leaderboard-title {
                color: #ffffff;
                font-size: 28px;
                font-weight: 700;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .title-icon {
                font-size: 32px;
            }
            
            .leaderboard-controls {
                display: flex;
                gap: 16px;
                align-items: center;
            }
            
            .period-selector {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .period-selector label {
                color: #e2e8f0;
                font-weight: 500;
            }
            
            .period-select {
                background: rgba(255,255,255,0.1);
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 8px;
                padding: 8px 12px;
                color: #ffffff;
                font-size: 14px;
                cursor: pointer;
            }
            
            .refresh-btn {
                background: linear-gradient(135deg, #7657fc, #10b981);
                border: none;
                border-radius: 8px;
                padding: 10px 16px;
                color: white;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.3s ease;
            }
            
            .refresh-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 16px rgba(117, 87, 252, 0.4);
            }
            
            .loading-state {
                text-align: center;
                padding: 40px;
                color: #e2e8f0;
            }
            
            .loading-spinner {
                width: 40px;
                height: 40px;
                border: 4px solid rgba(255,255,255,0.1);
                border-top: 4px solid #7657fc;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 16px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .leaderboard-table {
                background: rgba(255,255,255,0.05);
                border-radius: 12px;
                overflow: hidden;
                border: 1px solid rgba(255,255,255,0.1);
            }
            
            .leaderboard-row {
                display: grid;
                grid-template-columns: 80px 1fr 200px 150px;
                gap: 16px;
                padding: 16px 20px;
                align-items: center;
                border-bottom: 1px solid rgba(255,255,255,0.1);
                transition: background-color 0.3s ease;
            }
            
            .leaderboard-row:hover {
                background: rgba(255,255,255,0.05);
            }
            
            .leaderboard-row.header {
                background: rgba(117, 87, 252, 0.2);
                font-weight: 600;
                color: #ffffff;
                border-bottom: 2px solid rgba(117, 87, 252, 0.5);
            }
            
            .rank-col {
                text-align: center;
                font-weight: 600;
            }
            
            .rank-number {
                font-size: 18px;
                color: #ffffff;
            }
            
            .rank-1 .rank-number { color: #ffd700; }
            .rank-2 .rank-number { color: #c0c0c0; }
            .rank-3 .rank-number { color: #cd7f32; }
            
            .miner-col {
                color: #ffffff;
            }
            
            .miner-info {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }
            
            .miner-email {
                font-weight: 600;
                font-size: 16px;
            }
            
            .miner-id {
                font-size: 12px;
                color: #94a3b8;
                font-family: monospace;
            }
            
            .balance-col {
                text-align: center;
                color: #ffffff;
            }
            
            .balance-amount {
                font-size: 18px;
                font-weight: 700;
                color: #10b981;
            }
            
            .balance-currency {
                font-size: 12px;
                color: #94a3b8;
                margin-left: 4px;
            }
            
            .period-col {
                text-align: center;
                color: #e2e8f0;
                font-size: 14px;
            }
            
            .leaderboard-pagination {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 24px;
                padding: 16px 0;
                border-top: 1px solid rgba(255,255,255,0.1);
            }
            
            .pagination-info {
                color: #e2e8f0;
                font-size: 14px;
            }
            
            .pagination-controls {
                display: flex;
                gap: 12px;
            }
            
            .pagination-btn {
                background: rgba(255,255,255,0.1);
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 6px;
                padding: 8px 16px;
                color: #ffffff;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .pagination-btn:hover:not(:disabled) {
                background: rgba(255,255,255,0.2);
            }
            
            .pagination-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            .quick-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-top: 24px;
                padding: 20px;
                background: rgba(255,255,255,0.05);
                border-radius: 12px;
                border: 1px solid rgba(255,255,255,0.1);
            }
            
            .stat-item {
                display: flex;
                align-items: center;
                gap: 12px;
                color: #ffffff;
            }
            
            .stat-icon {
                font-size: 24px;
            }
            
            .stat-label {
                font-weight: 500;
                color: #e2e8f0;
            }
            
            .stat-value {
                font-weight: 700;
                color: #10b981;
                margin-left: auto;
            }
            
            .leaderboard-empty, .leaderboard-error {
                text-align: center;
                padding: 60px 20px;
                color: #e2e8f0;
            }
            
            .empty-icon, .error-icon {
                font-size: 48px;
                margin-bottom: 16px;
                display: block;
            }
            
            .retry-btn {
                background: linear-gradient(135deg, #7657fc, #10b981);
                border: none;
                border-radius: 8px;
                padding: 12px 24px;
                color: white;
                font-weight: 600;
                cursor: pointer;
                margin-top: 16px;
                transition: all 0.3s ease;
            }
            
            .retry-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 16px rgba(117, 87, 252, 0.4);
            }
            
            @media (max-width: 768px) {
                .leaderboard-header {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .leaderboard-controls {
                    justify-content: center;
                }
                
                .leaderboard-row {
                    grid-template-columns: 60px 1fr 120px;
                    gap: 12px;
                    padding: 12px 16px;
                }
                
                .period-col {
                    display: none;
                }
                
                .quick-stats {
                    grid-template-columns: 1fr;
                    gap: 16px;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // ===== MÉTODOS PÚBLICOS =====
    
    // Cambiar período
    setPeriod(period) {
        this.currentPeriod = period;
        this.currentPage = 1;
        this.loadLeaderboard();
    }
    
    // Cambiar página
    setPage(page) {
        this.currentPage = page;
        this.loadLeaderboard();
    }
    
    // Destruir componente
    destroy() {
        this.stopAutoRefresh();
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

// ===== INICIALIZACIÓN GLOBAL =====

// Crear instancia global
window.leaderboardComponent = new LeaderboardComponent();

console.log('🏆 Componente de Leaderboard cargado');

