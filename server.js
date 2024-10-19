const express = require('express');
require('dotenv').config();
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json()); 

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

// Rota para criar uma avaliação
app.post('/criar-avaliacao', (req, res) => {
  const { curso_id, cadeira_id, ano, nome_avaliacao, peso, exame_normal, exame_recorrencia } = req.body;

  const query = `
    INSERT INTO avaliacoes (curso_id, cadeira_id, ano, nome_avaliacao, peso, exame_normal, exame_recorrencia, created_at, updated_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
  `;

  pool.query(query, [curso_id, cadeira_id, ano, nome_avaliacao, peso, exame_normal, exame_recorrencia], (err, results) => {
    if (err) {
      console.error('Erro ao criar a avaliação:', err);
      return res.status(500).send('Erro ao criar a avaliação.');
    }
    res.send('Avaliação criada com sucesso!');
  });
});

// Rota para lançar notas
app.post('/lancar-nota', (req, res) => {
  const { curso_id, cadeira_id, ano, estudante_id, nome_avaliacao, nota, peso } = req.body;

  const query = `
    INSERT INTO avaliacao_nota (curso_id, cadeira_id, ano, estudante_id, nome_avaliacao, nota, peso) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  pool.query(query, [curso_id, cadeira_id, ano, estudante_id, nome_avaliacao, nota, peso], (err, results) => {
    if (err) {
      console.error('Erro ao lançar a nota:', err);
      return res.status(500).send('Erro ao lançar a nota.');
    }
    res.send('Nota lançada com sucesso!');
  });
});

app.listen(port, () => {
  console.log(`Servidor a correr em http://localhost:${port}`);
});

