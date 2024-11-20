import { pool } from "../../server";
export function criarAvaliacao(
  curso_id,
  cadeira_id,
  ano,
  nome_avaliacao,
  peso,
  exame_normal,
  exame_recorrencia
) {
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
}
