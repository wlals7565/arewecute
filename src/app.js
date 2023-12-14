//#TODO CJS나 EMC 하나로 통일 할 것
import express from "express";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import LogMiddleware from "./middlewares/log.middleware.js";
import ErrorHandlingMiddleware from "./middlewares/error-handling.middleware.js";
import db from "../models/index.cjs";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
const { sequelize } = db;

const app = express();
const port = 3000;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log(`데이터베이스 연결 성공`);
  })
  .catch((err) => {
    console.error(err);
  });

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PetSitter API",
      version: "1.0.0",
      description: "API Documentation for the PetSitter API"
    }
  },
  apis: ["./routes/*.js"] // Swagger JSDoc 설정 파일 경로
};

// Swagger JSDoc 생성
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI 설정
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cookieParser());
app.use(LogMiddleware);
app.use(express.json());
app.use("/api", router); // yw 1번

app.use(ErrorHandlingMiddleware);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
