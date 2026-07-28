import { Link, NavLink, Outlet } from 'react-router-dom';
import { BookOpen, Plus, User } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../common/Button/Button';
import Avatar from '../../common/Avatar/Avatar';
import './AppLayout.scss';

const AppLayout = () => {
    const { email } = useAuth();

    return (
        <div className="app-layout">
            <header className="app-layout__header">
                <Link to="/mis-recetas" className="app-layout__logo">Pinch</Link>

                <div className="app-layout__header-right">
                    <NavLink to="/mis-recetas" className="app-layout__link app-layout__link--desktop">
                        Mis recetas
                    </NavLink>
                    <div className="app-layout__new-desktop">
                        <Button to="/importar" variant="primary" size="sm">+ Nueva receta</Button>
                    </div>

                    <Link to="/cuenta" className="app-layout__avatar-link" aria-label="Ver mi perfil">
                        <Avatar email={email} size={40} />
                    </Link>
                </div>
            </header>

            <main className="app-layout__main">
                <Outlet />
            </main>

            <nav className="app-layout__bottom" aria-label="Navegación principal">
                <NavLink to="/mis-recetas" className="app-layout__tab">
                    <BookOpen size={22} aria-hidden="true" />
                    <span>Recetas</span>
                </NavLink>
                <NavLink to="/importar" className="app-layout__tab">
                    <Plus size={22} aria-hidden="true" />
                    <span>Nueva</span>
                </NavLink>
                <NavLink to="/cuenta" className="app-layout__tab">
                    <User size={22} aria-hidden="true" />
                    <span>Cuenta</span>
                </NavLink>
            </nav>
        </div>
    );
};

export default AppLayout;