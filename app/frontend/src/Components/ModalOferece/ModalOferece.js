import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const ModalOferece = ({ isOpen, onRequestClose }) => {
    const [selectedLocationOferece, setSelectedLocationOferece] = useState('');
    const [locations, setLocations] = useState([]);
    const [nome, setNome] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const validateName = (name) => {
        const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,50}$/;
        return nameRegex.test(name);
    };

    const handleNameChange = (e) => {
        const newValue = e.target.value;
        setNome(newValue);
        setIsNameValid(validateName(newValue));
    };

    const handleLocationChangeOferece = (value) => {
        setSelectedLocationOferece(value);
    };

    const navigateToNextPage = () => {
        onRequestClose(); // Feche o modal
        window.location.href = '/buscandocarona'; // Redirecionar para a próxima página
    };

    const handleSubmit = () => {
        if (!isNameValid || !selectedLocationOferece) {
            return;
        }
        setIsSubmitting(true);
        const payload = {
            nome: nome,
            lugar: selectedLocationOferece
        };
        fetch('http://localhost:4000/oferecendo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Sucesso:', data);
            navigateToNextPage(); // Navegar para a próxima página
        })
        .catch(error => {
            console.error('Erro:', error);
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Modal Oferece"
            className={"modal"}
        >
            <h2>Oferecendo Carona</h2>
            <InputText 
                placeholder="Seu Nome" 
                value={nome} 
                onChange={handleNameChange} 
                className={isNameValid ? '' : 'p-invalid'} 
            />
            {!isNameValid && <small className="p-error">Nome inválido. Use apenas letras e espaços, e entre 2 e 50 caracteres.</small>}
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
            <Button 
                label="Enviar" 
                severity="success" 
                onClick={handleSubmit} 
                disabled={!isNameValid || !selectedLocationOferece || isSubmitting}
            />
        </Modal>
    );
};

export default ModalOferece;
