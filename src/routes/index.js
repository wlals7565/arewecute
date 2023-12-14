import express from "express";
import { reservationsRouter } from "./reservations.router.js";
import usersRouter from "./users.router.js";
import reviewsRouter from "./reviews.router.js";
import authRouter from "./auth.router.js"
const router = express.Router();

router.use("/reservation", reservationsRouter);

router.use("/users/", usersRouter);

router.use("/auth", authRouter);

router.use("/reviews", reviewsRouter);

export default router;
