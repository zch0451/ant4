import request from '@/utils/request';
import { paramsToRet, getApi } from '@/utils/tools';
export async function fetchObjs(params) {
  var ret = paramsToRet(params);
  let api= await getApi();
  return request(api + '/dc_contract/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': localStorage.getItem('antd-pro-token')
    },
    data: ret,
  });
}
export async function objDetail(params) {
  var ret = paramsToRet(params);
  let api= await getApi();
  return request(api +'/dc_contract/detail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': localStorage.getItem('antd-pro-token')
    },
    data: ret,
  });
}
export async function addObj(params) {
  var ret = paramsToRet(params);
  let api= await getApi();
  return request(api+ '/dc_contract/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': localStorage.getItem('antd-pro-token')
    },
    data: ret,
  });
}
