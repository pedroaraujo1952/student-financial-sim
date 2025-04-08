import { StatusCodes } from "http-status-codes";
import { BaseError } from "./BaseError";
import { ErrorCode } from "../../../constants/errors";

export class InternalServerError extends BaseError {
  constructor() {
    super(
      StatusCodes.INTERNAL_SERVER_ERROR,
      ErrorCode.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
}
