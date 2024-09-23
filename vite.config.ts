import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    //host: 'localhost',
    host: '0.0.0.0',
    port: 3000,
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Ensure that CommonJS format is used for Electron's main process
        format: 'cjs',
      },
    },
  },
});
