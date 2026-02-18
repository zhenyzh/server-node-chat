import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router";
import { errorMiddlewares } from "@/middlewares/error-middlewares";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", router);
app.use(errorMiddlewares);
