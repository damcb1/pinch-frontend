import {BrowserRouter, Routes, Navigate, Route} from "react-router-dom";
import RegisterPage from "../pages/RegisterPage/RegisterPage.jsx";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/registro" element={<RegisterPage />} />

                <Route path="*" element={<Navigate to="/registro" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;