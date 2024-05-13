import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { AutoComplete } from 'primereact/autocomplete';
import './HomeMain.css';
import ReactDOM from 'react-dom/client';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

const HomeMain = () => {
    const [isModalOpenOferece, setModalOpenOferece] = useState(false);
    const [isModalOpenBusca, setModalOpenBusca] = useState(false);
    const [selectedLocationOferece, setSelectedLocationOferece] = useState('');
    const [selectedLocationBusca, setSelectedLocationBusca] = useState('');
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/localizacoes')
            .then(response => response.json())
            .then(data => {
                console.log('Dados recebidos:', data); // Adicione este console.log()
                setLocations(data);
            })
            .catch(error => console.error('Erro ao buscar localizações:', error));
    }, []);


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

    const handleLocationChangeOferece = (value) => {
        console.log('Selecionado para oferecer:', value); // Adicione este console.log()
        setSelectedLocationOferece(value);
    };

    const handleLocationChangeBusca = (value) => {
        console.log('Selecionado para buscar:', value); // Adicione este console.log()
        setSelectedLocationBusca(value);
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
                contentLabel="Modal Oferece"
                className={"modal"}
            >
                <h2>Oferecendo Carona</h2>
                <AutoComplete
                    value={selectedLocationOferece}
                    suggestions={locations.map(location => location.nome)}
                    completeMethod={handleLocationChangeOferece}
                    onChange={(e) => handleLocationChangeOferece(e.target.value)}
                    onSelect={(e) => handleLocationChangeOferece(e.value)} // Este método é chamado quando uma sugestão é selecionada
                    dropdown
                    placeholder="Selecione uma localização..."
                    className="autocomplete-input"
                />


                <button onClick={closeModalOferece}>Close Modal</button>
            </Modal>
            <Modal
                isOpen={isModalOpenBusca}
                onRequestClose={closeModalBusca}
                contentLabel="Modal Busca"
                className={"modal"}
            >
                <h2>Buscando Carona</h2>
                <AutoComplete
                    value={selectedLocationOferece}
                    suggestions={locations.map(location => location.nome)}
                    completeMethod={handleLocationChangeBusca}
                    onChange={(e) => handleLocationChangeBusca(e.target.value)}
                    onSelect={(e) => handleLocationChangeBusca(e.value)} // Este método é chamado quando uma sugestão é selecionada
                    dropdown
                    placeholder="Selecione uma localização..."
                    className="autocomplete-input"
                />






                <button onClick={closeModalBusca}>Close Modal</button>
            </Modal>
        </div>
    );
};

export default HomeMain

