import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import './OferecendoCarona.css'; // Importe o arquivo CSS

const OferecendoCarona = () => {
    const [pessoasOferecendo, setPessoasOferecendo] = useState([]);
    const [showChatDialog, setShowChatDialog] = useState(false);
    const [loading, setLoading] = useState(true); // Estado para indicar se está carregando os dados

    useEffect(() => {
        fetchPessoasOferecendo();
    }, []);

    const fetchPessoasOferecendo = () => {
        fetch('http://localhost:4000/oferecendo')
            .then(response => response.json())
            .then(data => {
                setPessoasOferecendo(data);
                setLoading(false); // Marca o carregamento como concluído
            })
            .catch(error => {
                console.error('Erro ao buscar pessoas oferecendo carona:', error);
                setLoading(false); // Marca o carregamento como concluído, mesmo em caso de erro
            });
    };

    const openChatDialog = () => {
        setShowChatDialog(true);
    };

    const hideChatDialog = () => {
        setShowChatDialog(false);
    };

    return (
        <div className="card-container">
            <Dialog header="Chat" visible={showChatDialog} style={{ width: '20vw' }} onHide={hideChatDialog}>
                {/* Conteúdo do chat */}
            </Dialog>
            {loading && <div>Carregando...</div>}
            {!loading && pessoasOferecendo.length === 0 && <div>Ainda não há ninguém</div>}
            {pessoasOferecendo.map(pessoa => (
                <div key={pessoa.id} className="card-item">
                    <Card title={pessoa.nome} subTitle={pessoa.lugar}>
                        <Button icon="pi pi-comments" onClick={openChatDialog} className="chat-button p-button-rounded p-button-text p-button-sm" />
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default OferecendoCarona;
