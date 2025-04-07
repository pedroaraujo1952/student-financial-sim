import { Prisma, PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import { StudentsRepository } from "../../contracts/StudentRepository";
import { Student } from "../../entities/Student";

@injectable()
export class PrismaStudentsRepository implements StudentsRepository {
  private readonly prisma: any;

  constructor() {
    this.prisma = new PrismaClient({
      omit: {
        student: {
          password: true,
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.student.findMany();
  }

  async findById(id: number): Promise<Student | null> {
    return await this.prisma.student.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string, withPswd = false): Promise<Student | null> {
    return await this.prisma.student.findUnique({
      where: { email },
      omit: {
        password: !withPswd,
      },
    });
  }

  async create(data: Prisma.StudentCreateInput): Promise<Student> {
    return await this.prisma.student.create({
      data,
    });
  }

  async update(id: number, data: Prisma.StudentUpdateInput): Promise<Student> {
    return await this.prisma.student.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.student.delete({
      where: { id },
    });
  }
}
