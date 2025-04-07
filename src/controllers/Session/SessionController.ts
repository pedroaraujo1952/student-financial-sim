// src/controllers/SessionController.ts
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { CreateStudentService } from "../../services/CreateStudentService";
import { TYPES } from "../../constants/types";
import { AuthenticateStudentService } from "../../services/AuthenticateStudentService";

@injectable()
export class SessionController {
  constructor(
    @inject(TYPES.CreateStudentService)
    private readonly createStudent: CreateStudentService,

    @inject(TYPES.AuthenticateStudentService)
    private readonly authenticateStudent: AuthenticateStudentService
  ) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const student = await this.createStudent.execute(req.body);
      return res.status(201).json(student);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const { token, student } = await this.authenticateStudent.execute(
        email,
        password
      );

      return res.status(200).json({ token, student });
    } catch (error) {
      next(error);
    }
  }
}
