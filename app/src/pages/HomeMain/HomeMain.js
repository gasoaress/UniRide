import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig.js';
import Modal from 'react-modal';
import './HomeMain.css'

const HomeMain = () => {
    const navigate = useNavigate();
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
        <Modal
                isOpen={isModalOpenOferece}
                onRequestClose={closeModalOferece}
                contentLabel="Example Modal"
                className={"modal"}
            >
                <h2>Modal Content</h2>
                <button onClick={closeModalOferece}>Close Modal</button>
        </Modal>
        <Modal
                isOpen={isModalOpenBusca}
                onRequestClose={closeModalBusca}
                contentLabel="Example Modal busca"
                className={"modal"}
            >
                <h2>Modal Content busca</h2>
                <button onClick={closeModalBusca}>Close Modal</button>
        </Modal>
        </div>
    );
};

export default HomeMain;
