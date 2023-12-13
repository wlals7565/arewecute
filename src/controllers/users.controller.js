import { UsersService } from "../services/users.service.js";
import validator from "validator";

export class UsersController {
  usersService = new UsersService();

  findUsersById = async (req, res, next) => {
    try {
      const id = req.user;

      // 서비스 계층에 구현된 findUsersById 로직을 실행합니다.
      const user = await this.usersService.findUsersById(id);

      return res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  };

  createUser = async (req, res, next) => {
    try {
      const { email, name, password, confirmPassword, region } = req.body;

      if (!email || !password || !name) throw new Error("InvalidParamsError");
      if (!validator.isEmail(email)) throw new Error("NotEmail");
      if (!validator.equals(password, confirmPassword)) throw new Error("NotSamePasswords");

      // 서비스 계층에 구현된 createUser 로직을 실행합니다.
      const createUser = await this.usersService.createUser(email, name, password, region);

      return res.status(201).json({ data: createUser });
    } catch (err) {
      next(err);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const id = req.user;
      const { name, password, confirmPassword, region } = req.body;
      if (!validator.equals(password, confirmPassword)) throw new Error("NotSamePasswords");

      // 서비스 계층에 구현된 updateUser 로직을 실행합니다.
      const updateUser = await this.usersService.updateUser(id, name, password, region);

      return res.status(200).json({ data: updateUser });
    } catch (err) {
      next(err);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const { password } = req.body;
      const id = req.user;

      // 서비스 계층에 구현된 deleteUser 로직을 실행합니다.
      const deleteUser = await this.usersService.deleteUser(id, password);

      return res.status(200).json({ data: deleteUser });
    } catch (err) {
      next(err);
    }
  };
}
