import React, { useState, useRef } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import './Login.css';
import { Toast } from 'primereact/toast';


const Login = () => {
    const [isModalOpen, setModalOpen] = useState(false); 
    const navigate = useNavigate();

    const emailPuc = '@sga.pucminas.br';

    // Juntar o input do user com o @sga.pucminas.br
    const combineEmail = (username) => {
        return `${username}${emailPuc}`;
    };

    const toast = useRef(null);
    const show = () => {
        toast.current.show({ severity: 'info', summary: 'Info', detail: 'Message Content' });
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .required('E-mail obrigatório')
            .matches(
                new RegExp(`^.*${emailPuc}$`),
                `O e-mail deve terminar com ${emailPuc}`
            ),
        password: Yup.string().required('Senha obrigatória')
    });

    // Função para lidar com o login
    const handleLogin = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Login bem-sucedido:', userCredential.user);
            navigate('/HomeMain');
        } catch (error) {
            console.error('Erro de login:', error);
            if (toast.current) {
                toast.current.show({ severity: 'error', summary: 'Erro de Login', detail: 'As credenciais fornecidas estão incorretas.' });
            }
        }
    };


    const openModal = () => {
        setModalOpen(true);
        console.log('login')
    };


    const closeModal = () => {
        setModalOpen(false);
    };


    const registerValidationSchema = Yup.object({
        email: Yup.string()
            .required('E-mail obrigatório')
            .matches(
                new RegExp(`^.*${emailPuc}$`),
                `O e-mail deve terminar com ${emailPuc}`
            ),
        password: Yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').matches(/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-\/\\|=])/, 'Senha deve conter pelo menos um símbolo').required('Senha obrigatória')
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
            <Toast ref={toast} />
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
                {({ errors, touched, setFieldValue }) => (
                    <Form>
                        <div>
                        <label classname="label" htmlFor="email">E-mail:</label>
                            <div className="email-input-container">
                                
                                <Field
                                    name="username"
                                    type="text"
                                    placeholder="Digite seu usuário"
                                    className="input"
                                    onChange={(e) => {
                                        const username = e.target.value;
                                        setFieldValue('email', combineEmail(username));
                                    }}
                                />
                                {/* Exibição do domínio fixo */}
                                <span className="email-domain">{emailPuc}</span>
                            </div>
                            
                            {errors.email && touched.email ? <div className="error">{errors.email}</div> : null}
                        
                            <div className="password-input-container">
                                <label htmlFor="password" classname="label">Senha:</label>
                                <Field name="password" type="password" className="input" />
                                {errors.password && touched.password ? <div className="error">{errors.password}</div> : null}
                            </div>
                        <button type="submit" className='button'>Login</button>
                        <a href="#" onClick={openModal} className="create-account-link">Criar Conta</a>
                        </div>
                    </Form>
                )}
            </Formik>


                {/* modal cadastro */}
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
                    {({ errors, touched, setFieldValue }) => (
                        <Form>
                            <div>
                                <label htmlFor="email">E-mail:</label>
                                <div className="email-input-container">
                                    {/* Campo de prefixo do e-mail */}
                                    <Field
                                        name="username"
                                        type="text"
                                        className="input"
                                        placeholder="Digite seu nome de usuário"
                                        onChange={(e) => {
                                            const username = e.target.value;
                                            setFieldValue('email', combineEmail(username));
                                        }}
                                    />
                                    {/* Exibição do domínio fixo */}
                                    <span className="email-domain">{emailPuc}</span>
                                </div>
                                {errors.email && touched.email ? <div className="error">{errors.email}</div> : null}
                            </div>
                            <div>
                                <label htmlFor="password">Senha:</label>
                                <Field name="password" type="password" className="input"/>
                                {errors.password && touched.password ? <div className="error">{errors.password}</div> : null}
                            </div>
                            <button className="buttonmodal" type="submit">Cadastrar</button>
                            <button className="buttonmodal" type="button" onClick={closeModal}>Cancelar</button>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </div>
    );
};

export default Login;
