#!/usr/bin/env node

/**
 * 🚀 SCRIPT DE MIGRACIÓN - SISTEMAS AVANZADOS
 * Ejecuta las migraciones de los sistemas avanzados de minería
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de Supabase
const SUPABASE_URL = 'https://unevdceponbnmhvpzlzf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuZXZkY2Vwb25ibm1odnB6bHpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5MTIyMTksImV4cCI6MjA3MTQ4ODIxOX0.OLHbZrezgBiXWQplN1jrGD_xkARqG2uD8ECqzo05jE4';

async function runMigrations() {
    try {
        console.log('🚀 Iniciando migraciones de sistemas avanzados...');
        
        // Leer el archivo SQL
        const sqlFile = path.join(__dirname, 'advanced-systems-schema.sql');
        const sql = fs.readFileSync(sqlFile, 'utf8');
        
        // Dividir en statements individuales
        const statements = sql
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
        
        console.log(`📝 Encontrados ${statements.length} statements SQL`);
        
        // Ejecutar cada statement
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            if (statement.trim()) {
                console.log(`⚡ Ejecutando statement ${i + 1}/${statements.length}...`);
                
                try {
                    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'apikey': SUPABASE_ANON_KEY,
                            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                        },
                        body: JSON.stringify({ sql: statement })
                    });
                    
                    if (!response.ok) {
                        const error = await response.text();
                        console.warn(`⚠️  Statement ${i + 1} falló: ${error}`);
                    } else {
                        console.log(`✅ Statement ${i + 1} ejecutado`);
                    }
                } catch (error) {
                    console.warn(`⚠️  Error en statement ${i + 1}: ${error.message}`);
                }
            }
        }
        
        console.log('🎉 Migraciones completadas');
        
    } catch (error) {
        console.error('❌ Error ejecutando migraciones:', error);
        process.exit(1);
    }
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
    runMigrations();
}

export { runMigrations };
