import { RegisterValidator } from "../../Session/validators/RegisterValidator";

export const UpdateStudentValidator = RegisterValidator.partial().omit({
  password: true,
  email: true,
});
