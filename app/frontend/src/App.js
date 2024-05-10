import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importe as páginas
import Login from './pages/Login/Login';
import Home from './pages/Home';
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute'; // Importe o ProtectedRoute

function App() {
    return (
        <Router>
            <Routes>
                {/* Rota protegida para Home */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                </Route>
                {/* Rota para Login */}
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
