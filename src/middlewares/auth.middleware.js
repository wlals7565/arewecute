import env from "dotenv";
import jwt from "jsonwebtoken";
env.config();
const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;

function verifyAccessToken(token, secretKey) {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return false;
  }
}

const authMiddleware = async (req, res, next) => {
  const reqAccessToken = req.cookies.accessToken;
  const [accessTokenType, accessToken] = (reqAccessToken ?? "").split(" ");
  try {
    // 토큰 타입이 일치하지 않을 경우
    if (accessTokenType !== "Bearer") throw new Error("TokenTypeError");

    // 유효성검사
    const verifiedAccessToken = verifyAccessToken(accessToken, accessTokenSecretKey);
    if (verifiedAccessToken) {
      res.locals.user = verifiedAccessToken.id;
      next();
    } else throw new Error("NotExistToken");
  } catch (err) {
    next(err);
  }
};

export { authMiddleware };
