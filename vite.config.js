import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react(), resolve()],
  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'public'),
  build: {
    lib: {
      main: resolve(__dirname, '/lib/index.js'),
    },
    name: 'main',
    fileName: 'bundles',
    format: 'cjs',
  },
  outDir: '../docs',
  rollupOptions: {
    external: ['react'],
  },
});

// main: resolve(__dirname, '/src/index.html'),
// 'random-walk': resolve(__dirname, '/src/random-walk/index.html'),
// noise: resolve(__dirname, '/src/noise/index.html'),
// forces: resolve(__dirname, '/src/forces/index.html'),
