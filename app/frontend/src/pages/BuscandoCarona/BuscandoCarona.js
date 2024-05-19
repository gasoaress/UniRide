import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import './BuscandoCarona.css'; // Importe o arquivo CSS

const BuscandoCarona = () => {
    const [pessoasBuscando, setPessoasBuscando] = useState([]);
    const [showChatDialog, setShowChatDialog] = useState(false);
    const [loading, setLoading] = useState(true); // Estado para indicar se está carregando os dados

    useEffect(() => {
        fetchPessoasBuscando();
    }, []);

    const fetchPessoasBuscando = () => {
        fetch('http://localhost:4000/buscando')
            .then(response => response.json())
            .then(data => {
                setPessoasBuscando(data);
                setLoading(false); // Marca o carregamento como concluído
            })
            .catch(error => {
                console.error('Erro ao buscar pessoas buscando carona:', error);
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
            {!loading && pessoasBuscando.length === 0 && <div>Ainda não há ninguém</div>}
            {pessoasBuscando.map(pessoa => (
                <div key={pessoa.id} className="card-item">
                    <Card title={pessoa.nome} subTitle={pessoa.lugar}>
                        <Button icon="pi pi-comments" onClick={openChatDialog} className="chat-button p-button-rounded p-button-text p-button-sm" />
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default BuscandoCarona;
