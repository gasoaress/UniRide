import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal'; // Importar a biblioteca de modal

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { sendEmailVerification } from 'firebase/auth';



import './Login.css';
const Login = () => {
    // Estado para controlar a visibilidade do modal
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
        password: Yup.string().required('Senha obrigatória')
    });

    // Função de login
    const handleLogin = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Login bem-sucedido:', userCredential.user);
            navigate('/');
        } catch (error) {
            console.error('Erro de login:', error);
        }
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const registerValidationSchema = Yup.object({
        email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
        password: Yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Senha obrigatória')
    });

    // Função para lidar com o cadastro
    const handleRegister = async (values) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;
    
            if (user) {
                await sendEmailVerification(user);
                
                console.log('Cadastro bem-sucedido:', user);
                console.log('E-mail de verificação enviado! Por favor, verifique seu e-mail para ativar a conta.');

                alert('Cadastro bem-sucedido! Um e-mail de verificação foi enviado. Por favor, verifique seu e-mail para ativar sua conta.');
    
                await auth.signOut();
                closeModal();
            } else {
                console.error('Usuário inválido após cadastro.');
            }
        } catch (error) {
            console.error('Erro de cadastro:', error);
            alert('Erro de cadastro: ' + error.message);
        }
    };
    
    

    return (
        <div className="login-container">
            <h1>Login</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    handleLogin(values.email, values.password);
                    setSubmitting(false);
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div>
                            <label htmlFor="email">E-mail:</label>
                            <Field name="email" type="email" />
                            {errors.email && touched.email ? <div className="error">{errors.email}</div> : null}
                        </div>
                        <div>
                            <label htmlFor="password">Senha:</label>
                            <Field name="password" type="password" />
                            {errors.password && touched.password ? <div className="error">{errors.password}</div> : null}
                        </div>
                        <button type="submit">Login</button>
                        <a href="#" onClick={openModal} className="create-account-link">Criar Conta</a>
                    </Form>
                )}
            </Formik>

            {/* Modal para o formulário de cadastro */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Formulário de Cadastro"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Cadastro</h2>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={registerValidationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        handleRegister(values);
                        setSubmitting(false);
                    }}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <div>
                                <label htmlFor="email">E-mail:</label>
                                <Field name="email" type="email" />
                                {errors.email && touched.email ? <div className="error">{errors.email}</div> : null}
                            </div>
                            <div>
                                <label htmlFor="password">Senha:</label>
                                <Field name="password" type="password" />
                                {errors.password && touched.password ? <div className="error">{errors.password}</div> : null}
                            </div>
                            <button type="submit" disabled={isSubmitting}>Cadastrar</button>
                            <button type="button" onClick={closeModal}>Cancelar</button>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </div>
    );
};

export default Login;
