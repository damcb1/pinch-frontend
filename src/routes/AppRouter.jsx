import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import PrivateRoute from './PrivateRoute';
import AppLayout from '../components/layout/AppLayout/AppLayout';
import AccountPage from "../pages/AccountPage/AccountPage.jsx";
import LandingPage from "../pages/LandingPage/LandingPage.jsx";
import NewRecipePage from "../pages/NewRecipePage/NewRecipePage.jsx";
import RecipeDetailPage from "../pages/RecipeDetailPage/RecipeDetailPage.jsx";
import EditRecipePage from "../pages/EditRecipePage/EditRecipePage.jsx";
import MyRecipesPage from "../pages/MyRecipesPage/MyRecipesPage.jsx";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/registro" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<LandingPage />} />

                <Route
                    element={
                        <PrivateRoute>
                            <AppLayout />
                        </PrivateRoute>
                    }
                >
                    <Route path="/nueva-receta" element={<NewRecipePage />} />
                    <Route path="/recetas/:id" element={<RecipeDetailPage />} />
                    <Route path="/mis-recetas" element={<MyRecipesPage />} />
                    <Route path="/recetas/:id/editar" element={<EditRecipePage />} />
                    <Route path="/cuenta" element={<AccountPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;