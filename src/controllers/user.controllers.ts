import { asyncHandler } from "@/utils";

export class UserController {
  registration = asyncHandler(async (req, res) => {});
  login = asyncHandler(async (req, res) => {});
  logout = asyncHandler(async (req, res) => {});
  refresh = asyncHandler(async (req, res) => {});
  getUsers = asyncHandler(async (req, res) => {
    try {
      res.json(["123", "777"]);
    } catch (e) {
      console.log(e);
    }
  });
}
