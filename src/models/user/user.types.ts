import type { Document } from "mongoose";

export type IUser = UserBase & Document;

export type UserDto = UserBase;

export type UserBase = {
  name: string;
  email: string;
  password: string;
};
