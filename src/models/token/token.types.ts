import { Types, Document } from "mongoose";

export type IToken = TokenBase & Document;

export type TokenBase = {
  user: Types.ObjectId;
  refreshToken: string;
};

export type JWTPayload = {
  id: string;
  email: string;
};
