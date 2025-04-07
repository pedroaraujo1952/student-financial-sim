import { Router } from "express";

import sessionRouter from "../../../controllers/Session/routes";
import studentRouter from "../../../controllers/Student/routes";

const routes = Router();

routes.use(sessionRouter);
routes.use(studentRouter);

export default routes;
