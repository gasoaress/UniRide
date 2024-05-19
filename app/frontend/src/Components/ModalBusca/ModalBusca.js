import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

const ModalBusca = ({ isOpen, onRequestClose }) => {
    const [selectedLocationBusca, setSelectedLocationBusca] = useState(null);
    const [locations, setLocations] = useState([]);
    const [nome, setNome] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toast = useRef(null);

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
        const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{3,50}$/;
        return nameRegex.test(name);
    };

    const handleNameChange = (e) => {
        const newValue = e.target.value;
        setNome(newValue);
        setIsNameValid(validateName(newValue));
    };

    const handleLocationChangeBusca = (e) => {
        setSelectedLocationBusca(e.value);
    };

    const navigateToNextPage = () => {
        onRequestClose();
        window.location.href = '/oferecendocarona';
    };

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos.', life: 3000 });
    }

    const handleSubmit = () => {
        if (!isNameValid || !selectedLocationBusca || !nome.trim()) {
            showError()
            return;
        }
        setIsSubmitting(true);
        const payload = {
            nome: nome,
            lugar: selectedLocationBusca.id
        };
        fetch('http://localhost:4000/Buscando', {
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
            })
            .catch(error => {
                console.error('Erro:', error);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const completeMethod = (event) => {
        const query = event.query;
        const sortedLocations = locations.slice().sort((a, b) => a.nome.localeCompare(b.nome));
        setLocations(sortedLocations);
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
                placeholder="Seu Nome"
                value={nome}
                onChange={handleNameChange}
                className={isNameValid ? '' : 'p-invalid'}
            />
            {!isNameValid && <small className="p-error">Nome inválido. Use apenas letras e espaços, e entre 2 e 50 caracteres.</small>}
            <AutoComplete
                value={selectedLocationBusca}
                suggestions={locations}
                completeMethod={completeMethod}
                field="nome"
                dropdown
                dropdownMode="blank"
                forceSelection
                placeholder="Selecione uma localização..."
                className="autocomplete-input"
                onChange={(e) => handleLocationChangeBusca(e)}
            />
            <Toast ref={toast} />
            <Button
                label="Enviar"
                severity="success"
                onClick={handleSubmit}
                disabled={!isNameValid || !selectedLocationBusca || isSubmitting}
            />
        </Modal>
    );
};

export default ModalBusca;
