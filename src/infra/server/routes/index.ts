import { Router } from "express";

import sessionRouter from "../../../controllers/Session/routes";
import studentRouter from "../../../controllers/Student/routes";
import simulationRouter from "../../../controllers/FinancialSimulation/routes";

const routes = Router();

routes.use(sessionRouter);
routes.use(studentRouter);
routes.use(simulationRouter);

export default routes;
