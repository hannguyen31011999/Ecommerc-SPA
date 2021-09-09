import { callApi } from '../utils/callApi';

export const apiHome = {
    fetchCategories() {
        return callApi('api/categories');
    },
    fetchProducts() {
        return callApi(`api/product`);
    },
    scrollProducts(page) {
        return callApi(`api/product?page=${page}`);
    },
    fetchProductDiscount() {
        return callApi(`api/product/promotion`);
    }
}