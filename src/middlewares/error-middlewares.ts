import { Request, Response, NextFunction } from "express";
import { ApiError } from "@/utils";

export const errorMiddlewares = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: "Непредвиденная ошибка" });
};
