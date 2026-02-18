import { UserModel } from "@/models/user";

export class UserService {
  async getAllUsers() {
    return UserModel.find();
  }
}
