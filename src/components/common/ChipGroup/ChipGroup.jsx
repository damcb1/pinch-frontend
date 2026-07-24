import './ChipGroup.scss';

const ChipGroup = ({ legend, options, selected, onSelect }) => {
    return (
        <fieldset className="chip-group">
            <legend className="chip-group__legend">{legend}</legend>
            <div className="chip-group__list">
                {options.map((option) => (
                    <button
                        type="button"
                        key={option.value}
                        className={`chip-group__chip ${selected === option.value ? 'is-active' : ''}`}
                        onClick={() => onSelect(option.value)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </fieldset>
    );
};

export default ChipGroup;