import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import PrivateRoute from './PrivateRoute';
import AccountPage from "../pages/AccountPage/AccountPage.jsx";
import LandingPage from "../pages/LandingPage/LandingPage.jsx";
import NewRecipePage from "../pages/NewRecipePage/NewRecipePage.jsx";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/registro" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route
                    path="/" element={<LandingPage /> } />

                <Route
                    path="/mis-recetas"
                    element={
                        <PrivateRoute>
                            <div style={{ padding: 40 }}>Mis recetas (próximamente)</div>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/nueva-receta"
                    element={
                    <PrivateRoute>
                        <NewRecipePage />
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

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;