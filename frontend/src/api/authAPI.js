import axiosInstance from './axiosConfig.js';

export const authAPI = {
  // Student Login
  studentLogin: async (credentials) => {
    return await axiosInstance.post('/auth/student/login', credentials);
  },

  // Teacher Login
  teacherLogin: async (credentials) => {
    return await axiosInstance.post('/auth/teacher/login', credentials);
  },

  // Student Signup
  studentSignup: async (signupData) => {
    return await axiosInstance.post('/auth/student/signup', signupData);
  },

  // Refresh Token
  refreshToken: async () => {
    return await axiosInstance.post('/auth/refresh');
  },

  // Logout
  logout: async () => {
    return await axiosInstance.post('/auth/logout');
  },
};
