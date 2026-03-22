// Script para verificar datos de minería
console.log('🔍 Verificando datos de minería...');

// Verificar localStorage
const userData = localStorage.getItem('rsc_user_data');
const miningSession = localStorage.getItem('rsc_mining_session');
const lastUpdate = localStorage.getItem('rsc_last_mining_update');

console.log('📊 Datos del usuario:', userData ? JSON.parse(userData) : 'No encontrado');
console.log('⛏️ Sesión de minería:', miningSession ? JSON.parse(miningSession) : 'No encontrado');
console.log('⏰ Última actualización:', lastUpdate ? new Date(parseInt(lastUpdate)) : 'No encontrado');

// Calcular tiempo transcurrido si hay sesión
if (miningSession) {
    const session = JSON.parse(miningSession);
    const startTime = new Date(session.startTime);
    const now = new Date();
    const elapsed = now - startTime;
    const elapsedHours = elapsed / (1000 * 60 * 60);
    
    console.log('⏱️ Tiempo transcurrido:', elapsedHours.toFixed(2), 'horas');
    console.log('📅 Inicio de sesión:', startTime.toLocaleString());
    console.log('📅 Fecha actual:', now.toLocaleString());
    
    // Calcular tokens esperados
    const baseRatePerHour = 5.25 / 24; // RSC por hora
    const expectedTokens = elapsedHours * baseRatePerHour;
    console.log('💰 Tokens esperados:', expectedTokens.toFixed(6), 'RSC');
}

