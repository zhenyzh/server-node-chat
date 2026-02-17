import { Schema, model } from "mongoose";
import type { IUser } from "./user.types";

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export const UserModel = model<IUser>("User", UserSchema);
