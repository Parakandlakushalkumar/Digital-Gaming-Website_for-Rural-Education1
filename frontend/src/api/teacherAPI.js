import axiosInstance from './axiosConfig.js';

export const teacherAPI = {
  // Get Teacher Profile
  getProfile: async (teacherId) => {
    return await axiosInstance.get(`/teachers/${teacherId}`);
  },

  // Get Teacher's Students
  getStudents: async (teacherId) => {
    return await axiosInstance.get(`/teachers/${teacherId}/students`);
  },

  // Get Teacher's Submissions
  getSubmissions: async (teacherId) => {
    return await axiosInstance.get(`/teachers/${teacherId}/submissions`);
  },
};
