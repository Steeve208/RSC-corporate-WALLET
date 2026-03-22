#!/usr/bin/env node

/**
 * Script para ejecutar migraciones de la base de datos RSC Mining
 * Uso: node migrations/run-migrations.js
 */

const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Cargar variables de entorno
require('dotenv').config();

// Configuración de la base de datos
const dbConfig = {
  connectionString: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/rsc'
};

// Pool de conexión
const pool = new Pool(dbConfig);

// Lista de migraciones en orden
const migrations = [
  {
    name: '001_init.sql',
    description: 'Migración inicial - Crear tablas y estructura base'
  },
  {
    name: '002_create_admin.sql',
    description: 'Crear administrador inicial y funciones adicionales'
  }
];

/**
 * Ejecuta una migración específica
 * @param {string} migrationFile - Nombre del archivo de migración
 * @param {string} description - Descripción de la migración
 */
async function runMigration(migrationFile, description) {
  const client = await pool.connect();
  
  try {
    console.log(`🔄 Ejecutando migración: ${migrationFile}`);
    console.log(`📝 Descripción: ${description}`);
    
    // Leer archivo de migración
    const migrationPath = path.join(__dirname, migrationFile);
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    // Ejecutar migración
    await client.query('BEGIN');
    
    // Dividir el SQL en comandos individuales
    const commands = migrationSQL
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));
    
    for (const command of commands) {
      if (command.trim()) {
        try {
          await client.query(command);
        } catch (error) {
          // Ignorar errores de "ya existe" para extensiones y tablas
          if (error.code === '42710' || error.code === '42P07') {
            console.log(`⚠️  Ignorando error de "ya existe": ${error.message}`);
          } else {
            throw error;
          }
        }
      }
    }
    
    await client.query('COMMIT');
    console.log(`✅ Migración completada: ${migrationFile}`);
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`❌ Error ejecutando migración ${migrationFile}:`, error.message);
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Verifica si una migración ya fue ejecutada
 * @param {string} migrationName - Nombre de la migración
 * @returns {boolean} True si ya fue ejecutada
 */
async function isMigrationExecuted(migrationName) {
  const client = await pool.connect();
  
  try {
    // Crear tabla de migraciones si no existe
    await client.query(`
      CREATE TABLE IF NOT EXISTS migration_history (
        id SERIAL PRIMARY KEY,
        migration_name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT NOW(),
        status VARCHAR(20) DEFAULT 'completed'
      )
    `);
    
    // Verificar si la migración ya fue ejecutada
    const { rows } = await client.query(
      'SELECT id FROM migration_history WHERE migration_name = $1 AND status = $2',
      [migrationName, 'completed']
    );
    
    return rows.length > 0;
    
  } catch (error) {
    console.error('Error verificando migración:', error.message);
    return false;
  } finally {
    client.release();
  }
}

/**
 * Marca una migración como ejecutada
 * @param {string} migrationName - Nombre de la migración
 * @param {string} status - Estado de la migración
 */
async function markMigrationExecuted(migrationName, status = 'completed') {
  const client = await pool.connect();
  
  try {
    await client.query(`
      INSERT INTO migration_history (migration_name, status)
      VALUES ($1, $2)
      ON CONFLICT (migration_name) 
      DO UPDATE SET status = $2, executed_at = NOW()
    `, [migrationName, status]);
    
  } catch (error) {
    console.error('Error marcando migración como ejecutada:', error.message);
  } finally {
    client.release();
  }
}

/**
 * Ejecuta todas las migraciones pendientes
 */
