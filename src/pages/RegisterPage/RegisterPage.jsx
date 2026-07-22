import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/authService';
import Input from '../../components/common/Input/Input.jsx';
import Button from '../../components/common/Button/ßutton.jsx';
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout.jsx";
import './RegisterPage.scss';

const RegisterPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!email.trim()) {
            newErrors.email = 'El email es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'El email tiene un formato inválido';
        }
        if (!password) {
            newErrors.password = 'La contraseña es obligatoria';
        } else if (password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        try {
            await register(email, password);
            navigate('/login');
        } catch (err) {
            const data = err.response?.data;
            if (data?.field) {
                setErrors({ [data.field]: data.message });
            } else {
                setErrors({ general: data?.message || 'Ha ocurrido un error. Inténtalo de nuevo.' });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout>
            <div className="register">
            <div className="register__card">
                <h1 className="register__title">Crea tu cuenta</h1>
                <p className="register__subtitle">
                    Gratis. Guarda tu primera receta en menos de un minuto.
                </p>

                <form className="register__form" onSubmit={handleSubmit} noValidate>
                    <Input
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                        autoComplete="email"
                    />

                    <Input
                        id="password"
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                        autoComplete="new-password"
                    />

                    {errors.general && (
                        <p className="register__error" role="alert">{errors.general}</p>
                    )}

                    <Button type="submit" variant="primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Creando cuenta…' : 'Crear cuenta'}
                    </Button>
                </form>

                <p className="register__login-link">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </div>
            </div>
        </AuthLayout>
    );
};

export default RegisterPage;