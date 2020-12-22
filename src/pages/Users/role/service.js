import request from '@/utils/request';

import { paramsToRet, getApi } from '@/utils/tools';

export async function getPermits(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/role/getPermits', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function setPermits(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/role/setPermits', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function getRoles(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/role/list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function deleteRoles(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/role/deleteByIds', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function deleteRole(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api+ '/urp/role/deleteById', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function addRole(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/role/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function updateRole(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/role/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function detailRole(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/role/detail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
