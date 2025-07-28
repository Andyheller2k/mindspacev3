// services/api.js

import axios from 'axios';

const BASE_URL = 'http://172.20.10.12:8080'; 

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can also intercept requests/responses if needed

export default api;
