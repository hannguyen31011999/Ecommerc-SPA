import axios from 'axios';
import { apiAdmin } from '../services/adminApi';
import { ACCESS_TOKEN, BASE_URL, BASE_URL_ADMIN, TIMESTAMP } from '../settings/configUrl';
import { handleCompareTime, handleExpired, handleRefreshToken } from './expired';
import { Redirect } from 'react-router-dom';
export const apiRefreshToken = (endpoint, method = "get", data = null) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;
    return axios({
        method,
        url: `${BASE_URL}/${endpoint}`,
        data
    });
}

export const callApi = (endpoint, method = "get", data = null) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;
    return axios({
        method,
        url: `${BASE_URL}/${endpoint}`,
        data
    });
}

export const callApiAdmin = async (endpoint, method = "get", data = null) => {
    if (localStorage.getItem(ACCESS_TOKEN) !== null) {
        if (handleCompareTime()) {
            await apiAdmin.refreshToken().then(res => {
                let timestamp = new Date(res.data.timestamp.time);
                let miliseconds = timestamp.getTime();
                handleExpired(res.data.timestamp.expired, miliseconds, res.data.token);
            }).catch(e => {
                localStorage.removeItem(TIMESTAMP);
                localStorage.removeItem(ACCESS_TOKEN);
                return <Redirect to="/admin" />
            });
        }
        return await axios({
            method,
            url: `${BASE_URL_ADMIN}/${endpoint}`,
            data,
            headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` }
        });
    }
}