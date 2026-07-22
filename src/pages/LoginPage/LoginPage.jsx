import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/authService';
import { useAuth } from "../../context/AuthContext.jsx";
import AuthLayout from '../../components/layout/AuthLayout/AuthLayout';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import './LoginPage.scss';

const LoginPage = () => {
    const navigate = useNavigate();

    const { login: authLogin } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({}); // { email, password, general }
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!email.trim()) newErrors.email = 'El email es obligatorio';
        if (!password) newErrors.password = 'La contraseña es obligatoria';
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
            const data = await login(email, password);
            authLogin(data.token);
            navigate('/mis-recetas');
        } catch (err) {
            const data = err.response?.data;
            setErrors({ general: data?.message || 'No se pudo iniciar sesión. Inténtalo de nuevo.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout>
            <div className="login">
                <h1 className="login__title">Inicia sesión</h1>

                <form className="login__form" onSubmit={handleSubmit} noValidate>
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
                        autoComplete="current-password"
                    />

                    {errors.general && (
                        <p className="login__error" role="alert">{errors.general}</p>
                    )}

                    <Button type="submit" variant="primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Entrando…' : 'Entrar'}
                    </Button>
                </form>

                <p className="login__register-link">
                    ¿No tienes cuenta? <Link to="/registro">Crea una</Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;