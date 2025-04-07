// src/infra/routes.ts
import { Router } from "express";
import container from "../../../containers";
import { SessionController } from "../../../controllers/SessionController";
import { TYPES } from "../../../constants/types";
import { StudentController } from "../../../controllers/StudentController";
import { createAuthMiddleware } from "../middleware/AuthMiddleware";
import { AuthProvider } from "../../../contracts/AuthProvider";

const routes = Router();

const sessionController = container.get<SessionController>(
  TYPES.SessionController
);
const studentController = container.get<StudentController>(
  TYPES.StudentController
);

const authProvider = container.get<AuthProvider>(TYPES.AuthProvider);
const authMiddleware = createAuthMiddleware(authProvider);

routes.post("/api/register", async (req, res, next) => {
  await sessionController.register(req, res, next);
});

routes.post("/api/login", async (req, res, next) => {
  await sessionController.login(req, res, next);
});

routes.get("/api/me", authMiddleware, async (req, res, next) => {
  await studentController.show(req, res, next);
});

export default routes;
