const express = require("express");
require("dotenv").config();
const app = express();
const port = 3000;
const { z } = require("zod");
const lancarNota = require("./src/queries/lancar-nota");
const criarAvaliacao = require("./src/queries/criar-avaliacao");
const pool = require("./src/db/db");
const { testSchema, insertValues } = require("./src/Schemas/projectSchema");
app.use(express.json());

// Teste de conexão
pool.getConnection((err, connection) => {
  if (err) {
    return console.error("Erro ao conectar à base de dados:", err.stack);
  }
  console.log("Conectado ao MySQL!");
  connection.release(); // Libera a conexão
});

app.get("/", (req, res) => {
  return {
    Hello: "World",
  };
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
      exame_recorrencia,
      res
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
      peso,
      res
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
