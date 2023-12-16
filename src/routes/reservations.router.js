import { Router } from "express";
import { ReservationsController } from "../controllers/reservations.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const reservationsRouter = Router();
const reservationsController = new ReservationsController();

reservationsRouter.post("/", authMiddleware, reservationsController.createOne);
reservationsRouter.get("/", authMiddleware, reservationsController.readByUser);
reservationsRouter.get("/:reservationId", authMiddleware, reservationsController.readOne);
reservationsRouter.put("/:reservationId", authMiddleware, reservationsController.updateOne);
reservationsRouter.delete("/:reservationId", authMiddleware, reservationsController.deleteOne);

export { reservationsRouter };
