import { Schema, model } from "mongoose";
import type { IToken } from "./token.types";

const TokenSchema = new Schema<IToken>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  refreshToken: { type: String, required: true },
});

export const TokenModel = model<IToken>("Token", TokenSchema);
