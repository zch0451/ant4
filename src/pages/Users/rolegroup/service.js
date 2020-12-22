import request from '@/utils/request';

import { paramsToRet, getApi } from '@/utils/tools';

export async function getRoleGroups(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/role/group/list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function getKQRoles() {
    let api= await getApi();
    return request(api + '/urp/role/getKQRoleList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        }
    });
}
export async function deleteRoleGroups(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/role/group/deleteByIds', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function deleteRoleGroup(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/role/group/deleteById', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function addRoleGroup(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/role/group/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function updateRoleGroup(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/role/group/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function detailRoleGroup(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/role/group/detail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
