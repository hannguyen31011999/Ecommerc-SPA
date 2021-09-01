import * as contants from './Constants';

const initialState = {
    data: [],
    pagination: {
        current: 1,
        pageSize: 15
    },
    loading: false,
    disabled: false,
    modal: false,
    modalContent: false,
    modalOption: false,
    modalVariant: false,
    relationship: {
    }
}

const ProductReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case contants.loadingContants: {
            return { ...state, loading: true }
        }
        case contants.fetchSuccessContants: {
            const { data, total, lastPage, categories, discount } = payload;
            return { ...state, data, pagination: { ...state.pagination, total, lastPage }, loading: false, relationship: { categories, discount } }
        }
        case contants.fetchFailContants: {
            return { ...state, disabled: payload, loading: false };
        }
        case contants.paginationContants: {
            const { data, pagination } = payload;
            const { current, pageSize, total, lastPage } = pagination;
            return { ...state, data, pagination: { ...state.pagination, current, pageSize, total, lastPage }, loading: false }
        }
        case contants.createContants: {
            let temp = [...state.data];
            let { current, lastPage, pageSize, total } = state.pagination;
            if (current === lastPage && pageSize === temp.length) {
                let data = [];
                data.push(payload);
                return { ...state, data, temp, loading: false, pagination: { ...state.pagination, total: ++total, current: ++current, lastPage: ++lastPage } };
            }
            temp.push(payload);
            return { ...state, data: temp, loading: false };
        }
        case contants.modalContants: {
            return { ...state, modal: payload, modalContent: payload, modalOption: payload }
        }
        case contants.editContants: {
            let temp = [...state.data];
            const index = temp.findIndex(cate => cate.id === payload);
            return { ...state, dataEdit: temp[index], modal: true }
        }
        case contants.updateContants: {
            const { update, id } = payload;
            const index = state.data.findIndex(cate => cate.id === id);
            state.data[index] = update;
            return { ...state, data: [...state.data], dataEdit: {}, loading: false, modal: false }
        }
        case contants.deleteContants: {
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
        case contants.seachContants: {
            const { data, total, lastPage } = payload;
            const temp = { ...state };
            return { ...state, data, pagination: { ...state.pagination, total, lastPage, pageSize: 15 }, loading: false }
        }
        case contants.modalContentContants: {
            let temp = [...state.data];
            const index = temp.findIndex(post => post.id === payload);
            return { ...state, dataEdit: temp[index], modalContent: true }
        }
        case contants.modalOptionContants: {
            let temp = [...state.data];
            const index = temp.findIndex(post => post.id === payload);
            return { ...state, dataEdit: temp[index], modalOption: true }
        }
        case contants.modalVariantConstant: {
            if (payload.isBool) {
                return { ...state, product_id: payload.id, modalVariant: true }
            } else {
                return { ...state, modalVariant: false, product_id: null }
            }
        }
        case contants.createVariantConstant: {
            let temp = [...state.data];
            let index = state.data.findIndex(item => item.id === payload.id);
            state.data[index].product_variants.push(payload.variant);
            state.data[index].product_skus.push(payload.sku);
            return { ...state, data: temp, loading: false, dataVariant: {}, disabled: false }
        }
        default:
            return state
    }
}

export default ProductReducer;