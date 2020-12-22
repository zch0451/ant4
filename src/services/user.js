import request from '@/utils/request';
import { paramsToRet, getApi } from '@/utils/tools';

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}

//用户登录
export async function accountLogin(params) {
  var ret = paramsToRet(params);
  let api= await getApi();
  return request(api + '/urp/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    data: ret,
  });
}
//验证用户信息
export async function getUserInfo(params) {
  let api= await getApi();
  return request(api + '/urp/user/getUserByToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': localStorage.getItem('antd-pro-token')
    },
    data: {},
  });
}

export async function getDepartment(params) {
  var ret = paramsToRet(params);
  let api= await getApi();
  return request(api + '/urp/department/getByParentid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': localStorage.getItem('antd-pro-token')
    },
    data: ret,
  });
}
export async function getDepartmentPart(params) {
  var ret = paramsToRet(params);
  let api= await getApi();
  return request(api + '/urp/department/getDeptOrg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': localStorage.getItem('antd-pro-token')
    },
    data: ret,
  });
}
//获取指派系统
export async function getPlatform(params) {
  var ret = paramsToRet(params);
  let api= await getApi();
  return request(api + '/business/docking_platform/getPlatformByDeptId', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': localStorage.getItem('antd-pro-token')
    },
    data: ret,
  });
}
