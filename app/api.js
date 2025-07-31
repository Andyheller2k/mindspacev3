

import axios from 'axios';

const BASE_URL = 'http://172.20.10.12:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default api;
