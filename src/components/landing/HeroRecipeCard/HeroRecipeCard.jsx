import { useState, useEffect } from "react";
import './HeroRecipeCard.scss';

const HeroRecipeCard = () => {
    const [resolved, setResolved] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
        setResolved((prev) => !prev);
        }, 2600);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hero-card">
            <div className="hero-card__frame">

                <div className={`hero-card__layer hero-card__layer--caption ${resolved ? 'is-hidden' : ''}`}>
                    <p className="hero-card__source">Texto pegado</p>
                    <p className="hero-card__caption">
                        RECETA EN COMENTARIOS 😍🔥 pasta cremosa en 10 minutos!! guarden
                        para después #pasta #easyrecipe #fyp #recetafacil 🍝✨
                    </p>
                    <div className="hero-card__meta">
                        <span>♥ 128K</span>
                        <span>💬 842</span>
                        <span>↗ 6.1K</span>
                    </div>
                </div>

                <div className={`hero-card__layer hero-card__layer--clean ${resolved ? '' : 'is-hidden'}`}>
                    <div className="hero-card__tag">
                        <span className="hero-card__dot" />
                        <span>Importado con Pinch</span>
                    </div>
                    <h3 className="hero-card__title">Pasta cremosa al limón</h3>
                    <p className="hero-card__recipe-meta">10 min · 2 raciones · fácil</p>
                    <div className="hero-card__ingredients">
                        <div className="hero-card__ing"><span className="hero-card__qty">200 g</span><span>pasta corta</span></div>
                        <div className="hero-card__ing"><span className="hero-card__qty">1 diente</span><span>ajo</span></div>
                        <div className="hero-card__ing"><span className="hero-card__qty">80 g</span><span>parmesano</span></div>
                        <div className="hero-card__ing"><span className="hero-card__qty">1</span><span>limón, ralladura</span></div>
                    </div>
                    <span className="hero-card__cuisine">Italiana</span>
                </div>
            </div>
        </div>
    );
};

export default HeroRecipeCard;