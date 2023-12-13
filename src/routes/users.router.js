import express from "express";
import { UsersController } from "../controllers/users.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// 인스턴스 생성
const usersController = new UsersController();

/** 내 정보 상세 조회 API **/
router.get("/", authMiddleware, usersController.findUsersById);

/** 내 정보 작성 API **/
router.post("/", usersController.createUser);

/** 내 정보 수정 API **/
router.put("/", authMiddleware, usersController.updateUser);

/** 내 정보 삭제 API **/
router.delete("/", authMiddleware, usersController.deleteUser);

export default router;
