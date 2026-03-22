const NodeCache = require('node-cache');
const config = require('./env');

// Configuración del caché
const ttl = config.cache.ttlSeconds;
const cache = new NodeCache({ 
  stdTTL: ttl, 
  checkperiod: ttl,
  useClones: false // mejor rendimiento para objetos grandes
});

// Eventos del caché
cache.on('set', (key, value) => {
  console.log(`💾 Caché SET: ${key}`);
});

cache.on('del', (key) => {
  console.log(`🗑️ Caché DEL: ${key}`);
});

cache.on('expired', (key, value) => {
  console.log(`⏰ Caché EXPIRED: ${key}`);
});

// Función helper para usar caché
function withCache(key, fn, customTtl = null) {
  const hit = cache.get(key);
  if (hit) {
    console.log(`🚀 Caché HIT: ${key}`);
    return Promise.resolve(hit);
  }
  
  console.log(`🔄 Caché MISS: ${key}`);
  return fn().then((data) => {
    const ttlToUse = customTtl || ttl;
    cache.set(key, data, ttlToUse);
    return data;
  });
}

// Función para limpiar caché por patrón
function clearCacheByPattern(pattern) {
  const keys = cache.keys();
  const matchingKeys = keys.filter(key => key.includes(pattern));
  matchingKeys.forEach(key => cache.del(key));
  console.log(`🧹 Caché limpiado por patrón "${pattern}": ${matchingKeys.length} keys`);
}

// Función para obtener estadísticas del caché
function getCacheStats() {
  return {
    keys: cache.keys().length,
    hits: cache.getStats().hits,
    misses: cache.getStats().misses,
    keyspace: cache.keys()
  };
}

module.exports = {
  cache,
  withCache,
  clearCacheByPattern,
  getCacheStats
};
