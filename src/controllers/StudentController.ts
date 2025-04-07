import { injectable } from "inversify";
import { NextFunction, Request, Response } from "express";

@injectable()
export class StudentController {
  // constructor(
  //   @inject(CreateStudentService)
  //   private readonly createStudent: CreateStudentService
  // ) {}

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      // const student = await this.createStudent.execute(req.body);

      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      // const student = await this.createStudent.execute(req.body);

      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }
}
