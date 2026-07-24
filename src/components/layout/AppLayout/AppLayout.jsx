import {useAuth} from "../../../context/AuthContext.jsx";
import './AppLayout.scss'
import {Link} from "react-router-dom";
import Button from "../../common/Button/Button.jsx";
import Avatar from "../../common/Avatar/Avatar.jsx";

const AppLayout = ({ children }) => {
    const { email } = useAuth();

    return (
        <div className="app-layout">
            <header className="app-layout__header">
                <Link to="/mis-recetas" className="app-layout__logo">Pinch</Link>

                <div className="app-layout__actions">
                    <Button to ="/nueva-receta" variant="primary" size="sm">
                        + Nueva receta
                    </Button>
                    <Link to="/cuenta" className="app-layout__avatar-link" aria-label="Ver mi perfil">
                        <Avatar email={email} size={40} />
                    </Link>
                </div>
            </header>

            <main className="app-layout__main">
                {children}
            </main>
        </div>
    );
};

export default AppLayout;