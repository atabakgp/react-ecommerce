// src/services/axiosProductInstance.ts
import axios from 'axios';

// Create Axios instance for product API
const productAPI = axios.create({
  baseURL: 'https://dummyjson.com', // Your product API base URL
  timeout: 10000,                   // 10 seconds timeout
});

// Add request interceptor (e.g., add auth token if needed)
productAPI.interceptors.request.use(
  config => {
    // For example, add Authorization header if token exists
    // const token = localStorage.getItem('accessToken');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  error => Promise.reject(error)
);

// Add response interceptor (optional: error handling)
productAPI.interceptors.response.use(
  response => response,
  error => {
    // You can handle global errors here
    // e.g., if (error.response.status === 401) { ... }
    return Promise.reject(error);
  }
);

export default productAPI;
