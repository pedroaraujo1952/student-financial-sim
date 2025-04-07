import { TYPES } from "../../constants/types";
import container from "../../containers";
import { validateData } from "../../utils/validateData";
import { authMiddleware } from "../shared/middlewares/auth";
import { StudentController } from "./StudentController";
import express from "express";
import { UpdateStudentValidator } from "./validators/UpdateStudentValidator";

const router = express.Router();

const studentController = container.get<StudentController>(
  TYPES.StudentController
);

router.get("/api/me", authMiddleware, async (req, res, next) => {
  await studentController.show(req, res, next);
});

router.put(
  "/api/me",
  authMiddleware,
  validateData(UpdateStudentValidator),
  async (req, res, next) => {
    await studentController.update(req, res, next);
  }
);

export default router;
