/* Script de prueba para verificar la descarga del APK */
const http = require('http');
const fs = require('fs');
const path = require('path');

const testUrl = 'http://localhost:3000/downloads/rsc-mining.apk';
const outputPath = path.join(__dirname, 'test-downloaded.apk');

console.log('🧪 Probando descarga de APK desde:', testUrl);

http.get(testUrl, (res) => {
    console.log('📥 Estado de respuesta:', res.statusCode);
    console.log('📋 Headers:', res.headers);
    
    if (res.statusCode !== 200) {
        console.error('❌ Error: Estado', res.statusCode);
        res.resume();
        return;
    }
    
    const fileStream = fs.createWriteStream(outputPath);
    let downloadedBytes = 0;
    
    res.on('data', (chunk) => {
        downloadedBytes += chunk.length;
        process.stdout.write(`\r📦 Descargados: ${(downloadedBytes / 1024 / 1024).toFixed(2)} MB`);
    });
    
    res.pipe(fileStream);
    
    fileStream.on('finish', () => {
        fileStream.close();
        console.log('\n✅ Descarga completada');
        
        // Verificar el archivo descargado
        const originalPath = path.join(__dirname, 'public', 'downloads', 'rsc-mining.apk');
        const originalStats = fs.statSync(originalPath);
        const downloadedStats = fs.statSync(outputPath);
        
        console.log('\n📊 Comparación:');
        console.log('   Original:', originalStats.size, 'bytes');
        console.log('   Descargado:', downloadedStats.size, 'bytes');
        
        if (originalStats.size === downloadedStats.size) {
            console.log('✅ Los tamaños coinciden - archivo descargado correctamente');
            
            // Verificar firma ZIP (APK)
            const buffer = fs.readFileSync(outputPath);
            const signature = buffer.slice(0, 2).toString('ascii');
            console.log('🔍 Firma del archivo:', signature);
            
            if (signature === 'PK') {
                console.log('✅ Archivo APK válido (firma ZIP correcta)');
            } else {
                console.log('❌ Archivo corrupto - firma incorrecta:', signature);
            }
        } else {
            console.log('❌ ERROR: Los tamaños NO coinciden - archivo corrupto o incompleto');
        }
        
        // Limpiar archivo de prueba
        fs.unlinkSync(outputPath);
        console.log('\n🧹 Archivo de prueba eliminado');
    });
    
}).on('error', (err) => {
    console.error('❌ Error en la petición:', err.message);
    console.log('💡 Asegúrate de que el servidor esté corriendo en http://localhost:3000');
});

