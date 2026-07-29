import { useState } from 'react';
import { DIFFICULTIES, CUISINES } from '../../../constants/recipeOptions';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import ChipGroup from '../../common/ChipGroup/ChipGroup';
import IngredientRow from '../IngredientRow/IngredientRow';
import StepRow from '../StepRow/StepRow';
import './RecipeForm.scss';

const RecipeForm = ({ initialValues, onSubmit, submitLabel = 'Guardar receta' }) => {
    const init = initialValues || {};

    const [title, setTitle] = useState(init.title || '');
    const [timeMinutes, setTimeMinutes] = useState(init.timeMinutes != null ? String(init.timeMinutes) : '');
    const [servings, setServings] = useState(init.servings != null ? String(init.servings) : '');
    const [difficulty, setDifficulty] = useState(init.difficulty || null);
    const [cuisine, setCuisine] = useState(init.cuisine || null);
    const [sourceUrl, setSourceUrl] = useState(init.sourceUrl || '');
    const [imageUrl] = useState(init.imageUrl || null);
    const [ingredients, setIngredients] = useState(
        init.ingredients && init.ingredients.length > 0
            ? init.ingredients.map((i) => ({ qty: i.qty || '', unit: i.unit || '', name: i.name || '' }))
            : [{ qty: '', unit: '', name: '' }]
    );
    const [steps, setSteps] = useState(
        init.steps && init.steps.length > 0 ? [...init.steps] : ['']
    );

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleIngredientChange = (index, field, value) => {
        setIngredients((prev) => prev.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing)));
    };
    const addIngredient = () => setIngredients((prev) => [...prev, { qty: '', unit: '', name: '' }]);
    const removeIngredient = (index) => setIngredients((prev) => prev.filter((_, i) => i !== index));

    const handleStepChange = (index, value) => {
        setSteps((prev) => prev.map((s, i) => (i === index ? value : s)));
    };
    const addStep = () => setSteps((prev) => [...prev, '']);
    const removeStep = (index) => setSteps((prev) => prev.filter((_, i) => i !== index));

    const validate = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = 'El título es obligatorio';
        if (ingredients.filter((i) => i.name.trim()).length === 0) {
            newErrors.ingredients = 'Añade al menos un ingrediente';
        }
        if (steps.filter((s) => s.trim()).length === 0) {
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
            imageUrl: imageUrl || null,
            ingredients: ingredients.filter((i) => i.name.trim()),
            steps: steps.filter((s) => s.trim()),
        };

        try {
            await onSubmit(recipeData);
        } catch (err) {
            const data = err.response?.data;
            setErrors({ general: data?.message || 'No se pudo guardar la receta.' });
            setIsSubmitting(false);
        }
    };

    return (
        <form className="recipe-form" onSubmit={handleSubmit} noValidate>
            <Input
                id="title"
                label="Título"
                variant="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={errors.title}
            />

            <div className="recipe-form__row">
                <Input id="timeMinutes" label="Tiempo (min)" type="number"
                       value={timeMinutes} onChange={(e) => setTimeMinutes(e.target.value)} />
                <Input id="servings" label="Raciones" type="number"
                       value={servings} onChange={(e) => setServings(e.target.value)} />
            </div>

            <ChipGroup legend="Dificultad" options={DIFFICULTIES} selected={difficulty} onSelect={setDifficulty} />
            <ChipGroup legend="Tipo de cocina" options={CUISINES} selected={cuisine} onSelect={setCuisine} />

            <Input id="sourceUrl" label="Fuente (opcional)"
                   placeholder="Link del vídeo o receta original"
                   value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} />

            <div className="recipe-form__section">
                <h2 className="recipe-form__section-title">Ingredientes</h2>
                {ingredients.map((ing, i) => (
                    <IngredientRow key={i} index={i} ingredient={ing}
                                   onChange={handleIngredientChange} onRemove={removeIngredient}
                                   canRemove={ingredients.length > 1} />
                ))}
                {errors.ingredients && <p className="recipe-form__error" role="alert">{errors.ingredients}</p>}
                <button type="button" className="recipe-form__add" onClick={addIngredient}>+ Añadir ingrediente</button>
            </div>

            <div className="recipe-form__section">
                <h2 className="recipe-form__section-title">Pasos</h2>
                {steps.map((step, i) => (
                    <StepRow key={i} index={i} value={step}
                             onChange={handleStepChange} onRemove={removeStep}
                             canRemove={steps.length > 1} />
                ))}
                {errors.steps && <p className="recipe-form__error" role="alert">{errors.steps}</p>}
                <button type="button" className="recipe-form__add" onClick={addStep}>+ Añadir paso</button>
            </div>

            {errors.general && <p className="recipe-form__error" role="alert">{errors.general}</p>}

            <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Guardando…' : submitLabel}
            </Button>
        </form>
    );
};

export default RecipeForm;