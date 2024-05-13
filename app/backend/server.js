const express = require('express');
const mysql = require('mysql');
require('dotenv').config();
const cors = require('cors'); 
const app = express();


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

app.use(cors());

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida com o banco de dados');
});

app.get('/testar-conexao', (req, res) => {
  connection.query('SELECT 1', (error, results) => {
    if (error) {
      console.error('Erro ao testar conexão com o banco de dados:', error);
      res.status(500).json({ error: 'Erro ao testar conexão com o banco de dados' });
      return;
    }
    res.json({ message: 'Conexão com o banco de dados bem-sucedida' });
  });
});

app.get('/localizacoes', (req, res) => {
    connection.query('SELECT * FROM locations', (error, results) => {
      if (error) {
        console.error('Erro ao buscar localizações:', error);
        res.status(500).json({ error: 'Erro ao buscar localizações' });
        return;
      }
      res.json(results); 
    });
  });
  

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
