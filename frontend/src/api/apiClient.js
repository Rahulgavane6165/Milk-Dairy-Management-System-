// src/api/apiClient.js

import axios from 'axios';

// Create an Axios instance with default settings
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optionally, set up interceptors for requests and responses
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Replace with your token retrieval logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default apiClient;
