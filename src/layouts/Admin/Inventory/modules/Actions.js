import * as contants from './Constants';
import { apiInventory } from '../../../../services/adminApi';
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

export const updateStatusAct = (payload) => ({
    type: contants.updateStatusContants,
    payload
})


export const deleteAct = (payload) => ({
    type: contants.deleteContants,
    payload
});

export const seachAct = (payload) => ({
    type: contants.seachContants,
    payload
});

export const fetchProduct = (payload) => ({
    type: contants.fetchProductContants,
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
        const res = await apiInventory.fetchApi(pageSize);
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
        const res = await apiInventory.changePagination(current, pageSize);
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
export const createInventoryAction = (data, form) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiInventory.create(data);
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
export const updateInventoryAction = (id, data, form) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiInventory.update(id, data);
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

// seach
export const seachInventoryAction = (pageSize, keyword) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiInventory.seach(pageSize, keyword);
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

// get product
export const getListProductAction = (isBool) => async (dispatch) => {
    try {
        const res = await apiInventory.getListProduct();
        const result = res.data.data;
        dispatch(fetchProduct({
            isBool,
            result
        }));
    } catch (e) {
        dispatch(fetchFailAct(e));
    }
}

// update status
export const updateStatusAction = (id, data) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiInventory.updateStatus(id, data);
        if (res.data.status_code === STATUS_SUCCESS) {
            dispatch(updateStatusAct({ update: data.status, id }));
            alertSuccess('Update status success');
        }
    } catch (e) {
        dispatch(fetchFailAct(e));
    }
}