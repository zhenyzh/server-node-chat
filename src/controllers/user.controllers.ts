import { asyncController } from "@/utils";

export class UserController {
  registration = asyncController(async (req, res) => {});
  login = asyncController(async (req, res) => {});
  logout = asyncController(async (req, res) => {});
  refresh = asyncController(async (req, res) => {});
  getUsers = asyncController(async (req, res) => {
    try {
      res.json(["123", "777"]);
    } catch (e) {
      console.log(e);
    }
  });
}
