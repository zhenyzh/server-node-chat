import bcrypt from "bcrypt";
import { UserModel } from "@/models/user";
import type { JWTPayload } from "@/models/token";
import { TokenService } from "@/service/token.service";
import { ApiError } from "@/utils";

export class AuthService {
  private tokenService = new TokenService();

  async registration(name: string, email: string, password: string) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.badRequest(
        `Пользователь с таким email ${email} уже существует`,
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const user = await UserModel.create({
      name,
      email,
      password: hashPassword,
    });

    const userDto = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };

    const tokens = this.tokenService.generateTokens({
      id: userDto.id,
      email: userDto.email,
    });

    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.badRequest("Пользователь с таким email не найден");
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw ApiError.badRequest("Неверный пароль");
    }

    const userDto = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };

    const tokens = this.tokenService.generateTokens({
      id: userDto.id,
      email: userDto.email,
    });

    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken: string) {
    return await this.tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.unauthorized();
    }
    const userData = this.tokenService.validateRefreshToken(
      refreshToken,
    ) as JWTPayload | null;

    const tokenFromDb = await this.tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorized();
    }

    const user = await UserModel.findById(userData.id);

    if (!user) {
      throw ApiError.unauthorized();
    }

    const userDto = {
      id: user.id,
      email: user.email,
    };

    const tokens = this.tokenService.generateTokens({
      id: user.id,
      email: user.email,
    });

    await this.tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}
