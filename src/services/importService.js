import api from "./api.js";

export const importFromUrl = async (url) => {
    const response = await api.post('/recipes/import', { url });
    return response.data;
};

export const importFromText = async (text) => {
    const response = await api.post('/recipes/import/text', { text });
    return response.data;
};

export const confirmImport = async (recipeData) => {
    const response = await api.post('/recipes/import/confirm', recipeData);
    return response.data;
}