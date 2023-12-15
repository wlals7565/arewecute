import { Router } from "express";
import ReviewsController from "../controllers/reviews.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const reviewsRouter = Router();
const reviewsController = new ReviewsController();

//reviewsRouter.get("/")

reviewsRouter.get("/:petSitterId", reviewsController.getReviewsByPetSitterId);

reviewsRouter.post("/:petSitterId", authMiddleware, reviewsController.postReview);

reviewsRouter.patch("/:petSitterId/:reviewId", authMiddleware, reviewsController.patchReview);

reviewsRouter.delete("/:petSitterId/:reviewId", authMiddleware, reviewsController.deleteReview);

export default reviewsRouter;
