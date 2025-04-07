import { z } from "zod";

export interface ICreateStudentDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const CreateStudentDTO = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});
