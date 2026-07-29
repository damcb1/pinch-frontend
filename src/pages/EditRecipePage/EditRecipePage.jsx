import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipe, updateRecipe } from '../../services/recipeService';
import RecipeForm from '../../components/recipe/RecipeForm/RecipeForm';
import Button from '../../components/common/Button/Button';

const EditRecipePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const data = await getRecipe(id);
                setRecipe(data);
            } catch (err) {
                const status = err.response?.status;
                if (status === 404) setError('Esta receta no existe.');
                else if (status === 403) setError('No tienes acceso a esta receta.');
                else setError('No se pudo cargar la receta.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecipe();
    }, [id]);

    const handleUpdate = async (recipeData) => {
        await updateRecipe(id, recipeData);
        navigate(`/recetas/${id}`);
    };

    if (isLoading) {
        return <p style={{ textAlign: 'center', padding: 40 }}>Cargando…</p>;
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: 40 }}>
                <p>{error}</p>
                <Button to="/mis-recetas" variant="secondary">Volver a mis recetas</Button>
            </div>
        );
    }

    return (
        <div className="recipe-page">
            <h1 className="recipe-page__title">Editar receta</h1>
            <RecipeForm initialValues={recipe} onSubmit={handleUpdate} submitLabel="Guardar cambios" />
        </div>
    );
};

export default EditRecipePage;