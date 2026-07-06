import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 errors - try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('studentAuth');
        localStorage.removeItem('teacherAuth');
        const redirectPath = window.location.pathname.startsWith('/teacher')
          ? '/teacher'
          : '/student';
        window.location.href = redirectPath;
        return Promise.reject(refreshError);
      }
    }

    const message =
      error.response?.data?.message ||
      (error.code === 'ERR_NETWORK'
        ? `Cannot reach API at ${API_URL}. Ensure the backend is running on port 5000.`
        : error.message);

    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
