import api from "./api.js";

export const register = async (email, password) => {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
};