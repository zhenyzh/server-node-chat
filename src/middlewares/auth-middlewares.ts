import { ApiError, asyncHandler } from "@/utils";
import { TokenService } from "@/service/token.service";

export const authMiddlewares = asyncHandler((req, res, next) => {
  const tokenService = new TokenService();

  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return next(ApiError.unauthorized());
    }
    const accessToken = authorization.split(" ")[1];

    if (!accessToken) {
      return next(ApiError.unauthorized());
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.unauthorized());
    }

    (req as any).user = userData;
    next();
  } catch (e) {
    return next(ApiError.unauthorized());
  }
});
