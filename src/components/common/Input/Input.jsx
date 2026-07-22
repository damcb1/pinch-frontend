import './Input.scss';

const Input = ({
                   id,
                   label,
                   type = 'text',
                   value,
                   onChange,
                   error,
                   autoComplete,
               }) => {
    return (
        <div className="input">
            <label className="input__label" htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                className={`input__field ${error ? 'input__field--error' : ''}`}
                type={type}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${id}-error` : undefined}
            />
            {error && (
                <span className="input__error" id={`${id}-error`} role="alert">
          {error}
        </span>
            )}
        </div>
    );
};

export default Input;