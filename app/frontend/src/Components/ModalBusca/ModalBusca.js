// ModalBusca.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { AutoComplete } from 'primereact/autocomplete';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const ModalBusca = ({ isOpen, onRequestClose }) => {
    const [selectedLocationBusca, setSelectedLocationBusca] = useState('');
    const [locations, setLocations] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchLocalizacoes();
        }
    }, [isOpen]);

    const fetchLocalizacoes = () => {
        fetch('http://localhost:4000/localizacoes')
            .then(response => response.json())
            .then(data => {
                setLocations(data);
            })
            .catch(error => console.error('Erro ao buscar localizações:', error));
    };

    const handleLocationChangeBusca = (value) => {
        setSelectedLocationBusca(value);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Modal Busca"
            className={"modal"}
        >
            <h2>Buscando Carona</h2>
            <InputText keyfilter="alpha" placeholder="Seu Nome" value={value} onChange={(e) => setValue(e.target.value)} />
            <AutoComplete
                value={selectedLocationBusca}
                suggestions={locations.map(location => location.nome)}
                completeMethod={handleLocationChangeBusca}
                onChange={(e) => handleLocationChangeBusca(e.target.value)}
                onSelect={(e) => handleLocationChangeBusca(e.value)}
                dropdown
                placeholder="Selecione uma localização..."
                className="autocomplete-input"
            />
            <Button label="Enviar" severity="success" />
        </Modal>
    );
};

export default ModalBusca;
