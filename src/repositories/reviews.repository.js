import db from "../../models/index.cjs";
const { reviews } = db;

//a().b()
export default class ReviewsRepository {
  async postReview(userId, petSitterId, comment, rate) {
    try {
      const result = await reviews.create({
        userId,
        petSitterId,
        comment,
        rate
      });
      return result;
    } catch (error) {
      next(error);
    }
  }

  async getReviewsByPetSitterId(petSitterId) {
    try {
      const result = await reviews.findAll({ where: { petSitterId } });
      return result;
    } catch (error) {
      next(error);
    }
  }

  async deleteReview(userId, reviewId, petSitterId) {
    try {
      const result = await reviews.destroy({ where: { id: reviewId, petSitterId, userId } });
      return result;
    } catch (error) {
      next(error);
    }
  }

  async patchReview(userId, petSitterId, reviewId, comment, rate) {
    try {
      const result = await reviews.update({ comment, rate }, { where: { id: reviewId, petSitterId, userId } });
      return result;
    } catch (error) {
      next(error);
    }
  }
}
