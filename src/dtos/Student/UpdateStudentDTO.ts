import { ICreateStudentDTO } from "./CreateStudentDTO";

export interface IUpdateStudentDTO
  extends Partial<Omit<ICreateStudentDTO, "password">> {}
