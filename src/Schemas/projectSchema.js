const { z } = require("zod");
//Schema de Dados
const testSchema = z.object({
  curso_id: z.number(),
  cadeira_id: z.number(),
  ano: z.number(),
  nome_avaliacao: z.string(),
  peso: z
    .number()
    .min(0.0, "O valor deve ser maior ou igual a 0.0%")
    .max(1, "O valor deve ser menor ou igual a 100%"),
  exame_normal: z.boolean(),
  exame_recorrencia: z.boolean(),
});

const insertValues = z.object({
  curso_id: z.number(),
  cadeira_id: z.number(),
  ano: z.number(),
  estudante_id: z.number(),
  nome_avaliacao: z.string(),
  nota: z.number(),
  peso: z
    .number()
    .min(0.0, "O valor deve ser maior ou igual a 0.0%")
    .max(1, "O valor deve ser menor ou igual a 100%"),
});

module.exports = { testSchema, insertValues };
