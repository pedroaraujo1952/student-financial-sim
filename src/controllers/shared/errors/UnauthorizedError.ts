import { StatusCodes } from "http-status-codes";
import { BaseError } from "./BaseError";
import { ErrorCode } from "../../../constants/errors";

export class UnauthorizedError extends BaseError {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, ErrorCode.UNAUTHORIZED, "Unauthorized");
  }
}
