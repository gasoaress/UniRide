import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';

const ProtectedRoute = () => {
    const [user, loading] = useAuthState(auth);

    // Enquanto verifica a autenticação, você pode mostrar uma mensagem de carregamento
    if (loading) {
        return <div>Carregando...</div>;
    }

    // Se não houver usuário autenticado, redireciona para a página de login
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Caso contrário, permite o acesso à rota desejada
    return <Outlet />;
};

export default ProtectedRoute;
