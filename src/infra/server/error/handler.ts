import { BaseError } from "../../../controllers/shared/errors/BaseError";
import { InternalServerError } from "../../../controllers/shared/errors/InternalServerError";
import { Request, Response, NextFunction } from "express";

const normalizeError = (err: any) => {
  console.error(err);
  if (err instanceof BaseError) {
    return err;
  }

  return new InternalServerError();
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }
  const error = normalizeError(err);
  const statusCode = error.statusCode;
  const body = error.getBody();

  res.status(statusCode).json(body);
};
