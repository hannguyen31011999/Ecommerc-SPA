import * as constant from './Constants';

const initialState = {
    loading: false,
    total: {
        data: [],
        currentPage: 0,
        lastPage: 0
    },
    comfirm: {
        data: [],
        currentPage: 0,
        lastPage: 0
    },
    delivering: {
        data: [],
        currentPage: 0,
        lastPage: 0
    },
    delivered: {
        data: [],
        currentPage: 0,
        lastPage: 0
    },
    cancelled: {
        data: [],
        currentPage: 0,
        lastPage: 0
    }
}

const PurchaseReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case constant.loading:
            return { ...state, loading: payload };
        case constant.fetchAll:
            return { ...state, total: payload };
        case constant.fetchComfirm:
            return { ...state, comfirm: payload, loading: false };
        case constant.fetchDelivering:
            return { ...state, delivering: payload, loading: false };
        case constant.fetchDelivered:
            return { ...state, delivered: payload, loading: false };
        case constant.paginationAll: {
            const { data, currentPage, lastPage } = payload;
            const temp = [...state.total.data].concat(data);
            return {
                ...state,
                total: { data: temp, currentPage, lastPage },
                loading: false
            };
        }
        case constant.paginationComfirm: {
            const { data, currentPage, lastPage } = payload;
            const temp = [...state.comfirm.data].concat(data);
            return {
                ...state,
                comfirm: { data: temp, currentPage, lastPage },
                loading: false
            };
        }
        case constant.paginationDelivering: {
            const { data, currentPage, lastPage } = payload;
            const temp = [...state.delivering.data].concat(data);
            return {
                ...state,
                delivering: { data: temp, currentPage, lastPage },
                loading: false
            };
        }
        case constant.paginationDelivered: {
            const { data, currentPage, lastPage } = payload;
            const temp = [...state.delivered.data].concat(data);
            return {
                ...state,
                delivered: { data: temp, currentPage, lastPage },
                loading: false
            };
        }
        default:
            return state
    }
}

export default PurchaseReducer;