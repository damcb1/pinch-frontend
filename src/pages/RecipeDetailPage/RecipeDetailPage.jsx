import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipe, deleteRecipe } from '../../services/recipeService';
import { DIFFICULTY_LABELS } from '../../constants/recipeOptions';
import AppLayout from '../../components/layout/AppLayout/AppLayout';
import Button from '../../components/common/Button/Button';
import IngredientCheck from '../../components/recipe/IngredientCheck/IngredientCheck';
import Modal from "../../components/common/Modal/Modal.jsx";
import './RecipeDetailPage.scss';

const RecipeDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [checked, setChecked] = useState({});
    const [doneSteps, setDoneSteps] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

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

    const toggleIngredient = (index) => {
        setChecked((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    const togleStep = (index) => {
        setDoneSteps((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteRecipe(id);
            navigate('/mis-recetas');
        } catch (err) {
            setIsDeleting(false);
            setShowDeleteModal(false);
            alert('No se pudo eliminar la receta.');
        }
    };

    if (isLoading) {
        return (
            <AppLayout>
                <p className="recipe-detail__status">Cargando…</p>
            </AppLayout>
        );
    }

    if (error) {
        return (
            <AppLayout>
                <div className="recipe-detail__status">
                    <p>{error}</p>
                    <Button to="/mis-recetas" variant="secondary">Volver a mis recetas</Button>
                </div>
            </AppLayout>
        );
    }

    const meta = [
        recipe.timeMinutes ? `${recipe.timeMinutes} min` : null,
        recipe.servings ? `${recipe.servings} raciones` : null,
        recipe.difficulty ? DIFFICULTY_LABELS[recipe.difficulty] : null,
        recipe.cuisine || null,
    ].filter(Boolean).join(' · ');

    return (
        <AppLayout>
            <div className="recipe-detail">
                <div className="recipe-detail__photo">
                    {recipe.imageUrl && (
                        <img src={recipe.imageUrl} alt={recipe.title} className="recipe-detail__img" />
                    )}
                    {recipe.sourceUrl && (
                        <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="recipe-detail__source">
                        Ver original ↗
                        </a>
                        )}
                </div>

                <div className="recipe-detail__content">
                    <h1 className="recipe-detail__title">{recipe.title}</h1>
                    {meta && <p className="recipe-detail__meta">{meta}</p>}

                    <div className="recipe-detail__actions">
                        <Button to={`/recetas/${id}/editar`} variant="secondary" size="sm">Editar</Button>
                        <Button variant="secondary" size="sm" onClick={() => setShowDeleteModal(true)}>Borrar</Button>
                    </div>

                    {recipe.description && (
                        <p className="recipe-detail__description">{recipe.description}</p>
                    )}

                    <section className="recipe-detail__section">
                        <h2 className="recipe-detail__section-title">Ingredientes</h2>
                        <div className="recipe-detail__ingredients">
                            {recipe.ingredients.map((ing, i) => (
                                <IngredientCheck
                                    key={i}
                                    ingredient={ing}
                                    checked={!!checked[i]}
                                    onToggle={() => toggleIngredient(i)}
                                />
                            ))}
                        </div>
                    </section>

                    <section className="recipe-detail__section">
                        <h2 className="recipe-detail__section-title">Pasos</h2>
                        <ol className="recipe-detail__steps">
                            {recipe.steps.map((step, i) => (
                                <li key={i} className="recipe-detail__step">
                                    <button
                                        type="button"
                                        className={`recipe-detail__step-num ${doneSteps[i] ? 'is-done' : ''}`}
                                        onClick={() => togleStep(i)}
                                        aria-pressed={!!doneSteps[i]}
                                        aria-label={`Marcar paso ${i + 1} como hecho`}
                                    >
                                        {i + 1}
                                    </button>
                                    <span className="recipe-detail__step-text">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </section>
                </div>
            </div>

            {showDeleteModal && (
                <Modal
                    title="¿Quieres eliminar esta receta?"
                    confirmLabel="Eliminar"
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeleteModal(false)}
                    isProcessing={isDeleting}
                >
                    Esta acción no se puede deshacer. La receta "{recipe.title}" se eliminará para siempre.
                </Modal>
            )}

        </AppLayout>
    );
};

export default RecipeDetailPage;