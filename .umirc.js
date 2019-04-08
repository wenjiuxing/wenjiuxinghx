
// import { primaryColor } from '../src/defaultSettings';
import { primaryColor } from './src/defaultSettings'

export default {
 
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
        targets: {
          ie: 11,
        },
        locale: {
          enable: true, // default false
          default: 'zh-CN', // default zh-CN
          baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
        },
        dynamicImport: {
          dynamicImport: true,
          loadingComponent: './components/PageLoading/index',
        },
      },
    ],
    [
      'umi-plugin-pro-block',
      {
        moveMock: false,
        moveService: false,
        modifyRequest: true,
        autoAddMenu: true,
      },
    ],
  ],
  targets: {
    ie: 11,
  },

  /**
   * 路由相关配置
   */
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [{ path: '/user', component: './Welcome' }],
    },
    {
      path: '/test/:page',
      component: '../layouts/Test',
     
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        { path: '/', redirect: '/tax' },
        {
          path: '/tax',
          name: 'tax',
          icon: 'plus',
          component: '../layouts/Test',
        },
        // dashboard
        {
          path: '/welcome',
          name: 'welcome',
          icon: 'smile',
          component: './Welcome',
        },
       
      ],
    },
  ],
  disableRedirectHoist: true,

  /**
   * webpack 相关配置
   */
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  proxy: {
    "/api": {
      "target": "http://10.124.210.86",
      "changeOrigin": true,
      "pathRewrite": {"^/api":""}
    }
  },
  externals: {
    '@antv/data-set': 'DataSet',
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
};
