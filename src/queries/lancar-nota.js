import { pool } from "../../server";

export function lancarNota(
  curso_id,
  cadeira_id,
  ano,
  estudante_id,
  nome_avaliacao,
  nota,
  peso
) {
  const query = `
    INSERT INTO avaliacao_nota (curso_id, cadeira_id, ano, estudante_id, nome_avaliacao, nota, peso) 
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
