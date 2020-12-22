import request from '@/utils/request';
import { paramsToRet, getApi } from '@/utils/tools';

//用户系统部分
export async function getUsers(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/user/list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function deleteUsers(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/user/deleteByIds', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function deleteUser(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/user/deleteById', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function addUser(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/user/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function updateUser(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api+ '/urp/user/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function detailUser(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/user/detail', {
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
    return request(api + '/urp/user/getRoles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function setRoles(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/user/setRoles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
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
