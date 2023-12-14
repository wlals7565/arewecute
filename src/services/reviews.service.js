import ReviewsRepository from "../repositories/reviews.repository.js";
const reviewsRepository = new ReviewsRepository();
export default class reviewsService {
  async postReview() {
    console.log("postReview in Service");
    reviewsRepository.postReview()
  }

  async getReviewsByPetSitterId() {
    console.log("getReviewsByPetSitterId in Service");
    reviewsRepository.getReviewsByPetSitterId()
  }

  async deleteReview() {
    console.log("deleteReview in Service");
    reviewsRepository.deleteReview()
  }

  async patchReview() {
    console.log("patchReview in Service");
    reviewsRepository.patchReview()
  }
}
