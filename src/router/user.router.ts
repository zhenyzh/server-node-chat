import { Router } from "express";
import { UserController } from "@/controllers/user.controllers";

const userRouter = Router();
const userController = new UserController();

// userRouter.post("/registration", userController.registration);
// userRouter.post("/login", userController.login);
// userRouter.post("/logout", userController.logout);
// userRouter.get("/refresh", userController.refresh);
userRouter.get("/", userController.getUsers);

export default userRouter;
