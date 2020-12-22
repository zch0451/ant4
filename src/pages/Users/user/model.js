import {
    getUsers,
    deleteUser,
    deleteUsers,
    addUser,
    updateUser,
    detailUser,
    getRoles,
    setRoles,
    getDepartment
} from './service';
const Model = {
    namespace: 'users',
    state: {
        data: {
            list: [],
            departmentMap: {},
            pagination: {},
        },
        departmentTree: [],
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(getUsers, payload);
            let pagination = {
                total : response.obj.pageParam.totalRow,
                pageSize : response.obj.pageParam.pageSize,
                current : response.obj.pageParam.nowPage
            };
            response.obj.pagination = pagination;

            delete response.obj.pageParam;
            response.obj.list.map((listone, index) => {
                listone.key = listone.id;
                listone.index = (pagination.current - 1) * pagination.pageSize + 1 + index;
            });
            yield put({
                type: 'save',
                payload: response.obj,
            });
        },
        *deleteUsers({ payload, callback }, { call, put }) {
            const response = yield call(deleteUsers, payload);
            if (callback) callback();
        },
        *deleteUser({ payload, callback }, { call, put }) {
            const response = yield call(deleteUser, payload);
            if (callback) callback();
        },
        *addUser({ payload, callback }, { call, put }) {
            const response = yield call(addUser, payload);
            if(response.resultCode == '0'){
                callback.callbacksuccess();
            }else{
                callback.callbackfail();
            }
        },
        *updateUser({ payload, callback }, { call, put }) {
            const response = yield call(updateUser, payload);
            if(response.resultCode == '0'){
                callback.callbacksuccess();
            }else{
                callback.callbackfail();
            }
        },
        *detailUser({ payload, callback }, { call, put }) {
            const response = yield call(detailUser, payload);
            if (callback) callback(response.obj);
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
        *getRoles({ payload, callback }, { call, put }) {
            const response = yield call(getRoles, payload);
            if (callback) callback(response.obj);
        },
        *setRoles({ payload, callback }, { call, put }) {
            const response = yield call(setRoles, payload);
            if(response.resultCode == '0'){
                callback.callbacksuccess();
            }else{
                callback.callbackfail();
            }
        },
    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                data: action.payload,
            };
        },
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
    },
};
export default Model;
