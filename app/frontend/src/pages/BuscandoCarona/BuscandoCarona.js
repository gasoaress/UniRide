import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import io from 'socket.io-client';
import './BuscandoCarona.css'; 

const socket = io('http://localhost:4000'); // Altere para o endereço do seu backend

const BuscandoCarona = () => {
    const [pessoasBuscando, setPessoasBuscando] = useState([]);
    const [showChatDialog, setShowChatDialog] = useState(false);
    const [currentRoom, setCurrentRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPessoasBuscando();
        socket.on('receive_message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });
    }, []);

    const fetchPessoasBuscando = () => {
        fetch('http://localhost:4000/buscando')
            .then(response => response.json())
            .then(data => {
                setPessoasBuscando(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar pessoas buscando carona:', error);
                setLoading(false);
            });
    };

    const openChatDialog = (room) => {
        setCurrentRoom(room);
        setShowChatDialog(true);
        socket.emit('join_room', room);
    };

    const hideChatDialog = () => {
        setShowChatDialog(false);
        setCurrentRoom('');
        setMessages([]);
    };

    const sendMessage = () => {
        const messageData = {
            room: currentRoom,
            content: message,
            author: 'Eu', // Pode adicionar lógica para identificar o autor
        };
        socket.emit('send_message', messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
        setMessage('');
    };

    return (
        <div className="card-container">
            <Dialog header="Chat" visible={showChatDialog} style={{ width: '20vw' }} onHide={hideChatDialog}>
                <div className="chat-container">
                    {messages.map((msg, index) => (
                        <div key={index} className="chat-message">
                            <strong>{msg.author}: </strong>{msg.content}
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Digite sua mensagem..."
                    />
                    <Button label="Enviar" icon="pi pi-check" onClick={sendMessage} />
                </div>
            </Dialog>
            {loading && <div>Carregando...</div>}
            {!loading && pessoasBuscando.length === 0 && <div>Ainda não há ninguém</div>}
            {pessoasBuscando.map(pessoa => (
                <div key={pessoa.id} className="card-item">
                    <Card title={pessoa.nome} subTitle={pessoa.lugar}>
                        <Button icon="pi pi-comments" onClick={() => openChatDialog(pessoa.id)} className="chat-button p-button-rounded p-button-text p-button-sm" />
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default BuscandoCarona;
