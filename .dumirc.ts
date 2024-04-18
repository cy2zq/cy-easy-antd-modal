import { defineConfig } from 'dumi';
import { homepage } from './package.json';

const isProd = process.env.NODE_ENV === 'production';
// 不是预览模式 同时是生产环境
const isProdSite = process.env.PREVIEW !== '1' && isProd;

const name = 'cy-easy-antd-modal';

export default defineConfig({
  themeConfig: {
    name,
    github: homepage,
  },
  headScripts: [
    'https://code.jquery.com/jquery-3.7.1.js',
    `if (window.$) {
      console.log('jQuery is already bound to window object.');
    } else {
      // 如果没有绑定，则绑定 jQuery
      window.$ = window.jQuery;
      console.log('jQuery has been bound to window object.');
    }`,
    `https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js`,
    `https://cdn.jsdelivr.net/npm/echarts-gl/dist/echarts-gl.min.js`,
  ],
  base: isProdSite ? `/${name}/` : '/',
  publicPath: isProdSite ? `/${name}/` : '/',
  html2sketch: {},
  mfsu: false,
  outputPath: '.doc',
});
