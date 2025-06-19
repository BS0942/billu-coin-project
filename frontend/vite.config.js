import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './',          // 🔑 Make sure Vite knows root is current folder
  publicDir: 'public', // 🔑 Tell Vite where is public folder
  plugins: [react()],
});
