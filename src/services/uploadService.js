import api from './api.js';

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
};