async function runAllMigrations() {
  console.log('🚀 Iniciando ejecución de migraciones RSC Mining...\n');
  
  try {
    // Verificar conexión a la base de datos
    const client = await pool.connect();
    console.log('✅ Conexión a la base de datos establecida');
    client.release();
    
    // Ejecutar migraciones en orden
    for (const migration of migrations) {
      const alreadyExecuted = await isMigrationExecuted(migration.name);
      
      if (alreadyExecuted) {
        console.log(`⏭️  Migración ya ejecutada: ${migration.name}`);
        continue;
      }
      
      try {
        await runMigration(migration.name, migration.description);
        await markMigrationExecuted(migration.name, 'completed');
        console.log('');
      } catch (error) {
        console.error(`❌ Falló la migración: ${migration.name}`);
        await markMigrationExecuted(migration.name, 'failed');
        throw error;
      }
    }
    
    console.log('🎉 Todas las migraciones han sido ejecutadas exitosamente!');
    
  } catch (error) {
    console.error('\n💥 Error durante la ejecución de migraciones:');
    console.error(error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

/**
 * Ejecuta una migración específica por nombre
 * @param {string} migrationName - Nombre de la migración a ejecutar
 */
async function runSpecificMigration(migrationName) {
  const migration = migrations.find(m => m.name === migrationName);
  
  if (!migration) {
    console.error(`❌ Migración no encontrada: ${migrationName}`);
    console.log('Migraciones disponibles:');
    migrations.forEach(m => console.log(`  - ${m.name}: ${m.description}`));
    process.exit(1);
  }
  
  console.log(`🎯 Ejecutando migración específica: ${migrationName}\n`);
  
  try {
    await runMigration(migration.name, migration.description);
    await markMigrationExecuted(migration.name, 'completed');
    console.log('\n✅ Migración específica completada!');
    
  } catch (error) {
    console.error(`\n💥 Error ejecutando migración específica: ${error.message}`);
    await markMigrationExecuted(migration.name, 'failed');
    process.exit(1);
  } finally {
    await pool.end();
  }
}

/**
 * Muestra el estado de las migraciones
 */
async function showMigrationStatus() {
  console.log('📊 Estado de las migraciones RSC Mining:\n');
  
  try {
    const client = await pool.connect();
    
    // Crear tabla si no existe
    await client.query(`
      CREATE TABLE IF NOT EXISTS migration_history (
        id SERIAL PRIMARY KEY,
        migration_name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT NOW(),
        status VARCHAR(20) DEFAULT 'completed'
      )
    `);
    
    // Obtener historial de migraciones
    const { rows } = await client.query(
      'SELECT migration_name, status, executed_at FROM migration_history ORDER BY executed_at'
    );
    
    console.log('Migraciones ejecutadas:');
    if (rows.length === 0) {
      console.log('  Ninguna migración ha sido ejecutada');
    } else {
      rows.forEach(row => {
        const status = row.status === 'completed' ? '✅' : '❌';
        const date = new Date(row.executed_at).toLocaleString();
        console.log(`  ${status} ${row.migration_name} - ${row.status} (${date})`);
      });
    }
    
    console.log('\nMigraciones disponibles:');
    migrations.forEach(migration => {
      const executed = rows.find(r => r.migration_name === migration.name && r.status === 'completed');
      const status = executed ? '✅' : '⏳';
      console.log(`  ${status} ${migration.name}: ${migration.description}`);
    });
    
    client.release();
    
  } catch (error) {
    console.error('Error obteniendo estado de migraciones:', error.message);
  } finally {
    await pool.end();
  }
}

// Manejo de argumentos de línea de comandos
const args = process.argv.slice(2);

if (args.length === 0) {
  // Sin argumentos: ejecutar todas las migraciones
  runAllMigrations();
} else {
  const command = args[0];
  
  switch (command) {
    case 'status':
      showMigrationStatus();
      break;
      
    case 'run':
      if (args[1]) {
        runSpecificMigration(args[1]);
      } else {
        console.error('❌ Debe especificar el nombre de la migración');
        console.log('Uso: node run-migrations.js run <nombre-migracion>');
        process.exit(1);
      }
      break;
      
    case 'help':
      console.log(`
🚀 Script de Migraciones RSC Mining

Uso:
  node run-migrations.js                    # Ejecutar todas las migraciones pendientes
  node run-migrations.js status            # Mostrar estado de las migraciones
  node run-migrations.js run <nombre>      # Ejecutar migración específica
  node run-migrations.js help              # Mostrar esta ayuda

Ejemplos:
  node run-migrations.js
  node run-migrations.js status
  node run-migrations.js run 001_init.sql

Variables de entorno requeridas:
  DATABASE_URL - URL de conexión a PostgreSQL
      `);
      break;
      
    default:
      console.error(`❌ Comando no reconocido: ${command}`);
      console.log('Use "node run-migrations.js help" para ver la ayuda');
      process.exit(1);
  }
}
