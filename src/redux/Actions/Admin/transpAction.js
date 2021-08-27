import { apiCategories, apiWard } from '../../../services/adminApi';
import { alertSuccess, STATUS_SUCCESS } from '../../../settings/config';
import * as transport from '../../Contants/Admin/TransportContants';


export const loadingAct = (loading) => ({
    type: transport.fetchTranpContants,
    payload: loading
});

export const fetchSuccessAct = (payload) => ({
    type: transport.fetchSuccessContants,
    payload
});

export const fetchPaginationAct = (payload) => ({
    type: transport.paginationContant,
    payload
});

export const fetchProvinceAct = (payload) => ({
    type: transport.fetchProvinceContant,
    payload
});

export const createWardAct = (payload) => ({
    type: transport.createWard,
    payload
});

export const modalEditAct = (payload) => ({
    type: transport.closeModal,
    payload
});

export const editWardAct = (payload) => ({
    type: transport.editWard,
    payload
});

export const deleteWardAct = (payload) => ({
    type: transport.deleteContant,
    payload
});

export const fetchFailAct = (err) => ({
    type: transport.fetchFailContants,
    payload: err
});

// fetch data
export const transAction = (pageSize) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiCategories.fetchApiCategories(pageSize);
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
        const res = await apiWard.changePagination(current, pageSize);
        const result = res.data.data;
        const payload = {
            data: result.data,
            pagination: { current, pageSize, total: result.total, lastPage: result.last_page }
        }
        dispatch(fetchPaginationAct(payload));
    } catch (e) {
        dispatch(fetchFailAct(e));
    }
}

// fetch province
export const fetchProvinceAction = () => async (dispatch) => {
    try {
        const res = await apiWard.fetchApiProvince();
        dispatch(fetchProvinceAct(res.data.data));
    } catch (e) {
        dispatch(fetchFailAct(e));
    }
}

// create ward
export const createWardAction = (data, form) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiWard.createWard(data);
        if (res.data.status_code === STATUS_SUCCESS) {
            alertSuccess('Create success');
            form.resetFields();
            dispatch(createWardAct(res.data.data));
        } else {
            const message = {};
            for (const [key, value] of Object.entries(res.data.message)) {
                message[key] = value[0];
            }
            dispatch(fetchFailAct(message));
        }
    } catch (e) {
        dispatch(fetchFailAct(e));
    }
}

export const editWardAction = (id) => async (dispatch) => {
    try {
        const res = await apiWard.editWard(id);
        if (res.data.status_code === STATUS_SUCCESS) {
            const data = {
                ward: res.data.data.ward,
                parentData: res.data.data.parentData
            }
            dispatch(editWardAct(data));
            dispatch(modalEditAct(true));
        }
    } catch (e) {

    }
}

// delete ward
export const deleteWardAction = (id) => async (dispatch) => {
    try {
        const res = await apiWard.deleteWard(id);
        if (res.data.status_code === STATUS_SUCCESS) {
            alertSuccess(res.data.message);
            console.log(res.data.message);
            dispatch(deleteWardAct(id));
        }
    } catch (e) {
        dispatch(fetchFailAct(e));
    }
}