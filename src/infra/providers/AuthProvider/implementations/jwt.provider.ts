import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";
import { AuthProvider } from "../../../../contracts/AuthProvider";
import { TYPES } from "../../../../constants/types";
import { StudentsRepository } from "../../../../contracts/StudentRepository";
import { Student } from "../../../../entities/Student";
import { UnauthorizedError } from "../../../../controllers/shared/errors/UnauthorizedError";

interface JwtUserPayload {
  data: {
    userId: number;
  };
  iat?: number;
  exp?: number;
  iss?: string;
}

@injectable()
export class JwtProvider implements AuthProvider {
  private readonly DEFAULT_EXPIRATION_TIME = "5h";
  private readonly authSecret: string;

  constructor(
    @inject(TYPES.StudentsRepository)
    private readonly studentRepository: StudentsRepository
  ) {
    this.authSecret = process.env.AUTH_SECRET || "";
  }

  generateToken(userId: number): string {
    const token = jwt.sign({ data: { userId } }, this.authSecret, {
      expiresIn: this.DEFAULT_EXPIRATION_TIME,
    });

    return token;
  }

  async verifyToken(token: string): Promise<Student> {
    const decoded = jwt.verify(token, this.authSecret) as JwtUserPayload;

    const { userId } = decoded.data;

    const user = await this.studentRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedError();
    }

    return user;
  }
}
