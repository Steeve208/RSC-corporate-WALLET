const { Pool } = require('pg');
const config = require('./env');

// Pool de conexiones PostgreSQL
const pool = new Pool({
  connectionString: config.database.url,
  max: 20, // máximo de conexiones en el pool
  idleTimeoutMillis: 30000, // tiempo máximo que una conexión puede estar inactiva
  connectionTimeoutMillis: 2000, // tiempo máximo para establecer una conexión
});

// Eventos del pool
pool.on('connect', (client) => {
  console.log('🔌 Nueva conexión PostgreSQL establecida');
});

pool.on('error', (err, client) => {
  console.error('❌ Error en el pool de PostgreSQL:', err);
});

pool.on('remove', (client) => {
  console.log('🔌 Conexión PostgreSQL removida del pool');
});

// Función para probar la conexión
async function testConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('✅ Conexión PostgreSQL exitosa:', result.rows[0].now);
    client.release();
    return true;
  } catch (err) {
    console.error('❌ Error conectando a PostgreSQL:', err.message);
    return false;
  }
}

// Función para cerrar el pool
async function closePool() {
  try {
    await pool.end();
    console.log('🔌 Pool de PostgreSQL cerrado');
  } catch (err) {
    console.error('❌ Error cerrando pool PostgreSQL:', err);
  }
}

module.exports = {
  pool,
  testConnection,
  closePool
};
