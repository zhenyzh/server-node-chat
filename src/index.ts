import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import router from "./router";
import { errorMiddlewares } from "@/middlewares";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", router);
app.use(errorMiddlewares);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    if (!process.env.DB_URL) {
      throw new Error("MongoDB DB_URL connection required");
    }

    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
