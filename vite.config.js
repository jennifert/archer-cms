import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: '.', // project root
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'public/assets')
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      // Proxy API requests to your Express backend
      '/api': 'http://localhost:5000'
    }
  }
});
