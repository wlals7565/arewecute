import db from "../../models/index.cjs";
const { users } = db;

export class UsersRepository { //yw 5번
  constructor(users) {
    // 생성자에서 전달받은 클라이언트의 의존성을 주입합니다.
    this.users = users;
  }

  findUsersById = async (id) => {
    // 아이디 조회 Users 모델의 findOne 메서드를 사용해 데이터를 요청
    const Users = await users.findOne({
      where: { id: id }
    });

    return Users;
  };

  findUsersByEmail = async (email) => {
    // 이메일 조회 Users 모델의 findOne 메서드를 사용해 데이터를 요청
    const Users = await users.findOne({
      where: { email: email }
    });

    return Users;
  };

  createUser = async (email, name, hashedPassword, region) => {
    // 회원가입 create 메서드를 사용해 데이터를 요청
    const createdUser = await users.create({
      email,
      name,
      password: hashedPassword,
      region
    });
    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      region: createdUser.region
    };
  };

  updateUser = async (id, name, hashedPassword, region) => {
    // 내 정보수정 update 메서드를 사용해 데이터를 수정
    const updateUser = await users.update({
      name,
      password: hashedPassword,
      region
    }, {
      where: {
        id: +id
      }
    });
    return updateUser;
  };


  deleteUser = async (id) => {
    //회원탈퇴 destroy 메서드 이용
    const deleteUser = await users.destroy({
      where: {
        id: +id
      }
    });

    return deleteUser;
  };
}
