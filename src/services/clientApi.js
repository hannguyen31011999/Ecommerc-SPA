import { callApi } from '../utils/callApi';
import { ACCESS_TOKEN } from '../settings/configUrl';

const getToken = () => {
    return localStorage.getItem(ACCESS_TOKEN);
}

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
    fetchCart(id) {
        return callApi(`api/cart/list?query=${id}`, 'get');
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

export const apiRegister = {
    register(data) {
        return callApi(`api/register/create`, 'post', data);
    }
}

export const apiLogin = {
    login(data) {
        return callApi(`api/login`, 'post', data);
    },
    logout() {
        return callApi(`api/logout?token=${getToken()}`);
    },
    refreshToken() {
        return callApi(`api/token/refresh?token=${getToken()}`);
    }
}

export const apiProductDetail = {
    getProduct(slug) {
        return callApi(`api/detail/${slug}`);
    },
    getProductPagination(slug, page) {
        return callApi(`api/detail/${slug}?page=${page}`);
    },
    createReview(data) {
        return callApi(`api/detail/review/create`, 'post', data);
    }
}