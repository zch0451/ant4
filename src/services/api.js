import { stringify } from 'qs';
import request from '@/utils/request';

import { paramsToRet, getApi } from '@/utils/tools';


export async function queryNotices(params = {}) {
  var ret = paramsToRet(params);
  let api = await getApi();
  return request(api + '/common/message/listxiaoxi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': localStorage.getItem('antd-pro-token')
    },
    data: ret,
  });
}
export async function queryDB(params = {}) {
  var ret = paramsToRet(params);
  let api = await getApi();
  return request(api+ '/common/todo/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': localStorage.getItem('antd-pro-token')
    },
    data: ret,
  });
}
export async function queryNoticesNum(params = {}) {
  var ret = paramsToRet(params);
  let api = await getApi();
  return request(api + '/common/message/getunreadnumber', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': localStorage.getItem('antd-pro-token')
    },
    data: ret,
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
