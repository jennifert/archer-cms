import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'public/assets')
    }
  },
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
});
