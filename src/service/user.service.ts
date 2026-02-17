import bcrypt from "bcrypt";
import { type UserDto, UserModel } from "@/models/user";
import { TokenService } from "@/service/token.service";

export class UserService {
  async registration({ name, email, password }: UserDto) {
    const tokenService = new TokenService();

    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw new Error(`Пользователь с таким email ${email} уже существует`);
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

    const tokens = tokenService.generateTokens({
      id: userDto.id,
      email: userDto.email,
    });

    await tokenService.saveToken(user._id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}
