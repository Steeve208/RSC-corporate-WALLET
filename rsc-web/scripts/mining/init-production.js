/**
 * ===== PRODUCTION INITIALIZATION SCRIPT =====
 * Este script asegura que todo esté inicializado correctamente para producción
 * Se carga después de supabase-config.js y antes de otros scripts
 */

(function() {
    'use strict';
    
    console.log('🚀 Inicializando plataforma de minería para producción...');
    
    // Verificar que Supabase esté configurado
    if (!window.SUPABASE_CONFIG) {
        console.warn('⚠️ SUPABASE_CONFIG no encontrado. Usando valores por defecto.');
        window.SUPABASE_CONFIG = {
            url: 'https://unevdceponbnmhvpzlzf.supabase.co',
            anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuZXZkY2Vwb25ibm1odnB6bHpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5MTIyMTksImV4cCI6MjA3MTQ4ODIxOX0.OLHbZrezgBiXWQplN1jrGD_xkARqG2uD8ECqzo05jE4'
        };
    }
    
    // Esperar a que Supabase Integration esté listo
    function waitForSupabaseIntegration(callback) {
        let attempts = 0;
        const maxAttempts = 50;
        
        const checkInterval = setInterval(() => {
            attempts++;
            
            if (window.supabaseIntegration) {
                clearInterval(checkInterval);
                console.log('✅ Supabase Integration detectado');
                if (callback) callback();
            } else if (attempts >= maxAttempts) {
                clearInterval(checkInterval);
                console.error('❌ Supabase Integration no disponible después de esperar');
            }
        }, 100);
    }
    
    // Esperar a que el adapter esté listo
    function waitForAdapter(callback) {
        let attempts = 0;
        const maxAttempts = 50;
        
        const checkInterval = setInterval(() => {
            attempts++;
            
            if (window.miningSupabaseAdapter && window.miningSupabaseAdapter.initialized) {
                clearInterval(checkInterval);
                console.log('✅ Mining Supabase Adapter inicializado');
                if (callback) callback();
            } else if (attempts >= maxAttempts) {
                clearInterval(checkInterval);
                console.warn('⚠️ Mining Supabase Adapter no disponible');
            }
        }, 100);
    }
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            waitForSupabaseIntegration(() => {
                waitForAdapter(() => {
                    console.log('✅ Plataforma de minería lista para producción');
                    // Disparar evento de inicialización completa
                    window.dispatchEvent(new CustomEvent('miningPlatformReady'));
                });
            });
        });
    } else {
        waitForSupabaseIntegration(() => {
            waitForAdapter(() => {
                console.log('✅ Plataforma de minería lista para producción');
                window.dispatchEvent(new CustomEvent('miningPlatformReady'));
            });
        });
    }
    
    // Exponer función global para verificar estado
    window.checkMiningPlatformStatus = function() {
        return {
            supabaseConfig: !!window.SUPABASE_CONFIG,
            supabaseIntegration: !!window.supabaseIntegration,
            adapter: !!window.miningSupabaseAdapter,
            adapterInitialized: window.miningSupabaseAdapter?.initialized || false,
            userAuthenticated: window.supabaseIntegration?.user?.isAuthenticated || false
        };
    };
    
    console.log('📋 Script de inicialización de producción cargado');
})();

