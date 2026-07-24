import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../../services/recipeService';
import AppLayout from '../../components/layout/AppLayout/AppLayout';
import RecipeForm from '../../components/recipe/RecipeForm/RecipeForm';

const NewRecipePage = () => {
    const navigate = useNavigate();

    const handleCreate = async (recipeData) => {
        const created = await createRecipe(recipeData);
        navigate(`/recetas/${created.id}`);
    };

    return (
        <AppLayout>
            <div className="recipe-page">
                <h1 className="recipe-page__title">Nueva receta</h1>
                <RecipeForm onSubmit={handleCreate} submitLabel="Guardar receta" />
            </div>
        </AppLayout>
    );
};

export default NewRecipePage;