/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RSC_MINING_PLAY_STORE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
