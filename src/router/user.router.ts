import { Router } from "express";
import { UserControllers } from "@/controllers/user.controllers";
import { authMiddlewares } from "@/middlewares/auth-middlewares";

const userRouter = Router();
const userControllers = new UserControllers();

userRouter.get("/get-users", authMiddlewares, userControllers.getUsers);

export { userRouter };
