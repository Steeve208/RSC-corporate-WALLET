#!/usr/bin/env node

/**
 * Script de inicio rápido para RSC Mining Backend
 * Uso: node quick-start.js
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Inicio Rápido - RSC Mining Backend v2.0.0\n');

async function quickStart() {
  try {
    console.log('📋 Verificando requisitos...');
    
    // Verificar si Docker está instalado
    console.log('🐳 Verificando Docker...');
    try {
      await execCommand('docker --version');
      console.log('  ✅ Docker está instalado');
    } catch (error) {
      console.log('  ❌ Docker no está instalado');
      console.log('  💡 Instala Docker Desktop desde: https://docker.com');
      return;
    }
    
    // Verificar si docker-compose está disponible
    console.log('📦 Verificando docker-compose...');
    try {
      await execCommand('docker-compose --version');
      console.log('  ✅ docker-compose está disponible');
    } catch (error) {
      console.log('  ❌ docker-compose no está disponible');
      console.log('  💡 Instala docker-compose o usa Docker Desktop');
      return;
    }
    
    console.log('');
    console.log('🚀 Iniciando servicios...');
    
    // Iniciar solo PostgreSQL primero
    console.log('🗄️ Iniciando PostgreSQL...');
    try {
      await execCommand('docker-compose up -d postgres');
      console.log('  ✅ PostgreSQL iniciado');
      
      // Esperar un poco para que PostgreSQL esté listo
      console.log('  ⏳ Esperando que PostgreSQL esté listo...');
      await new Promise(resolve => setTimeout(resolve, 5000));
      
    } catch (error) {
      console.log('  ❌ Error iniciando PostgreSQL:', error.message);
      return;
    }
    
    // Ejecutar migraciones
    console.log('📊 Ejecutando migraciones...');
    try {
      await execCommand('npm run migrate');
      console.log('  ✅ Migraciones ejecutadas');
    } catch (error) {
      console.log('  ❌ Error ejecutando migraciones:', error.message);
      console.log('  💡 Verifica que PostgreSQL esté ejecutándose');
      return;
    }
    
    // Iniciar el backend
    console.log('⚡ Iniciando backend...');
    try {
      console.log('  💡 El backend se iniciará en modo desarrollo');
      console.log('  💡 Presiona Ctrl+C para detener');
      console.log('');
      
      // Iniciar el servidor en modo desarrollo
      const child = exec('npm run dev', { stdio: 'inherit' });
      
      child.on('error', (error) => {
        console.error('❌ Error iniciando backend:', error.message);
      });
      
      child.on('exit', (code) => {
        if (code === 0) {
          console.log('✅ Backend detenido correctamente');
        } else {
          console.log(`❌ Backend detenido con código: ${code}`);
        }
      });
      
    } catch (error) {
      console.log('  ❌ Error iniciando backend:', error.message);
    }
    
  } catch (error) {
    console.error('💥 Error durante el inicio rápido:', error.message);
  }
}

function execCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}

// Manejar señales de terminación
process.on('SIGINT', () => {
  console.log('\n🛑 Deteniendo servicios...');
  execCommand('docker-compose down')
    .then(() => {
      console.log('✅ Servicios detenidos');
      process.exit(0);
    })
    .catch(() => {
      console.log('⚠️ Error deteniendo servicios');
      process.exit(1);
    });
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Deteniendo servicios...');
  execCommand('docker-compose down')
    .then(() => {
      console.log('✅ Servicios detenidos');
      process.exit(0);
    })
    .catch(() => {
      console.log('⚠️ Error deteniendo servicios');
      process.exit(1);
    });
});

// Ejecutar inicio rápido
quickStart();
