import express from "express";
import container from "../../containers";
import { SessionController } from "./SessionController";
import { TYPES } from "../../constants/types";
import { validateData } from "../../utils/validateData";
import { LoginValidator } from "./validators/LoginValidator";
import { RegisterValidator } from "./validators/RegisterValidator";

const router = express.Router();

const sessionController = container.get<SessionController>(
  TYPES.SessionController
);

router.post(
  "/api/register",
  validateData(RegisterValidator),
  async (req, res, next) => {
    await sessionController.register(req, res, next);
  }
);

router.post(
  "/api/login",
  validateData(LoginValidator),
  async (req, res, next) => {
    await sessionController.login(req, res, next);
  }
);

export default router;
