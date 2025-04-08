// src/containers.ts
import { Container } from "inversify";
import { PrismaStudentsRepository } from "../infra/repositories/PrismaStudentRepository";
import { StudentsRepository } from "../contracts/StudentRepository";
import { CreateStudentService } from "../services/CreateStudentService";
import { HashProvider } from "../contracts/HashProvider";
import { BcryptProvider } from "../infra/providers/HashProvider/implementations/bcrypt.provider";
import { SessionController } from "../controllers/Session/SessionController";
import { TYPES } from "../constants/types";
import { JwtProvider } from "../infra/providers/AuthProvider/implementations/jwt.provider";
import { AuthProvider } from "../contracts/AuthProvider";
import { AuthenticateStudentService } from "../services/AuthenticateStudentService";
import { StudentController } from "../controllers/Student/StudentController";
import { UpdateStudentService } from "../services/UpdateStudentService";
import { FinancialSimulationController } from "../controllers/FinancialSimulation/FinancialSimulationController";
import { FinancialSimulationsRepository } from "../contracts/FinancialSimulationsRepository";
import { PrismaFinancialSimulationsRepository } from "../infra/repositories/PrismaFinancialSimulationRepository";
import { ListFinancialSimulationsService } from "../services/ListFinancialSimulationsService";
import { SimulateFinancialInvestment } from "../services/SimulateFinancialInvestmentService";

const container = new Container();

// Repositories
container
  .bind<StudentsRepository>(TYPES.StudentsRepository)
  .to(PrismaStudentsRepository);
container
  .bind<FinancialSimulationsRepository>(TYPES.FinancialSimulationsRepository)
  .to(PrismaFinancialSimulationsRepository);

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
container
  .bind<UpdateStudentService>(TYPES.UpdateStudentService)
  .to(UpdateStudentService);
container
  .bind<ListFinancialSimulationsService>(TYPES.ListFinancialSimulationsService)
  .to(ListFinancialSimulationsService);
container
  .bind<SimulateFinancialInvestment>(TYPES.SimulateFinancialInvestmentService)
  .to(SimulateFinancialInvestment);

// Controllers
container
  .bind<SessionController>(TYPES.SessionController)
  .to(SessionController);
container
  .bind<StudentController>(TYPES.StudentController)
  .to(StudentController);
container
  .bind<FinancialSimulationController>(TYPES.FinancialSimulationController)
  .to(FinancialSimulationController);

export default container;
