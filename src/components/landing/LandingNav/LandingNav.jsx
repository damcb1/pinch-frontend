import {useAuth} from "../../../context/AuthContext.jsx";
import {Link} from "react-router-dom";
import Avatar from "../../common/Avatar/Avatar.jsx";
import Button from "../../common/Button/Button.jsx";
import './LandingNav.scss';

const LandingNav = () => {
    const { isAuthenticated, email } = useAuth();

    return (
        <nav className="landing-nav">
            <span className="landing-nav__logo">Pinch</span>

            <div className="landing-nav__links">
                <a href="#como-funciona">Cómo funciona</a>
                <a href="#formas">Formas de guardar</a>
            </div>

            {isAuthenticated ?  (
                <Link to="/cuenta" className="landing-nav__avatar-link" aria-label="Ver mi perfil">
                    <Avatar email={email} size={40} />
                </Link>
            ) : (
                <Button to="/registro" variant="primary" size="sm">Crear cuenta</Button>
            )}
        </nav>
    );
};

export default LandingNav;