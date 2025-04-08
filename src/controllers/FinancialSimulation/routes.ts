import express from "express";
import container from "../../containers";
import { FinancialSimulationController } from "./FinancialSimulationController";
import { TYPES } from "../../constants/types";
import { authMiddleware } from "../shared/middlewares/auth";
import { validateData } from "../../utils/validateData";
import { CreateSimulationValidator } from "./validators/CreateSimulationValidator";
import { validateQueryParams } from "../../utils/validateParams";
import { ListSimulationsArgsValidator } from "./validators/ListSimulationArgsValidator";

const router = express.Router();

const financialSimulationController =
  container.get<FinancialSimulationController>(
    TYPES.FinancialSimulationController
  );

router.use(authMiddleware);

router.post(
  "/api/simulations",
  validateData(CreateSimulationValidator),
  async (req, res, next) => {
    await financialSimulationController.create(req, res, next);
  }
);

router.get(
  "/api/simulations",
  validateQueryParams(ListSimulationsArgsValidator),
  async (req, res, next) => {
    await financialSimulationController.list(req, res, next);
  }
);

export default router;
