import { 
	getRoleGroups,
	deleteRoleGroup,
	deleteRoleGroups,
	addRoleGroup,
	updateRoleGroup,
	detailRoleGroup
} from './service';

export default {
	namespace: 'rolegroup',
	state: {
		data: {
			list: [],
			pagination: {},
		}
	},

	effects: {
		*fetch({ payload, callback }, { call, put }) {
			const response = yield call(getRoleGroups, payload);
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
			if(callback) {
				callback();
			}
			yield put({
				type: 'save',
				payload: response.obj,
			});
		},
		*deleteRoleGroup({ payload, callback }, { call, put }) {
			const response = yield call(deleteRoleGroup, payload);
			if (callback) callback();
		},
		*deleteRoleGroups({ payload, callback }, { call, put }) {
			const response = yield call(deleteRoleGroups, payload);
			if (callback) callback();
		},
		*addRoleGroup({ payload, callback }, { call, put }) {
			const response = yield call(addRoleGroup, payload);
			if(response.resultCode == '0'){
				callback.callbacksuccess();
			}else{
				callback.callbackfail();
			}
		},
		*updateRoleGroup({ payload, callback }, { call, put }) {
			const response = yield call(updateRoleGroup, payload);
			if(response.resultCode == '0'){
				callback.callbacksuccess();
			}else{
				callback.callbackfail();
			}
		},
		*detailRoleGroup({ payload, callback }, { call, put }) {
			const response = yield call(detailRoleGroup, payload);
			if (callback) callback(response.obj);
		},
	},

	reducers: {
		save(state, action) {
			return {
				...state,
				data: action.payload,
			};
		},
	},
};
