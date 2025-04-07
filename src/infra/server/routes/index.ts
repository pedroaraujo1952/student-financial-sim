// src/infra/routes.ts
import { Router } from "express";
import container from "../../../containers";
import { SessionController } from "../../../controllers/SessionController";
import { TYPES } from "../../../constants/types";

const routes = Router();
const sessionController = container.get<SessionController>(
  TYPES.SessionController
);

routes.post("/api/register", async (req, res, next) => {
  await sessionController.register(req, res, next);
});

routes.post("/api/login", async (req, res, next) => {
  await sessionController.login(req, res, next);
});

export default routes;
