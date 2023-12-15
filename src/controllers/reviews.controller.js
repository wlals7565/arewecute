import ReviewsService from "../services/reviews.service.js";

const reviewsService = new ReviewsService();

//A가 B를 안 가진다. B를 이용할 뿐
//
export default class ReviewsController {
  //펫시터 아이디, 유저 아이디, 코멘트, 평점 isInt
  async postReview(req, res, next) {
    const { comment, rate } = req.body;
    const userId = res.locals.userId;
    const petSitterId = req.params.petSitterId;
    if (!userId || !petSitterId || !comment || !rate) {
      throw new Error("InvalidParamsError");
    } else {
      const result = await reviewsService.postReview(userId, petSitterId, comment, rate, next);
      res.json({
        code: 200,
        message: "성공적으로 리뷰를 작성했습니다."
      });
    }
  }

  //펫시터아이디만 받으면 됨.
  async getReviewsByPetSitterId(req, res, next) {
    const petSitterId = req.params.petSitterId;
    if (!petSitterId) {
      throw new Error("InvalidParamsError");
    } else {
      const result = await reviewsService.getReviewsByPetSitterId(petSitterId, next);
      res.json({ code: 200, message: "성공적으로 리뷰들을 불러왔습니다.", result });
    }
  }

  //리뷰아이디, 펫시터 아이디 받아야함.
  async deleteReview(req, res, next) {
    const userId = res.locals.userId;
    const petSitterId = req.params.petSitterId;
    const reviewId = req.params.reviewId;
    if (!userId && !petSitterId) {
      throw new Error("InvalidParamsError");
    } else {
      const result = await reviewsService.deleteReview(userId, reviewId, petSitterId, next);
      if (result) {
        res.json({ code: 200, message: "성공적으로 삭제했습니다." });
      } else {
        res.json({ code: 404, message: "사용자님의 해당 리뷰를 찾을 수 없습니다." });
      }
    }
  }
  //유저아이디, 펫시터 아이디, 코멘트, 평점 받아야함.
  async patchReview(req, res, next) {
    const userId = res.locals.userId;
    const petSitterId = req.params.petSitterId;
    const reviewId = req.params.reviewId;
    const { comment, rate } = req.body;
    if (!userId || !petSitterId || (!comment && !rate) || !reviewId) {
      throw new Error("InvalidParamsError");
    } else {
      const result = await reviewsService.patchReview(userId, petSitterId, reviewId, comment, rate, next);
      if (result) {
        console.log(result);
        res.json({ code: 200, message: "성공적으로 리뷰를 수정하였습니다." });
      } else {
        res.json({ code: 404, message: "사용자님의 해당 리뷰를 찾을 수 없습니다." });
      }
    }
  }
  //리뷰인데 내 리뷰 펫시터 정보까지?
  async getMyReview(req, res, next) {
    const result = await reviewsService.getMyReviews(res.locals.userId, next);
    res.json(result);
  }
}
