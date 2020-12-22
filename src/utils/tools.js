import CryptoJS from 'crypto-js';
import {notification, message} from 'antd';
import {func} from 'prop-types';

// const api = 'http://192.168.76.231:8081/ggsx';
// const api = 'http://192.168.71.54:8080/ggsx';
const api = 'http://121.41.81.226:81/sg';
// const api = 'http://www.geiwoshang.com:85/xfcs';
// const api =  process.env.ANT_APP_API;
// console.log(process.env.ANT_APP_API)
// console.log(process.env)
const uploadapi = 'http://121.41.81.226:81/attachment/file/upload';
// const uploadapi = 'https://nx.81kui.cn/attachment/file/upload';
export const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const appId = '03980275786e11e9a62b00163e0d0b4f';
const appKey = '23f47af9ea0dc49b';
export const IDType = {'idcard': '身份证', 'passport': '护照', 'creditCode': '统一社会信用代码'};
export const SEXType = {'MEN': '男', 'WOMEN': '女'};
export const personType = {
  'LDZYZC_SQ_LD': '申请人(劳动者)',
  'LDZYZC_BSQ_DW': '被申请人(单位)',
  'LDZYZC_DSF_LD': '第三方劳动者',
  'LDZYZC_DSF_DW': '第三方单位'
};
export const personTypeReverse = {
  'LDZYZC_SQ_LD': '被申请人(劳动者)',
  'LDZYZC_BSQ_DW': '申请人(单位)',
  'LDZYZC_DSF_LD': '第三方劳动者',
  'LDZYZC_DSF_DW': '第三方单位'
};
export const YoN = ['否', '是'];
export const dataSelectCode = {
  'COMPANYTYPE': 'companytype'
}

export const ApplyStatus = [
  '待审核', '通过', '拒绝'
]
export const ApplyType = {
  add: '增加维管',
  update: '调整权限',
  delete: '注销维管',
}

export const exportDownload = (url, obj) => {
  let params = [];
  if (obj) {
    for (var key in obj) {
      if (obj[key])
        params.push(key + '=' + obj[key]);
    }
  }
  if (params)
    params = '?' + params.join('&')
  else
    params = '';
  getApi().then(res => {
    window.open(res + url + params);
  })

}
export const printContent = (id = 'print-wrapper') => {
  const subOutputRankPrint = document.getElementById(id)
  const menuNodes = document.getElementsByClassName('ant-btn');
  for (let i = 0; i < menuNodes.length; i += 1) {
    menuNodes[i].style.display = 'none';
  }
  const newContent = subOutputRankPrint.innerHTML;
  const oldContent = document.body.innerHTML;
  document.body.innerHTML = newContent
  window.print();
  window.location.reload();
  document.body.innerHTML = oldContent;
  return false;
};
export const ApplyStatus2 = ['待教务员初审', '待实训管理员复审', '待实训管理员复审', '待维管确认', '待维管确认', '待实训管理员确认', '待实训管理员确认', '待教务员终审', '待教务员终审', '待课程正式发布', '审核不通过', '课程已发布'];//11
export const ApplyStatus3 = ['单位申请', '教务员初审', '教务员初审', '实训管理员复审', '实训管理员复审', '维管确认', '维管确认', '实训管理员确认', '实训管理员确认', '教务员终审', '教务员终审', '课程发布'];
export const ApplyStatus4 = ['单位申请', '教务员初审', '教务员初审', '实训管理员复审', '实训管理员复审', '维管确认', '维管确认', '实训管理员确认', '实训管理员确认', '教务员终审', '教务员终审', '课程发布'];
export const ProjectType = {
  'xysx': '学员实训',
  'jnjs': '技能竞赛',
  'jnjd': '技能鉴定',
  'xyks': '学员考试',
}
export const trainingType = [
  '先进机械制造', '信息技术', '现代化服务业', '电工电子与自动化技术', '汽车维修', '食品与药品检验', '制冷技术', '创业实训'
]
export const propertyType = [
  '机械分类', '电子设备', '一启仪表、计量', '办公设备', '家具、餐具'
]
export const companyType = [
  '企业', '培训机构', '院校', '社会团体', '其他'
]
export const targetType = [
  '在职职工', '大学生', '中职（技校）', '失业人员', '军转人员', '其他'
]
export const levelsType = [
  '初/中级', '高级', '技师', '高级技师', '其他'
]
export const department = {
  '01': '中心办公室',
  '02': '培训科',
  '03': '基地管理科',
  '04': '经费管理科',
}
export const duties = {
  'p1': '实训中心主任',
  'p2': '实训中心干事',
  'p3': '分中心负责人',
  'p4': '维修人员',
  'p5': '维管人员',
  'p6': '网格维护与维修',
}
export const transformType = {
  '1': ['外借归还', '修理完毕', '其他'],
  '2': ['外借', '损坏保修', '报废清理', '调整存放点', '其他'],
}
export const concatStatus=[
  '未开始', '进行中', '已结束','预警'
]
//对密码进行加密操作
export function passwordSecret(password) {
  var key = CryptoJS.enc.Latin1.parse(appKey);
  var iv = CryptoJS.enc.Latin1.parse('0123456789abcdef');

  var encrypted = CryptoJS.AES.encrypt(password, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    }
  );
  encrypted = window.btoa(encrypted);
  return encrypted.toString();
}

