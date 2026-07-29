import './StepRow.scss';

const StepRow = ({ index, value, onChange, onRemove, canRemove }) => {
    return (
        <div className="step-row">
            <span className="step-row__num" aria-hidden="true">{index + 1}</span>
            <textarea
                className="step-row__text"
                placeholder="Describe este paso"
                value={value}
                onChange={(e) => onChange(index, e.target.value)}
                aria-label={`Paso ${index + 1}`}
                rows={2}
            />
            {canRemove && (
                <button
                    type="button"
                    className="step-row__remove"
                    onClick={() => onRemove(index)}
                    aria-label="Quitar paso"
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default StepRow;