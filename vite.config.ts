import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       // target: 'http://116.123.68.210:8080',
  //       target: 'https://76dc3e7d-66a1-49ff-9a75-c416455126ab.mock.pstmn.io',
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
});
