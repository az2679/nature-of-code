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
    outDir: '../docs',
    rollupOptions: {
      input: {
        main: 'src/index.html',
        'random-walk': 'src/random-walk/main.jsx',
        noise: 'src/noise/sketch.js',
        forces: 'src/forces/sketch.js',
      },
    },
  },
});
