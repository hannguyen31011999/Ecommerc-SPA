import { apiRefreshToken, callApi, callApiAdmin } from '../utils/callApi';

export const apiAdmin = {
    fetchApiLogin(data) {
        return callApi("api/login", "post", data);
    },
    refreshToken(token) {
        return apiRefreshToken('api/refresh/token');
    },
    fetchInfo() {
        return callApiAdmin('info');
    }
}

export const apiWard = {
    fetchApiWard(pageSize = 10) {
        return callApiAdmin(`transport/list?pageSize=${pageSize}`);
    },
    changePagination(currentPage, pageSize = 10) {
        return callApiAdmin(`transport/list?page=${currentPage}&pageSize=${pageSize}`);
    },
    seachApiWard(keyword) {
        return callApiAdmin(`transport/list?keyword=${keyword}`);
    }
}
