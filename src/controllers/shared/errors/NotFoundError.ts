import { StatusCodes } from "http-status-codes";
import { ErrorCode } from "../../../constants/errors";
import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  constructor(message: any = "Not Found", code = ErrorCode.NOT_FOUND) {
    super(StatusCodes.NOT_FOUND, code, message);
  }
}
