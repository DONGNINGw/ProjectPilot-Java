import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

// 请求拦截器 - 添加JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器 - 处理错误
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
        // Token过期，清除本地存储并跳转到登录页
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;