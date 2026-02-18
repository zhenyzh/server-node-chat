import { UserService } from "@/service/user.service";
import { asyncHandler, HTTP_STATUS } from "@/utils";

export class UserControllers {
  private userService = new UserService();

  getUsers = asyncHandler(async (_, res) => {
    const users = await this.userService.getAllUsers();
    return res.status(HTTP_STATUS.OK).json(users);
  });
}
