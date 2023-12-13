import { UsersRepository } from "../repositories/users.repository.js";
import bcrypt from "bcrypt";

const comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.log(error);
  }
  return false;
};

export class UsersService {
  usersRepository = new UsersRepository();

  findUsersById = async (id) => {
    // 저장소(Repository)에게 특정 유저정보 하나를 요청합니다.
    const user = await this.usersRepository.findUsersById(id);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      region: user.region,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  };

  createUser = async (email, name, password, region) => {
    // 중복 email 확인
    const confirmEmail = await this.usersRepository.findUsersByEmail(email);
    if (confirmEmail) throw new Error("AlreadyExistEmail");

    // 비밀번호 hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // 저장소(Repository)에게 데이터를 요청합니다.
    const createUser = await this.usersRepository.createUser(email, name, hashedPassword);

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      id: createUser.id,
      name: createUser.name,
      email: createUser.email,
      region: createUser.region,
      createdAt: createUser.createdAt,
      updatedAt: createUser.updatedAt
    };
  };

  updateUser = async (id, name, password) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const user = await this.usersRepository.findUsersById(id);
    if (!user) throw new Error("NoExistedUser");

    // 비밀번호 hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // 저장소(Repository)에게 데이터 수정을 요청합니다.
    await this.usersRepository.updateUser(id, name, hashedPassword);

    // 변경된 데이터를 조회합니다.
    const updateUser = await this.usersRepository.findUsersById(id, name, password);

    return {
      id: updateUser.id,
      name: updateUser.name,
      email: updateUser.email,
      region: updateUser.region,
      createdAt: updateUser.createdAt,
      updatedAt: updateUser.updatedAt
    };
  };

  deleteUser = async (id, password) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const user = await this.usersRepository.findUsersById(id);
    if (!user) throw new Error("NoExistedUser");

    // 비밀번호 확인
    const isValidPass = await comparePassword(password, user.password);
    if (!isValidPass) throw new Error("NotCorrectPassword");

    // 저장소(Repository)에게 데이터 삭제를 요청합니다.
    await this.usersRepository.deleteUser(id);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      region: user.region,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  };
}
