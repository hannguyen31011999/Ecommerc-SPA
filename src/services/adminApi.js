import { TOKEN } from '../settings/configUrl';
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

export const apiWard = {
    fetchApiWard(pageSize = 10) {
        // return callApiAdmin(`transport/list?pageSize=${pageSize}&token=${TOKEN}`);
        return callApiAdmin(`transport/list?pageSize=${pageSize}`);
    },
    changePagination(currentPage, pageSize = 10) {
        // return callApiAdmin(`transport/list?page=${currentPage}&pageSize=${pageSize}&token=${TOKEN}`);
        return callApiAdmin(`transport/list?page=${currentPage}&pageSize=${pageSize}`);
    },
    seachApiWard(keyword) {
        return callApiAdmin(`transport/list?keyword=${keyword}`);
    },
    fetchApiProvince() {
        // return callApiAdmin(`transport/data?token=${TOKEN}`);
        return callApiAdmin(`transport/data`);
    },
    fetchApiDistrict(id) {
        // return callApiAdmin(`transport/data/${id}?token=${TOKEN}`);
        return callApiAdmin(`transport/data/${id}`);
    },
    createWard(form) {
        // return callApiAdmin(`transport/create?token=${TOKEN}`, 'post', form);
        return callApiAdmin('transport/create', 'post', form);
    },
    editWard(id) {
        // return callApiAdmin(`transport/edit/${id}?token=${TOKEN}`);
        return callApiAdmin(`transport/edit/${id}`);
    },
    deleteWard(id) {
        // return callApiAdmin(`transport/delete/${id}?token=${TOKEN}`, 'delete', null);
        return callApiAdmin(`transport/delete/${id}`, 'delete', null);
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