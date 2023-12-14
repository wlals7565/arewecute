import { AuthService } from "../services/auth.service.js";

export class AuthController {
  authService = new AuthService();
  //확인
  login = async (req, res, next) => {
    try {
      // 서비스 계층에 구현된 findAllProducts 로직을 실행합니다.
      const { email, password } = req.body;
      const users = await this.authService.login(email, password);
      res.cookie("accessToken", `Bearer ${users.accessToken}`);
      return res.status(200).json( users );
    } catch (err) {
      next(err);
    }
  };
  //확인
  logout = async (req, res, next) => {
    try {
      res.clearCookie("accessToken");
      return res.status(200).json({ message: "로그아웃성공" });
    } catch (err) {
      next(err);
    }
  };
}
