import { useState, useEffect } from 'react';
import { getMyRecipes } from '../../services/recipeService';
import AppLayout from '../../components/layout/AppLayout/AppLayout';
import Button from '../../components/common/Button/Button';
import RecipeCard from '../../components/recipe/RecipeCard/RecipeCard';
import './MyRecipesPage.scss';

const MyRecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await getMyRecipes();
                setRecipes(data);
            } catch (err) {
                setError('No se pudieron cargar tus recetas.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    return (
        <AppLayout>
            <div className="my-recipes">
                <h1 className="my-recipes__title">Mis recetas</h1>

                {isLoading && <p className="my-recipes__status">Cargando…</p>}

                {!isLoading && error && (
                    <p className="my-recipes__status">{error}</p>
                )}

                {!isLoading && !error && recipes.length === 0 && (
                    <div className="my-recipes__empty">
                        <p className="my-recipes__empty-title">Aún no tienes recetas guardadas</p>
                        <p className="my-recipes__empty-text">
                            Pega el link de un vídeo o receta y Pinch se encarga del resto.
                        </p>
                        <Button to="/nueva-receta" variant="primary">Guardar mi primera receta</Button>
                    </div>
                )}

                {!isLoading && !error && recipes.length > 0 && (
                    <div className="my-recipes__grid">
                        {recipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default MyRecipesPage;