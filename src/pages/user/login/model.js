import {routerRedux} from 'dva/router';
import {stringify} from 'qs';
import {setAuthority} from '@/utils/authority';
import {getPageQuery} from '@/utils/utils';
import {reloadAuthorized} from '@/utils/Authorized';

import {notification} from 'antd';
import {passwordSecret, getAppId} from '@/utils/tools';
import {accountLogin} from '@/services/user';
import {detailUser} from '@/pages/Users/user/service';

export default {
  namespace: 'loginuser',

  state: {
    status: undefined,
  },

  effects: {
    * login({payload}, {call, put}) {
      payload.passWord = passwordSecret(payload.passWord);
      debugger;
      payload.appId = getAppId();
      const response = yield call(accountLogin, payload);
      if (response.resultCode === '0') {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'success',
            currentAuthority: undefined
          },
        });
        localStorage.setItem('antd-pro-token', response.obj.token);
        localStorage.setItem('umi_locale', 'zh-CN');
        // localStorage.setItem('antd-pro-authority', JSON.stringify(response.obj.userinfo.roleStrlist));
        //角色改成权限
        localStorage.setItem('antd-pro-authority', JSON.stringify(response.obj.userinfo.perminsStrlist.concat(response.obj.userinfo.roleStrlist)));
        localStorage.setItem('antd-pro-permition', JSON.stringify(response.obj.userinfo.perminsStrlist));
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        yield put(routerRedux.replace( '/welcome'));
        // let {redirect} = params;
        // if (redirect) {
        //   const redirectUrlParams = new URL(redirect);
        //   if (redirectUrlParams.origin === urlParams.origin) {
        //     redirect = redirect.substr(urlParams.origin.length);
        //     if (redirect.match(/^\/.*#/)) {
        //       redirect = redirect.substr(redirect.indexOf('#') + 1);
        //     }
        //     if (redirect == '/user/login') {
        //       redirect = null;
        //     }
        //   } else {
        //     redirect = null;
        //   }
        // }
        // yield put(routerRedux.replace(redirect || '/welcome'));
        const res_userinfo=yield call(detailUser,{id:response.obj.userinfo.id} );
        if(res_userinfo.resultCode === '0'){
          localStorage.setItem('departmentid', res_userinfo.obj.departmentid);
          localStorage.setItem('username', res_userinfo.obj.username);
        }
      } else if (response.resultCode === '1') {
        notification.error({
          message: `登录失败`,
          description: response.resultMsg,
        });
      }
    },

    * logout(_, {put}) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: 'error',
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      const {redirect} = getPageQuery();
      // redirect
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, {payload}) {
      setAuthority(payload ? payload.currentAuthority : 'admin');
      return {
        ...state,
        status: payload.status
      };
    }
  },
};
