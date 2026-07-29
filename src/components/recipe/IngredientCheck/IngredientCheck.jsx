import './IngredientCheck.scss';

const IngredientCheck = ({ ingredient, checked, onToggle }) => {
    const amount = [ingredient.qty, ingredient.unit].filter(Boolean).join(' ');

    return (
        <button
            type="button"
            className={`ingredient-check ${checked ? 'is-checked' : ''}`}
            onClick={onToggle}
            aria-pressed={checked}
        >
      <span className="ingredient-check__box" aria-hidden="true">
        {checked ? '✓' : ''}
      </span>
            {amount && <span className="ingredient-check__amount">{amount}</span>}
            <span className="ingredient-check__name">{ingredient.name}</span>
        </button>
    );
};

export default IngredientCheck;