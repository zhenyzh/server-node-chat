import { Router } from "express";
import { UserController } from "@/controllers/auth.controllers";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/registration", userController.registration);
export { userRouter };
