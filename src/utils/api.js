// src/api.js
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/cip',
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add authorization header
    const token = Cookies.get('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized, logging out...');
      Cookies.remove('token');
      window.location.href = '/login';
    } else if (error.response && error.response.status === 500) {
      console.log('Server error, please try again later.');
    }

    return Promise.reject(error);
  }
);

export default api;
