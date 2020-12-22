import request from '@/utils/request';
import { paramsToRet, getApi } from '@/utils/tools';
export async function weiguanByroomid(params) {
  var ret = paramsToRet(params);
  let api= await getApi();
  return request(api + '/appointment/training_room/getWeiguanByRoomid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': localStorage.getItem('antd-pro-token')
    },
    data: ret,
  });
}

