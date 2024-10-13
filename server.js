const express = require('express');
require('dotenv').config();

const mysql = require('mysql2');
const app = express();
const port = 3000;

// Configuração da pool de conexão para MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Teste de conexão
pool.getConnection((err, connection) => {
  if (err) {
    return console.error('Erro ao conectar à base de dados:', err.stack);
  }
  console.log('Conectado ao MySQL!');
  connection.release(); // Libera a conexão
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Servidor a correr em http://localhost:${port}`);
});

