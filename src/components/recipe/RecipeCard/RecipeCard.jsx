import {DIFFICULTY_LABELS} from "../../../constants/recipeOptions.js";
import {Link} from "react-router-dom";
import './RecipeCard.scss';


const RecipeCard = ({ recipe }) => {
    const meta = [
        recipe.timeMinutes ? `${recipe.timeMinutes} min` : null,
        recipe.servings ? `${recipe.servings} raciones` : null,
        recipe.difficulty ? DIFFICULTY_LABELS[recipe.difficulty] : null,
    ].filter(Boolean).join(' · ');

    return (
        <Link to={`/recetas/${recipe.id}`} className="recipe-card">
            <div className="recipe-card__photo">
                {recipe.imageUrl && (
                    <img src={recipe.imageUrl} alt={recipe.title} className="recipe-card__img" />
                )}
            </div>
            <div className="recipe-card__body">
                <h3 className="recipe-card__title">{recipe.title}</h3>
                {meta && <p className="recipe-card__meta">{meta}</p>}
            </div>
        </Link>
    );
};

export default RecipeCard;