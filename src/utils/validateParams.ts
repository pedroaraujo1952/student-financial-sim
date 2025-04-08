import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

import { BadRequestError } from "../controllers/shared/errors/BadRequestError";
import { InternalServerError } from "../controllers/shared/errors/InternalServerError";

export function validateQueryParams(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        throw new BadRequestError({
          error: "Invalid params",
          details: errorMessages,
        });
      } else {
        throw new InternalServerError();
      }
    }
  };
}
