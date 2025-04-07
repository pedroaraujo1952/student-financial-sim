import { inject, injectable } from "inversify";
import { NextFunction, Request, Response } from "express";
import { TYPES } from "../../constants/types";
import { UpdateStudentService } from "../../services/UpdateStudentService";

@injectable()
export class StudentController {
  constructor(
    @inject(TYPES.UpdateStudentService)
    private readonly updateStudent: UpdateStudentService
  ) {}

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const data = req.body;

      const student = await this.updateStudent.execute(user!.id, data);

      res.status(200).json(student);
    } catch (error) {
      next(error);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
