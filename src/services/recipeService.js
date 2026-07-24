import api from "./api.js";

export const createRecipe = async (recipeData) => {
    const response = await api.post('/recipes', recipeData);
    return response.data;
};