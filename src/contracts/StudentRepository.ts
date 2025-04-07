import { Student } from "../entities/Student";
import { ICreateStudentDTO } from "../dtos/Student/CreateStudentDTO";
import { IUpdateStudentDTO } from "../dtos/Student/UpdateStudentDTO";

export abstract class StudentsRepository {
  abstract create(data: ICreateStudentDTO): Promise<Student>;
  abstract findByEmail(
    email: string,
    withPswd?: boolean
  ): Promise<Student | null>;
  abstract findById(id: number): Promise<Student | null>;
  abstract update(id: number, data: IUpdateStudentDTO): Promise<Student>;
  abstract delete(id: number): Promise<void>;
}

export const StudentsRepositoryToken = Symbol.for("StudentsRepository");
