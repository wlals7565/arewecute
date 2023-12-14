import ReviewsService from "../services/reviews.service.js";
const reviewsService = new ReviewsService();

//A가 B를 안 가진다. B를 이용할 뿐
//
export default class ReviewsController {
  //펫시터 아이디, 유저 아이디, 코멘트, 평점
  async postReview(req, res, next) {
    console.log("postReview in Controller");
    reviewsService.postReview();
    res.send("postReview in Controller")
  }

  //펫시터아이디만 받으면 됨.
  async getReviewsByPetSitterId(req, res, next) {
    console.log("getReviewsByPetSitterId in Controller");
    reviewsService.getReviewsByPetSitterId();
    res.send("getReviewsByPetSitterId in Controller")
  }

  //유저아이디, 펫시터 아이디 받아야함.
  async deleteReview(req, res, next) {
    console.log("deleteReview in Controller");
    reviewsService.deleteReview();
    res.send("deleteReview in Controller")
  }
  //유저아이디, 펫시터 아이디, 코멘트, 평점 받아야함.
  async patchReview(req, res, next) {
    console.log("patchReview in Controller");
    reviewsService.patchReview();
    res.send("patchReview in Controller")
  }
}
