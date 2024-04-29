import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import ProtectedRoute from './protectedRoute';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Use o ProtectedRoute para envolver as rotas protegidas */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
