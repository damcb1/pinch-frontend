import './Button.scss';

const Button = ({
    children,
    type = 'button',
    variant = 'primary',
    disabled = false,
    onclick,
}) => {
    return (
        <button
            type={type}
            className={`button button--${variant}`}
            disabled={disabled}
            onClick={onclick}
            >
            {children}
        </button>
    );
};

export default Button;