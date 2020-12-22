import request from '@/utils/request';

import { paramsToRet, getApi } from '@/utils/tools';

export async function queryList(params) {
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
export async function remove(params) {
    var ret = paramsToRet(params);
    let api = await getApi();
    return request(api + '/common/message/deleteById', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function removes(params) {
    var ret = paramsToRet(params);
    let api = await getApi();
    return request(api + '/common/message/deleteByIds', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function detail(params) {
    var ret = paramsToRet(params);
    let api = await getApi();
    return request(api + '/common/message/detailxiaoxi', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
