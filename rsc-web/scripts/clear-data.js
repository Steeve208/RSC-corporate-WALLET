/**
 * CLEAR DATA SCRIPT
 * 
 * Script para limpiar todos los datos y forzar autenticación
 * Útil para testing y desarrollo
 */

// Función para limpiar todos los datos
function clearAllData() {
    console.log('🧹 Limpiando todos los datos...');
    
    // Limpiar localStorage
    localStorage.removeItem('rsc_user');
    localStorage.removeItem('rsc_user_id');
    localStorage.removeItem('rsc_users');
    localStorage.removeItem('rsc_wallet_balance');
    localStorage.removeItem('rsc_mining_session');
    localStorage.removeItem('rsc_mining_stats');
    localStorage.removeItem('rsc_mining_config');
    
    // Limpiar sessionStorage
    sessionStorage.clear();
    
    console.log('✅ Todos los datos limpiados');
    
    // Recargar página
    window.location.reload();
}

// Función para mostrar datos actuales
function showCurrentData() {
    console.log('📊 Datos actuales en localStorage:');
    console.log('rsc_user:', localStorage.getItem('rsc_user'));
    console.log('rsc_user_id:', localStorage.getItem('rsc_user_id'));
    console.log('rsc_wallet_balance:', localStorage.getItem('rsc_wallet_balance'));
    console.log('rsc_mining_session:', localStorage.getItem('rsc_mining_session'));
}

// Función para forzar logout
function forceLogout() {
    if (window.RSCAuth) {
        window.RSCAuth.clearAllData();
    } else {
        clearAllData();
    }
}

// Agregar funciones al objeto window para uso en consola
window.clearAllData = clearAllData;
window.showCurrentData = showCurrentData;
window.forceLogout = forceLogout;

console.log('🔧 Script de limpieza cargado');
console.log('💡 Usa clearAllData() para limpiar todos los datos');
console.log('💡 Usa showCurrentData() para ver datos actuales');
console.log('💡 Usa forceLogout() para forzar logout');