//获取appid
export  function getAppId() {
  return appId;
}

//获取api
export async function getApi() {
  if (window.outPutConfig) {
    return Promise.resolve(window.outPutConfig.api)
  } else {
    return new Promise(resolve => {
      const $script = document.createElement('script');
      $script.src = `./config.js`;
      document.head.appendChild($script);
      $script.onload = function () {
        resolve(window.outPutConfig.api)
      }
    })
  }
}

//获取资源上传api
export function getUploadApi() {
  if (window.outPutConfig) {
    return Promise.resolve(window.outPutConfig.uploadapi)
  } else {
    return new Promise(resolve => {
      const $script = document.createElement('script');
      $script.src = `./config.js`;
      document.head.appendChild($script);
      $script.onload = function () {
        resolve(window.outPutConfig.uploadapi)
      }
    })
  }
}

//将payload参数转为formdata传递
export function paramsToRet(params) {
  var ret = '';
  for (let k in params) {
    if (typeof (params[k]) == 'number' || params[k]) {
      ret += ('' + k + '=' + encodeURIComponent(params[k]));
    } else {
      ret += ('' + k + '=');
    }
    ret += '&';
  }
  ret = ret.slice(0, -1);
  return ret;
}

//token失效的时候的处理逻辑
export function tokenTimeout() {
  localStorage.removeItem('antd-pro-token');
  notification.error({
    message: '登录已过期，请重新登录。',
  });
  window.g_app._store.dispatch({
    type: 'login/logout',
  });
  return;
}

//获取图片的base64
export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

//图片上传前的校验
export function beforeUpload(file) {
  // const isJPG = file.type === 'image/jpeg';
  // if (!isJPG) {
  //     message.error('You can only upload JPG file!');
  // }
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //     message.error('Image must smaller than 2MB!');
  // }
  // return isJPG && isLt2M;
  return true;
}

//添加获取对象数组某个key值相同的另一个值
export function getItemBykey(key, value, arr) {
  var len = arr.length;
  for (let i = 0; i < len; i++) {
    if (arr[i][key] === value) {
      return arr[i];
    }
  }
  return {}

}

//moment时间的处理函数
export function momentParse(moment, type) {
  let now = new Date(moment);
  let year = now.getFullYear();
  if (type && type == 'year') return year;
  let month = (now.getMonth() + 1) > 9 ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
  if (type && type == 'month') return year + '-' + month;
  let day = now.getDate() > 9 ? now.getDate() : '0' + now.getDate();
  return year + '-' + month + '-' + day;
}

//对象数组排序
export function sortBy(field) {
  return function (a, b) {
    return a[field] < b[field] ? -1 : 1;
  }
}

//数字转大写
export function number_chinese(str) {
  var num = parseFloat(str);
  var strOutput = "",
    strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
  num += "00";
  var intPos = num.indexOf('.');
  if (intPos >= 0) {
    num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
  }
  strUnit = strUnit.substr(strUnit.length - num.length);
  for (var i = 0; i < num.length; i++) {
    strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
  }
  return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元")

}

export function getSex(idnum) {
  if (idnum.length != 18) {
    return;
  }
  if (parseInt(idnum.substr(16, 1)) % 2 == 1) {
    return "男"
  } else {
    return "女"
  }
}

export function isGeneralBase(departmentid = window.localStorage.getItem('departmentid')) {
  if (departmentid.substr(0, 2) == '01') {
    return true
  }
  return false;
}
