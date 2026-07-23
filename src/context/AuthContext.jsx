import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [email, setEmail] = useState(() => localStorage.getItem('email'));

    const login = (newToken, newEmail) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('email', newEmail);
        setToken(newToken);
        setEmail(newEmail);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setToken(null);
        setEmail(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, email, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};