/// <reference types="vite/client" />

/**
 * @description Type definition của các biến env
 * WARNING: Yêu cầu readonly và optional đàng hoàng
 */
interface ImportMetaEnv {
  readonly _____ADDITIONAL_VARIABLE______APP_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
