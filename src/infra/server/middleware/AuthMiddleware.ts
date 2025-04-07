import { Request, Response, NextFunction } from "express";
import { AuthProvider } from "../../../contracts/AuthProvider";
import { Student } from "../../../entities/Student";

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
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      try {
        const decodedUser = await authProvider.verifyToken(token);

        req.user = decodedUser;

        next();
      } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  };
}
