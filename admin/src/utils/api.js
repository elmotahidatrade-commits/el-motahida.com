import axios from 'axios';

const api = axios.create({
  baseURL: 'https://el-motahidacom-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the auth token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('em_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('em_admin_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
