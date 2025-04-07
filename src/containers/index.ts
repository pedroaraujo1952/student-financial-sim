// src/containers.ts
import { Container } from "inversify";
import { PrismaStudentsRepository } from "../infra/repositories/PrismaStudentRepository";
import { StudentsRepository } from "../contracts/StudentRepository";
import { CreateStudentService } from "../services/CreateStudentService";
import { HashProvider } from "../contracts/HashProvider";
import { BcryptProvider } from "../infra/providers/HashProvider/implementations/bcrypt.provider";
import { SessionController } from "../controllers/SessionController";
import { TYPES } from "../constants/types";
import { JwtProvider } from "../infra/providers/AuthProvider/implementations/jwt.provider";
import { AuthProvider } from "../contracts/AuthProvider";
import { AuthenticateStudentService } from "../services/AuthenticateStudentService";
import { StudentController } from "../controllers/StudentController";

const container = new Container();

// Repositories
container
  .bind<StudentsRepository>(TYPES.StudentsRepository)
  .to(PrismaStudentsRepository);

// Providers
container.bind<HashProvider>(TYPES.HashProvider).to(BcryptProvider);
container.bind<AuthProvider>(TYPES.AuthProvider).to(JwtProvider);

// Services
container
  .bind<CreateStudentService>(TYPES.CreateStudentService)
  .to(CreateStudentService);
container
  .bind<AuthenticateStudentService>(TYPES.AuthenticateStudentService)
  .to(AuthenticateStudentService);

// Controllers
container
  .bind<SessionController>(TYPES.SessionController)
  .to(SessionController);
container
  .bind<StudentController>(TYPES.StudentController)
  .to(StudentController);

export default container;
