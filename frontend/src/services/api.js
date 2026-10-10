import axios from "axios";

export const BASE_URL = "https://rentsmart-portal-production.up.railway.app";

const api = axios.create({
    baseURL: `${BASE_URL}/api`,
});

export default api;