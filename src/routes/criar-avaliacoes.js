const express = require("express");
require("dotenv").config();
const mysql = require("mysql2");
const app = express();
const port = 3000;

app.use(express.json());

// Configuração da pool de conexão para MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

export const createReview = async () => {
  app.post("/criar-avaliacao", (req, res) => {
    const {
      curso_id,
      cadeira_id,
      ano,
      nome_avaliacao,
      peso,
      exame_normal,
      exame_recorrencia,
    } = req.body;

    const query = `
          INSERT INTO avaliacoes (curso_id, cadeira_id, ano, nome_avaliacao, peso, exame_normal, exame_recorrencia, created_at, updated_at) 
          VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;

    pool.query(
      query,
      [
        curso_id,
        cadeira_id,
        ano,
        nome_avaliacao,
        peso,
        exame_normal,
        exame_recorrencia,
      ],
      (err, results) => {
        if (err) {
          console.error("Erro ao criar a avaliação:", err);
          return res.status(500).send("Erro ao criar a avaliação.");
        }
        res.send("Avaliação criada com sucesso!");
      }
    );
  });
};
