import { useAuth } from '../../context/AuthContext';
import LandingNav from '../../components/landing/LandingNav/LandingNav';
import HeroRecipeCard from '../../components/landing/HeroRecipeCard/HeroRecipeCard';
import StepCard from '../../components/landing/StepCard/StepCard';
import WayCard from '../../components/landing/WayCard/WayCard';
import LandingFooter from '../../components/landing/LandingFooter/LandingFooter';
import Button from "../../components/common/Button/Button.jsx";
import './LandingPage.scss';

const LandingPage = () => {
    const { isAuthenticated } = useAuth();
    const primaryTarget = isAuthenticated ? '/mis-recetas' : '/registro';

    return (
        <div className="landing">
            <LandingNav />

            <header className="landing__hero">
                <div className="landing__hero-text">
                    <p className="landing__eyebrow">De caption a receta</p>
                    <h1 className="landing__title">
                        El caption era un caos. La receta no tiene por qué serlo.
                    </h1>
                    <p className="landing__subtitle">
                        Pega el link de cualquier blog o web de recetas. Pinch saca los
                        ingredientes, los pasos, el tiempo y las raciones — fácil de buscar cuando
                        ya tienes las manos manchadas.
                    </p>
                    <div className="landing__hero-cta">
                        <Button to={primaryTarget} variant="primary">
                            Guardar mi primera receta
                        </Button>
                        <Button href="#como-funciona" variant="text">
                            Ver cómo funciona
                        </Button>
                    </div>
                </div>

                <div className="landing__hero-visual">
                    <HeroRecipeCard />
                </div>
            </header>

            <section id="como-funciona" className="landing__section">
                <div className="landing__section-head">
                    <h2 className="landing__section-title">Cómo funciona</h2>
                    <p className="landing__section-sub">Tres pasos, cero fricción.</p>
                </div>
                <div className="landing__steps">
                    <StepCard number="01" title="Pega el link"
                              text="Copia el link de un blog o web de recetas y pégalo en Pinch. Y si no hay link, pega el texto directamente." />
                    <StepCard number="02" title="La IA la estructura"
                              text="En segundos separamos ingredientes, cantidades, pasos y tiempo, aunque el texto original sea un caos de emojis y hashtags." />
                    <StepCard number="03" title="Filtra y cocina"
                              text="Busca por ingrediente, tiempo o tipo de cocina. Encuentra la receta en 10 segundos, sin hacer zoom con las manos sucias." />
                </div>
            </section>

            <section id="formas" className="landing__section">
                <div className="landing__section-head">
                    <h2 className="landing__section-title">Dos formas de guardar una receta</h2>
                    <p className="landing__section-sub">Si tienes un link o un texto, Pinch lo puede leer.</p>
                </div>
                <div className="landing__ways">
                    <WayCard icon="↗" title="Pega el link"
                             text="Blogs y webs de recetas con los datos estructurados. Pinch los lee y los ordena automáticamente." />
                    <WayCard icon="✎" title="Pega el texto"
                             text="¿La web no trae el formato, o la receta está en un texto suelto? Pégalo y la IA lo estructura igual." />
                </div>
            </section>

            <section className="landing__cta-final">
                <div className="landing__cta-inner">
                    <h2 className="landing__cta-title">
                        Deja de perder recetas entre capturas de pantalla y cientos de guardados.
                    </h2>
                    <p className="landing__cta-sub">
                        {isAuthenticated
                            ? 'Vuelve a tu recetario y sigue guardando.'
                            : 'Crea tu cuenta y guarda tu primera receta en menos de un minuto.'}
                    </p>
                    <Button to={primaryTarget} variant="primary">
                        {isAuthenticated ? 'Ir a mis recetas' : 'Crear cuenta gratis'}
                    </Button>
                    {!isAuthenticated && (
                        <p className="landing__cta-note">Gratis. No hace falta tarjeta.</p>
                    )}
                </div>
            </section>

            <LandingFooter />
        </div>
    );
};

export default LandingPage;