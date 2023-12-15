import { UsersRepository } from "../repositories/users.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;

const comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.log(error);
  }
  return false;
};
// A가 B를 가지고 B는 C를 가진다. 그럼 A는 BC를 다 가지는데 그럼 계층화를 왜 하냐 A가 다 할 수 있는데 godclass
export class AuthService { 
  authRepository = new UsersRepository(); //yw 5번

  login = async (email, password) => {
    // 저장소(Repository)에게 특정 유저정보 하나를 요청합니다.
    const user = await this.authRepository.findUsersByEmail(email);
    // 비밀번호 확인
    const isValidPass = await comparePassword(password, user.password);
    if (!isValidPass) throw new Error("NotCorrectPassword");

    // jwt 토큰 생성
    const accessToken = jwt.sign({ id: user.id }, accessTokenSecretKey, {
      expiresIn: "12h"
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken
    };
  };
}
