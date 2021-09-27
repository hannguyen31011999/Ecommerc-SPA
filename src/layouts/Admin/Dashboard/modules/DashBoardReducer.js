import * as constants from './Constants';

const initialState = {
    loading: false,
    count: {
        revenue: 0,
        order: 0,
        user: 0,
        visitor: 0
    }
}

const DashBoardReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case constants.loading:
            return { ...state, loading: payload };
        case constants.fetchCount:
            return { ...state, count: payload, loading: false };
        default:
            return state
    }
}

export default DashBoardReducer;
