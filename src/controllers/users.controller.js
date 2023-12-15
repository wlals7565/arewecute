import { UsersService } from "../services/users.service.js";
import validator from "validator";

export class UsersController {
  usersService = new UsersService();

  //유저를 찾아서 뭘 하나요?
  findUsersById = async (req, res, next) => {
    try {
      const id = res.locals.userId;

      // 서비스 계층에 구현된 findUsersById 로직을 실행합니다.
      const user = await this.usersService.findUsersById(id);

      return res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  };

  //실행되는거 확인
  createUser = async (req, res, next) => {
    try {
      const { email, name, password, confirmPassword, region } = req.body;
      console.log(req.body);
      if (!email || !password || !name) throw new Error("InvalidParamsError");
      if (!validator.isEmail(email)) throw new Error("NotEmail");
      if (!validator.equals(password, confirmPassword)) throw new Error("NotSamePasswords");

      // 서비스 계층에 구현된 createUser 로직을 실행합니다.
      const createUser = await this.usersService.createUser(email, name, password, region);

      return res.status(201).json(createUser);
    } catch (err) {
      next(err);
    }
  };

  //유저정보 수정
  updateUser = async (req, res, next) => {
    try {
      const id = res.locals.userId;
      const { name, password, confirmPassword, region } = req.body;
      if (!validator.equals(password, confirmPassword)) throw new Error("NotSamePasswords");

      // 서비스 계층에 구현된 updateUser 로직을 실행합니다.
      const updateUser = await this.usersService.updateUser(id, name, password, region);

      return res.status(200).json({ data: updateUser });
    } catch (err) {
      next(err);
    }
  };

//회원탈퇴
deleteUser = async (req, res, next) => {
  try {
    const { password, confirmPassword } = req.body;
    const id = res.locals.userId;

    // 비밀번호와 확인 비밀번호가 일치하는지 검사합니다.
    if (password !== confirmPassword) {
      return res.status(400).json({ error: '비밀번호와 확인 비밀번호가 일치하지 않습니다.' });
    }
    
    // 서비스 계층에 구현된 deleteUser 로직을 실행합니다.
    const deleteUser = await this.usersService.deleteUser(id, password);

    return res.status(200).json({ data: deleteUser });
  } catch (err) {
    next(err);
  }
};

}
