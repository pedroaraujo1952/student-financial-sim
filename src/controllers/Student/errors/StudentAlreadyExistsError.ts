import { ErrorCode } from "../../../constants/errors";
import { BadRequestError } from "../../shared/errors/BadRequestError";

export class StudentAlreadyExistsError extends BadRequestError {
  constructor() {
    super("Student Already Exists", ErrorCode.STUDENT_ALREADY_EXISTS);
  }
}
