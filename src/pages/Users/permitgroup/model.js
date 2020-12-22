import { 
	getPermitGroups,
	deletePermitGroup,
	deletePermitGroups,
	addPermitGroup,
	updatePermitGroup,
	detailPermitGroup
} from './service';

export default {
	namespace: 'permitgroup',
	state: {
		data: {
			list: [],
			pagination: {},
		}
	},

	effects: {
		*fetch({ payload, callback }, { call, put }) {
			const response = yield call(getPermitGroups, payload);
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
		*deletePermitGroup({ payload, callback }, { call, put }) {
			const response = yield call(deletePermitGroup, payload);
			if (callback) callback();
		},
		*deletePermitGroups({ payload, callback }, { call, put }) {
			const response = yield call(deletePermitGroups, payload);
			if (callback) callback();
		},
		*addPermitGroup({ payload, callback }, { call, put }) {
			const response = yield call(addPermitGroup, payload);
			if(response.resultCode == '0'){
				callback.callbacksuccess();
			}else{
				callback.callbackfail();
			}
		},
		*updatePermitGroup({ payload, callback }, { call, put }) {
			const response = yield call(updatePermitGroup, payload);
			if(response.resultCode == '0'){
				callback.callbacksuccess();
			}else{
				callback.callbackfail();
			}
		},
		*detailPermitGroup({ payload, callback }, { call, put }) {
			const response = yield call(detailPermitGroup, payload);
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
