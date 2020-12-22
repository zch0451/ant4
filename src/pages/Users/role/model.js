import {
	getRoles,
	deleteRole,
	deleteRoles,
	addRole,
	updateRole,
	detailRole,
	getPermits,
	setPermits
} from './service';
import {
	getRoleGroups,
	getKQRoles
} from '../rolegroup/service';

export default {
	namespace: 'roles',
	state: {
		data: {
			list: [],
			pagination: {},
		},
		rolegroup: [],
		kqRoles:[]
	},

	effects: {
		*fetchKQrole({_},{call,put}){
			const response = yield call(getKQRoles)
			console.log(response);
			yield put({
				type: 'saveKQRoles',
				payload: response.obj,
			});
		},
		*fetch({ payload, callback }, { call, put }) {
			const response = yield call(getRoles, payload);
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
				listone.categoryname = response.obj.rolegroupMap[listone.category];
			});
			if(callback) {
				callback();
			}
			yield put({
				type: 'save',
				payload: response.obj,
			});
		},
		*deleteRoles({ payload, callback }, { call, put }) {
			const response = yield call(deleteRoles, payload);
			if (callback) callback();
		},
		*deleteRole({ payload, callback }, { call, put }) {
			const response = yield call(deleteRole, payload);
			if (callback) callback();
		},
		*addRole({ payload, callback }, { call, put }) {
			const response = yield call(addRole, payload);
			if(response.resultCode == '0'){
				callback.callbacksuccess();
			}else{
				callback.callbackfail();
			}
		},
		*updateRole({ payload, callback }, { call, put }) {
			const response = yield call(updateRole, payload);
			if(response.resultCode == '0'){
				callback.callbacksuccess();
			}else{
				callback.callbackfail();
			}
		},
		*detailRole({ payload, callback }, { call, put }) {
			const response = yield call(detailRole, payload);
			if (callback) callback(response.obj);
		},

		*getPermits({ payload, callback }, { call, put }) {
			const response = yield call(getPermits, payload);
			if (callback) callback(response.obj);
		},
		*setPermits({ payload, callback }, { call, put }) {
			const response = yield call(setPermits, payload);
			if(response.resultCode == '0'){
				callback.callbacksuccess();
			}else{
				callback.callbackfail();
			}
		},

		*getrolegroup({ payload }, { call, put }) {
			const response = yield call(getRoleGroups, payload);
			yield put({
				type: 'saveRoleGroup',
				payload: response.obj.list,
			});
		},
	},

	reducers: {
		save(state, action) {
			return {
				...state,
				data: action.payload,
			};
		},
		saveRoleGroup(state, action) {
			state.rolegroup = [];
			action.payload.map(item => {
				state.rolegroup.push({
					name: item.name,
					id: item.id
				})
			})
			return state;
		}
	},
};
