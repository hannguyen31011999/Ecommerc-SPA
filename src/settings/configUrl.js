export const BASE_URL = "http://localhost:8000";
export const BASE_URL_ADMIN = "http://localhost:8000/api/admin";
export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const TIMESTAMP = 'TIMESTAMP';
export const HEADER_BEARER = { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` } }