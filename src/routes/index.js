import express from "express";
import { reservationsRouter } from "./reservations.router.js";
const router = express.Router();

router.use("/reservation", reservationsRouter);

export default router;
