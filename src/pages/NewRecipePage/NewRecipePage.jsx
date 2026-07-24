import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../../services/recipeService';
import { DIFFICULTIES, CUISINES } from '../../constants/recipeOptions';
import AppLayout from '../../components/layout/AppLayout/AppLayout';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import ChipGroup from '../../components/common/ChipGroup/ChipGroup';
import IngredientRow from '../../components/recipe/IngredientRow/IngredientRow';
import StepRow from '../../components/recipe/StepRow/StepRow';
import './NewRecipePage.scss';

const NewRecipePage = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [timeMinutes, setTimeMinutes] = useState('');
    const [servings, setServings] = useState('');
    const [difficulty, setDifficulty] = useState(null);
    const [cuisine, setCuisine] = useState(null);
    const [sourceUrl, setSourceUrl] = useState('');
    const [ingredients, setIngredients] = useState([{ qty: '', unit: '', name: '' }]);
    const [steps, setSteps] = useState(['']);

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleIngredientChange = (index, field, value) => {
        setIngredients((prev) =>
            prev.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing))
        );
    };
    const addIngredient = () => {
        setIngredients((prev) => [...prev, { qty: '', unit: '', name: '' }]);
    };
    const removeIngredient = (index) => {
        setIngredients((prev) => prev.filter((_, i) => i !== index));
    };

    const handleStepChange = (index, value) => {
        setSteps((prev) => prev.map((s, i) => (i === index ? value : s)));
    };
    const addStep = () => {
        setSteps((prev) => [...prev, '']);
    };
    const removeStep = (index) => {
        setSteps((prev) => prev.filter((_, i) => i !== index));
    };

    const validate = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = 'El título es obligatorio';

        const filledIngredients = ingredients.filter((i) => i.name.trim());
        if (filledIngredients.length === 0) {
            newErrors.ingredients = 'Añade al menos un ingrediente';
        }

        const filledSteps = steps.filter((s) => s.trim());
        if (filledSteps.length === 0) {
            newErrors.steps = 'Añade al menos un paso';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        const recipeData = {
            title,
            timeMinutes: timeMinutes ? Number(timeMinutes) : null,
            servings: servings ? Number(servings) : null,
            difficulty,
            cuisine,
            sourceUrl: sourceUrl || null,
            ingredients: ingredients.filter((i) => i.name.trim()),
            steps: steps.filter((s) => s.trim()),
        };

        try {
            const created = await createRecipe(recipeData);
            navigate(`/recetas/${created.id}`);
        } catch (err) {
            const data = err.response?.data;
            setErrors({ general: data?.message || 'No se pudo guardar la receta.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AppLayout>
            <div className="new-recipe">
                <h1 className="new-recipe__title">Nueva receta</h1>

                <form className="new-recipe__form" onSubmit={handleSubmit} noValidate>
                    <Input
                        id="title"
                        label="Título"
                        variant="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        error={errors.title}
                    />

                    <div className="new-recipe__row">
                        <Input
                            id="timeMinutes"
                            label="Tiempo (min)"
                            type="number"
                            value={timeMinutes}
                            onChange={(e) => setTimeMinutes(e.target.value)}
                        />
                        <Input
                            id="servings"
                            label="Raciones"
                            type="number"
                            value={servings}
                            onChange={(e) => setServings(e.target.value)}
                        />
                    </div>

                    <ChipGroup
                        legend="Dificultad"
                        options={DIFFICULTIES}
                        selected={difficulty}
                        onSelect={setDifficulty}
                    />

                    <ChipGroup
                        legend="Tipo de cocina"
                        options={CUISINES}
                        selected={cuisine}
                        onSelect={setCuisine}
                    />

                    <Input
                        id="sourceUrl"
                        label="Fuente (opcional)"
                        placeholder="Link del vídeo o receta original"
                        value={sourceUrl}
                        onChange={(e) => setSourceUrl(e.target.value)}
                    />

                    <div className="new-recipe__section">
                        <h2 className="new-recipe__section-title">Ingredientes</h2>
                        {ingredients.map((ing, i) => (
                            <IngredientRow
                                key={i}
                                index={i}
                                ingredient={ing}
                                onChange={handleIngredientChange}
                                onRemove={removeIngredient}
                                canRemove={ingredients.length > 1}
                            />
                        ))}
                        {errors.ingredients && (
                            <p className="new-recipe__error" role="alert">{errors.ingredients}</p>
                        )}
                        <button type="button" className="new-recipe__add" onClick={addIngredient}>
                            + Añadir ingrediente
                        </button>
                    </div>

                    <div className="new-recipe__section">
                        <h2 className="new-recipe__section-title">Pasos</h2>
                        {steps.map((step, i) => (
                            <StepRow
                                key={i}
                                index={i}
                                value={step}
                                onChange={handleStepChange}
                                onRemove={removeStep}
                                canRemove={steps.length > 1}
                            />
                        ))}
                        {errors.steps && (
                            <p className="new-recipe__error" role="alert">{errors.steps}</p>
                        )}
                        <button type="button" className="new-recipe__add" onClick={addStep}>
                            + Añadir paso
                        </button>
                    </div>

                    {errors.general && (
                        <p className="new-recipe__error" role="alert">{errors.general}</p>
                    )}

                    <Button type="submit" variant="primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Guardando…' : 'Guardar receta'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default NewRecipePage;