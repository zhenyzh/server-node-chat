import type { HydratedDocument } from "mongoose";

export type IUser = HydratedDocument<UserBase>;

export type UserDto = UserBase;

export type UserBase = {
  name: string;
  email: string;
  password: string;
};
