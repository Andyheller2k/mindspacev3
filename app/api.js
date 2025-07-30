import axios from 'axios';

const BASE_URL = 'https://7fcebd43f454.ngrok-free.app';


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
