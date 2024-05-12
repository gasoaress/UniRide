// app.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const authRoutes = require('./auth'); // Caminho para o arquivo de rotas de autenticação

// Configurar o Firebase Admin SDK
const serviceAccount = require('./caronas-4918d-firebase-adminsdk-4nzfb-5322265125.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Middleware para analisar o corpo da solicitação
app.use(bodyParser.json());

// Roteamento
app.use('/auth', authRoutes); // Usar as rotas de autenticação

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor em execução na porta ${PORT}`);
});
