import axios from 'axios';
import { ACCESS_TOKEN, BASE_URL } from './configUrl';

const API_URL = BASE_URL + 'api/';
axios.defaults.baseURL = API_URL;
axios.interceptors.request.use(config => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;
    }
    return config
})
export default axios