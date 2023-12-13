import express from "express";
import { reservationsRouter } from "./reservations.router.js";
import usersRouter from "./users.router.js";
const router = express.Router();

router.use("/reservation", reservationsRouter);
router.use("/users/", usersRouter);

export default router;
