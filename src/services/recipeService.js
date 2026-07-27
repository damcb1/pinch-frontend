import api from "./api.js";

export const createRecipe = async (recipeData) => {
    const response = await api.post('/recipes', recipeData);
    return response.data;
};

export const getRecipe = async (id) => {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
};

export const updateRecipe = async (id, recipeData) => {
    const response = await api.put(`/recipes/${id}`, recipeData);
    return response.data;
};

export const deleteRecipe = async (id) => {
    await api.delete(`/recipes/${id}`);
};

export const getMyRecipes = async (filters = {})=> {
    const params = {};
    if (filters.q) params.q = filters.q;
    if (filters.cuisine) params.cuisine = filters.cuisine;
    if (filters.minTime) params.minTime = filters.minTime;
    if (filters.maxTime) params.maxTime = filters.maxTime;
    if (filters.origin) params.origin = filters.origin;
    if (filters.difficulty) params.difficulty = filters.difficulty;

    const response = await api.get('/recipes', {params});
    return response.data;
}