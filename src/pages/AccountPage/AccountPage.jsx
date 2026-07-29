import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, deleteAccount } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button/Button';
import Avatar from "../../components/common/Avatar/Avatar.jsx";
import Modal from "../../components/common/Modal/Modal.jsx";
import './AccountPage.scss';

const AccountPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

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
        navigate('/');
        logout();
    };

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        try {
            await deleteAccount();
            navigate('/');
            logout();
        } catch (err) {
            setIsDeleting(false);
            setShowDeleteModal(false);
            alert('No se pudo eliminar la cuenta.');
        }
    };

    return (
        <div className="account">
            <h1 className="account__title">Tu perfil</h1>

            <div className="account__card">
                <Avatar email={email} size={64} />

                <div className="account__field">
                    <span className="account__label">Correo</span>
                    <span className="account__value">
            {isLoading ? 'Cargando…' : email}
          </span>
                </div>

                <div className="account__actions">
                    <Button variant="secondary" onClick={handleLogout}>
                    Cerrar sesión
                </Button>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(true)}>
                        Eliminar cuenta
                    </Button>
                </div>
            </div>

            {showDeleteModal && (
                <Modal
                    title="¿Quieres eliminar tu cuenta?"
                    confirmLabel="Eliminar cuenta"
                    onConfirm={handleDeleteAccount}
                    onCancel={() => setShowDeleteModal(false)}
                    isProcessing={isDeleting}
                >
                    Esta acción no se puede deshacer. Se eliminarán tu cuenta y todas tus recetas para siempre.
                </Modal>
            )}
        </div>
    );
};

export default AccountPage;