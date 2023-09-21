import { defineConfig } from 'umi';
import routes from './routes.config';

export default defineConfig({
  routes,
  fastRefresh: {},
  proxy: {
    '/apilogin': {
      target: 'http://172.19.80.76:5090/',
      changeOrigin: true,
      pathRewrite: { '^/apilogin': '' },
    },
  },
});
