import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      '/api': {
        target: 'http://Free-Way-env.eba-hd2dnvmn.ap-northeast-2.elasticbeanstalk.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
