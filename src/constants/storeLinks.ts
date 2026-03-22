/**
 * URL de la ficha en Google Play de la app RSC Mining.
 * Prioridad: variable de entorno (recomendado en producción).
 */
export const RSC_MINING_PLAY_STORE_URL: string = (
  (import.meta.env.VITE_RSC_MINING_PLAY_STORE_URL as string | undefined)?.trim() ||
  'https://play.google.com/store/apps/details?id=com.rscmining.app'
);
