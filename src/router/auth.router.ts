import { Router } from "express";
import { AuthControllers } from "@/controllers/auth.controllers";

const authRouter = Router();
const authController = new AuthControllers();

authRouter.post("/registration", authController.registration);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);

export { authRouter };
