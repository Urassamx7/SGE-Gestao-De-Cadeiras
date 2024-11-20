import { z } from "zod";
import { insertValues, testSchema } from "./src/Schemas/projectSchema";
import { lancarNota } from "./src/queries/lancar-nota";
import { criarAvaliacao } from "./src/queries/criar-avaliacao";
const express = require("express");
require("dotenv").config();
const mysql = require("mysql2");
const app = express();
const port = 3000;

app.use(express.json());

// Configuração da pool de conexão para MySQL
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Teste de conexão
pool.getConnection((err, connection) => {
  if (err) {
    return console.error("Erro ao conectar à base de dados:", err.stack);
  }
  app.get("/", (req, res) => {
    return {
      Hello: "World",
    };
  });
  console.log("Conectado ao MySQL!");
  connection.release(); // Libera a conexão
});

// Rota para criar uma avaliação
app.post("/criar-avaliacao", (req, res) => {
  try {
    const validData = testSchema.parse(req.body);
    const {
      curso_id,
      cadeira_id,
      ano,
      nome_avaliacao,
      peso,
      exame_normal,
      exame_recorrencia,
    } = validData;

    criarAvaliacao(
      curso_id,
      cadeira_id,
      ano,
      nome_avaliacao,
      peso,
      exame_normal,
      exame_recorrencia
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Retornar erros de validação
      return res.status(400).json({
        error: "Erro de validação",
        issues: err.errors,
      });
    }

    console.error("Erro desconhecido:", err);
    res.status(500).send("Erro ao processar a requisição.");
  }
});

// Rota para lançar notas
app.post("/lancar-nota", (req, res) => {
  try {
    const validData = insertValues.parse(req.body);
    const {
      curso_id,
      cadeira_id,
      ano,
      estudante_id,
      nome_avaliacao,
      nota,
      peso,
    } = validData;
    lancarNota(
      curso_id,
      cadeira_id,
      ano,
      estudante_id,
      nome_avaliacao,
      nota,
      peso
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Retornar erros de validação
      return res.status(400).json({
        error: "Erro de validação",
        issues: err.errors,
      });
    }

    console.error("Erro desconhecido:", err);
    res.status(500).send("Erro ao processar a requisição.");
  }
});

app.listen(port, () => {
  console.log(`Servidor a correr em http://localhost:${port}`);
});
