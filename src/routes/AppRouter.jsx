import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import PrivateRoute from './PrivateRoute';
import AccountPage from "../pages/AccountPage/AccountPage.jsx";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/registro" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route
                    path="/mis-recetas"
                    element={
                        <PrivateRoute>
                            <div style={{ padding: 40 }}>Mis recetas (próximamente)</div>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/cuenta"
                    element={
                    <PrivateRoute>
                        <AccountPage />
                    </PrivateRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;