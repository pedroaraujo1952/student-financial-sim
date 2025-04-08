import { z } from "zod";

export const ListSimulationsArgsValidator = z.object({
  limit: z.coerce.number().optional(),
  page: z.coerce.number().optional(),
});
