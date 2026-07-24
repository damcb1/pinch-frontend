import './IngredientRow.scss';

const IngredientRow = ({ index, ingredient, onChange, onRemove, canRemove }) => {
    return (
        <div className="ingredient-row">
            <input
                className="ingredient-row__qty"
                type="text"
                placeholder="Cant."
                value={ingredient.qty}
                onChange={(e) => onChange(index, 'qty', e.target.value)}
                aria-label="Cantidad"
            />
            <input
                className="ingredient-row__unit"
                type="text"
                placeholder="Unidad"
                value={ingredient.unit}
                onChange={(e) => onChange(index, 'unit', e.target.value)}
                aria-label="Unidad"
            />
            <input
                className="ingredient-row__name"
                type="text"
                placeholder="Ingrediente"
                value={ingredient.name}
                onChange={(e) => onChange(index, 'name', e.target.value)}
                aria-label="Nombre del ingrediente"
            />
            {canRemove && (
                <button
                    type="button"
                    className="ingredient-row__remove"
                    onClick={() => onRemove(index)}
                    aria-label="Quitar ingrediente"
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default IngredientRow;