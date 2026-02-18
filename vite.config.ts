
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 使用 './' 可以讓打包後的檔案使用相對路徑載入，最適合 GitHub Pages
  base: './', 
});
