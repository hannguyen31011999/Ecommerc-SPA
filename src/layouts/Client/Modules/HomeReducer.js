import * as constants from './Constants';
const initialState = {
    categories: [],
    loading: false
}

const HomeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case constants.loading: {
            return { ...state, loading: payload };
        }
        case constants.fetchCategories: {
            return { ...state, categories: payload, loading: false }
        }
        case constants.fetchFail: {
            return { ...state, loading: payload };
        }
        default:
            return state
    }
}

export default HomeReducer