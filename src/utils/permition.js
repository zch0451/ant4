export function hasPermition(permit) {
    var permits = JSON.parse(localStorage.getItem('antd-pro-permition'));

    return permits.indexOf(permit) != -1;
}
export function hasRole(authority) {
    var permits = JSON.parse(localStorage.getItem('antd-pro-authority'));

    return permits.indexOf(authority) != -1;
}
