import { ErrorCode } from "../../../constants/errors";
import { NotFoundError } from "../../shared/errors/NotFoundError";

export class StudentNotFoundError extends NotFoundError {
  constructor() {
    super("Student Not Found", ErrorCode.STUDENT_NOT_FOUND);
  }
}
