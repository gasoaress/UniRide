// HomeMain.js
import React, { useState } from 'react';
import ModalOferece from '../../Components/ModalOferece/ModalOferece';
import ModalBusca from '../../Components/ModalBusca/ModalBusca';
import './HomeMain.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

const HomeMain = () => {
    const [isModalOpenOferece, setModalOpenOferece] = useState(false);
    const [isModalOpenBusca, setModalOpenBusca] = useState(false);

    const openModalOferece = () => {
        setModalOpenOferece(true);
    };
    const closeModalOferece = () => {
        setModalOpenOferece(false);
    };

    const openModalBusca = () => {
        setModalOpenBusca(true);
    };
    const closeModalBusca = () => {
        setModalOpenBusca(false);
    };

    return (
        <div>
            <h1>Hoje estou...</h1>
            <div className='main-container'>
                <div className='box-container'>
                    <button type="submit" className='button' onClick={openModalBusca}>Buscando carona</button>
                </div>
                <div className='box-container'>
                    <button type="submit" className='button' onClick={openModalOferece}>Oferecendo carona</button>
                </div>
            </div>
            <ModalOferece isOpen={isModalOpenOferece} onRequestClose={closeModalOferece} />
            <ModalBusca isOpen={isModalOpenBusca} onRequestClose={closeModalBusca} />
        </div>
    );
};

export default HomeMain;
