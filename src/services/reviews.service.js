import ReviewsRepository from "../repositories/reviews.repository.js";
const reviewsRepository = new ReviewsRepository();
export default class reviewsService {
  async postReview(userId, petSitterId, comment, rate) {
    return reviewsRepository.postReview(userId, petSitterId, comment, rate)
  }

  async getReviewsByPetSitterId(petSitterId) {
    const result = await reviewsRepository.getReviewsByPetSitterId(petSitterId)
    return result;
  }

  async deleteReview(userId, reviewId, petSitterId) {
    const result = await reviewsRepository.deleteReview(userId, reviewId, petSitterId)
    return result;
  }

  async patchReview(userId, petSitterId, reviewId, comment, rate) {
    return reviewsRepository.patchReview(userId, petSitterId, reviewId, comment, rate)
  }
}
