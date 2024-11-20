import { z } from "zod";
//Schema de Dados
export const testSchema = z.object({
  curso_id: z.string(),
  cadeira_id: z.string(),
  ano: z.string().maxLength(4).toUpperCase(),
  nome_avaliacao: z.string(),
  peso: z
    .number()
    .min(0.0, "O valor deve ser maior ou igual a 0.0%")
    .max(1, "O valor deve ser menor ou igual a 100%"),
  exame_normal: z
    .number()
    .min(0, "O valor deve ser maior ou igual a 0")
    .max(20, "O valor deve ser menor ou igual a 20"),
  exame_recorrencia: z
    .number()
    .min(0, "O valor deve ser maior ou igual a 0")
    .max(20, "O valor deve ser menor ou igual a 20"),
});

export const insertValues = z.object({
  curso_id: z.string(),
  cadeira_id: z.string(),
  ano: z.string().maxLength(4).toUpperCase(),
  nome_avaliacao: z.string(),
  peso: z
    .number()
    .min(0.0, "O valor deve ser maior ou igual a 0.0%")
    .max(1, "O valor deve ser menor ou igual a 100%"),
});
