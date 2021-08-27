import * as transp from '../../Contants/Admin/TransportContants';
const initialState = {
    data: [],
    pagination: {
        current: 1,
        pageSize: 15
    },
    loading: false,
    errors: {},
    province: [],
    modal: false,
    parentData: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case transp.fetchTranpContants: {
            return { ...state, loading: payload };
        }
        case transp.fetchSuccessContants: {
            const { data, total, lastPage } = payload;
            return { ...state, data, pagination: { ...state.pagination, total, lastPage }, loading: false }
        }
        case transp.fetchFailContants: {
            return { ...state, loading: false, errors: payload };
        }
        case transp.paginationContant: {
            const { data, pagination } = payload;
            const { current, pageSize, total, lastPage } = pagination;
            return { ...state, data, pagination: { ...state.pagination, current, pageSize, total, lastPage }, loading: false }
        }
        case transp.fetchProvinceContant: {
            return { ...state, province: payload };
        }
        case transp.createWard: {
            let temp = [...state.data];
            let { current, lastPage, pageSize, total } = state.pagination;
            if (current === lastPage && pageSize === temp.length) {
                let data = [];
                data.push(payload);
                return { ...state, data, temp, loading: false, pagination: { ...state.pagination, total: ++total, current: ++current, lastPage: ++lastPage }, errors: {} };
            }
            temp.push(payload);
            return { ...state, data: temp, loading: false, errors: {} };
        }
        case transp.deleteContant: {
            let dataTemp = [...state.data];
            const index = dataTemp.findIndex((item) => item.id === payload);
            dataTemp.splice(index, 1);
            let { current, lastPage, total } = state.pagination;
            if (current === lastPage && !dataTemp.length > 0) {
                let data = [...state.temp];
                return { ...state, data, temp: [], loading: false, pagination: { ...state.pagination, total: --total, current: --current, lastPage: --lastPage } };
            }
            return { ...state, data: dataTemp, loading: false };
        }
        case transp.closeModal: {
            return { ...state, modal: payload }
        }
        case transp.editWard: {
            return { ...state, parentData: payload }
        }
        default: {
            return { ...state };
        }
    }
}
