import request from '@/utils/request';
import { paramsToRet, getApi } from '@/utils/tools';

export async function getDepartment(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api+ '/urp/department/getByParentid', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function detailDepartment(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/department/detail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function addDepartment(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/department/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function addRootDepartment(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/department/addRoot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function updateDepartment(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/department/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
export async function deleteDepartment(params) {
    var ret = paramsToRet(params);
    let api= await getApi();
    return request(api + '/urp/department/deleteById', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': localStorage.getItem('antd-pro-token')
        },
        data: ret,
    });
}
