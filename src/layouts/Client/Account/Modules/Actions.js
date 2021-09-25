import * as constant from './Constants';
import { apiPurchase } from '../../../../services/clientApi';
import { alertErrors } from '../../../../settings/config';

export const loadingAct = payload => ({
    type: constant.loading,
    payload
});

export const fetchAllAct = payload => ({
    type: constant.fetchAll,
    payload
});

export const paginationAllAct = payload => ({
    type: constant.paginationAll,
    payload
});

export const fetchComfirmPurchaseAct = payload => ({
    type: constant.fetchComfirm,
    payload
});

export const paginationComfirmAct = payload => ({
    type: constant.paginationComfirm,
    payload
});

export const fetchDeliveringAct = payload => ({
    type: constant.fetchDelivering,
    payload
});

export const paginationDeliveringAct = payload => ({
    type: constant.paginationDelivering,
    payload
});


export const fetchDeliveredAct = payload => ({
    type: constant.fetchDelivered,
    payload
});

export const paginationDeliveredAct = payload => ({
    type: constant.paginationDelivered,
    payload
});

export const fetchCancelledAct = payload => ({
    type: constant.fetchCancelled,
    payload
});

export const paginationCancelledAct = payload => ({
    type: constant.paginationCancelled,
    payload
});


export const fetchAllPurchaseAction = id => async (dispatch) => {
    try {
        const res = await apiPurchase.getAllPurchase(id);
        if (res.data.status_code == 200) {
            const result = res.data.data;
            const data = {
                data: result.data,
                currentPage: result.current_page,
                lastPage: result.last_page
            };
            dispatch(fetchAllAct(data));
        }
    } catch (e) {
        if (e.response) {
            alertErrors("Sorry, Please try again");
        }
    }
}

export const fetchPurchaseForStatusAction = (id, status) => async (dispatch) => {
    try {
        const res = await apiPurchase.getPurchaseForStatus(id, status);
        if (res.data.status_code == 200) {
            const result = res.data.data;
            const data = {
                data: result.data,
                currentPage: result.current_page,
                lastPage: result.last_page
            };
            switch (status) {
                case "1":
                    dispatch(fetchComfirmPurchaseAct(data));
                    break;
                case "2":
                    dispatch(fetchDeliveringAct(data));
                    break;
                case "3":
                    dispatch(fetchDeliveredAct(data));
                    break;
                default:
                    break;
            }
        }
    } catch (e) {
        if (e.response) {
            alertErrors("Sorry, Please try again");
        }
    }
}

export const paginationAllPurchaseAction = (id, page) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiPurchase.paginationAll(id, page);
        if (res.data.status_code == 200) {
            const result = res.data.data;
            const data = {
                data: result.data,
                currentPage: result.current_page,
                lastPage: result.last_page
            };
            dispatch(paginationAllAct(data));
        }
    } catch (e) {
        if (e.response) {
            alertErrors("Sorry, Please try again");
        }
    }
}

export const paginationPurchaseStatusAction = (id, status, page) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiPurchase.paginationPurchaseStatus(id, status, page);
        if (res.data.status_code == 200) {
            const result = res.data.data;
            const data = {
                data: result.data,
                currentPage: result.current_page,
                lastPage: result.last_page
            };
            switch (status) {
                case "1":
                    dispatch(paginationComfirmAct(data));
                    break;
                case "2":
                    dispatch(paginationDeliveringAct(data));
                    break;
                case "3":
                    dispatch(paginationDeliveredAct(data));
                    break;
                default:
                    break;
            }
        }
    } catch (e) {
        if (e.response) {
            alertErrors("Sorry, Please try again");
        }
    }
}