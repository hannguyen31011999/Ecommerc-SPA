import { callApi } from '../utils/callApi';

export const apiHome = {
    fetchCategories() {
        return callApi('api/categories');
    }
}