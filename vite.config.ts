
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 如果你的 GitHub 倉庫名稱是 'haewon-quiz'，請將 base 改為 '/haewon-quiz/'
  base: './', 
});
