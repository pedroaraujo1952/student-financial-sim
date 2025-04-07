import { inject, injectable } from "inversify";
import { TYPES } from "../constants/types";
import { StudentsRepository } from "../contracts/StudentRepository";
import { Student } from "../entities/Student";
import { HashProvider } from "../contracts/HashProvider";
import { AuthProvider } from "../contracts/AuthProvider";

interface IResponse {
  token: string;
  student: Student;
}

@injectable()
export class AuthenticateStudentService {
  constructor(
    @inject(TYPES.AuthProvider)
    private readonly authProvider: AuthProvider,

    @inject(TYPES.HashProvider)
    private readonly hashProvider: HashProvider,

    @inject(TYPES.StudentsRepository)
    private readonly studentRepository: StudentsRepository
  ) {}

  async execute(email: string, password: string): Promise<IResponse> {
    const student = await this.studentRepository.findByEmail(email, true);

    if (!student || !student.password) {
      throw new Error("Wrong email or password");
    }

    const passwordMatched = this.hashProvider.compare(
      student.password,
      password
    );

    if (!passwordMatched) {
      throw new Error("Wrong email or password");
    }

    const token = this.authProvider.generateToken(student.id);

    return {
      token,
      student: {
        ...student,
        password: undefined,
      },
    };
  }
}
