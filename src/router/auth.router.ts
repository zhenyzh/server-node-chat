import { Router } from "express";
import { AuthControllers } from "@/controllers/auth.controllers";

const authRouter = Router();
const authController = new AuthControllers();

authRouter.post("/registration", authController.registration);

export { authRouter };
