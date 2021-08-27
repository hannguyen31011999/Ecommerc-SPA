import axios from 'axios';
import { BASE_URL, TOKEN, ACCESS_TOKEN, BASE_URL_ADMIN } from './configUrl';

if (TOKEN) {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`
}
export default axios;