import axios from 'axios';
import { getToken } from './auth';

const API = axios.create({
  baseURL: 'http://localhost:3001' // change if backend is hosted elsewhere
});

API.interceptors.request.use((req) => {
  const token = getToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
