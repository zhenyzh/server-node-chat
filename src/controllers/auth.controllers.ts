import { AuthService } from "@/service/auth.service";
import { asyncHandler, TOKEN, HTTP_STATUS } from "@/utils";

export class AuthControllers {
  private authService = new AuthService();

  registration = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userData = await this.authService.registration(name, email, password);
    res.cookie(TOKEN.NAMESPACE.REFRESH_TOKEN, userData.refreshToken, {
      maxAge: TOKEN.REFRESH.MILLISECONDS,
      httpOnly: true,
    });
    return res.status(HTTP_STATUS.CREATED).json(userData);
  });

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const userData = await this.authService.login(email, password);

    res.cookie(TOKEN.NAMESPACE.REFRESH_TOKEN, userData.refreshToken, {
      maxAge: TOKEN.REFRESH.MILLISECONDS,
      httpOnly: true,
    });
    return res.status(HTTP_STATUS.UNAUTHORIZED).json(userData);
  });

  logout = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies[TOKEN.NAMESPACE.REFRESH_TOKEN];
    console.log({ refreshToken });
    await this.authService.logout(refreshToken);
    res.clearCookie(TOKEN.NAMESPACE.REFRESH_TOKEN, {
      httpOnly: true,
    });
    return res
      .status(HTTP_STATUS.OK)
      .json({ message: "Выход выполнен успешно" });
  });
}
