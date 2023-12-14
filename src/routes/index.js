import express from "express";
import { reservationsRouter } from "./reservations.router.js";
import usersRouter from "./users.router.js";
import petSitterRouter from "./pet-sitters.router.js";
const router = express.Router();

router.use("/reservation", reservationsRouter);
router.use("/users/", usersRouter);
router.use("/pet-sitter", petSitterRouter);

export default router;
