import request from '@/utils/request';

import { paramsToRet, getApi } from '@/utils/tools';

export async function getPermits(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/permit/list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function deletePermits(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/permit/deleteByIds', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function deletePermit(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/permit/deleteById', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function addPermit(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/permit/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function updatePermit(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api+ '/urp/permit/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function detailPermit(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/permit/detail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
