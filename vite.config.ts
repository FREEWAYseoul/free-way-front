import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), svgr()],
    server: {
      proxy: {
        '/api': {
          target: 'http://freeway-env.eba-mpxrzw3w.ap-northeast-2.elasticbeanstalk.com',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
};
