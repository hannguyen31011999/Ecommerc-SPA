import * as transp from '../../Contants/Admin/TransportContants';
const initialState = {
    data: [],
    pagination: {
        current: 1,
        pageSize: 10
    }
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case transp.listContant: {
            const { data, pagination } = payload;
            return { ...state, data, pagination }
        }
        // case transp.paginationContant: {
        //     const { data, pagination } = payload;
        //     return { ...state, data, pagination }
        // }
        default:
            return { ...state };
    }
}
