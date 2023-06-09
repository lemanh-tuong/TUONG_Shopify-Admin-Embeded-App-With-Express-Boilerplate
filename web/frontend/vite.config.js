/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

if (process.env.npm_lifecycle_event === 'build' && !process.env.CI && !process.env.SHOPIFY_API_KEY) {
  console.warn(
    '\nBuilding the frontend app without an API key. The frontend build will not run without an API key. Set the SHOPIFY_API_KEY environment variable when running the build command.\n',
  );
}

/** @type {import('vite').ProxyOptions} */
const proxyOptions = {
  target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
  changeOrigin: false,
  secure: true,
  ws: false,
};

const host = process.env.HOST ? process.env.HOST.replace(/https?:\/\//, '') : 'localhost';

let hmrConfig;
if (host === 'localhost') {
  hmrConfig = {
    protocol: 'ws',
    host: 'localhost',
    port: 64999,
    clientPort: 64999,
  };
} else {
  hmrConfig = {
    protocol: 'wss',
    host: host,
    port: process.env.FRONTEND_PORT,
    clientPort: 443,
  };
}

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
  /** WARNING: Update "generateEnvFiles", ".env.example" và "các file type definition cho env" nếu muốn tuỳ chỉnh tiền tố "_____ADDITIONAL_VARIABLE______" */
  envPrefix: '_____ADDITIONAL_VARIABLE______',

  root: dirname(fileURLToPath(import.meta.url)),
  plugins: [react(), tsconfigPaths()],
  define: {
    // WARNING: SHOPIFY_API_KEY cho AppBridgeProvider
    'process.env.SHOPIFY_API_KEY': JSON.stringify(process.env.SHOPIFY_API_KEY),
  },
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    host: 'localhost',
    port: process.env.FRONTEND_PORT,
    hmr: hmrConfig,
    proxy: {
      '^/(\\?.*)?$': proxyOptions,
      '^/api(/|(\\?.*)?$)': proxyOptions,
    },
  },
});
