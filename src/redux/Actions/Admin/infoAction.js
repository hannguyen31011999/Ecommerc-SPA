import * as info from "../../Contants/Admin/InfoContants";
import { apiAdmin } from '../../../services/adminApi';

export const fetchInfoSuccessAct = (user) => ({
    type: info.apiSuccessContants,
    payload: user
});

export const fetchInfoFailAct = (err) => ({
    type: info.apiFailContants,
    payload: err
});

export const responseApi = () => async (dispatch) => {
    try {
        const res = await apiAdmin.fetchInfo();
        if (res.data.status_code === 200) {
            dispatch(fetchInfoSuccessAct(res.data.user));
        }
    } catch (e) {
        dispatch(fetchInfoFailAct(e.message));
    }
}