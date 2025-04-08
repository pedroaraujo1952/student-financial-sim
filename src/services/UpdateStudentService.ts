import { inject, injectable } from "inversify";
import { StudentsRepository } from "../contracts/StudentRepository";
import { TYPES } from "../constants/types";
import { IUpdateStudentDTO } from "../dtos/Student/UpdateStudentDTO";
import { Student } from "../entities/Student";
import { StudentNotFoundError } from "../controllers/Student/errors/StudentNotFoundError";

@injectable()
export class UpdateStudentService {
  constructor(
    @inject(TYPES.StudentsRepository)
    private readonly studentRepository: StudentsRepository
  ) {}

  async execute(id: number, data: IUpdateStudentDTO): Promise<Student> {
    const student = await this.studentRepository.findById(id);

    if (!student) {
      throw new StudentNotFoundError();
    }

    return await this.studentRepository.update(id, {
      ...student,
      ...data,
    });
  }
}
