import { Student } from "../entities/Student";

export abstract class AuthProvider {
  abstract generateToken(userId: number): string;
  abstract verifyToken(token: string): Promise<Student>;
}
