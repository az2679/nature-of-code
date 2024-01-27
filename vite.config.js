import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// export default defineConfig({
//   server: {
//     port: 3000,
//   },
//   plugins: [react()],
// });

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],
  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, '/index.html'),
        'random-walk': resolve(__dirname, 'src/random-walk/index.html'),
      },
    },
  },
});
