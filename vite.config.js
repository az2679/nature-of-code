import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],
  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'public'),
  build: {
    base: '/nature-of-code/',
    outDir: '../docs',
    rollupOptions: {
      input: {
        main: 'src/index.html',
        'random-walk': 'src/random-walk/index.html',
        noise: 'src/noise/index.html',
        forces: 'src/forces/index.html',
      },
    },
  },
});
