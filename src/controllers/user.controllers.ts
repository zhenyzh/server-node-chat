import { asyncHandler, TOKEN_LIFETIME, HTTP_STATUS } from "@/utils";
import { UserService } from "@/service/user.service";

export class UserController {
  private userService = new UserService();

  registration = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userData = await this.userService.registration({
      name,
      email,
      password,
    });
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: TOKEN_LIFETIME.REFRESH.MILLISECONDS,
      httpOnly: true,
    });
    return res.status(HTTP_STATUS.CREATED).json(userData);
  });
}
