const express = require("express");
const cookieParser = require("cookie-parser");

// import express from "express";
// import router from "./routes/index.js";
// import cookieParser from "cookie-parser";
// import LogMiddleware from "./middlewares/log.middleware.js";
// import ErrorHandlingMiddleware from "./middlewares/error-handling.middleware.js";

const { users } = require("../models");

const app = express();
const port = 3000;

app.use(cookieParser());
// app.use(LogMiddleware);
app.use(express.json());
// app.use("/api", router);

router.post("/", async (req, res) => {
  const name = "정창일";
  const email = "test@example.com";
  const password = "1234";
  const region = "대한민국";
  try {
    await users.create({ name, email, password, region });
    res.status(201).json({ success: true, Message: "판매 상품을 등록하였습니다." });
  } catch (err) {
    res.status(500).json({ success: false, Message: "예기치 못한 오류가 발생하였습니다." });
    console.log(err);
  }
});

// app.use(ErrorHandlingMiddleware);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
