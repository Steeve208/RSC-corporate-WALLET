/* ===== SCRIPT PARA ACTUALIZAR TODAS LAS PÁGINAS DE MINING CON MÓVIL ===== */
/* Este script actualiza todas las páginas HTML para incluir los estilos y scripts móviles */

const fs = require('fs');
const path = require('path');

const miningPagesDir = path.join(__dirname, '../pages/mining');
const pagesToUpdate = [
    'dashboard.html',
    'control.html',
    'analytics.html',
    'earnings.html',
    'transactions.html',
    'pools.html',
    'referrals.html',
    'settings.html',
    'api.html',
    'support.html'
];

function updatePage(fileName) {
    const filePath = path.join(miningPagesDir, fileName);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Archivo no encontrado: ${fileName}`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // 1. Actualizar viewport meta tag
    const viewportRegex = /<meta\s+name="viewport"\s+content="[^"]*">/i;
    const newViewport = '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">\n    <meta name="apple-mobile-web-app-capable" content="yes">\n    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">\n    <meta name="theme-color" content="#000000">';
    
    if (viewportRegex.test(content)) {
        content = content.replace(viewportRegex, newViewport);
        updated = true;
    }
    
    // 2. Agregar estilos móviles antes de closing </head>
    const stylesToAdd = `    <link rel="stylesheet" href="../../styles/mining-platform.css?v=1.0">
    <link rel="stylesheet" href="../../styles/mining-mobile-app.css?v=1.0">`;
    
    if (!content.includes('mining-mobile-app.css')) {
        // Buscar el último link de estilos antes de </head>
        const lastStyleRegex = /(<link[^>]*rel="stylesheet"[^>]*>)(\s*<\/head>)/i;
        const match = content.match(lastStyleRegex);
        
        if (match) {
            content = content.replace(lastStyleRegex, `$1\n${stylesToAdd}$2`);
            updated = true;
        } else {
            // Si no hay estilos, agregar antes de </head>
            content = content.replace('</head>', `    ${stylesToAdd}\n</head>`);
            updated = true;
        }
    }
    
    // 3. Agregar script móvil antes de closing </body>
    const scriptToAdd = '    <script src="../../scripts/mining-mobile-app.js?v=1.0"></script>';
    
    if (!content.includes('mining-mobile-app.js')) {
        // Buscar el último script antes de </body>
        const lastScriptRegex = /(<script[^>]*><\/script>)(\s*<\/body>)/i;
        const match = content.match(lastScriptRegex);
        
        if (match) {
            content = content.replace(lastScriptRegex, `$1\n${scriptToAdd}$2`);
            updated = true;
        } else {
            // Si no hay scripts, agregar antes de </body>
            content = content.replace('</body>', `${scriptToAdd}\n</body>`);
            updated = true;
        }
    }
    
    if (updated) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Actualizado: ${fileName}`);
    } else {
        console.log(`ℹ️  Sin cambios: ${fileName}`);
    }
}

// Ejecutar actualizaciones
console.log('🚀 Actualizando páginas de mining con soporte móvil...\n');

pagesToUpdate.forEach(updatePage);

console.log('\n✨ ¡Actualización completada!');

