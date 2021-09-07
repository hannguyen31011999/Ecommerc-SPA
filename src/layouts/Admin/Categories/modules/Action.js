import * as contants from './Constants';
import { apiCategories } from '../../../../services/adminApi';
import { alertSuccess, STATUS_SUCCESS } from '../../../../settings/config';
import { browserHistory } from 'react-router';

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
        const res = await apiCategories.fetchApiCategories(pageSize);
        if (res.data.status_code === STATUS_SUCCESS) {
            const result = res.data.data;
            const payload = {
                data: result.data,
                total: result.total,
                lastPage: result.last_page
            }
            dispatch(fetchSuccessAct(payload));
        }
    } catch (e) {
        dispatch(fetchFailAct(e));
    }
}

// fetch pagination
export const paginationAction = (current, pageSize) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiCategories.changePagination(current, pageSize);
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
export const createCategoriesAction = (data, form) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiCategories.createCategories(data);
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
export const updateCategoriesAction = (id, data, form) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiCategories.updateCategories(id, data);
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
export const deleteCategoriesAction = (id) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiCategories.deleteCategories(id);
        if (res.data.status_code === STATUS_SUCCESS) {
            dispatch(deleteAct(id));
            alertSuccess(res.data.message);
        }
    } catch (e) {
        dispatch(fetchFailAct(e));
    }
}

export const seachCategoriesAction = (pageSize, keyword) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiCategories.seachCategories(pageSize, keyword);
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