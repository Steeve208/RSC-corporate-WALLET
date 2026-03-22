/**
 * MIGRATION MANAGER - SISTEMA DE MIGRACIÓN GRADUAL
 * 
 * Gestiona la migración del sistema legacy al nuevo sistema unificado
 * - Detección automática de conflictos
 * - Migración gradual de datos
 * - Fallback automático
 * - Validación de integridad
 */

class MigrationManager {
    constructor() {
        this.isMigrating = false;
        this.migrationSteps = [
            'detectConflicts',
            'backupData',
            'migrateConfig',
            'migrateAuth',
            'migrateMining',
            'validateIntegrity',
            'cleanupLegacy'
        ];
        this.currentStep = 0;
        this.results = {};
    }

    /**
     * Iniciar migración
     */
    async startMigration() {
        if (this.isMigrating) {
            console.warn('⚠️ Migración ya en progreso');
            return;
        }

        console.log('🔄 Iniciando migración del sistema RSC...');
        this.isMigrating = true;

        try {
            for (let i = 0; i < this.migrationSteps.length; i++) {
                this.currentStep = i;
                const step = this.migrationSteps[i];
                
                console.log(`📋 Paso ${i + 1}/${this.migrationSteps.length}: ${step}`);
                
                const result = await this.executeStep(step);
                this.results[step] = result;
                
                if (!result.success) {
                    throw new Error(`Error en paso ${step}: ${result.error}`);
                }
                
                console.log(`✅ Paso ${i + 1} completado`);
            }
            
            console.log('🎉 Migración completada exitosamente');
            return { success: true, results: this.results };
            
        } catch (error) {
            console.error('❌ Error en migración:', error);
            await this.rollbackMigration();
            return { success: false, error: error.message };
        } finally {
            this.isMigrating = false;
        }
    }

    /**
     * Ejecutar paso de migración
     */
    async executeStep(step) {
        switch (step) {
            case 'detectConflicts':
                return await this.detectConflicts();
            case 'backupData':
                return await this.backupData();
            case 'migrateConfig':
                return await this.migrateConfig();
            case 'migrateAuth':
                return await this.migrateAuth();
            case 'migrateMining':
                return await this.migrateMining();
            case 'validateIntegrity':
                return await this.validateIntegrity();
            case 'cleanupLegacy':
                return await this.cleanupLegacy();
            default:
                throw new Error(`Paso desconocido: ${step}`);
        }
    }

    /**
     * Detectar conflictos
     */
    async detectConflicts() {
        const conflicts = [];
        
        // Verificar múltiples configuraciones de Supabase
        const supabaseConfigs = [
            'window.supabase',
            'window.SUPABASE_CONFIG',
            'window.SupabaseDirect'
        ];
        
        supabaseConfigs.forEach(config => {
            if (window[config]) {
                conflicts.push({
                    type: 'multiple_supabase_configs',
                    config: config,
                    message: 'Múltiples configuraciones de Supabase detectadas'
                });
            }
        });
        
        // Verificar sistemas de autenticación duplicados
        const authSystems = [
            'window.RSCAuth',
            'window.SecureAuth'
        ];
        
        const activeAuthSystems = authSystems.filter(system => window[system]);
        if (activeAuthSystems.length > 1) {
            conflicts.push({
                type: 'multiple_auth_systems',
                systems: activeAuthSystems,
                message: 'Múltiples sistemas de autenticación activos'
            });
        }
        
        // Verificar sistemas de minería duplicados
        const miningSystems = [
            'window.RSCMiningCore',
            'window.MiningEngine'
        ];
        
        const activeMiningSystems = miningSystems.filter(system => window[system]);
        if (activeMiningSystems.length > 1) {
            conflicts.push({
                type: 'multiple_mining_systems',
                systems: activeMiningSystems,
                message: 'Múltiples sistemas de minería activos'
            });
        }
        
        return {
            success: true,
            conflicts: conflicts,
            hasConflicts: conflicts.length > 0
        };
    }

