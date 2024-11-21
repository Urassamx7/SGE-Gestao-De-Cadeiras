// src/queries/lancar-nota.js
const pool = require("../db/db");

async function lancarNota(
  curso_id,
  cadeira_id,
  ano,
  estudante_id,
  nome_avaliacao,
  nota,
  peso,
  res // Recebendo o objeto `res` corretamente
) {
  const query = `
    INSERT INTO avaliacoes_notas (curso_id, cadeira_id, ano, estudante_id, nome_avaliacao, nota, peso) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  pool.query(
    query,
    [curso_id, cadeira_id, ano, estudante_id, nome_avaliacao, nota, peso],
    (err, results) => {
      if (err) {
        console.error("Erro ao lançar a nota:", err);
        return res.status(500).send("Erro ao lançar a nota.");
      }
      res.send("Nota lançada com sucesso!");
    }
  );
}

module.exports = lancarNota;
