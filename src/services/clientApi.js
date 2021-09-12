import { deleteCart } from '../redux/Contants/User/CartConstants';
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

export const apiCart = {
    fetchCart(ip) {
        return callApi(`api/cart/list`, 'get', ip);
    },
    createCart(data) {
        return callApi(`api/cart/create`, 'post', data);
    },
    updateCart(id) {
        return callApi(`api/cart/update/${id}`, 'patch');
    },
    deleteCart(id) {
        return callApi(`api/cart/delete/${id}`, 'delete');
    }
}