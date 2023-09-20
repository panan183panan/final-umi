/*
 * @Author: your name
 * @Date: 2020-08-18 11:46:44
 * @LastEditTime: 2021-07-14 14:42:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /report-release-front/config/routes.config.ts
 */
/**
   umi routes: https://umijs.org/zh/guide/router.html
 */
export default [
  {
    path: '/login',
    title: '登录',
    component: '@/pages/login/login',
  },
  {
    path: '/',
    component: '@/pages/index',
    routes: [
      {
        extract: true,
        path: '/',
        redirect: '/main/dashbord',
      },
      {
        path: '/main/dashbord',
        component: '@/pages/main',
        title: '首页',
      },
      {
        path: '/main/list',
        component: '@/pages/list',
        title: '股票组合列表',
      },
      {
        path: '/main/chart',
        component: '@/pages/chart',
        title: '图表展示',
      },
    ],
  },
];