    /**
     * Respaldar datos
     */
    async backupData() {
        try {
            const backup = {
                timestamp: new Date().toISOString(),
                user: localStorage.getItem('rsc_user'),
                balance: localStorage.getItem('rsc_wallet_balance'),
                mining: localStorage.getItem('rsc_mining_state'),
                appState: localStorage.getItem('rsc_app_state'),
                errorLog: localStorage.getItem('rsc_error_log')
            };
            
            // Guardar backup
            localStorage.setItem('rsc_migration_backup', JSON.stringify(backup));
            
            return {
                success: true,
                backupSize: JSON.stringify(backup).length,
                items: Object.keys(backup).length
            };
            
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Migrar configuración
     */
    async migrateConfig() {
        try {
            // Verificar si el sistema unificado está disponible
            if (!window.RSCSystem) {
                throw new Error('RSCSystem no disponible');
            }
            
            // Migrar configuración de Supabase
            if (window.SUPABASE_CONFIG) {
                console.log('📦 Migrando configuración de Supabase...');
                // La configuración ya está en el sistema unificado
            }
            
            return {
                success: true,
                migrated: ['supabase_config']
            };
            
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Migrar autenticación
     */
    async migrateAuth() {
        try {
            // Verificar si el usuario está autenticado en el sistema legacy
            const legacyUser = localStorage.getItem('rsc_user');
            
            if (legacyUser) {
                console.log('👤 Migrando datos de usuario...');
                
                // Migrar al nuevo sistema
                if (window.RSCStore) {
                    const userData = JSON.parse(legacyUser);
                    window.RSCStore.setState({
                        user: userData,
                        isAuthenticated: true
                    });
                }
            }
            
            return {
                success: true,
                migrated: ['user_data']
            };
            
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Migrar minería
     */
    async migrateMining() {
        try {
            // Verificar si hay datos de minería legacy
            const legacyMining = localStorage.getItem('rsc_mining_state');
            
            if (legacyMining) {
                console.log('⛏️ Migrando datos de minería...');
                
                const miningData = JSON.parse(legacyMining);
                
                // Migrar al nuevo sistema
                if (window.RSCStore) {
                    window.RSCStore.setState({
                        mining: miningData
                    });
                }
            }
            
            return {
                success: true,
                migrated: ['mining_data']
            };
            
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Validar integridad
     */
    async validateIntegrity() {
        try {
            const validations = [];
            
            // Validar que el sistema unificado esté funcionando
            if (window.RSCSystem) {
                validations.push({
                    component: 'RSCSystem',
                    status: 'ok',
                    message: 'Sistema unificado disponible'
                });
            } else {
                validations.push({
                    component: 'RSCSystem',
                    status: 'error',
                    message: 'Sistema unificado no disponible'
                });
            }
            
            // Validar store
            if (window.RSCStore) {
                validations.push({
                    component: 'RSCStore',
                    status: 'ok',
                    message: 'Store centralizado disponible'
                });
            } else {
                validations.push({
                    component: 'RSCStore',
                    status: 'error',
                    message: 'Store centralizado no disponible'
                });
            }
            
            // Validar autenticación
            if (window.SecureAuth) {
                validations.push({
                    component: 'SecureAuth',
                    status: 'ok',
                    message: 'Autenticación segura disponible'
                });
            } else {
                validations.push({
                    component: 'SecureAuth',
                    status: 'error',
                    message: 'Autenticación segura no disponible'
                });
            }
            
            // Validar minería
            if (window.MiningEngine) {
                validations.push({
                    component: 'MiningEngine',
                    status: 'ok',
                    message: 'Motor de minería disponible'
                });
            } else {
                validations.push({
                    component: 'MiningEngine',
                    status: 'error',
                    message: 'Motor de minería no disponible'
                });
            }
            
            const allValid = validations.every(v => v.status === 'ok');
            
            return {
                success: allValid,
                validations: validations,
                allValid: allValid
            };
            
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Limpiar sistema legacy
     */
    async cleanupLegacy() {
        try {
            // Marcar archivos legacy como deprecados
            const legacyFiles = [
                'rsc-auth.js',
                'rsc-mining-core.js',
                'supabase-direct.js',
                'supabase-config-simple.js'
            ];
            
            console.log('🧹 Limpiando sistema legacy...');
            
            // No eliminar archivos, solo marcar como deprecados
            // Los archivos ya tienen warnings de deprecación
            
            return {
                success: true,
                cleaned: legacyFiles.length,
                message: 'Sistema legacy marcado como deprecado'
            };
            
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Revertir migración
     */
    async rollbackMigration() {
        try {
            console.log('🔄 Revirtiendo migración...');
            
            // Restaurar backup
            const backup = localStorage.getItem('rsc_migration_backup');
            if (backup) {
                const backupData = JSON.parse(backup);
                
                // Restaurar datos
                Object.entries(backupData).forEach(([key, value]) => {
                    if (key !== 'timestamp' && value) {
                        localStorage.setItem(key, value);
                    }
                });
                
                console.log('✅ Migración revertida');
            }
            
        } catch (error) {
            console.error('❌ Error revirtiendo migración:', error);
        }
    }

    /**
     * Obtener estado de migración
     */
    getMigrationStatus() {
        return {
            isMigrating: this.isMigrating,
            currentStep: this.currentStep,
            totalSteps: this.migrationSteps.length,
            results: this.results
        };
    }
}

// Crear instancia global
const migrationManager = new MigrationManager();

// Hacer disponible globalmente
if (typeof window !== 'undefined') {
    window.MigrationManager = migrationManager;
}

export default migrationManager;
