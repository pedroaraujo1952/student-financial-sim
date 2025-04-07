// src/services/CreateStudentService.ts
import { inject, injectable } from "inversify";
import { StudentsRepository } from "../contracts/StudentRepository";
import { HashProvider } from "../contracts/HashProvider";
import { Student } from "../entities/Student";
import { ICreateStudentDTO } from "../dtos/Student/CreateStudentDTO";
import { TYPES } from "../constants/types";

@injectable()
export class CreateStudentService {
  constructor(
    @inject(TYPES.StudentsRepository)
    private readonly studentsRepository: StudentsRepository,

    @inject(TYPES.HashProvider)
    private readonly hashProvider: HashProvider
  ) {}

  async execute({
    email,
    password,
    ...data
  }: ICreateStudentDTO): Promise<Student> {
    const studentExists = await this.studentsRepository.findByEmail(email);
    if (studentExists) {
      throw new Error("Student already exists");
    }

    const hashedPassword = this.hashProvider.encrypt(password);

    const student = await this.studentsRepository.create({
      ...data,
      email,
      password: hashedPassword,
    });

    return student;
  }
}
