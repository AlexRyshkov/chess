import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3002/api',
});

api.interceptors.request.use((config) => {
    return { ...config };
});

export default api;
