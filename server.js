const express = require('express');
require('dotenv').config();


const { Pool } = require('pg');
const app = express();
const port = 3000;

// Configuração da pool de conexão
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });
  
  // Teste de conexão
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Erro ao conectar à base de dados:', err.stack);
    }
    console.log('Conectado ao PostgreSQL!');
  });



app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Servidor a correr em http://localhost:${port}`);
});
