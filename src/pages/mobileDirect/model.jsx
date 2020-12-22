import {fetchObjs,addObj,objDetail} from './service';
import {message} from 'antd'
const initState = {
  data: {
    list: [],
    pagination: {},
  },
};
const Model = {
  namespace: 'ConcatModel',
  state: initState,
  effects: {
    * getList({payload,callback}, {call, put}) {
      const response = yield call(fetchObjs,payload);

      let list=[],pagination={};
      if(response.resultCode==0){
        list=response.obj.list;
        pagination = {
          total : response.obj.pageParam.totalRow,
          pageSize : response.obj.pageParam.pageSize,
          current : response.obj.pageParam.nowPage
        };
        response.obj.pagination = pagination;
        delete response.obj.pageParam;
        response.obj.list.map((listone,index)=>{
          listone.key = index;
          listone.index = (pagination.current - 1) * pagination.pageSize + 1 + index;
        })
        yield put({
          type: 'save',
          payload: {
            data: {
              list,
              pagination
            }
          },
        });
        callback&&callback();
      }else{
        message.error(response.resultMsg||'未找到项目');
      }
    },
    * getDetail({payload,callback}, {call, put}) {
      const response = yield call(objDetail,payload);
      if(response.resultCode==0){
        callback&&callback(response)
      }else{
        message.error(response.resultMsg||'查看详情失败');
      }
    },
    * addObj({payload,callback}, {call, put}) {
      const response = yield call(addObj,payload);
      if(response.resultCode==0){
        message.success(response.resultMsg||'操作成功');
        callback&&callback(response)
      }else{
        message.error(response.resultMsg||'操作失败');
      }
    },
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },

    clear() {
      return initState;
    },
  },
};
export default Model;
