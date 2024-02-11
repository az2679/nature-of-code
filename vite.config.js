import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react(), resolve()],
  docs: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: '../docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, '/index.html'),
        'random-walk': resolve(__dirname, '/random-walk/index.html'),
        noise: resolve(__dirname, '/noise/index.html'),
        force: resolve(__dirname, '/force/index.html'),
      },
    },
  },
});
