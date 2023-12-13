import { prisma } from "../utils/prisma/index.js";

export class UsersRepository {
  constructor(prisma) {
    // 생성자에서 전달받은 Prisma 클라이언트의 의존성을 주입합니다.
    this.prisma = prisma;
  }

  /** 아이디 조회 */
  findUsersById = async (id) => {
    // ORM인 Prisma에서 Users 모델의 findUnique 메서드를 사용해 데이터를 요청
    const users = await prisma.Users.findUnique({
      where: { id: +id }
    });

    return users;
  };

  /** 이메일 조회 */
  findUsersByEmail = async (email) => {
    // ORM인 Prisma에서 Users 모델의 findUnique 메서드를 사용해 데이터를 요청
    const users = await prisma.Users.findUnique({
      where: { email: email }
    });

    return users;
  };

  /** 회원가입 */
  createUser = async (email, name, hashedPassword) => {
    // ORM인 Prisma에서 Users 모델의 create 메서드를 사용해 데이터를 요청
    const createdUser = prisma.Users.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    });
    return createdUser;
  };

  /** 내 정보수정 */
  updateUser = async (id, name, hashedPassword) => {
    // ORM인 Prisma에서 Users 모델의 update 메서드를 사용해 데이터를 수정
    const updateUser = await prisma.Users.update({
      where: {
        id: +id
      },
      data: {
        name,
        password: hashedPassword
      }
    });

    return updateUser;
  };

  /** 회원탈퇴 */
  deleteUser = async (id) => {
    // ORM인 Prisma에서 Users 모델의 delete 메서드를 사용해 데이터를 삭제
    const deleteUser = await prisma.Users.delete({
      where: {
        id: +id
      }
    });

    return deleteUser;
  };
}
