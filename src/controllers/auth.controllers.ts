import { AuthService } from "@/service/auth.service";
import { asyncHandler, TOKEN_LIFETIME, HTTP_STATUS } from "@/utils";

export class AuthControllers {
  private authService = new AuthService();

  registration = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userData = await this.authService.registration({
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

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const userData = await this.authService.login({ email, password });

    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: TOKEN_LIFETIME.REFRESH.MILLISECONDS,
      httpOnly: true,
    });
    return res.status(HTTP_STATUS.UNAUTHORIZED).json(userData);
  });
}
