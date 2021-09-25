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
        default:
            return state
    }
}

export default PurchaseReducer;