import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// NOTE:
// موقتاً drop_console حذف شد تا بتوانیم لاگ ها و ارورها را در محیط production ببینیم
// پس از رفع مشکل صفحه سفید، می‌توان دوباره آن را فعال کرد یا شرطی نمود.

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true, // موقتاً فعال برای تشخیص خطا؛ بعداً می‌توانید false کنید
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react', 'recharts']
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: false, // قبلاً true بود
        drop_debugger: true
      }
    }
  },
  server: {
    port: 3000,
    host: true,
    open: true
  },
  preview: {
    port: 4173,
    host: true
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  },
  envPrefix: 'VITE_'
}));
