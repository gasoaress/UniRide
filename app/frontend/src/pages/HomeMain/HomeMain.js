import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Autocomplete from 'react-autocomplete';
import './HomeMain.css';

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
                <Autocomplete
                    wrapperStyle={{ display: 'block' }}
                    inputProps={{ className: 'autocomplete-input' }}
                    menuStyle={{ display: 'block', className: 'autocomplete-menu' }}
                    getItemValue={(item) => item}
                    items={locations.map(location => location.nome)}
                    renderItem={(item, isHighlighted) => (
                        <div
                            key={item}
                            className={`autocomplete-item ${isHighlighted ? 'highlighted' : ''}`}
                            style={{ background: isHighlighted ? '#f4f4f4' : 'transparent' }}
                        >
                            {item}
                        </div>
                    )}
                    value={selectedLocationOferece}
                    onChange={(e) => handleLocationChangeOferece(e.target.value)}
                    onSelect={(value) => handleLocationChangeOferece(value)}
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
                <Autocomplete
                    wrapperStyle={{ display: 'block' }}
                    inputProps={{ className: 'autocomplete-input' }}
                    menuStyle={{ display: 'block', className: 'autocomplete-menu' }}
                    getItemValue={(item) => item}
                    items={locations.map(location => location.nome)}
                    renderItem={(item, isHighlighted) => (
                        <div
                            key={item}
                            className={`autocomplete-item ${isHighlighted ? 'highlighted' : ''}`}
                            style={{ background: isHighlighted ? '#f4f4f4' : 'transparent' }}
                        >
                            {item}
                        </div>
                    )}
                    value={selectedLocationOferece}
                    onChange={(e) => handleLocationChangeOferece(e.target.value)}
                    onSelect={(value) => handleLocationChangeOferece(value)}
                />



                <button onClick={closeModalBusca}>Close Modal</button>
            </Modal>
        </div>
    );
};

export default HomeMain