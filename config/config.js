// https://umijs.org/config/
import { defineConfig } from 'umi';

import defaultSettings from './defaultSettings';
import webpackPlugin from './plugin.config';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  history:{
    type:'hash'
  },
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/contract',
              name: 'contract',
              icon: 'form',
              routes:[
                {
                  path: '/contract/list',
                  name: 'contractList',
                  component: './mobileDirect/index',
                },
                // {
                //   path: '/contract/setting',
                //   name: 'contractSetting',
                //   component: './ruleSetting/index',
                // },
              ]
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  ignoreMomentLocale: true,
  polyfill: {
    imports: [
      'core-js/features/promise/try',
      'core-js/proposals/math-extensions'
    ]
  },
  chainWebpack:webpackPlugin,
  title: false,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
