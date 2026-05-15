import axios from 'axios';

const api = axios.create({
  baseURL: '',  // Uses Vite proxy in dev
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token from localStorage on init
const stored = localStorage.getItem('prodash-user');
if (stored) {
  try {
    const parsed = JSON.parse(stored);
    if (parsed.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${parsed.token}`;
    }
  } catch {}
}

// Response interceptor for auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('prodash-user');
      // Only redirect if not already on auth pages
      if (!window.location.pathname.includes('/login') &&
          !window.location.pathname.includes('/signup')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
