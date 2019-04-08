
// import { primaryColor } from '../src/defaultSettings';
import { primaryColor } from './src/defaultSettings'

export default {
  base: '/mip-dev/',
  publicPath: '/mip-dev/',
  hash: true, 
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
        { path: '/', redirect: '/welcome' },
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
  
};
