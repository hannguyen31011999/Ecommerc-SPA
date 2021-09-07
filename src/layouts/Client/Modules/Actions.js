import { apiHome } from '../../../services/clientApi';
import * as constants from './Constants';

export const loadingAct = (payload) => ({
    type: constants.loading,
    payload
});

export const fetchCategoriesAct = (payload) => ({
    type: constants.fetchCategories,
    payload
});

export const fetchFailAct = (payload) => ({
    type: constants.fetchFail,
    payload
});


export const fetchCategoriesAction = () => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiHome.fetchCategories();
        dispatch(fetchCategoriesAct(res.data.data));
    } catch (e) {
        dispatch(fetchFailAct(false));
        console.log(e);
    }
}