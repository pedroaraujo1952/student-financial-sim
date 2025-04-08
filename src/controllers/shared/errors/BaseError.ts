import { StatusCodes } from "http-status-codes";
import { ErrorCode } from "../../../constants/errors";

export class BaseError extends Error {
  constructor(
    readonly statusCode: StatusCodes,
    readonly errorCode: ErrorCode,
    readonly message: any
  ) {
    super(message);

    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }

  getBody() {
    return {
      message: this.message,
      errorCode: this.errorCode,
    };
  }
}
