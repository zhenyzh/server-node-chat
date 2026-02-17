import { HTTP_STATUS } from "./https-status";

export class ApiError extends Error {
  status: number;
  errors?: any;

  constructor(status: number, message: string, errors?: any) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static unauthorized() {
    return new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      "Пользователь не авторизован",
    );
  }

  static badRequest(message: string, errors?: any) {
    return new ApiError(HTTP_STATUS.BAD_REQUEST, message, errors);
  }
}
