const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser'); // Importando o body-parser
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
app.use(bodyParser.json()); // Usando o body-parser para parsear JSON

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

app.post('/buscando', (req, res) => {
  const { nome, lugar } = req.body;
  
  if (!nome || !lugar) {
    return res.status(400).json({ error: 'Nome e lugar são obrigatórios' });
  }

  const query = 'INSERT INTO buscando (nome, lugar) VALUES (?, ?)';
  connection.query(query, [nome, lugar], (error, results) => {
    if (error) {
      console.error('Erro ao inserir dados:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
    res.status(201).json({ id: results.insertId, nome, lugar });
  });
});

app.post('/oferecendo', (req, res) => {
  const { nome, lugar } = req.body;
  
  if (!nome || !lugar) {
    return res.status(400).json({ error: 'Nome e lugar são obrigatórios' });
  }

  const query = 'INSERT INTO oferecendo (nome, lugar) VALUES (?, ?)';
  connection.query(query, [nome, lugar], (error, results) => {
    if (error) {
      console.error('Erro ao inserir dados:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
    res.status(201).json({ id: results.insertId, nome, lugar });
  });
});

app.get('/buscando', (req, res) => {
  connection.query('SELECT * FROM buscando', (error, results) => {
      if (error) {
          console.error('Erro ao buscar pessoas buscando carona:', error);
          res.status(500).json({ error: 'Erro ao buscar pessoas buscando carona' });
          return;
      }
      res.json(results); // Retorna todas as pessoas buscando carona em formato JSON
  });
});

app.get('/oferecendo', (req, res) => {
  connection.query('SELECT * FROM oferecendo', (error, results) => {
      if (error) {
          console.error('Erro ao buscar pessoas buscando carona:', error);
          res.status(500).json({ error: 'Erro ao buscar pessoas buscando carona' });
          return;
      }
      res.json(results); // Retorna todas as pessoas buscando carona em formato JSON
  });
});



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
