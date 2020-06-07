import axios from 'axios';

export const moviesApi = axios.create({
  baseURL: '/api',
  timeout: 3000,
});
