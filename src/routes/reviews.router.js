import { Router } from "express";
import ReviewsController from "../controllers/reviews.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const reviewsRouter = Router();
const reviewsController = new ReviewsController();

//reviewsRouter.get("/")

reviewsRouter.get("/:petSitterId", reviewsController.getReviewsByPetSitterId);

reviewsRouter.post("/", authMiddleware, reviewsController.postReview);

reviewsRouter.patch("/:reviewID", authMiddleware, reviewsController.patchReview);

reviewsRouter.delete("/:reviewID", authMiddleware, reviewsController.deleteReview);

export default reviewsRouter;