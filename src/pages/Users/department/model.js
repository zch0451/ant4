import { 
    getDepartment,
    detailDepartment,
    addRootDepartment,
    updateDepartment,
    deleteDepartment,
    addDepartment
} from './service';

export default {
    namespace: 'departmentcontrol',

    state: {
        data: {
            tree: []
        }
    },

    effects: {
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
                type: 'save',
                payload: list,
            });
        },
        *addDepartment({ payload, callback }, { call, put }) {
            const response = yield call(addDepartment, payload);
            if(response.resultCode == '0'){
                callback.callbacksuccess();
            }else{
                callback.callbackfail();
            }
        },
        *deleteDepartment({ payload, callback }, { call, put }) {
            const response = yield call(deleteDepartment, payload);
            if(response.resultCode == '0'){
                callback.callbacksuccess();
            }else{
                callback.callbackfail();
            }
        },
        *addRootDepartment({ payload, callback }, { call, put }) {
            const response = yield call(addRootDepartment, payload);
            if (callback) callback();
        },
        *updateDepartment({ payload, callback }, { call, put }) {
            const response = yield call(updateDepartment, payload);
            if(response.resultCode == '0'){
                callback.callbacksuccess();
            }else{
                callback.callbackfail();
            }
        },
        *detailDepartment({ payload, callback }, { call, put }) {
            const response = yield call(detailDepartment, payload);
            if (callback) callback(response.obj);
        },
    },

    reducers: {
        save(state, action) {
            (function traverse(node) {
                if(!node || !node.length){
                    node.push(...action.payload.tree);
                    return state;
                };
                if(action.payload.parentid == '-1'){
                    for(let j = state.data.tree.length-1; j>=0; j--){
                        let flag = true;
                        action.payload.tree.map((treenode, index) => {
                            if(state.data.tree[j].id == treenode.id){
                                for(let ke in treenode){
                                    state.data.tree[j][ke] = treenode[ke];
                                }
                                flag = false;
                                action.payload.tree.splice(index, 1);
                            }
                        })
                        if(flag) state.data.tree.splice(j, 1);
                    }
                    state.data.tree.push(...action.payload.tree);
                    return state;
                }
                node.forEach(i => {
                    if(i.id == action.payload.parentid){
                        if(i.children){
                            for(let j = i.children.length-1; j>=0; j--){
                                let flag = true;
                                action.payload.tree.map((treenode, index) => {
                                    if(i.children[j].id == treenode.id){
                                        for(let ke in treenode){
                                            i.children[j][ke] = treenode[ke];
                                        }
                                        flag = false;
                                        action.payload.tree.splice(index, 1);
                                    }
                                })
                                if(flag) i.children.splice(j, 1);
                            }
                        }
                        if(!i.children) {
                            i.children = [];
                        }
                        i.children.push(...action.payload.tree);
                        return state;
                    }
                    i.children && traverse(i.children)
                })
            })(state.data.tree);
            return state;
        }
    },
};