import axiosInstance from './axiosConfig.js';

export const studentAPI = {
  // Get Student Profile
  getProfile: async (studentId) => {
    return await axiosInstance.get(`/students/${studentId}`);
  },

  // Update Student Profile
  updateProfile: async (studentId, data) => {
    return await axiosInstance.put(`/students/${studentId}`, data);
  },

  // Update Daily Activity (Time Tracking & Streak)
  updateActivity: async (studentId, sessionMinutes, playedToday) => {
    return await axiosInstance.put(`/students/${studentId}/activity`, {
      sessionMinutes,
      playedToday
    });
  },

  // Update Student Progress (Games & Score)
  updateProgress: async (studentId, noOfGamesPlayed, currentScore) => {
    return await axiosInstance.put(`/students/${studentId}/progress`, {
      noOfGamesPlayed,
      currentScore
    });
  },

  // Get Student Assignments
  getAssignments: async (studentId) => {
    return await axiosInstance.get(`/students/${studentId}/assignments`);
  },
};
