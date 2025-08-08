

import axios from 'axios';

const BASE_URL = 'http://10.36.12.105:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default api;
