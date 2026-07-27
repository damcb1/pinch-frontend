import { useState, useEffect } from 'react';
import { getMyRecipes } from '../../services/recipeService';
import { CUISINES, TIME_RANGES, ORIGINS, DIFFICULTIES } from '../../constants/recipeOptions';
import AppLayout from '../../components/layout/AppLayout/AppLayout';
import Button from '../../components/common/Button/Button';
import ChipGroup from '../../components/common/ChipGroup/ChipGroup';
import RecipeCard from '../../components/recipe/RecipeCard/RecipeCard';
import './MyRecipesPage.scss';

const MyRecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const [search, setSearch] = useState('');
    const [cuisine, setCuisine] = useState(null);
    const [timeRange, setTimeRange] = useState(null);
    const [origin, setOrigin] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    const activeCount = [cuisine, timeRange, origin, difficulty].filter(Boolean).length;
    const hasFilters = !!(search || activeCount > 0);

    useEffect(() => {
        const timer = setTimeout(async () => {
            setIsLoading(true);
            try {
                const range = TIME_RANGES.find((t) => t.value === timeRange);
                const data = await getMyRecipes({
                    q: search,
                    cuisine,
                    maxTime: range?.maxTime,
                    minTime: range?.minTime,
                    origin,
                    difficulty,
                });
                setRecipes(data);
                setError('');
            } catch (err) {
                setError('No se pudieron cargar tus recetas.');
            } finally {
                setIsLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [search, cuisine, timeRange, origin, difficulty]);

    const clearFilters = () => {
        setSearch('');
        setCuisine(null);
        setTimeRange(null);
        setOrigin(null);
        setDifficulty(null);
    };

    const toggle = (setter) => (v) => setter((prev) => (prev === v ? null : v));

    return (
        <AppLayout>
            <div className="my-recipes">
                <h1 className="my-recipes__title">Mis recetas</h1>

                <input
                    type="text"
                    className="my-recipes__search"
                    placeholder="Buscar por ingrediente o receta"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Buscar recetas"
                />

                <button
                    type="button"
                    className="my-recipes__filters-toggle"
                    onClick={() => setShowFilters((v) => !v)}
                    aria-expanded={showFilters}
                >
                    {showFilters ? 'Ocultar filtros' : 'Filtros'}
                    {activeCount > 0 ? ` (${activeCount})` : ''}
                </button>

                <div className={`my-recipes__filters ${showFilters ? 'is-open' : ''}`}>
                    <ChipGroup legend="Cocina" options={CUISINES} selected={cuisine} onSelect={toggle(setCuisine)} />
                    <ChipGroup legend="Tiempo" options={TIME_RANGES} selected={timeRange} onSelect={toggle(setTimeRange)} />
                    <ChipGroup legend="Dificultad" options={DIFFICULTIES} selected={difficulty} onSelect={toggle(setDifficulty)} />
                    <ChipGroup legend="Origen" options={ORIGINS} selected={origin} onSelect={toggle(setOrigin)} />
                    {hasFilters && (
                        <button type="button" className="my-recipes__clear" onClick={clearFilters}>
                            Quitar filtros
                        </button>
                    )}
                </div>

                {isLoading && <p className="my-recipes__status">Cargando…</p>}
                {!isLoading && error && <p className="my-recipes__status">{error}</p>}

                {!isLoading && !error && recipes.length === 0 && !hasFilters && (
                    <div className="my-recipes__empty">
                        <p className="my-recipes__empty-title">Aún no tienes recetas guardadas</p>
                        <p className="my-recipes__empty-text">
                            Pega el link de un vídeo o receta y Pinch se encarga del resto.
                        </p>
                        <Button to="/nueva-receta" variant="primary">Guardar mi primera receta</Button>
                    </div>
                )}

                {!isLoading && !error && recipes.length === 0 && hasFilters && (
                    <div className="my-recipes__empty">
                        <p className="my-recipes__empty-title">No hay recetas con estos filtros</p>
                        <p className="my-recipes__empty-text">Prueba a quitar alguno para ver más resultados.</p>
                        <Button variant="secondary" onClick={clearFilters}>Quitar filtros</Button>
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