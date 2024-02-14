import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],
  optimizeDeps: {
    include: ['libraries/p5.min.js', 'libraries/p5.sound.min.js'],
  },
  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'public'),
  base: '/nature-of-code/',
  build: {
    outDir: '../docs',
    rollupOptions: {
      input: {
        main: 'src/index.html',
        'random-walk': 'src/random-walk/index.html',
        noise: 'src/noise/index.html',
        forces: 'src/forces/sketch.js',
      },
    },
  },
});
