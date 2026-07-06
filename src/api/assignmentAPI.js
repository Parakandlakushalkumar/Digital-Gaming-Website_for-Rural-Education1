import axiosInstance from './axiosConfig.js';

export const assignmentAPI = {
  // Create Assignment (for specific students)
  createAssignment: async (data) => {
    return await axiosInstance.post('/assignments', data);
  },

  // Create Assignment by Class (for entire grade)
  createAssignmentByClass: async (data) => {
    return await axiosInstance.post('/assignments/class', data);
  },

  // Get Assignment
  getAssignment: async (assignmentId) => {
    return await axiosInstance.get(`/assignments/${assignmentId}`);
  },

  // Get Teacher's Assignments
  getAssignments: async (teacherId) => {
    return await axiosInstance.get(`/assignments/teacher/${teacherId}`);
  },

  // Delete Assignment
  deleteAssignment: async (assignmentId) => {
    return await axiosInstance.delete(`/assignments/${assignmentId}`);
  },

  // Create Submission
  createSubmission: async (data) => {
    return await axiosInstance.post('/submissions', data);
  },

  // Grade Submission
  gradeSubmission: async (submissionId, grade, feedback) => {
    return await axiosInstance.put(`/submissions/${submissionId}/grade`, {
      grade,
      feedback
    });
  },
};
