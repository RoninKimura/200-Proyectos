import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({ baseURL: API_URL });

// Adjunta el access token a cada petición si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('halo_access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Si el access token expiró (401), intenta refrescarlo una vez con el refresh token
let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const refresh = localStorage.getItem('halo_refresh');

    if (error.response?.status === 401 && refresh && !original._retry && !isRefreshing) {
      original._retry = true;
      isRefreshing = true;
      try {
        const { data } = await axios.post(`${API_URL}/auth/refresh/`, { refresh });
        localStorage.setItem('halo_access', data.access);
        original.headers.Authorization = `Bearer ${data.access}`;
        isRefreshing = false;
        return api(original);
      } catch (refreshError) {
        isRefreshing = false;
        localStorage.removeItem('halo_access');
        localStorage.removeItem('halo_refresh');
        localStorage.removeItem('halo_user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
