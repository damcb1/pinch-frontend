import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button/Button';
import Avatar from "../../components/common/Avatar/Avatar.jsx";
import './AccountPage.scss';

const AccountPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getCurrentUser();
                setEmail(data.email);
            } catch (err) {
                console.error('No se pudieron cargar los datos de la cuenta', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <main className="account">
            <h1 className="account__title">Tu perfil</h1>

            <div className="account__card">
                <Avatar email={email} size={64} />

                <div className="account__field">
                    <span className="account__label">Correo</span>
                    <span className="account__value">
            {isLoading ? 'Cargando…' : email}
          </span>
                </div>

                <Button variant="secondary" onClick={handleLogout}>
                    Cerrar sesión
                </Button>
            </div>
        </main>
    );
};

export default AccountPage;