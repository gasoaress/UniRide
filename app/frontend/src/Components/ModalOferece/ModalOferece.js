// ModalOferece.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const ModalOferece = ({ isOpen, onRequestClose }) => {
    const [selectedLocationOferece, setSelectedLocationOferece] = useState('');
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

    const handleLocationChangeOferece = (value) => {
        setSelectedLocationOferece(value);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Modal Oferece"
            className={"modal"}
        >
            <h2>Oferecendo Carona</h2>
            <InputText keyfilter="alpha" placeholder="Seu Nome" value={value} onChange={(e) => setValue(e.target.value)} />
            <AutoComplete
                value={selectedLocationOferece}
                suggestions={locations.map(location => location.nome)}
                completeMethod={handleLocationChangeOferece}
                onChange={(e) => handleLocationChangeOferece(e.target.value)}
                onSelect={(e) => handleLocationChangeOferece(e.value)}
                dropdown
                placeholder="Selecione uma localização..."
                className="autocomplete-input"
            />
            <Button label="Enviar" severity="success" />
        </Modal>
    );
};

export default ModalOferece;
