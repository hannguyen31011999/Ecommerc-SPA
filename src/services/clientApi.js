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
    updateCart(id, data) {
        return callApi(`api/cart/update/${id}`, 'post', data);
    },
    deleteCart(id) {
        return callApi(`api/cart/delete/${id}`, 'get');
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
    },
    loginWithFacebook() {
        return callApi(`api/redirect/facebook`);
    },
    redirectFacebook() {
        return callApi(`api/redirect/facebook`);
    },
    loginWithFacebook() {
        return callApi(`api/callback/facebook`);
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

export const apiProduct = {
    fetch(slug) {
        return callApi(`api/product/${slug}`);
    },
    fetchPagination(slug, page) {
        return callApi(`api/product/${slug}?page=${page}`);
    },
    fetchProductWithCategories(id) {
        return callApi(`api/categories/${id}`);
    },
    paginationProductWithCategories(id, page) {
        return callApi(`api/categories/${id}?page=${page}`);
    }
}

export const apiPurchase = {
    updateInfo(id, form) {
        return callApi(`api/info/update/${id}?token=${getToken()}`, 'post', form);
    }
}