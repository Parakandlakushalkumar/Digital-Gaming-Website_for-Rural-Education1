import axiosInstance from './axiosConfig.js';

export const uploadAPI = {
  // Upload File
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return await axiosInstance.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
