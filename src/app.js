//#TODO CJS나 EMC 하나로 통일 할 것
import express from "express";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import LogMiddleware from "./middlewares/log.middleware.js";
import ErrorHandlingMiddleware from "./middlewares/error-handling.middleware.js";
import path from "path";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
const port = 3000;
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

app.use(express.static(path.join(__dirname, "views")));

// Swagger JSDoc 생성
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI 설정
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(
  cors({
    origin: "*" // 모든 출처 허용 옵션. true 를 써도 된다.
  })
);
app.use(cookieParser());
app.use(LogMiddleware);
app.use(express.json());
app.use("/api", router); // yw 1번
app.use(express.static("./views"));
app.use(ErrorHandlingMiddleware);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
