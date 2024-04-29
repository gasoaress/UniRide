import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig.js';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
             
                if (user.emailVerified) {
                    
                    console.log('Usuário autenticado com e-mail verificado:', user);
                } else {
                    
                    console.log('Usuário não verificou o e-mail:', user);
                    alert('Por favor, verifique seu e-mail antes de acessar esta página.');
                    navigate('/login'); 
                }
            } else {
                
                console.log('Usuário não autenticado.');
                navigate('/login'); 
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    return (
        <div>
            <h1>Página Home</h1>
        </div>
    );
};

export default Home;
