import bcrypt from "bcrypt";
import { type UserDto, UserModel } from "@/models/user";
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

    await this.tokenService.saveToken(user._id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email }).orFail();

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

    await this.tokenService.saveToken(user._id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}
