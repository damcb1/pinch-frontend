import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { importFromUrl, importFromText, confirmImport } from '../../services/importService';
import Button from '../../components/common/Button/Button';
import RecipeForm from '../../components/recipe/RecipeForm/RecipeForm';
import './ImportRecipePage.scss';

const LOADING_STEPS = ['Leyendo la fuente…', 'Extrayendo la receta…', 'Ordenando ingredientes…'];

const ImportRecipePage = () => {
    const navigate = useNavigate();

    const [mode, setMode] = useState('url');
    const [url, setUrl] = useState('');
    const [text, setText] = useState('');
    const [status, setStatus] = useState('input');
    const [draft, setDraft] = useState(null);
    const [error, setError] = useState('');

    const [stage, setStage] = useState(0);

    useEffect(() => {
        if (status !== 'loading') return;
        setStage(0);
        const id = setInterval(() => {
            setStage((s) => (s < LOADING_STEPS.length - 1 ? s + 1 : s));
        }, 1200);
        return () => clearInterval(id);
    }, [status]);

    const handleImportUrl = async (e) => {
        e.preventDefault();
        if (!url.trim()) return;
        setError('');
        setStatus('loading');
        try {
            const preview = await importFromUrl(url.trim());
            setDraft(preview);
            setStatus('review');
        } catch (err) {
            const data = err.response?.data;
            setError(data?.message || 'No pudimos importar esa receta.');
            setStatus('input');
        }
    };

    const handleImportText = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        setError('');
        setStatus('loading');
        try {
            const preview = await importFromText(text.trim());
            setDraft(preview);
            setStatus('review');
        } catch (err) {
            const data = err.response?.data;
            setError(data?.message || 'No pudimos entender ese texto.');
            setStatus('input');
        }
    };

    const handleSave = async (recipeData) => {
        const created = await confirmImport(recipeData);
        navigate(`/recetas/${created.id}`);
    };

    const switchMode = (next) => {
        setMode(next);
        setError('');
    };

    if (status === 'loading') {
        return (
            <div className="import-page">
                <div className="import-page__loading">
                    <div className="import-page__spinner" aria-hidden="true" />
                    <p className="import-page__loading-text" role="status">
                        {LOADING_STEPS[stage]}
                    </p>
                </div>
            </div>

        );
    }

    if (status === 'review') {
        const missingSteps = !draft.steps || draft.steps.length === 0;
        return (
            <div className="import-page">
                <h1 className="import-page__title">Revisa antes de guardar</h1>
                <p className="import-page__hint">
                    Revisa los datos y corrige lo que haga falta antes de guardar.
                </p>
                {missingSteps && (
                    <p className="import-page__notice" role="status">
                        No pudimos leer los pasos de esta receta. Añádelos abajo antes de guardar.
                    </p>
                )}
                <RecipeForm initialValues={draft} onSubmit={handleSave} submitLabel="Guardar receta" />
            </div>
        );
    }

    return (
        <div className="import-split">
            <aside className="import-split__brand">
                <h2 className="import-split__tagline">Pega, y listo.</h2>
                <p className="import-split__pitch">
                    El link de un blog es suficiente. ¿No hay link? Pega el texto y lo ordenamos.
                </p>
            </aside>

            <div className="import-split__panel">
                <p className="import-split__eyebrow">Importar receta</p>

                {mode === 'url' ? (
                    <>
                        <form className="import-page__form" onSubmit={handleImportUrl}>
                            <label className="import-split__heading" htmlFor="url">
                                Pega el link de la receta
                            </label>
                            <input
                                id="url"
                                className="import-page__field"
                                type="url"
                                placeholder="https://..."
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                aria-invalid={error ? 'true' : 'false'}
                            />
                            {error && <p className="import-page__error" role="alert">{error}</p>}
                            <Button type="submit" variant="primary" disabled={!url.trim()}>
                                Importar receta
                            </Button>
                        </form>

                        <p className="import-split__ways-label">Funciona con</p>
                        <ul className="import-split__ways">
                            <li className="import-split__way">
                                <span className="import-split__way-icon" aria-hidden="true">W</span>
                                Blogs y webs de recetas — con el link
                            </li>
                            <li className="import-split__way">
                                <span className="import-split__way-icon" aria-hidden="true">T</span>
                                TikTok, Instagram o YouTube — pega el texto de la publicación
                            </li>
                        </ul>

                        <button type="button" className="import-page__switch" onClick={() => switchMode('text')}>
                            ¿La fuente no tiene link? Pega el texto
                        </button>
                    </>
                ) : (
                    <>
                        <form className="import-page__form" onSubmit={handleImportText}>
                            <label className="import-split__heading" htmlFor="recipe-text">
                                Pega el texto de la publicación
                            </label>
                            <textarea
                                id="recipe-text"
                                className="import-page__textarea"
                                rows={8}
                                placeholder="Copia el caption, la descripción o el comentario con la receta…"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                aria-invalid={error ? 'true' : 'false'}
                            />
                            {error && <p className="import-page__error" role="alert">{error}</p>}
                            <Button type="submit" variant="primary" disabled={!text.trim()}>
                                Ordenar receta
                            </Button>
                        </form>

                        <button type="button" className="import-page__switch" onClick={() => switchMode('url')}>
                            ← Usar un link
                        </button>
                    </>
                )}

                <p className="import-page__manual">
                    ¿Prefieres escribirla a mano? <Link to="/nueva-receta">Créala manualmente</Link>
                </p>
            </div>
        </div>
    );
};

export default ImportRecipePage;