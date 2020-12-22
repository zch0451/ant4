import { query as queryUsers } from '@/services/user';
import { getUserInfo ,getDepartment,getPlatform,getDepartmentPart} from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    departmentTree: [],
    departmentTreePart:[],
    platForms:[],
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    //调用token验证接口
    *fetchCurrent(_, { call, put }) {
      const response = yield call(getUserInfo);
      yield put({
        type: 'saveCurrentUser',
        payload: response.obj,
      });
    },
    *getDepartment({ payload, callback }, { call, put }) {
      const response = yield call(getDepartment, payload);
      if(callback) callback();
      let list = {
        parentid: payload.parentid,
        tree: []
      };
      response.obj.map((listone, index) => {
        listone.key = listone.id;
        list.tree.push(listone);
      });
      yield put({
        type: 'saveTree',
        payload: list,
      });
    },
    *getDepartmentPart({ payload, callback }, { call, put }) {
      const response = yield call(getDepartmentPart, payload);
      if(callback) callback();
      let list = {
        parentid: payload.parentid,
        tree: []
      };
      response.obj.map((listone, index) => {
        listone.key = listone.id;
        list.tree.push(listone);
      });
      yield put({
        type: 'saveTreePart',
        payload: list,
      });
    },
    *getPlatform({ payload, callback }, { call, put }) {
      const response = yield call(getPlatform, payload);
      if(callback) callback();
      yield put({
        type: 'savePlatform',
        payload: response.obj,
      });
      console.log(response);
    },
  },
  reducers: {
    saveTree(state, action) {
      (function traverse(node) {
        if(!node || !node.length){
          node.push(...action.payload.tree);
          return state;
        };
        if(action.payload.parentid == '-1'){
          state.departmentTree = [];
          state.departmentTree.push(...action.payload.tree);
          return state;
        }
        node.forEach(i => {
          if(i.id == action.payload.parentid){
            i.children = [];
            i.children.push(...action.payload.tree);
            return state;
          }
          i.children && traverse(i.children)
        })
      })(state.departmentTree);

      return state;
    },
    saveTreePart(state, action) {//只显示部门的
      (function traverse(node) {
        if(!node || !node.length){
          node.push(...action.payload.tree);
          return state;
        };
        if(action.payload.parentid == '-1'){
          state.departmentTreePart = [];
          state.departmentTreePart.push(...action.payload.tree);
          return state;
        }
        node.forEach(i => {
          if(i.id == action.payload.parentid){
            i.children = [];
            i.children.push(...action.payload.tree);
            return state;
          }
          i.children && traverse(i.children)
        })
      })(state.departmentTreePart);

      return state;
    },
    savePlatform(state,action){
      state.platForms=[...action.payload]
      return state;
    },
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
