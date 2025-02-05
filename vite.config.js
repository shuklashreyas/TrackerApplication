import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss],
  server: {
    port: 5001, // Frontend server port
  },
  build: {
    outDir: 'dist', // Ensure output directory is set
  },
  root: './', // Explicitly set root
  publicDir: 'public', // Ensure Vite knows where to find public assets

});

