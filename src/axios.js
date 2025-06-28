// src/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://shark-app-on96m.ondigitalocean.app',
    withCredentials: true, // مهم جدًا لـ Sanctum
});

// إرفاق التوكن في الهيدر (إذا كنت تستخدمه مع Sanctum API)
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default instance;
