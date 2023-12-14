import ReviewsService from "../services/reviews.service.js";
const reviewsService = new ReviewsService();

//A가 B를 안 가진다. B를 이용할 뿐
//
export default class ReviewsController {
  async postReview(req, res, next) {
    console.log("postReview in Controller");
    reviewsService.postReview();
    res.send("postReview in Controller")
  }

  async getReviewsByPetSitterId(req, res, next) {
    console.log("getReviewsByPetSitterId in Controller");
    reviewsService.getReviewsByPetSitterId();
    res.send("getReviewsByPetSitterId in Controller")
  }

  async deleteReview(req, res, next) {
    console.log("deleteReview in Controller");
    reviewsService.deleteReview();
    res.send("deleteReview in Controller")
  }

  async patchReview(req, res, next) {
    console.log("patchReview in Controller");
    reviewsService.patchReview();
    res.send("patchReview in Controller")
  }
}
