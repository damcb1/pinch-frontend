import { Link } from 'react-router-dom';
import './Button.scss';

const Button = ({
                    children,
                    to,
                    href,
                    type = 'button',
                    variant = 'primary',
                    size = 'md',
                    disabled = false,
                    onClick,
                }) => {
    const className = `button button--${variant} button--${size}`;

    if (to) {
        return <Link to={to} className={className}>{children}</Link>;
    }
    if (href) {
        return <a href={href} className={className}>{children}</a>;
    }
    return (
        <button type={type} className={className} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;