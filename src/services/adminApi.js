import { apiRefreshToken, callApi, callApiAdmin } from '../utils/callApi';

export const apiAdmin = {
    fetchApiLogin(data) {
        return callApi("api/login", "post", data);
    },
    fetchApiLogout() {
        return callApiAdmin('logout');
    },
    refreshToken() {
        return apiRefreshToken('api/refresh/token');
    },
    fetchInfo() {
        // return callApiAdmin(`info?token=${TOKEN}`);
        return callApiAdmin('info');
    }
}

export const apiCategories = {
    fetchApiCategories(pageSize = 10) {
        return callApiAdmin(`categories/list?pageSize=${pageSize}`);
    },
    changePagination(currentPage, pageSize = 10) {
        return callApiAdmin(`categories/list?page=${currentPage}&pageSize=${pageSize}`);
    },
    createCategories(form) {
        return callApiAdmin('categories/create', 'post', form);
    },
    editCategories(id) {
        return callApiAdmin(`categories/edit/${id}`);
    },
    updateCategories(id, form) {
        return callApiAdmin(`categories/update/${id}`, 'put', form);
    },
    deleteCategories(id) {
        return callApiAdmin(`categories/delete/${id}`, 'delete');
    },
    seachCategories(pageSize, keyword) {
        return callApiAdmin(`categories/seach?keyword=${keyword}&pageSize=${pageSize}`);
    }
}
export const apiPost = {
    fetchApi(pageSize = 10) {
        return callApiAdmin(`post/list?pageSize=${pageSize}`);
    },
    change(currentPage, pageSize = 10) {
        return callApiAdmin(`post/list?page=${currentPage}&pageSize=${pageSize}`);
    },
    create(form) {
        return callApiAdmin('post/create', 'post', form);
    },
    edit(id) {
        return callApiAdmin(`post/edit/${id}`);
    },
    update(id, form) {
        return callApiAdmin(`post/update/${id}`, 'post', form);
    },
    delete(id) {
        return callApiAdmin(`post/delete/${id}`, 'delete');
    },
    seach(pageSize, keyword) {
        return callApiAdmin(`post/seach?keyword=${keyword}&pageSize=${pageSize}`);
    }
}

export const apiDiscount = {
    fetchApi(pageSize = 10) {
        return callApiAdmin(`discount/list?pageSize=${pageSize}`);
    },
    changePagination(currentPage, pageSize = 10) {
        return callApiAdmin(`discount/list?page=${currentPage}&pageSize=${pageSize}`);
    },
    create(form) {
        return callApiAdmin('discount/create', 'post', form);
    },
    edit(id) {
        return callApiAdmin(`discount/edit/${id}`);
    },
    update(id, form) {
        return callApiAdmin(`discount/update/${id}`, 'put', form);
    },
    delete(id) {
        return callApiAdmin(`discount/delete/${id}`, 'delete');
    },
    seach(pageSize, keyword) {
        return callApiAdmin(`discount/seach?keyword=${keyword}&pageSize=${pageSize}`);
    }
}

export const apiUser = {
    fetchApi(pageSize = 10) {
        return callApiAdmin(`user/list?pageSize=${pageSize}`);
    },
    changePagination(currentPage, pageSize = 10) {
        return callApiAdmin(`user/list?page=${currentPage}&pageSize=${pageSize}`);
    },
    create(form) {
        return callApiAdmin('user/create', 'post', form);
    },
    edit(id) {
        return callApiAdmin(`user/edit/${id}`);
    },
    update(id, form) {
        return callApiAdmin(`user/update/${id}`, 'put', form);
    },
    delete(id) {
        return callApiAdmin(`user/delete/${id}`, 'delete');
    },
    seach(pageSize, keyword) {
        return callApiAdmin(`user/seach?keyword=${keyword}&pageSize=${pageSize}`);
    },
    updatStatus(id, status) {
        return callApiAdmin(`user/status/${id}?status=${status}`, 'patch');
    }
}

export const apiProduct = {
    fetchApi(pageSize = 10) {
        return callApiAdmin(`product/list?pageSize=${pageSize}`);
    },
    changePagination(currentPage, pageSize = 10) {
        return callApiAdmin(`product/list?page=${currentPage}&pageSize=${pageSize}`);
    },
    create(form) {
        return callApiAdmin('product/create', 'post', form);
    },
    edit(id) {
        return callApiAdmin(`product/edit/${id}`);
    },
    update(id, form) {
        return callApiAdmin(`product/update/${id}`, 'put', form);
    },
    delete(id) {
        return callApiAdmin(`product/delete/${id}`, 'delete');
    },
    seach(pageSize, keyword) {
        return callApiAdmin(`product/seach?keyword=${keyword}&pageSize=${pageSize}`);
    },
    createVariant(id, form) {
        return callApiAdmin(`product/variant/${id}`, 'post', form);
    }
}