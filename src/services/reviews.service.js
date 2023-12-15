import ReviewsRepository from "../repositories/reviews.repository.js";
const reviewsRepository = new ReviewsRepository();
export default class reviewsService {
  async postReview(userId, petSitterId, comment, rate, next) {
    return reviewsRepository.postReview(userId, petSitterId, comment, rate, next)
  }

  async getReviewsByPetSitterId(petSitterId, next) {
    const result = await reviewsRepository.getReviewsByPetSitterId(petSitterId, next)
    return result;
  }

  async deleteReview(userId, reviewId, petSitterId, next) {
    const result = await reviewsRepository.deleteReview(userId, reviewId, petSitterId, next)
    return result;
  }

  async patchReview(userId, petSitterId, reviewId, comment, rate, next) {
    return reviewsRepository.patchReview(userId, petSitterId, reviewId, comment, rate, next)
  }

  async getMyReviews(id, next){
    return await reviewsRepository.getMyReviews(id, next);
  }
}
