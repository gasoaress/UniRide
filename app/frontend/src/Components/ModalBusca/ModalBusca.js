// ModalBusca.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { AutoComplete } from 'primereact/autocomplete';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const ModalBusca = ({ isOpen, onRequestClose }) => {
    const [selectedLugarBusca, setSelectedLugarBusca] = useState('');
    const [lugares, setLugares] = useState([]);
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
                setLugares(data);
            })
            .catch(error => console.error('Erro ao buscar localizações:', error));
    };

    const handleLugarChangeBusca = (value) => {
        setSelectedLugarBusca(value);
    };

    const navigateToNextPage = () => {
        onRequestClose(); // Feche o modal
        window.location.href = '/oferecendocarona'; // Redirecionar para a próxima página
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

    const handleSubmit = () => {
        if (!isNameValid || !selectedLugarBusca) {
            return;
        }
        setIsSubmitting(true);
        const payload = {
            nome: nome,
            lugar: selectedLugarBusca
        };
        fetch('http://localhost:4000/buscando', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Sucesso:', data);
            navigateToNextPage();
            onRequestClose();
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
            contentLabel="Modal Busca"
            className={"modal"}
        >
            <h2>Buscando Carona</h2>
            <InputText 
                keyfilter="alpha" 
                placeholder="Seu Nome" 
                value={nome} 
                onChange={handleNameChange} 
                className={isNameValid ? '' : 'p-invalid'} 
            />
            {!isNameValid && <small className="p-error">Nome inválido. Use apenas letras e espaços, e entre 2 e 50 caracteres.</small>}
            <AutoComplete
                value={selectedLugarBusca}
                suggestions={lugares.map(location => location.nome)}
                completeMethod={handleLugarChangeBusca}
                onChange={(e) => handleLugarChangeBusca(e.target.value)}
                onSelect={(e) => handleLugarChangeBusca(e.value)}
                dropdown
                placeholder="Selecione um lugar..."
                className="autocomplete-input"
            />
            <Button 
                label="Enviar" 
                severity="success" 
                onClick={handleSubmit} 
                disabled={!isNameValid || !selectedLugarBusca || isSubmitting}
            />
        </Modal>
    );
};

export default ModalBusca;
