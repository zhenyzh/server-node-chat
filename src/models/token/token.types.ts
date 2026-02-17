import { Types, type HydratedDocument } from "mongoose";

export type IToken = HydratedDocument<TokenBase>;

export type TokenBase = {
  user: Types.ObjectId;
  refreshToken: string;
};

export type JWTPayload = {
  id: string;
  email: string;
};
