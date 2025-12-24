import { defineConfig } from 'vite';

export default defineConfig({
  base: '/PomodoroTimer-demo/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['chart.js']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
