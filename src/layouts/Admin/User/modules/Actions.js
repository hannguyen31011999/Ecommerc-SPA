import * as contants from './Constants';
import { apiUser } from '../../../../services/adminApi';
import { alertSuccess, STATUS_SUCCESS } from '../../../../settings/config';

export const loadingAct = (loading) => ({
    type: contants.loadingContants,
    payload: loading
});

export const fetchSuccessAct = (payload) => ({
    type: contants.fetchSuccessContants,
    payload
});

export const paginationAct = (payload) => ({
    type: contants.paginationContants,
    payload
});

export const createAct = (payload) => ({
    type: contants.createContants,
    payload
});

export const modalAct = (payload) => ({
    type: contants.modalContants,
    payload
});

export const editAct = (payload) => ({
    type: contants.editContants,
    payload
});

export const updateAct = (payload) => ({
    type: contants.updateContants,
    payload
})


export const deleteAct = (payload) => ({
    type: contants.deleteContants,
    payload
});

export const seachAct = (payload) => ({
    type: contants.seachContants,
    payload
})

export const fetchFailAct = (payload) => ({
    type: contants.fetchFailContants,
    payload
});

// fetch data
export const transAction = (pageSize) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiUser.fetchApi(pageSize);
        const result = res.data.data;
        const payload = {
            data: result.data,
            total: result.total,
            lastPage: result.last_page
        }
        dispatch(fetchSuccessAct(payload));
    } catch (e) {
        dispatch(fetchFailAct(e));
    }
}

// fetch pagination
export const paginationAction = (current, pageSize) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiUser.changePagination(current, pageSize);
        const result = res.data.data;
        const payload = {
            data: result.data,
            pagination: { current, pageSize, total: result.total, lastPage: result.last_page }
        }
        dispatch(paginationAct(payload));
    } catch (e) {
        dispatch(fetchFailAct(e));
    }
}

// create
export const createUserAction = (data, form) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiUser.create(data);
        if (res.data.status_code === STATUS_SUCCESS) {
            alertSuccess('Create success');
            form.resetFields();
            dispatch(createAct(res.data.data));
        } else {
            const message = {};
            for (const [key, value] of Object.entries(res.data.message)) {
                form.setFields([
                    {
                        name: key,
                        errors: value,
                    },
                ]);
            }
            dispatch(fetchFailAct(false));
        }
    } catch (e) {
        dispatch(fetchFailAct(e));
    }
}

// update
export const updateUserAction = (id, data, form) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiUser.update(id, data);
        if (res.data.status_code === STATUS_SUCCESS) {
            dispatch(updateAct({ update: res.data.data, id }));
            alertSuccess('Update success');
        } else {
            const message = {};
            for (const [key, value] of Object.entries(res.data.message)) {
                form.setFields([
                    {
                        name: key,
                        errors: value,
                    },
                ]);
            }
            dispatch(fetchFailAct(false));
        }
    } catch (e) {
        dispatch(fetchFailAct(e));
    }
}

// delete
export const deleteUserAction = (id) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiUser.delete(id);
        if (res.data.status_code === STATUS_SUCCESS) {
            dispatch(deleteAct(id));
            alertSuccess(res.data.message);
        }
    } catch (e) {
        dispatch(fetchFailAct(e));
    }
}

export const seachUserAction = (pageSize, keyword) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiUser.seach(pageSize, keyword);
        const result = res.data.data;
        const payload = {
            data: result.data,
            total: result.total,
            lastPage: result.last_page
        }
        dispatch(seachAct(payload));
    } catch (e) {
        dispatch(fetchFailAct(e));
    }
}