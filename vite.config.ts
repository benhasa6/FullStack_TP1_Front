/*import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 4200,
  },
});

//*/

//*/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuration du proxy pour éviter les problèmes CORS
export default defineConfig({
  server: {
    port: 4200, // Port du frontend
    proxy: {
      '/api': {
        target: 'http://backend:8080', // URL du backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  plugins: [react()],
});
// */