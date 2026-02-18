import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { type JWTPayload, TokenModel } from "@/models/token";
import { TOKEN } from "@/utils";

export class TokenService {
  generateTokens(payload: JWTPayload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: TOKEN.ACCESS.STRING,
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: TOKEN.REFRESH.STRING,
    });

    return { accessToken, refreshToken };
  }

  async saveToken(userId: Types.ObjectId, refreshToken: string) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    return await TokenModel.create({ user: userId, refreshToken });
  }

  async removeToken(refreshToken: string) {
    return TokenModel.deleteOne({ refreshToken });
  }
}
