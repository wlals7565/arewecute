import { Router } from "express";
import { ReservationsController } from "../controllers/reservations.controller.js";

const reservationsRouter = Router();
const reservationsController = new ReservationsController();

reservationsRouter.post("", reservationsController.createOne);
reservationsRouter.get("/:reservationId", reservationsController.readOne);
reservationsRouter.put("/:reservationId", reservationsController.updateOne);
reservationsRouter.delete("/:reservationId", reservationsController.deleteOne);

export { reservationsRouter };
