import { Request, Response, NextFunction } from "express";
import { AuthProvider } from "../../../contracts/AuthProvider";
import { Student } from "../../../entities/Student";
import { UnauthorizedError } from "../../../controllers/shared/errors/UnauthorizedError";

declare global {
  namespace Express {
    interface Request {
      user?: Student;
    }
  }
}

export function createAuthMiddleware(authProvider: AuthProvider) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        throw new UnauthorizedError();
      }

      try {
        const decodedUser = await authProvider.verifyToken(token);

        req.user = decodedUser;

        next();
      } catch (error) {
        throw new UnauthorizedError();
      }
    } catch (error) {
      next(error);
    }
  };
}
