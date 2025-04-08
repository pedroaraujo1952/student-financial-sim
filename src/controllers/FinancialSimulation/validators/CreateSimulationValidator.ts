import { z } from "zod";

export const CreateSimulationValidator = z.object({
  installmentCount: z.number(),
  totalValue: z.coerce.number(),
  interestRate: z.coerce.number(),
});
