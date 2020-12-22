import { 
	getPermits,
	deletePermit,
	deletePermits,
	addPermit,
	updatePermit,
	detailPermit,
} from './service';
import {
	getPermitGroups,
} from '../permitgroup/service';

export default {
	namespace: 'permits',
	state: {
		data: {
			list: [],
			pagination: {},
		},
		permitgroup: []
	},

	effects: {
		*fetch({ payload, callback }, { call, put }) {
			const response = yield call(getPermits, payload);
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
				listone.categoryname = response.obj.groupMap[listone.category];
			});
			if(callback) {
				callback();
			}
			yield put({
				type: 'save',
				payload: response.obj,
			});
		},
		*deletePermits({ payload, callback }, { call, put }) {
			const response = yield call(deletePermits, payload);
			if (callback) callback();
		},
		*deletePermit({ payload, callback }, { call, put }) {
			const response = yield call(deletePermit, payload);
			if (callback) callback();
		},
		*addPermit({ payload, callback }, { call, put }) {
			const response = yield call(addPermit, payload);
			if(response.resultCode == '0'){
				callback.callbacksuccess();
			}else{
				callback.callbackfail();
			}
		},
		*updatePermit({ payload, callback }, { call, put }) {
			const response = yield call(updatePermit, payload);
			if(response.resultCode == '0'){
				callback.callbacksuccess();
			}else{
				callback.callbackfail();
			}
		},
		*detailPermit({ payload, callback }, { call, put }) {
			const response = yield call(detailPermit, payload);
			if (callback) callback(response.obj);
		},

		*getpermitgroup({ payload }, { call, put }) {
			const response = yield call(getPermitGroups, payload);
			yield put({
				type: 'savePermitGroup',
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
		savePermitGroup(state, action) {
			state.permitgroup = [];
			action.payload.map(item => {
				state.permitgroup.push({
					name: item.name,
					id: item.id
				})
			})
			return state;
		},
	},
};
