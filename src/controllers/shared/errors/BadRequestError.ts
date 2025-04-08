import { StatusCodes } from "http-status-codes";
import { BaseError } from "./BaseError";
import { ErrorCode } from "../../../constants/errors";

export class BadRequestError extends BaseError {
  constructor(message: any = "Bad Request", code = ErrorCode.BAD_REQUEST) {
    super(StatusCodes.BAD_REQUEST, code, message);
  }
}
