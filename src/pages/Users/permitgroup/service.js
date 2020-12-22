import request from '@/utils/request';

import { paramsToRet, getApi } from '@/utils/tools';

export async function getPermitGroups(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/permit/group/list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function deletePermitGroups(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/permit/group/deleteByIds', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function deletePermitGroup(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/permit/group/deleteById', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function addPermitGroup(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/permit/group/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function updatePermitGroup(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/permit/group/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function detailPermitGroup(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/permit/group/detail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
